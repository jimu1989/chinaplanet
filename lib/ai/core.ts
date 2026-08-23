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

const OLLAMA_URL =
  process.env.OLLAMA_URL || "http://localhost:11434";

const OLLAMA_MODEL =
  process.env.OLLAMA_MODEL || "qwen2.5:3b";

type OllamaMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function historyToMessages(
  history: AIMessage[]
): OllamaMessage[] {
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
    const messages: OllamaMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...historyToMessages(history),
      {
        role: "user",
        content: cleanMessage,
      },
    ];

    const response = await fetch(
      `${OLLAMA_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages,
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "OLLAMA ERROR:",
        response.status,
        errorText
      );

      return {
        success: false,
        message:
          "تعذر الاتصال بالعقل المحلي حاليًا. حاول مرة أخرى.",
        intent: routing.intent,
        toolsUsed: routing.tools,
      };
    }

    const data = await response.json();

    const responseMessage =
      data?.message?.content?.trim();

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
    console.error(
      "OLLAMA CONNECTION ERROR:",
      error
    );

    return {
      success: false,
      message:
        "تعذر الاتصال بالعقل المحلي حاليًا. تأكد أن Ollama يعمل.",
      intent: routing.intent,
      toolsUsed: routing.tools,
    };
  }
}

export { AI_SYSTEM_PROMPT };
