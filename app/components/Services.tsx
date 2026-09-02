import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import Link from "next/link";
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
];

export default function Services({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = translations[language].services;
  const isArabic = language === "ar";

  const services = [
    {
      number: "01",
      title: t.business.title,
      description: t.business.description,
      icon: icons[0],
      slug: "business",
    },
    {
      number: "02",
      title: t.travel.title,
      description: t.travel.description,
      icon: icons[1],
      slug: "travel",
    },
    {
      number: "03",
      title: t.study.title,
      description: t.study.description,
      icon: icons[2],
      slug: "study",
    },
    {
      number: "04",
      title: t.trade.title,
      description: t.trade.description,
      icon: icons[3],
      slug: "trade",
    },
  ];

  return (
    <section
      id="services"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-editorial-section cp-section-atmosphere"
    >
      <div className="cp-editorial-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="cp-editorial-kicker">
              <span>{t.label}</span>
            </div>

            <h2 className="cp-editorial-heading mt-6 max-w-3xl">
              <span className="block">
                {language === "ar"
                  ? "كل ما تحتاجه"
                  : language === "zh"
                    ? "您所需要的"
                    : "Everything you need"}
              </span>

              <span className="cp-editorial-accent block">
                {language === "ar"
                  ? "في مكان واحد."
                  : language === "zh"
                    ? "尽在这里。"
                    : "In one place."}
              </span>
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-16" : "lg:pl-16"}>
            <p className="cp-editorial-copy max-w-xl">
              {t.description}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--cp-red)]" />
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--cp-muted-light)]">
                CHINA PLANET
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--cp-line)]">
          <div className="grid lg:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCardMotion key={service.slug}>
                <Link
                  href={`/${language}/services/${service.slug}`}
                  className={[
                    "group relative block min-h-[360px] overflow-hidden border-b border-[var(--cp-line)] px-6 py-8 transition-all duration-700 sm:px-8 sm:py-10",
                    index % 2 === 1 ? "lg:border-s" : "",
                    "hover:bg-[var(--cp-white)]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "pointer-events-none absolute bottom-0 text-[150px] font-semibold leading-none tracking-[-0.1em] text-[var(--cp-brown)]/[0.035] transition-all duration-700",
                      isArabic ? "left-4" : "right-4",
                      "group-hover:text-[var(--cp-red)]/[0.06]",
                    ].join(" ")}
                  >
                    {service.number}
                  </span>

                  <div className="relative flex items-start justify-between">
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--cp-muted-light)]">
                      {service.number}
                    </span>

                    <div className="flex h-12 w-12 items-center justify-center border border-[var(--cp-line)] text-[var(--cp-gold)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[var(--cp-red)] group-hover:text-[var(--cp-red)]">
                      {service.icon}
                    </div>
                  </div>

                  <div className="relative mt-20 max-w-xl">
                    <span className="mb-6 block h-px w-8 bg-[var(--cp-red)] transition-all duration-500 group-hover:w-14" />

                    <h3 className="text-3xl font-semibold tracking-[-0.045em] text-[var(--cp-brown)] sm:text-4xl">
                      {service.title}
                    </h3>

                    <p className="mt-5 max-w-lg text-sm leading-8 text-[var(--cp-muted)]">
                      {service.description}
                    </p>

                    <div className="mt-8 inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.18em] text-[var(--cp-brown)] transition-colors duration-500 group-hover:text-[var(--cp-red)]">
                      <span>{t.more}</span>

                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {isArabic ? "←" : "→"}
                      </span>
                    </div>
                  </div>
                </Link>
              </ServiceCardMotion>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-[var(--cp-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-[var(--cp-muted-light)]">
            {language === "ar"
              ? "من أول خطوة إلى آخر التفاصيل، نرتّب لك الطريق."
              : language === "zh"
                ? "从第一步到最后一个细节，我们为您梳理整个过程。"
                : "From the first step to the final detail, we make the journey clearer."}
          </p>

          <Link
            href={`/${language}/services`}
            className="cp-editorial-button inline-flex w-fit items-center gap-4"
          >
            {t.explore}
            <span>{isArabic ? "←" : "→"}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
