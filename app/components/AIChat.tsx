"use client";

import { useEffect, useRef, useState } from "react";

import type { Language } from "../lib/i18n";

type AIAction = {
  label: string;
  href: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  actions?: AIAction[];
};

const content = {
  ar: {
    eyebrow: "CHINA PLANET AI",
    title: "عندك سؤال عن الصين؟",
    accent: "اسألنا.",
    description:
      "مساعدك الذكي للاستفسارات الأولية حول الصين وخدمات China Planet.",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    thinking: "جاري التفكير...",
    suggestions: [
      "الدراسة في الصين",
      "التجارة والأعمال",
      "تعلم اللغة الصينية",
      "السفر إلى الصين",
    ],
    welcome:
      "مرحبًا بك في China Planet. كيف يمكنني مساعدتك في استفسارك عن الصين؟",
    error:
      "حدث خطأ أثناء الاتصال بالمساعد. حاول مرة أخرى.",
  },

  en: {
    eyebrow: "CHINA PLANET AI",
    title: "Have a question about China?",
    accent: "Ask us.",
    description:
      "Your smart assistant for initial questions about China and China Planet services.",
    placeholder: "Ask your question...",
    send: "Send",
    thinking: "Thinking...",
    suggestions: [
      "Studying in China",
      "Business & Trade",
      "Learning Chinese",
      "Travel to China",
    ],
    welcome:
      "Welcome to China Planet. How can I help you with your question about China?",
    error:
      "Something went wrong. Please try again.",
  },

  zh: {
    eyebrow: "CHINA PLANET AI",
    title: "对中国有疑问？",
    accent: "问问我们。",
    description:
      "您的智能助手，为您解答有关中国及 China Planet 服务的初步问题。",
    placeholder: "请输入您的问题...",
    send: "发送",
    thinking: "思考中...",
    suggestions: [
      "中国留学",
      "贸易与商务",
      "学习中文",
      "中国旅行",
    ],
    welcome:
      "欢迎来到 China Planet。请问有什么关于中国的问题可以帮助您？",
    error:
      "连接助手时发生错误，请稍后再试。",
  },
};

export default function AIChat({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = content[language];

  const isArabic =
    language === "ar";

  const direction =
    isArabic ? "rtl" : "ltr";

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "assistant",
        content: t.welcome,
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (
    message?: string
  ) => {
    const value =
      (message ?? input).trim();

    if (!value || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: value,
    };

    const nextHistory = [
      ...messages,
      userMessage,
    ];

    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "/api/ai/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: value,

            history: nextHistory,

            context: {
              locale: language,
              pathname:
                window.location.pathname,
            },
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        data.success === false
      ) {
        throw new Error(
          "AI request failed"
        );
      }

      const answer =
        data.answer ||
        data.message ||
        data.response ||
        data.content;

      if (!answer) {
        throw new Error(
          "Empty AI response"
        );
      }

      const actions: AIAction[] =
        Array.isArray(data.actions)
          ? data.actions.filter(
              (action: unknown) =>
                typeof action ===
                  "object" &&
                action !== null &&
                typeof (
                  action as AIAction
                ).label === "string" &&
                typeof (
                  action as AIAction
                ).href === "string"
            )
          : [];

      setMessages(
        (current) => [
          ...current,

          {
            role: "assistant",
            content: String(answer),
            actions,
          },
        ]
      );
    } catch (error) {
      console.error(
        "AI CHAT ERROR:",
        error
      );

      setMessages(
        (current) => [
          ...current,

          {
            role: "assistant",
            content: t.error,
          },
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="اسأل كوكب الصين"
          className="group fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#f3f0eb] text-[#40372f] border border-[#e3ddd6] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition hover:scale-105 hover:bg-[#c94a3d]"
        >
          <span className="text-xl" aria-hidden="true">✦</span>

          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-[#171717] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
            اسأل كوكب الصين
          </span>
        </button>
      )}

      {open && (
        <section
          id="ai-assistant"
          dir={direction}
          className="fixed inset-x-4 bottom-4 z-[70] sm:left-auto sm:right-6 sm:w-[430px]"
        >
          <div className="overflow-hidden rounded-[28px] border border-[#e3ddd6] bg-white shadow-[0_25px_80px_rgba(40,30,20,0.18)]">
            <div className="flex items-center justify-between bg-[#171717] px-5 py-4 text-white">
              <div>
                <p className="text-xs font-semibold">مساعد كوكب الصين</p>
                <p className="mt-1 text-[10px] text-white/50">China Planet</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="إغلاق المساعد"
                className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              className="max-h-[55vh] min-h-[220px] space-y-4 overflow-y-auto p-5"
            >
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.role === "user"
                        ? "bg-[#f3f0eb] text-[#40372f]"
                        : "bg-[#171717] text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-end">
                  <div className="rounded-2xl bg-[#f3f0eb] px-4 py-3 text-sm text-[#40372f] border border-[#e3ddd6]/70">
                    {t.thinking}
                  </div>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-[#eee8e1] bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {t.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={loading}
                    className="rounded-full border border-[#e3ddd6] bg-[#faf9f7] px-3 py-1.5 text-[10px] text-[#756b62] transition hover:border-[#c94a3d] hover:text-[#c94a3d] disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void sendMessage();
                    }
                  }}
                  placeholder={t.placeholder}
                  rows={2}
                  className="min-h-[54px] flex-1 resize-none rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-4 py-3 text-sm leading-6 text-[#302c28] outline-none transition focus:border-[#c94a3d] focus:bg-white"
                />

                <button
                  type="button"
                  onClick={() => void sendMessage()}
                  disabled={loading || !input.trim()}
                  className="flex h-[54px] shrink-0 items-center justify-center rounded-2xl bg-[#171717] px-5 text-sm font-semibold text-white transition hover:bg-[#c94a3d] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "..." : t.send}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}