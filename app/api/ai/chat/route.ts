import { NextResponse } from "next/server";

import { createSupabaseServerClient } from "../../../../lib/supabase-server";
import { runAI } from "../../../../lib/ai/core";

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

  actions.push({
    label: t.whatsapp,
    href: `/${locale}#contact`,
  });

  return actions;
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

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

    const {
      data: { user },
    } = await supabase.auth.getUser();

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
