const trustPoints = [
  {
    title: "نتواصل معك مباشرة",
    description:
      "نبدأ بفهم هدفك واحتياجك قبل اقتراح الخدمة المناسبة لك.",
    icon: (
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
  },

  {
    title: "حلول حسب احتياجك",
    description:
      "نرتب الخدمة بما يناسب رحلتك أو دراستك أو تجارتك.",
    icon: (
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
  },

  {
    title: "متابعة واضحة",
    description:
      "نبقى معك في الخطوات المهمة ونوضح لك ما تحتاج معرفته قبل اتخاذ القرار.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-10 w-10"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 48L24 36L32 42L50 22" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 22H50V30" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 54H52" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Testimonials() {
  return (
    <section
      id="trust"
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />

            <span className="cp-label">
              YOUR JOURNEY WITH US
            </span>

            <span className="cp-line" />
          </div>

          <h2 className="mt-5 text-3xl font-medium leading-[1.35] text-[#40372f] sm:text-4xl lg:text-[42px]">
            تجربتك مع{" "}
            <span className="text-[#d8795e]">
              كوكب الصين
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786e65]">
            نؤمن أن أفضل خدمة تبدأ بفهم احتياجك بوضوح،
            ثم مساعدتك خطوة بخطوة.
          </p>
        </div>

        {/* TRUST POINTS */}
        <div className="mt-16 grid border-t border-[#e4dcd4] md:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="group border-b border-[#e4dcd4] px-7 py-10 text-center transition-colors duration-300 hover:bg-white/40 md:border-b-0 md:border-l md:last:border-l-0"
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
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#e4dcd4] pt-10 text-center sm:flex-row sm:text-right">
          <div>
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <span className="text-[10px] font-semibold tracking-[0.28em] text-[#c8bab0]">
                CHINA PLANET
              </span>

              <span className="h-px w-8 bg-[#d8795e]" />
            </div>

            <h3 className="mt-3 text-2xl font-medium text-[#40372f] sm:text-3xl">
              عندك هدف في الصين؟
            </h3>

            <p className="mt-2 text-sm text-[#786e65]">
              أخبرنا بما تحتاجه، ونبدأ معك من الخطوة الأولى.
            </p>
          </div>

          <a
            href="#contact"
            className="cp-button shrink-0"
          >
            ابدأ الآن
            <span className="mr-2 text-[#d8795e]">
              ←
            </span>
          </a>
        </div>

      </div>
    </section>
  );
}
