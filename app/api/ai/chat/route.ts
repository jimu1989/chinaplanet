import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { runAI, runAIStream } from "../../../../lib/ai/core";

import type {
  AIContext,
  AIMessage,
  AIUserType,
} from "../../../../lib/ai/types";

function detectUserType(
  role: string | null
): AIUserType {
  if (
    role === "executive" ||
    role === "admin" ||
    role === "developer" ||
    role === "designer" ||
    role === "editor" ||
    role === "support" ||
    role === "member"
  ) {
    return "team";
  }

  return "customer";
}

type AIAction = {
  label: string;
  href: string;
};

function buildActions(
  intent: string,
  locale: "ar" | "en" | "zh"
): AIAction[] {
  const labels = {
    ar: {
      study: "🎓 الدراسة في الصين",
      contact: "📩 إرسال طلب",
      whatsapp: "💬 تواصل معنا",
      services: "خدمات China Planet",
    },
    en: {
      study: "🎓 Study in China",
      contact: "📩 Send a Request",
      whatsapp: "💬 Contact Us",
      services: "China Planet Services",
    },
    zh: {
      study: "🎓 中国留学",
      contact: "📩 提交需求",
      whatsapp: "💬 联系我们",
      services: "China Planet 服务",
    },
  };

  const t = labels[locale];

  const actions: AIAction[] = [];

  if (
    intent === "china_information"
  ) {
    actions.push({
      label: t.study,
      href: `/${locale}#services`,
    });
  }

  actions.push({
    label: t.contact,
    href: `/${locale}#contact`,
  });

  const whatsappMessages = {
    ar: "السلام عليكم، أرغب في الاستفسار عن خدمات China Planet.",
    en: "Hello, I would like to inquire about China Planet services.",
    zh: "您好，我想咨询 China Planet 的服务。",
  };

  actions.push({
    label: t.whatsapp,
    href: `https://wa.me/966560406506?text=${encodeURIComponent(
      whatsappMessages[locale]
    )}`,
  });

  return actions;
}

export async function POST(
  request: Request
) {
  try {
    const t0 = performance.now();
    const mark = (name: string) =>
      console.log(`AI TIMING → ${name}: ${(performance.now() - t0).toFixed(0)}ms`);

    const body = await request.json();
    mark("body");

    const message = String(
      body.message || ""
    ).trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "الرسالة مطلوبة.",
        },
        { status: 400 }
      );
    }

    const supabase =
      await createSupabaseServerClient();
    mark("supabase client");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    mark("auth");

    let userType: AIUserType = "guest";
    let userId: string | undefined;

    if (user) {
      userId = user.id;

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

      userType = detectUserType(
        profile?.role || null
      );
    }

    const requestedLocale =
      body.context?.locale;

    const locale =
      requestedLocale === "en" ||
      requestedLocale === "zh"
        ? requestedLocale
        : "ar";

    const context: AIContext = {
      userId,
      userType,
      locale,
      pathname:
        typeof body.context?.pathname ===
        "string"
          ? body.context.pathname
          : undefined,
      sessionId:
        typeof body.context?.sessionId ===
        "string"
          ? body.context.sessionId
          : undefined,
    };

    const history: AIMessage[] =
      Array.isArray(body.history)
        ? body.history
        : [];

    const wantsStream = body.stream === true;

    if (wantsStream) {
      const streamed = await runAIStream(
        message,
        context,
        history
      );

      if (!streamed.success || !streamed.stream) {
        return NextResponse.json(
          {
            success: false,
            message:
              streamed.error ||
              "المساعد مشغول حاليًا. حاول مرة أخرى بعد قليل.",
            intent: streamed.intent,
            toolsUsed: streamed.toolsUsed,
            actions: [],
          },
          { status: 503 }
        );
      }

      const reader = streamed.stream.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();

      const output = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            let buffer = "";

            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                break;
              }

              buffer += decoder.decode(value, {
                stream: true,
              });

              const events = buffer.split("\n\n");
              buffer = events.pop() || "";

              for (const event of events) {
                const lines = event.split("\n");

                for (const line of lines) {
                  if (!line.startsWith("data:")) {
                    continue;
                  }

                  const payload = line.slice(5).trim();

                  if (!payload || payload === "[DONE]") {
                    continue;
                  }

                  try {
                    const json = JSON.parse(payload);

                    const text =
                      json?.candidates?.[0]?.content?.parts
                        ?.map(
                          (part: { text?: string }) =>
                            part.text || ""
                        )
                        .join("") || "";

                    if (text) {
                      controller.enqueue(
                        encoder.encode(text)
                      );
                    }
                  } catch {
                    // تجاهل أي SSE غير صالح
                  }
                }
              }
            }

            controller.close();
          } catch (error) {
            console.error(
              "AI STREAM API ERROR:",
              error
            );
            controller.error(error);
          } finally {
            reader.releaseLock();
          }
        },
      });

      return new Response(output, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "X-Accel-Buffering": "no",
          "Connection": "keep-alive",
        },
      });
    }

    mark("before runAI");
    const result = await runAI(
      message,
      context,
      history
    );

    const actions = result.success
      ? buildActions(
          result.intent,
          locale
        )
      : [];

    return NextResponse.json({
      ...result,
      actions,
    });
  } catch (error) {
    console.error(
      "AI CHAT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "حدث خطأ أثناء معالجة طلب الذكاء الاصطناعي.",
        actions: [],
      },
      { status: 500 }
    );
  }
}
