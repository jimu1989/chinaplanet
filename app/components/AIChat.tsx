"use client";

import { useState } from "react";

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
  const [open, setOpen] = useState(false);

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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={isArabic ? "فتح مساعد China Planet" : "Open China Planet AI"}
        className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#171717] text-white shadow-[0_12px_35px_rgba(0,0,0,0.20)] transition hover:scale-105 hover:bg-[#c94a3d] focus:outline-none focus:ring-2 focus:ring-[#c94a3d] focus:ring-offset-2"
      >
        <span className="text-lg font-bold">AI</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/25 p-4 sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <section
            id="ai-assistant"
            dir={direction}
            className="relative max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-[30px] border border-[#e3ddd6] bg-[#f3f0eb] shadow-[0_25px_80px_rgba(40,30,20,0.20)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={isArabic ? "إغلاق المساعد" : "Close assistant"}
              className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#554d46] shadow-sm transition hover:bg-[#c94a3d] hover:text-white"
            >
              ×
            </button>

            <div className="max-h-[85vh] overflow-y-auto p-5 sm:p-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="cp-line" />
                  <span className="cp-label">{t.eyebrow}</span>
                  <span className="cp-line" />
                </div>

                <h2 className="mt-5 text-2xl font-medium leading-[1.35] tracking-tight text-[#40372f] sm:text-3xl">
                  {t.title}
                  <br />
                  <span className="text-[#c94a3d]">{t.accent}</span>
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#756b62]">
                  {t.description}
                </p>
              </div>

              <div className="mt-7 overflow-hidden rounded-[24px] border border-[#e3ddd6] bg-white">
                <div className="max-h-[330px] min-h-[220px] space-y-4 overflow-y-auto p-4 sm:p-6">
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                          message.role === "user"
                            ? "bg-[#171717] text-white"
                            : "bg-[#f3f0eb] text-[#40372f]"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl bg-[#f3f0eb] px-4 py-3 text-sm text-[#756b62]">
                        {t.thinking}
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-[#eee8e1] p-4 sm:p-5">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {t.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => void sendMessage(suggestion)}
                        disabled={loading}
                        className="rounded-full border border-[#e3ddd6] bg-[#faf9f7] px-3 py-2 text-[11px] text-[#756b62] transition hover:border-[#c94a3d] hover:text-[#c94a3d] disabled:opacity-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-end gap-3">
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
                      className="min-h-[58px] flex-1 resize-none rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-4 py-3 text-sm leading-7 text-[#302c28] outline-none transition focus:border-[#c94a3d] focus:bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => void sendMessage()}
                      disabled={loading || !input.trim()}
                      className="flex h-[58px] shrink-0 items-center justify-center rounded-2xl bg-[#171717] px-5 text-sm font-semibold text-white transition hover:bg-[#c94a3d] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {loading ? "..." : t.send}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
