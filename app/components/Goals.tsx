"use client";

import type { Language } from "../lib/i18n";
import { useEffect, useState } from "react";

const icons = [
  <svg
    key="travel"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M8 34.5L56 18" strokeLinecap="round" />
    <path d="M28 28L20 13" strokeLinecap="round" />
    <path d="M28 28L38 39" strokeLinecap="round" />
    <path d="M20 13L25 14.5" strokeLinecap="round" />
    <path d="M38 39L45 40" strokeLinecap="round" />
    <path d="M8 34.5L16 35.5" strokeLinecap="round" />
  </svg>,

  <svg
    key="study"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M8 24L32 12L56 24L32 36L8 24Z" strokeLinejoin="round" />
    <path
      d="M16 29V43C16 43 21 50 32 50C43 50 48 43 48 43V29"
      strokeLinecap="round"
    />
    <path d="M56 24V39" strokeLinecap="round" />
  </svg>,

  <svg
    key="chinese"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path
      d="M10 14H42C45.3 14 48 16.7 48 20V35C48 38.3 45.3 41 42 41H27L18 49V41H16C12.7 41 10 38.3 10 35V14Z"
      strokeLinejoin="round"
    />
    <path d="M19 23H39" strokeLinecap="round" />
    <path d="M19 31H33" strokeLinecap="round" />
    <path d="M48 27H54C55.1 27 56 27.9 56 29V43C56 45.2 54.2 47 52 47H50L45 52V47" />
  </svg>,

  <svg
    key="trade"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M12 22H52" strokeLinecap="round" />
    <path d="M18 22V50" strokeLinecap="round" />
    <path d="M46 22V50" strokeLinecap="round" />
    <path d="M14 50H50" strokeLinecap="round" />
    <path d="M22 28H42" strokeLinecap="round" />
    <path d="M22 35H42" strokeLinecap="round" />
    <path d="M22 42H42" strokeLinecap="round" />
    <path
      d="M8 16L16 10L24 16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M40 16L48 10L56 16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,

  <svg
    key="factory"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M10 52H54" strokeLinecap="round" />
    <path d="M14 52V28L25 20V52" strokeLinejoin="round" />
    <path d="M25 52V34L36 27V52" strokeLinejoin="round" />
    <path d="M36 52V22L50 14V52" strokeLinejoin="round" />
    <path d="M19 35H20" strokeLinecap="round" />
    <path d="M30 41H31" strokeLinecap="round" />
    <path d="M42 30H43" strokeLinecap="round" />
    <path d="M46 30L53 37" strokeLinecap="round" />
    <circle cx="44" cy="28" r="6" />
  </svg>,
];

export default function Goals({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const goals = [
    {
      id: "travel",
      title:
        language === "en"
          ? "I Travel"
          : language === "zh"
            ? "我要旅行"
            : "أسافر",
      short:
        language === "en"
          ? "TRAVEL"
          : language === "zh"
            ? "旅行"
            : "سفر",
      text:
        language === "en"
          ? "Trips, bookings, reception, and programs inside China."
          : language === "zh"
            ? "旅行、预订、接待以及中国境内行程安排。"
            : "رحلات، حجوزات، استقبال وبرامج داخل الصين.",
    },

    {
      id: "study",
      title:
        language === "en"
          ? "I Study"
          : language === "zh"
            ? "我要留学"
            : "أدرس",
      short:
        language === "en"
          ? "STUDY"
          : language === "zh"
            ? "留学"
            : "دراسة",
      text:
        language === "en"
          ? "University admission, scholarships, housing, and educational consulting."
          : language === "zh"
            ? "大学录取、奖学金、住宿以及教育咨询。"
            : "قبول جامعي، منح، سكن واستشارات تعليمية.",
    },

    {
      id: "chinese",
      title:
        language === "en"
          ? "I Learn Chinese"
          : language === "zh"
            ? "我要学习中文"
            : "أتعلم الصينية",
      short:
        language === "en"
          ? "LANGUAGE"
          : language === "zh"
            ? "中文"
            : "لغة",
      text:
        language === "en"
          ? "Chinese language, HSK, and conversation with teachers."
          : language === "zh"
            ? "中文学习、HSK以及与教师进行中文会话。"
            : "لغة صينية، HSK ومحادثة مع مدرسين.",
    },

    {
      id: "trade",
      title:
        language === "en"
          ? "I Trade"
          : language === "zh"
            ? "我要做贸易"
            : "أتاجر",
      short:
        language === "en"
          ? "TRADE"
          : language === "zh"
            ? "贸易"
            : "تجارة",
      text:
        language === "en"
          ? "Importing, shipping, negotiation, and supplier follow-up."
          : language === "zh"
            ? "进口、运输、谈判以及供应商跟进。"
            : "استيراد، شحن، تفاوض ومتابعة الموردين.",
    },

    {
      id: "factory",
      title:
        language === "en"
          ? "I'm Looking for a Factory"
          : language === "zh"
            ? "我要找工厂"
            : "أبحث عن مصنع",
      short:
        language === "en"
          ? "FACTORY"
          : language === "zh"
            ? "工厂"
            : "مصنع",
      text:
        language === "en"
          ? "Finding suitable factories and suppliers in China."
          : language === "zh"
            ? "寻找合适的中国工厂和供应商。"
            : "العثور على مصانع وموردين مناسبين في الصين.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % goals.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [goals.length]);

  const activeGoal = goals[activeIndex];

  const journeyLabel =
    language === "en"
      ? "YOUR CHINA JOURNEY"
      : language === "zh"
        ? "您的中国之旅"
        : "رحلتك إلى الصين";

  return (
    <section
      id="goals"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-editorial-section bg-[var(--cp-brown-deep)] text-white"
    >
      <div className="cp-editorial-container">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[var(--cp-red-soft)]">
              <span className="h-px w-10 bg-current" />
              <span className="text-[10px] font-semibold tracking-[0.25em]">
                {journeyLabel}
              </span>
            </div>

            <h2 className="mt-7 max-w-3xl text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]">
              {language === "en"
                ? "What brings you to China?"
                : language === "zh"
                  ? "您为什么来到中国？"
                  : "وش هدفك من الصين؟"}
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-12" : "lg:pl-12"}>
            <p className="max-w-xl text-sm leading-8 text-white/55 sm:text-base">
              {activeGoal.text}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-white/35">
                {String(activeIndex + 1).padStart(2, "0")} / 05
              </span>

              <span className="h-px w-12 bg-[var(--cp-red-soft)]" />
            </div>
          </div>
        </div>

        <div className="mt-16 overflow-hidden border-y border-white/10">
          <div className="grid md:grid-cols-5">
            {goals.map((goal, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "group relative min-h-[250px] border-b border-white/10 px-6 py-7 text-start transition-all duration-700 md:border-b-0",
                    index > 0 ? "md:border-s md:border-white/10" : "",
                    active ? "bg-white/[0.065]" : "hover:bg-white/[0.03]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={[
                        "text-[10px] font-semibold tracking-[0.2em] transition-colors duration-500",
                        active
                          ? "text-[var(--cp-red-soft)]"
                          : "text-white/25",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={[
                        "flex h-11 w-11 items-center justify-center border transition-all duration-500",
                        active
                          ? "border-[var(--cp-red-soft)] text-[var(--cp-red-soft)]"
                          : "border-white/10 text-white/35 group-hover:border-white/25 group-hover:text-white/65",
                      ].join(" ")}
                    >
                      {icons[index]}
                    </div>
                  </div>

                  <div className="mt-20">
                    <span className="text-[9px] font-semibold tracking-[0.22em] text-white/30">
                      {goal.short}
                    </span>

                    <h3
                      className={[
                        "mt-3 text-xl font-semibold tracking-[-0.03em] transition-colors duration-500 sm:text-2xl",
                        active ? "text-white" : "text-white/65",
                      ].join(" ")}
                    >
                      {goal.title}
                    </h3>

                    <div
                      className={[
                        "mt-6 h-px transition-all duration-700",
                        active
                          ? "w-14 bg-[var(--cp-red-soft)]"
                          : "w-7 bg-white/15",
                      ].join(" ")}
                    />
                  </div>

                  <span
                    className={[
                      "pointer-events-none absolute bottom-0 text-[100px] font-semibold leading-none tracking-[-0.1em] transition-all duration-700",
                      isArabic ? "left-3" : "right-3",
                      active
                        ? "text-white/[0.045]"
                        : "text-white/[0.018]",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] text-white/30">
              CHINA PLANET
            </p>

            <p className="mt-3 text-lg text-white/65">
              {language === "ar"
                ? "حدد هدفك، ونقرّب لك الطريق."
                : language === "zh"
                  ? "确定您的目标，让我们帮您更接近中国。"
                  : "Choose your goal. We’ll bring the journey closer."}
            </p>
          </div>

          <div className="flex gap-2">
            {goals.map((goal, index) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${goal.title}`}
                className={[
                  "h-1 transition-all duration-500",
                  index === activeIndex
                    ? "w-10 bg-[var(--cp-red-soft)]"
                    : "w-5 bg-white/15",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
