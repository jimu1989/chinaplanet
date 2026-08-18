import type { Language } from "../lib/i18n";

const icons = [
  (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-10 w-10"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M8 34.5L56 18" strokeLinecap="round" />
      <path d="M28 28L20 13" strokeLinecap="round" />
      <path d="M28 28L38 39" strokeLinecap="round" />
      <path d="M20 13L25 14.5" strokeLinecap="round" />
      <path d="M38 39L45 40" strokeLinecap="round" />
      <path d="M8 34.5L16 35.5" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-10 w-10"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path
        d="M8 24L32 12L56 24L32 36L8 24Z"
        strokeLinejoin="round"
      />
      <path
        d="M16 29V43C16 43 21 50 32 50C43 50 48 43 48 43V29"
        strokeLinecap="round"
      />
      <path d="M56 24V39" strokeLinecap="round" />
    </svg>
  ),
  (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-10 w-10"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path
        d="M10 14H42C45.3 14 48 16.7 48 20V35C48 38.3 45.3 41 42 41H27L18 49V41H16C12.7 41 10 38.3 10 35V14Z"
        strokeLinejoin="round"
      />
      <path d="M19 23H39" strokeLinecap="round" />
      <path d="M19 31H33" strokeLinecap="round" />
      <path
        d="M48 27H54C55.1 27 56 27.9 56 29V43C56 45.2 54.2 47 52 47H50L45 52V47"
      />
    </svg>
  ),
  (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-10 w-10"
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
    </svg>
  ),
  (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-10 w-10"
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
    </svg>
  ),
];

export default function Goals({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const goals = [
    {
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
      icon: icons[0],
    },
    {
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
      icon: icons[1],
    },
    {
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
      icon: icons[2],
    },
    {
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
      icon: icons[3],
    },
    {
      title:
        language === "en"
          ? "I’m Looking for a Factory"
          : language === "zh"
            ? "我要找工厂"
            : "أبحث عن مصنع",
      text:
        language === "en"
          ? "Finding suitable factories and suppliers in China."
          : language === "zh"
            ? "寻找合适的中国工厂和供应商。"
            : "العثور على مصانع وموردين مناسبين في الصين.",
      icon: icons[4],
    },
  ];

  return (
    <section
      id="goals"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-section bg-[#f3f0eb]"
    >
      <div className="cp-container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />

            <span className="cp-label">
              {language === "en"
                ? "YOUR CHINA JOURNEY"
                : language === "zh"
                  ? "您的中国之旅"
                  : "رحلتك إلى الصين"}
            </span>

            <span className="cp-line" />
          </div>

          <h2 className="mt-5 text-3xl font-medium leading-[1.35] text-[#40372f] sm:text-4xl lg:text-[42px]">
            {language === "en"
              ? "What's your goal in"
              : language === "zh"
                ? "您来中国的目标是"
                : "وش هدفك من"}

            <span className="text-[#d8795e]">
              {language === "en"
                ? " China?"
                : language === "zh"
                  ? "什么？"
                  : " الصين؟"}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786e65]">
            {language === "en"
              ? "Choose the path that suits you, and let us help you from the beginning to the destination."
              : language === "zh"
                ? "选择适合您的方向，让我们从开始到抵达一路为您提供帮助。"
                : "اختر المسار المناسب لك، ودعنا نساعدك من البداية حتى الوصول."}
          </p>
        </div>

        <div className="mt-16 grid border-t border-[#e4dcd4] sm:grid-cols-2 lg:grid-cols-5">
          {goals.map((goal) => (
            <a
              key={goal.title}
              href="#contact"
              className="group border-b border-[#e4dcd4] px-6 py-10 text-center transition-colors duration-300 hover:bg-white/40 lg:border-b-0 lg:border-l lg:last:border-l-0"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center text-[#b5966c] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#d8795e]">
                {goal.icon}
              </div>

              <div className="mx-auto mt-5 h-px w-7 bg-[#d8795e] transition-all duration-300 group-hover:w-11" />

              <h3 className="mt-5 text-lg font-semibold text-[#40372f]">
                {goal.title}
              </h3>

              <p className="mx-auto mt-3 max-w-[210px] text-xs leading-7 text-[#786e65]">
                {goal.text}
              </p>

              <div className="mt-7 text-[11px] font-semibold text-[#554b43] transition-colors duration-300 group-hover:text-[#d8795e]">
                {language === "en"
                  ? "Start here →"
                  : language === "zh"
                    ? "从这里开始 →"
                    : "ابدأ من هنا ←"}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}