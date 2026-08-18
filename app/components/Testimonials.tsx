import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";

const icons = [
  (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-10 w-10"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path
        d="M10 14H54V42H28L18 50V42H10V14Z"
        strokeLinejoin="round"
      />
      <path d="M20 24H44" strokeLinecap="round" />
      <path d="M20 32H37" strokeLinecap="round" />
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
      <circle cx="32" cy="32" r="20" />
      <path d="M32 20V32L40 38" strokeLinecap="round" />
      <path d="M20 48L14 54" strokeLinecap="round" />
      <path d="M44 48L50 54" strokeLinecap="round" />
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
        d="M12 48L24 36L32 42L50 22"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 22H50V30"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 54H52" strokeLinecap="round" />
    </svg>
  ),
];

export default function Testimonials({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = translations[language].testimonials;
  const isArabic = language === "ar";

  const trustPoints = [
    {
      title:
        language === "ar"
          ? "نتواصل معك مباشرة"
          : language === "zh"
            ? "直接与您沟通"
            : "We Communicate Directly",
      description:
        language === "ar"
          ? "نبدأ بفهم هدفك واحتياجك قبل اقتراح الخدمة المناسبة لك."
          : language === "zh"
            ? "在推荐合适的服务之前，我们会先了解您的目标和需求。"
            : "We first understand your goals and needs before recommending the right service.",
      icon: icons[0],
    },
    {
      title:
        language === "ar"
          ? "حلول حسب احتياجك"
          : language === "zh"
            ? "根据您的需求定制方案"
            : "Solutions Tailored to You",
      description:
        language === "ar"
          ? "نرتب الخدمة بما يناسب رحلتك أو دراستك أو تجارتك."
          : language === "zh"
            ? "根据您的旅行、学习或商业需求，为您安排合适的服务。"
            : "We arrange our services around your travel, education, or business needs.",
      icon: icons[1],
    },
    {
      title:
        language === "ar"
          ? "متابعة واضحة"
          : language === "zh"
            ? "清晰的全程跟进"
            : "Clear Follow-Up",
      description:
        language === "ar"
          ? "نبقى معك في الخطوات المهمة ونوضح لك ما تحتاج معرفته قبل اتخاذ القرار."
          : language === "zh"
            ? "在重要环节持续陪伴您，并在您做决定前清楚说明所需了解的信息。"
            : "We stay with you through important steps and clearly explain what you need to know before making decisions.",
      icon: icons[2],
    },
  ];

  return (
    <section
      id="trust"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />

            <span className="cp-label">
              {language === "ar"
                ? "رحلتك معنا"
                : language === "zh"
                  ? "与我们一起的旅程"
                  : "YOUR JOURNEY WITH US"}
            </span>

            <span className="cp-line" />
          </div>

          <h2 className="mt-5 text-3xl font-medium leading-[1.35] text-[#40372f] sm:text-4xl lg:text-[42px]">
            {language === "ar"
              ? "تجربتك مع "
              : language === "zh"
                ? "您与"
                : "Your Experience with "}

            <span className="text-[#d8795e]">
              {language === "ar"
                ? "كوكب الصين"
                : language === "zh"
                  ? "中国星球"
                  : "China Planet"}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786e65]">
            {language === "ar"
              ? "نؤمن أن أفضل خدمة تبدأ بفهم احتياجك بوضوح، ثم مساعدتك خطوة بخطوة."
              : language === "zh"
                ? "我们相信，优质的服务始于清晰了解您的需求，并一步一步为您提供帮助。"
                : "We believe the best service starts with clearly understanding your needs, then supporting you every step of the way."}
          </p>
        </div>

        {/* TRUST POINTS */}
        <div className="mt-16 grid border-t border-[#e4dcd4] md:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className={`group border-b border-[#e4dcd4] px-7 py-10 text-center transition-colors duration-300 hover:bg-white/40 md:border-b-0 ${
                isArabic
                  ? "md:border-l md:last:border-l-0"
                  : "md:border-r md:last:border-r-0"
              }`}
            >
              {/* ICON */}
              <div className="mx-auto flex h-10 w-10 items-center justify-center text-[#b5966c] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#d8795e]">
                {point.icon}
              </div>

              {/* ACCENT */}
              <div className="mx-auto mt-5 h-px w-7 bg-[#d8795e] transition-all duration-300 group-hover:w-11" />

              {/* TITLE */}
              <h3 className="mt-5 text-lg font-semibold text-[#40372f]">
                {point.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mx-auto mt-3 max-w-[250px] text-xs leading-7 text-[#786e65]">
                {point.description}
              </p>
            </article>
          ))}
        </div>

        {/* FINAL CTA */}
        <div
          className={`mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#e4dcd4] pt-10 text-center sm:flex-row ${
            isArabic ? "sm:text-right" : "sm:text-left"
          }`}
        >
          <div>
            <div
              className={`flex items-center justify-center gap-3 ${
                isArabic ? "sm:justify-start" : "sm:justify-start"
              }`}
            >
              <span className="text-[10px] font-semibold tracking-[0.28em] text-[#c8bab0]">
                CHINA PLANET
              </span>

              <span className="h-px w-8 bg-[#d8795e]" />
            </div>

            <h3 className="mt-3 text-2xl font-medium text-[#40372f] sm:text-3xl">
              {language === "ar"
                ? "عندك هدف في الصين؟"
                : language === "zh"
                  ? "您在中国有什么目标？"
                  : "Have a Goal in China?"}
            </h3>

            <p className="mt-2 text-sm text-[#786e65]">
              {language === "ar"
                ? "أخبرنا بما تحتاجه، ونبدأ معك من الخطوة الأولى."
                : language === "zh"
                  ? "告诉我们您的需求，我们从第一步开始陪伴您。"
                  : "Tell us what you need, and we'll start with you from the first step."}
            </p>
          </div>

          <a
            href="#contact"
            className="cp-button shrink-0"
          >
            {language === "ar"
              ? "ابدأ الآن"
              : language === "zh"
                ? "立即开始"
                : "Get Started"}

            <span
              className={
                isArabic
                  ? "mr-2 text-[#d8795e]"
                  : "ml-2 text-[#d8795e]"
              }
            >
              {isArabic ? "←" : "→"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}