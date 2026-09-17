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
    accent: "اسأل كوكب الصين.",
    placeholder: "اكتب سؤالك...",
    send: "إرسال",
    thinking: "جاري التفكير...",
    suggestions: [
      "الدراسة في الصين",
      "التجارة والأعمال",
      "تعلم اللغة الصينية",
      "السفر إلى الصين",
    ],
    welcome:
      "مرحبًا بك في كوكب الصين. كيف نقدر نساعدك في استفسارك عن الصين؟",
    error: "حدث خطأ أثناء الاتصال بالمساعد. حاول مرة أخرى.",
    open: "اسأل كوكب الصين",
    close: "إغلاق المساعد",
  },

  en: {
    eyebrow: "CHINA PLANET AI",
    title: "Have a question about China?",
    accent: "Ask China Planet.",
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
      "Welcome to China Planet. How can we help with your question about China?",
    error: "Something went wrong. Please try again.",
    open: "Ask China Planet",
    close: "Close assistant",
  },

  zh: {
    eyebrow: "CHINA PLANET AI",
    title: "对中国有疑问？",
    accent: "问问中国星球。",
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
      "欢迎来到中国星球。关于中国的问题，我们可以如何帮助您？",
    error: "连接助手时发生错误，请稍后再试。",
    open: "问问中国星球",
    close: "关闭助手",
  },
};

export default function AIChat({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = content[language];
  const isArabic = language === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.welcome,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (message?: string) => {
    const value = (message ?? input).trim();

    if (!value || loading) return;

    const userMessage: Message = {
      role: "user",
      content: value,
    };

    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          history: nextHistory,
          context: {
            locale: language,
            pathname: window.location.pathname,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`AI request failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.message || "AI request failed");
      }

      const answer =
        data.message ||
        data.answer ||
        data.response ||
        data.content;

      if (!answer) {
        throw new Error("Empty AI response");
      }

      const actions: AIAction[] = Array.isArray(data.actions)
        ? data.actions.filter(
            (action: unknown) =>
              typeof action === "object" &&
              action !== null &&
              typeof (action as AIAction).label === "string" &&
              typeof (action as AIAction).href === "string",
          )
        : [];

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: String(answer),
          actions,
        },
      ]);
    } catch (error) {
      console.error("AI CHAT ERROR:", error);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: t.error,
        },
      ]);
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
          aria-label={t.open}
          className="group fixed bottom-6 end-6 z-[70] flex h-16 w-16 items-center justify-center rounded-full border border-[var(--cp-line-dark)] bg-[var(--cp-brown-deep)] text-[var(--cp-red-soft)] shadow-[0_16px_45px_rgba(43,37,33,0.22)] transition-all duration-500 hover:-translate-y-1 hover:bg-[var(--cp-red)] hover:text-white sm:bottom-8 sm:end-8"
        >
          {/* Outer breathing glow */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-6px] rounded-full border border-[var(--cp-red)]/20 opacity-70 animate-[aiPulse_3s_ease-in-out_infinite]"
          />

          {/* Rotating orbit */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[4px] rounded-full border border-transparent border-t-[var(--cp-red-soft)]/80 border-r-[var(--cp-gold-light)]/45 animate-[aiOrbit_7s_linear_infinite] group-hover:[animation-duration:3.5s]"
          />

          {/* Orbit dot */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[4px] rounded-full animate-[aiOrbit_7s_linear_infinite] group-hover:[animation-duration:3.5s]"
          >
            <span className="absolute left-1/2 top-[-2px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--cp-gold-light)] shadow-[0_0_10px_rgba(214,189,148,0.8)]" />
          </span>

          {/* Inner ring */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[10px] rounded-full border border-white/10"
          />

          {/* AI spark */}
          <span
            aria-hidden="true"
            className="relative z-10 text-xl leading-none drop-shadow-[0_0_14px_rgba(216,121,94,0.45)] animate-[aiSpark_2.4s_ease-in-out_infinite] transition-transform duration-500 group-hover:rotate-90"
          >
            ✦
          </span>

          {/* Tooltip */}
          <span className="pointer-events-none absolute end-full me-3 hidden whitespace-nowrap border border-white/10 bg-[var(--cp-brown-deep)] px-3 py-2 text-[10px] font-semibold text-white opacity-0 shadow-xl transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100 sm:block">
            {t.open}
          </span>
        </button>
      )}

      {open && (
        <section
          id="ai-assistant"
          dir={direction}
          className="fixed inset-x-4 bottom-4 z-[70] sm:start-auto sm:end-6 sm:w-[420px]"
        >
          <div className="overflow-hidden border border-[var(--cp-line)] bg-[var(--cp-ivory)] shadow-[0_30px_90px_rgba(43,37,33,0.22)]">
            <div className="relative overflow-hidden border-b border-white/10 bg-[var(--cp-brown-deep)] px-5 py-5 text-white">
              {/* Header AI glow */}
              <div className="pointer-events-none absolute -end-10 -top-14 h-32 w-32 rounded-full border border-[var(--cp-red)]/15" />

              <div className="relative flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--cp-red-soft)]/35 bg-white/[0.03]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-1 rounded-full border border-transparent border-t-[var(--cp-red-soft)] animate-[aiOrbit_5s_linear_infinite]"
                  />
                  <span
                    aria-hidden="true"
                    className="relative text-[15px] text-[var(--cp-red-soft)] animate-[aiSpark_2.4s_ease-in-out_infinite]"
                  >
                    ✦
                  </span>
                </div>

                <div>
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[var(--cp-red-soft)]">
                    {t.eyebrow}
                  </p>

                  <p className="mt-1 text-lg font-semibold tracking-[-0.025em]">
                    {t.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center border border-white/10 text-lg text-white/60 transition hover:border-white/30 hover:text-white"
              >
                ×
              </button>
            </div>

            <div
              ref={messagesContainerRef}
              className="max-h-[52vh] min-h-[230px] space-y-4 overflow-y-auto p-5"
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
                    className={[
                      "max-w-[86%] border px-4 py-3 text-sm leading-7",
                      message.role === "user"
                        ? "border-[var(--cp-line)] bg-[var(--cp-white)] text-[var(--cp-brown)]"
                        : "border-[var(--cp-brown-deep)] bg-[var(--cp-brown-deep)] text-white",
                    ].join(" ")}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-end">
                  <div className="flex items-center gap-3 border border-[var(--cp-line)] bg-[var(--cp-white)] px-4 py-3 text-sm text-[var(--cp-muted)]">
                    <span
                      aria-hidden="true"
                      className="relative flex h-5 w-5 items-center justify-center"
                    >
                      <span className="absolute inset-0 rounded-full border border-transparent border-t-[var(--cp-red)] animate-[aiOrbit_1.2s_linear_infinite]" />
                      <span className="text-[10px] text-[var(--cp-red)] animate-[aiSpark_1.2s_ease-in-out_infinite]">
                        ✦
                      </span>
                    </span>

                    {t.thinking}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--cp-line)] bg-[var(--cp-white)] p-4">
              <div className="mb-4 flex flex-wrap gap-2">
                {t.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void sendMessage(suggestion)}
                    disabled={loading}
                    className="border border-[var(--cp-line)] px-3 py-2 text-[9px] font-semibold text-[var(--cp-muted)] transition hover:border-[var(--cp-red)] hover:text-[var(--cp-red)] disabled:opacity-50"
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
                  className="min-h-[54px] flex-1 resize-none border border-[var(--cp-line)] bg-[var(--cp-ivory)] px-4 py-3 text-sm leading-6 text-[var(--cp-brown)] outline-none placeholder:text-[var(--cp-muted-light)] focus:border-[var(--cp-red)]"
                />

                <button
                  type="button"
                  onClick={() => void sendMessage()}
                  disabled={loading || !input.trim()}
                  className="flex h-[54px] shrink-0 items-center justify-center bg-[var(--cp-red)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--cp-red-dark)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "..." : t.send}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <style jsx global>{`
        @keyframes aiOrbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes aiSpark {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.78;
          }

          50% {
            transform: scale(1.16);
            opacity: 1;
          }
        }

        @keyframes aiPulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.25;
          }

          50% {
            transform: scale(1.04);
            opacity: 0.75;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .group span {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
