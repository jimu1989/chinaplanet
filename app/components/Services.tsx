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
      className="cp-section relative overflow-hidden bg-[#f7f3ec]"
    >
      <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-[#b94b3f]/[0.035] blur-3xl" />

      <div className="cp-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="cp-line" />
              <span className="cp-label">{t.label}</span>
            </div>

            <h2 className="cp-title mt-6 max-w-[520px] text-4xl sm:text-5xl lg:text-[58px]">
              {t.title}
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-12" : "lg:pl-12"}>
            <p className="max-w-[650px] text-sm leading-8 text-[#786e65] sm:text-base">
              {t.description}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-[#ded6ce]">
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCardMotion key={service.title}>
                <article
                  className={`group relative min-h-[350px] border-b border-[#ded6ce] px-7 py-9 transition-all duration-500 hover:bg-[#fffdf9] ${
                    index > 0 ? "lg:border-s" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[#a89c91]">
                      {service.number}
                    </span>

                    <div className="text-[#b5966c] transition-all duration-500 group-hover:-translate-y-1 group-hover:text-[#b94b3f]">
                      {service.icon}
                    </div>
                  </div>

                  <div className="mt-20">
                    <div className="mb-5 h-px w-7 bg-[#b94b3f] transition-all duration-500 group-hover:w-12" />

                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#40372f]">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-[230px] text-xs leading-7 text-[#786e65]">
                      {service.description}
                    </p>

                    <a
                      href="#contact"
                      className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold text-[#574d45] transition-colors duration-300 group-hover:text-[#b94b3f]"
                    >
                      {t.more}
                      <InteractiveArrow
                        size={15}
                        className="h-6 w-6 text-[#b94b3f]"
                      />
                    </a>
                  </div>
                </article>
              </ServiceCardMotion>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <a href="#contact" className="cp-button">
            {t.explore}
            <span className="text-[#b94b3f]">{isArabic ? "←" : "→"}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
