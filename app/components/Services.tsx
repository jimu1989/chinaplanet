"use client";

import Link from "next/link";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  GraduationCap,
  Plane,
  Ship,
} from "lucide-react";

export default function Services({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = translations[language].services;
  const isArabic = language === "ar";
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const services = [
    {
      number: "01",
      title: t.business.title,
      description: t.business.description,
      slug: "business",
      icon: BriefcaseBusiness,
      accent: "business",
    },
    {
      number: "02",
      title: t.travel.title,
      description: t.travel.description,
      slug: "travel",
      icon: Plane,
      accent: "travel",
    },
    {
      number: "03",
      title: t.study.title,
      description: t.study.description,
      slug: "study",
      icon: GraduationCap,
      accent: "study",
    },
    {
      number: "04",
      title: t.trade.title,
      description: t.trade.description,
      slug: "trade",
      icon: Ship,
      accent: "trade",
    },
  ];

  const heading =
    language === "ar"
      ? "كل ما تحتاجه من الصين في مكان واحد."
      : language === "zh"
        ? "您从中国所需要的一切，都在一个地方。"
        : "Everything you need from China, in one place.";

  const intro =
    language === "ar"
      ? "ابدأ من احتياجك. اختر المسار الأقرب لك، ودعنا نرتّب لك الخطوة التالية."
      : language === "zh"
        ? "从您的需求开始。选择最适合您的方向，我们会帮您规划下一步。"
        : "Start with what you need. Choose the path that fits you, and we’ll help with the next step.";

  const exploreText =
    language === "ar"
      ? "استكشف جميع الخدمات"
      : language === "zh"
        ? "查看全部服务"
        : "Explore all services";

  const actionText =
    language === "ar"
      ? "أحتاج هذه الخدمة"
      : language === "zh"
        ? "我需要这项服务"
        : "I need this service";

  return (
    <section
      id="services"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[var(--cp-ivory)] text-[var(--cp-brown)]"
    >
      {/* Soft editorial atmosphere */}
      <div className="pointer-events-none absolute -start-40 -top-40 h-[520px] w-[520px] rounded-full border border-[var(--cp-red)]/[0.045]" />
      <div className="pointer-events-none absolute -end-48 bottom-[-250px] h-[620px] w-[620px] rounded-full border border-[var(--cp-gold)]/[0.06]" />

      <div className="cp-editorial-container relative">
        {/* =====================================================
            HEADER
           ===================================================== */}
        <div className="grid gap-10 py-24 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-36">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-[var(--cp-red)]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--cp-muted-light)]">
                {t.label}
              </span>
            </div>

            <h2 className="mt-7 max-w-6xl text-[clamp(3.2rem,6.8vw,7.4rem)] font-medium leading-[0.9] tracking-[-0.065em]">
              {heading}
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-10" : "lg:pl-10"}>
            <p className="max-w-md text-base leading-8 text-[var(--cp-muted)] sm:text-lg">
              {intro}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-[9px] font-semibold tracking-[0.28em] text-[var(--cp-muted-light)]">
                CHINA PLANET
              </span>

              <span className="h-px w-10 bg-[var(--cp-line-dark)]" />

              <span className="text-[9px] tracking-[0.22em] text-[var(--cp-muted-light)]">
                01 — 04
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            EASY SERVICE CHOICES
           ===================================================== */}
        <div className="border-t border-[var(--cp-line)]">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.slug}
                href={`/${language}/services/${service.slug}`}
                className="group relative block border-b border-[var(--cp-line)] bg-[var(--cp-white)] transition-colors duration-500 hover:bg-[#fbf9f5]"
              >
                <div className="mx-auto grid min-h-[190px] max-w-[1380px] items-center gap-7 px-5 py-7 sm:px-8 sm:py-9 lg:grid-cols-[100px_72px_minmax(0,1fr)_220px] lg:px-12">
                  {/* Number */}
                  <span className="text-[11px] font-semibold tracking-[0.22em] text-[var(--cp-muted-light)]">
                    {service.number}
                  </span>

                  {/* Icon */}
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--cp-line-dark)] text-[var(--cp-brown)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[var(--cp-red)] group-hover:text-[var(--cp-red)]">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>

                  {/* Text */}
                  <div className="min-w-0">
                    <div className="mb-4 h-px w-8 bg-[var(--cp-red)] transition-all duration-500 group-hover:w-16" />

                    <h3 className="text-[clamp(1.8rem,3vw,3.1rem)] font-medium leading-none tracking-[-0.045em] text-[var(--cp-brown)]">
                      {service.title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--cp-muted)]">
                      {service.description}
                    </p>
                  </div>

                  {/* Direct action */}
                  <div className="flex items-center justify-between lg:justify-end">
                    <span className="text-[10px] font-semibold text-[var(--cp-muted)] transition-colors duration-300 group-hover:text-[var(--cp-red)]">
                      {actionText}
                    </span>

                    <span className="ms-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--cp-line-dark)] text-[var(--cp-brown)] transition-all duration-500 group-hover:border-[var(--cp-red)] group-hover:bg-[var(--cp-red)] group-hover:text-white">
                      <ArrowIcon size={17} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>

                {/* Hover accent */}
                <span className="absolute bottom-0 start-0 h-[2px] w-0 bg-[var(--cp-red)] transition-all duration-700 group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM CTA
           ===================================================== */}
        <div className="flex flex-col gap-7 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[clamp(1.45rem,2.7vw,2.5rem)] font-medium leading-[1.05] tracking-[-0.04em] text-[var(--cp-brown)]">
              {language === "ar"
                ? "ما تعرف وش يناسبك؟ نبدأ معك من احتياجك."
                : language === "zh"
                  ? "不确定哪项服务适合您？从您的需求开始，我们一起找到答案。"
                  : "Not sure what fits? We’ll start with what you need."}
            </p>
          </div>

          <Link
            href={`/${language}/services`}
            className="group inline-flex w-fit shrink-0 items-center gap-5 rounded-full border border-[var(--cp-brown)] bg-transparent px-7 py-4 text-sm font-semibold text-[var(--cp-brown)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cp-red)] hover:bg-[var(--cp-red)] hover:text-white"
          >
            {exploreText}

            <ArrowIcon
              size={17}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
