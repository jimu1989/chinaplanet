"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Language } from "../lib/i18n";
import { siteConfig } from "../lib/site";

export default function Hero({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const whatsappMessages: Record<Language, string> = {
    ar: "السلام عليكم، أرغب في التواصل مع كوكب الصين والاستفسار عن خدماتكم.",
    en: "Hello, I would like to contact China Planet and learn more about your services.",
    zh: "您好，我想联系中国星球并了解贵公司的服务。",
  };

  const whatsappUrl =
    `https://wa.me/${siteConfig.contact.whatsapp}` +
    `?text=${encodeURIComponent(whatsappMessages[language])}`;

  const content = {
    ar: {
      eyebrow: "CHINA PLANET / 01",
      title: "اكتشف الصين.",
      highlight: "بطريقة مختلفة.",
      description:
        "من السفر والدراسة إلى التجارة والأعمال، نقرّب لك الصين ونحوّل الوصول إليها إلى تجربة واضحة وموثوقة.",
      primary: "اكتشف خدماتنا",
      secondary: "تحدث معنا",
      travel: "Travel",
      business: "Business",
      study: "Study",
      trade: "Trade",
      location: "السعودية × الصين",
      label: "بوابتك إلى الصين",
      destinations: "الوجهات",
    },
    en: {
      eyebrow: "CHINA PLANET / 01",
      title: "Discover China.",
      highlight: "Differently.",
      description:
        "From travel and study to trade and business, we make China easier to reach, understand, and experience.",
      primary: "Explore services",
      secondary: "Talk to us",
      travel: "Travel",
      business: "Business",
      study: "Study",
      trade: "Trade",
      location: "Saudi Arabia × China",
      label: "Your gateway to China",
      destinations: "Destinations",
    },
    zh: {
      eyebrow: "CHINA PLANET / 01",
      title: "探索中国。",
      highlight: "从不同的角度。",
      description:
        "从旅行、留学到贸易与商业，我们让您更轻松地了解中国、连接中国并开启新的机会。",
      primary: "探索服务",
      secondary: "联系我们",
      travel: "Travel",
      business: "Business",
      study: "Study",
      trade: "Trade",
      location: "沙特阿拉伯 × 中国",
      label: "您的中国门户",
      destinations: "目的地",
    },
  }[language];

  return (
    <section
      id="home"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-[#f8f6f2] text-[#40372f]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[520px] w-[520px] rounded-full border border-[#c94a3d]/10" />
        <div className="absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full border border-[#c94a3d]/10" />
        <div className="absolute bottom-[-240px] left-[-180px] h-[520px] w-[520px] rounded-full border border-[#b5966c]/10" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#40372f 1px, transparent 1px), linear-gradient(90deg, #40372f 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1320px] flex-col px-5 pb-7 pt-28 md:px-8 md:pt-32">
        <div className="flex flex-1 items-center py-12 md:py-16">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#c94a3d]" />
                <span className="text-[10px] font-semibold tracking-[0.28em] text-[#c94a3d]">
                  {content.eyebrow}
                </span>
              </div>

              <h1 className="mt-7 max-w-[900px] text-[clamp(4rem,8.5vw,8.2rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[#40372f]">
                {content.title}
                <span className="block text-[#c94a3d]">
                  {content.highlight}
                </span>
              </h1>

              <p className="mt-9 max-w-[590px] text-base leading-8 text-[#786e65] md:text-lg">
                {content.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-5">
                <a
                  href="#services"
                  className="group inline-flex min-h-12 items-center gap-4 rounded-full bg-[#c94a3d] px-7 text-[10px] font-semibold tracking-[0.12em] text-white transition-all duration-500 hover:-translate-y-1 hover:bg-[#a93c32] hover:px-9"
                >
                  {content.primary}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    {isArabic ? "←" : "→"}
                  </span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-[#554d46]"
                >
                  <span className="h-px w-7 bg-[#c94a3d] transition-all duration-500 group-hover:w-12" />
                  {content.secondary}
                </a>
              </div>

              <div className="mt-14 border-t border-[#ded6ce] pt-5">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8a8078]">
                  <span>{content.travel}</span>
                  <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />
                  <span>{content.business}</span>
                  <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />
                  <span>{content.study}</span>
                  <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />
                  <span>{content.trade}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.18,
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="relative mx-auto aspect-[0.82] w-full max-w-[510px] overflow-hidden bg-[#ddd6ce]">
                <Image
                  src="/images/hero-china.png"
                  alt={
                    language === "ar"
                      ? "منظر من الصين"
                      : language === "zh"
                        ? "中国风景"
                        : "A view of China"
                  }
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 510px"
                  className="object-cover object-center transition-transform duration-[1800ms] ease-out hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#201b17]/80 via-[#201b17]/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-[9px] font-semibold tracking-[0.3em] text-white/60">
                      CHINA PLANET
                    </span>
                    <span className="text-[10px] tracking-[0.2em] text-white/50">
                      01
                    </span>
                  </div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e8b2aa]">
                    {content.label}
                  </p>

                  <p className="mt-2 text-xl font-medium">
                    {content.location}
                  </p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute -bottom-5 z-20 hidden border border-[#e0d5c8] bg-[#fffdf9]/95 px-5 py-4 shadow-[0_18px_50px_rgba(50,40,30,0.1)] backdrop-blur-md sm:block ${
                  isArabic ? "right-5" : "left-5"
                }`}
              >
                <p className="text-[9px] font-semibold tracking-[0.25em] text-[#c94a3d]">
                  CHINA / 01
                </p>
                <p className="mt-1 text-xs text-[#786e65]">
                  {content.label}
                </p>
              </motion.div>

              <div
                className={`absolute -top-5 hidden h-20 w-20 border border-[#c94a3d]/20 sm:block ${
                  isArabic ? "-left-5" : "-right-5"
                }`}
              />
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#ded6ce] pt-5 text-[9px] uppercase tracking-[0.25em] text-[#9a9087]">
          <span>China Planet</span>
          <Link
            href={`/${language}/destinations`}
            className="group flex items-center gap-3 transition-colors hover:text-[#c94a3d]"
          >
            <span className="h-px w-6 bg-[#c94a3d] transition-all duration-500 group-hover:w-10" />
            {content.destinations}
          </Link>
        </div>
      </div>
    </section>
  );
}
