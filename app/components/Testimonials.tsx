import type { Language } from "../lib/i18n";

const icons = [
  <svg
    key="direct"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path
      d="M10 14H54V42H28L18 50V42H10V14Z"
      strokeLinejoin="round"
    />
    <path d="M20 24H44" strokeLinecap="round" />
    <path d="M20 32H37" strokeLinecap="round" />
  </svg>,

  <svg
    key="follow"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="32" cy="32" r="20" />
    <path d="M32 20V32L40 38" strokeLinecap="round" />
    <path d="M20 48L14 54" strokeLinecap="round" />
    <path d="M44 48L50 54" strokeLinecap="round" />
  </svg>,

  <svg
    key="clarity"
    viewBox="0 0 64 64"
    fill="none"
    className="h-8 w-8"
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
  </svg>,
];

export default function Testimonials({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const points = [
    {
      title:
        language === "ar"
          ? "نفهم احتياجك أولًا"
          : language === "zh"
            ? "先了解您的需求"
            : "We Understand First",
      description:
        language === "ar"
          ? "نبدأ بفهم هدفك واحتياجك، ثم نقترح لك الطريق المناسب."
          : language === "zh"
            ? "我们先了解您的目标和需求，再为您提供合适的方向。"
            : "We start by understanding your goals and needs before suggesting the right path.",
    },
    {
      title:
        language === "ar"
          ? "نرتّبها معك"
          : language === "zh"
            ? "陪您一步一步完成"
            : "We Make It Clear",
      description:
        language === "ar"
          ? "نرتّب الخطوات المهمة ونوضح لك التفاصيل بدل ما تضيع بين الخيارات."
          : language === "zh"
            ? "我们梳理重要步骤，让您不必在复杂选择中摸索。"
            : "We organize the important steps so you can move forward without getting lost in the details.",
    },
    {
      title:
        language === "ar"
          ? "نبقى معك"
          : language === "zh"
            ? "持续跟进"
            : "We Stay With You",
      description:
        language === "ar"
          ? "من أول تواصل إلى الخطوة التالية، نحرص أن تكون الصورة واضحة أمامك."
          : language === "zh"
            ? "从第一次联系到下一步，我们持续跟进，让每一步都更加清晰。"
            : "From the first conversation to the next step, we stay involved and keep things clear.",
    },
  ];

  return (
    <section
      id="trust"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-editorial-section cp-section-atmosphere"
    >
      <div className="cp-editorial-container">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <div className="cp-editorial-kicker">
              <span>
                {language === "ar"
                  ? "ليش كوكب الصين؟"
                  : language === "zh"
                    ? "为什么选择中国星球？"
                    : "WHY CHINA PLANET?"}
              </span>
            </div>
          </div>

          <div className={isArabic ? "lg:pr-10" : "lg:pl-10"}>
            <h2 className="cp-editorial-heading">
              {language === "ar" ? (
                <>
                  <span className="block">مو بس نوصلك.</span>
                  <span className="cp-editorial-accent block">
                    نفهمك الطريق.
                  </span>
                </>
              ) : language === "zh" ? (
                <>
                  <span className="block">我们不只是带您到中国。</span>
                  <span className="cp-editorial-accent block">
                    我们让这条路更清晰。
                  </span>
                </>
              ) : (
                <>
                  <span className="block">We do more than get you there.</span>
                  <span className="cp-editorial-accent block">
                    We make the journey clearer.
                  </span>
                </>
              )}
            </h2>
          </div>
        </div>

        <div className="mt-16 border-y border-[var(--cp-line)]">
          <div className="grid md:grid-cols-3">
            {points.map((point, index) => (
              <article
                key={point.title}
                className={[
                  "group relative min-h-[330px] overflow-hidden px-7 py-9 transition-all duration-700 hover:bg-[var(--cp-white)] sm:px-9",
                  index > 0 ? "md:border-s md:border-[var(--cp-line)]" : "",
                  index < points.length - 1
                    ? "border-b md:border-b-0"
                    : "",
                ].join(" ")}
              >
                <span className="pointer-events-none absolute -bottom-6 end-2 text-[130px] font-semibold leading-none tracking-[-0.1em] text-[var(--cp-brown)]/[0.035] transition-all duration-700 group-hover:text-[var(--cp-red)]/[0.055]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--cp-muted-light)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex h-11 w-11 items-center justify-center border border-[var(--cp-line)] text-[var(--cp-gold)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[var(--cp-red)] group-hover:text-[var(--cp-red)]">
                    {icons[index]}
                  </div>
                </div>

                <div className="relative z-10 mt-20">
                  <span className="mb-6 block h-px w-8 bg-[var(--cp-red)] transition-all duration-500 group-hover:w-14" />

                  <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--cp-brown)]">
                    {point.title}
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-8 text-[var(--cp-muted)]">
                    {point.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-[var(--cp-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-muted-light)]">
              CHINA PLANET
            </p>

            <p className="mt-3 text-lg font-medium tracking-[-0.02em] text-[var(--cp-brown)]">
              {language === "ar"
                ? "الصين أقرب لما يكون الطريق واضح."
                : language === "zh"
                  ? "当道路清晰，中国就会更近。"
                  : "China feels closer when the way forward is clear."}
            </p>
          </div>

          <div className="h-px w-16 bg-[var(--cp-red)]" />
        </div>
      </div>
    </section>
  );
}
