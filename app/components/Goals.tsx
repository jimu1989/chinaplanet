"use client";

import type { Language } from "../lib/i18n";
import { useEffect, useState } from "react";

const icons = [
  <svg key="travel" viewBox="0 0 64 64" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.4">
    <path d="M8 34.5L56 18" strokeLinecap="round" />
    <path d="M28 28L20 13" strokeLinecap="round" />
    <path d="M28 28L38 39" strokeLinecap="round" />
    <path d="M20 13L25 14.5" strokeLinecap="round" />
    <path d="M38 39L45 40" strokeLinecap="round" />
    <path d="M8 34.5L16 35.5" strokeLinecap="round" />
  </svg>,

  <svg key="study" viewBox="0 0 64 64" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.4">
    <path d="M8 24L32 12L56 24L32 36L8 24Z" strokeLinejoin="round" />
    <path d="M16 29V43C16 43 21 50 32 50C43 50 48 43 48 43V29" strokeLinecap="round" />
    <path d="M56 24V39" strokeLinecap="round" />
  </svg>,

  <svg key="chinese" viewBox="0 0 64 64" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.4">
    <path
      d="M10 14H42C45.3 14 48 16.7 48 20V35C48 38.3 45.3 41 42 41H27L18 49V41H16C12.7 41 10 38.3 10 35V14Z"
      strokeLinejoin="round"
    />
    <path d="M19 23H39" strokeLinecap="round" />
    <path d="M19 31H33" strokeLinecap="round" />
    <path d="M48 27H54C55.1 27 56 27.9 56 29V43C56 45.2 54.2 47 52 47H50L45 52V47" />
  </svg>,

  <svg key="trade" viewBox="0 0 64 64" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 22H52" strokeLinecap="round" />
    <path d="M18 22V50" strokeLinecap="round" />
    <path d="M46 22V50" strokeLinecap="round" />
    <path d="M14 50H50" strokeLinecap="round" />
    <path d="M22 28H42" strokeLinecap="round" />
    <path d="M22 35H42" strokeLinecap="round" />
    <path d="M22 42H42" strokeLinecap="round" />
    <path d="M8 16L16 10L24 16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 16L48 10L56 16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,

  <svg key="factory" viewBox="0 0 64 64" fill="none" className="h-9 w-9" stroke="currentColor" strokeWidth="1.4">
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
      className="cp-section bg-[#f7f3ec]"
    >
      <div className="cp-container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="cp-line" />
              <span className="cp-label">{journeyLabel}</span>
            </div>

            <h2 className="cp-title mt-6 max-w-[620px] text-4xl sm:text-5xl lg:text-[58px]">
              {language === "en"
                ? "What brings you to China?"
                : language === "zh"
                  ? "您为什么来到中国？"
                  : "وش هدفك من الصين؟"}
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-12" : "lg:pl-12"}>
            <p className="max-w-[600px] text-sm leading-8 text-[#786e65] sm:text-base">
              {activeGoal.text}
            </p>

            <div className="mt-7 flex items-center gap-4">
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#a89c91]">
                {String(activeIndex + 1).padStart(2, "0")} / 05
              </span>

              <span className="h-px w-12 bg-[#d8795e]" />
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[#ded6ce]">
          <div className="grid md:grid-cols-2 lg:grid-cols-5">
            {goals.map((goal, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`group relative min-h-[320px] border-b border-[#ded6ce] px-6 py-8 text-start transition-all duration-500 lg:border-b-0 lg:border-s ${
                    active ? "bg-[#fffdf9]" : "hover:bg-[#fbf8f3]"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[#a89c91]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div
                      className={`transition-all duration-500 ${
                        active
                          ? "-translate-y-1 text-[#c94a3d]"
                          : "text-[#b5966c] group-hover:-translate-y-1 group-hover:text-[#c94a3d]"
                      }`}
                    >
                      {icons[index]}
                    </div>
                  </div>

                  <div className="mt-16">
                    <div
                      className={`mb-5 h-px bg-[#c94a3d] transition-all duration-500 ${
                        active ? "w-12" : "w-7 group-hover:w-12"
                      }`}
                    />

                    <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#40372f]">
                      {goal.title}
                    </h3>

                    <p className="mt-3 max-w-[220px] text-xs leading-7 text-[#786e65]">
                      {goal.text}
                    </p>

                    <div
                      className={`mt-7 text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                        active
                          ? "text-[#c94a3d]"
                          : "text-[#554b43] group-hover:text-[#c94a3d]"
                      }`}
                    >
                      {language === "en"
                        ? "Start here →"
                        : language === "zh"
                          ? "从这里开始 →"
                          : "ابدأ من هنا ←"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#ded6ce] pt-5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#9a9087]">
          <span>Saudi Arabia × China</span>

          <div className="flex gap-2">
            {goals.map((goal, index) => (
              <button
                key={goal.id}
                type="button"
                aria-label={goal.title}
                onClick={() => setActiveIndex(index)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "w-8 bg-[#c94a3d]"
                    : "w-2 bg-[#cdbfb4]"
                }`}
              />
            ))}
          </div>

          <span>{String(activeIndex + 1).padStart(2, "0")} / 05</span>
        </div>
      </div>
    </section>
  );
}
