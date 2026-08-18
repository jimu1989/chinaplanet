import type { Language } from "../lib/i18n";
const services = [
  {
    title: "حلول الأعمال",
    description:
      "نساعدك على بناء علاقات وفرص أعمال موثوقة في السوق الصيني.",
    icon: (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="h-10 w-10"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="10" y="18" width="44" height="34" rx="2" />
        <path d="M24 18V12C24 10.9 24.9 10 26 10H38C39.1 10 40 10.9 40 12V18" />
        <path d="M10 31H54" />
        <path d="M27 31V36H37V31" />
      </svg>
    ),
  },

  {
    title: "السفر والسياحة",
    description:
      "تجارب سفر مصممة بعناية لاكتشاف الصين بطريقة مريحة ومميزة.",
    icon: (
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
  },

  {
    title: "الدراسة واللغة",
    description:
      "مساعدة في الدراسة والجامعات وتعلّم اللغة الصينية.",
    icon: (
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
  },

  {
    title: "التجارة والتوريد",
    description:
      "نربطك بالمصانع والفرص التجارية المناسبة في الصين.",
    icon: (
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
  },
];

export default function Services({
  language = "ar",
}: {
  language?: Language;
}) {
  return (
    <section
      id="services"
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="/images/china-planet-logo.png"
              alt="China Planet"
              className="h-auto w-[140px] object-contain"
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />

            <span className="cp-label">
              ماذا نقدم
            </span>

            <span className="cp-line" />
          </div>

          <h2 className="cp-title mt-5 text-3xl sm:text-4xl lg:text-[42px]">
            شريكك الموثوق في الصين
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786e65]">
            خدمات واضحة ومدروسة تساعد الأفراد والشركات
            على الوصول إلى الصين بثقة.
          </p>
        </div>

        <div className="mt-16 grid border-t border-[#e5ddd5] md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group border-b border-[#e5ddd5] px-6 py-10 text-center transition-all duration-300 md:border-l md:last:border-l-0 lg:border-b-0"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center text-[#b5966c] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#d8795e]">
                {service.icon}
              </div>

              <div className="mx-auto mt-5 h-px w-8 bg-[#d8795e] transition-all duration-300 group-hover:w-12" />

              <h3 className="mt-5 text-[17px] font-semibold text-[#40372f]">
                {service.title}
              </h3>

              <p className="mx-auto mt-3 max-w-[220px] text-xs leading-7 text-[#786e65]">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold text-[#574d45] transition-colors duration-300 group-hover:text-[#d8795e]"
              >
                تعرف أكثر

                <span className="text-[#d8795e] transition-transform duration-300 group-hover:-translate-x-1">
                  ←
                </span>
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="cp-button">
            استكشف خدماتنا
          </a>
        </div>

      </div>
    </section>
  );
}
