import OpenAI from "openai";

import type {
  AIContext,
  AIMessage,
  AIResponse,
} from "./types";

import {
  AI_SYSTEM_PROMPT,
  buildAIContextPrompt,
} from "./prompts";

import {
  buildRoutingResult,
} from "./router";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type OpenAIHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

function historyToMessages(
  history: AIMessage[]
): OpenAIHistoryMessage[] {
  return history
    .filter(
      (message) =>
        message.role === "user" ||
        message.role === "assistant"
    )
    .slice(-20)
    .map((message) => ({
      role:
        message.role === "assistant"
          ? "assistant"
          : "user",
      content: message.content,
    }));
}

export async function runAI(
  message: string,
  context: AIContext,
  history: AIMessage[] = []
): Promise<AIResponse> {
  const cleanMessage = message.trim();

  if (!cleanMessage) {
    return {
      success: false,
      message: "اكتب لي ما الذي تريد مساعدتك فيه.",
      intent: "unknown",
      toolsUsed: [],
    };
  }

  const routing = buildRoutingResult(
    cleanMessage,
    context
  );

  const systemPrompt = [
    AI_SYSTEM_PROMPT,
    buildAIContextPrompt(context),
    `
النية التي حددها النظام:
${routing.intent}

الأدوات المناسبة لهذه النية:
${
  routing.tools.length
    ? routing.tools.join(", ")
    : "لا توجد أدوات حاليًا"
}

مهم:
لا تدّعِ تنفيذ أي عملية أو الوصول إلى بيانات
إلا إذا تم تنفيذها فعليًا بواسطة أداة من النظام.
`,
  ].join("\n");

  try {
    const completion =
      await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...historyToMessages(history),
          {
            role: "user",
            content: cleanMessage,
          },
        ],
      });

    const responseMessage =
      completion.choices[0]?.message?.content?.trim();

    if (!responseMessage) {
      return {
        success: false,
        message:
          "لم أتمكن من تكوين إجابة الآن. حاول مرة أخرى.",
        intent: routing.intent,
        toolsUsed: routing.tools,
      };
    }

    return {
      success: true,
      message: responseMessage,
      intent: routing.intent,
      toolsUsed: routing.tools,
    };
  } catch (error) {
    console.error("AI CORE ERROR:", error);

    return {
      success: false,
      message:
        "تعذر الاتصال بمحرك الذكاء الاصطناعي حاليًا. حاول مرة أخرى.",
      intent: routing.intent,
      toolsUsed: routing.tools,
    };
  }
}

export { AI_SYSTEM_PROMPT };
