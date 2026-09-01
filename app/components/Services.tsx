import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import InteractiveArrow from "./InteractiveArrow";
import ServiceCardMotion from "./motion/ServiceCardMotion";

const icons = [
  <svg
    key="business"
    viewBox="0 0 64 64"
    fill="none"
    className="h-9 w-9"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <rect x="10" y="18" width="44" height="34" rx="2" />
    <path d="M24 18V12C24 10.9 24.9 10 26 10H38C39.1 10 40 10.9 40 12V18" />
    <path d="M10 31H54" />
    <path d="M27 31V36H37V31" />
  </svg>,

  <svg
    key="travel"
    viewBox="0 0 64 64"
    fill="none"
    className="h-9 w-9"
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
    className="h-9 w-9"
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
    key="trade"
    viewBox="0 0 64 64"
    fill="none"
    className="h-9 w-9"
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
    <path d="M8 16L16 10L24 16" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M40 16L48 10L56 16" strokeLinecap="round" strokeLinejoin="round" />
  </svg>,
];

export default function Services({ language = "ar" }: { language?: Language }) {
  const t = translations[language].services;
  const isArabic = language === "ar";

  const services = [
    {
      number: "01",
      title: t.business.title,
      description: t.business.description,
      icon: icons[0],
    },
    {
      number: "02",
      title: t.travel.title,
      description: t.travel.description,
      icon: icons[1],
    },
    {
      number: "03",
      title: t.study.title,
      description: t.study.description,
      icon: icons[2],
    },
    {
      number: "04",
      title: t.trade.title,
      description: t.trade.description,
      icon: icons[3],
    },
  ];

  return (
    <section
      id="services"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-editorial-section relative overflow-hidden bg-[#f8f6f2]"
    >
      <div className="pointer-events-none absolute -right-40 top-0 h-[420px] w-[420px] rounded-full border border-[#c94a3d]/[0.07]" />
      <div className="pointer-events-none absolute -right-24 top-16 h-[260px] w-[260px] rounded-full border border-[#c94a3d]/[0.06]" />

      <div className="cp-editorial-container relative mx-auto w-full max-w-[1250px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c94a3d]" />
              <span className="cp-label">{t.label}</span>
            </div>

            <h2 className="mt-6 max-w-[600px] text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-[#40372f]">
              {t.title}
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-16" : "lg:pl-16"}>
            <p className="cp-editorial-copy max-w-[620px] text-sm leading-8 text-[#786e65] md:text-base">
              {t.description}
            </p>
          </div>
        </div>

        <div className="mt-20 border-t border-[#ded6ce]">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCardMotion key={service.title}>
                <article
                  className={[
                    "group relative min-h-[390px] overflow-hidden border-b border-[#ded6ce] px-7 py-8 transition-all duration-700",
                    "hover:bg-[#fffdf9]",
                    index > 0 ? "lg:border-s" : "",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full border border-[#c94a3d]/0 transition-all duration-700 group-hover:border-[#c94a3d]/10" />

                  <div className="relative flex items-start justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-[#9a9087]">
                      {service.number}
                    </span>

                    <div className="text-[#b5966c] transition-all duration-700 group-hover:-translate-y-2 group-hover:text-[#c94a3d]">
                      {service.icon}
                    </div>
                  </div>

                  <div className="relative mt-24">
                    <div className="mb-6 h-px w-8 bg-[#c94a3d] transition-all duration-700 group-hover:w-14" />

                    <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[#40372f] md:text-[27px]">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-[245px] text-sm leading-7 text-[#786e65]">
                      {service.description}
                    </p>

                    <a
                      href="#contact"
                      className="mt-8 inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.14em] text-[#554d46] transition-colors duration-500 group-hover:text-[#c94a3d]"
                    >
                      {t.more}
                      <InteractiveArrow
                        size={15}
                        className="h-6 w-6 text-[#c94a3d] transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </a>
                  </div>

                  <span
                    className={[
                      "pointer-events-none absolute bottom-4 text-[72px] font-semibold leading-none tracking-[-0.08em] text-[#40372f]/[0.035] transition-all duration-700 group-hover:text-[#c94a3d]/[0.07]",
                      isArabic ? "left-5" : "right-5",
                    ].join(" ")}
                  >
                    {service.number}
                  </span>
                </article>
              </ServiceCardMotion>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <a
            href="#contact"
            className="cp-editorial-button group inline-flex items-center gap-4"
          >
            {t.explore}
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              {isArabic ? "←" : "→"}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
