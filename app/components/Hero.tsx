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
      title: "اكتشف الصين",
      highlight: "بطريقة مختلفة",
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
    },
    en: {
      eyebrow: "CHINA PLANET / 01",
      title: "Discover China",
      highlight: "Differently",
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
    },
    zh: {
      eyebrow: "CHINA PLANET / 01",
      title: "探索中国",
      highlight: "从不同的角度",
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
    },
  }[language];

  return (
    <section
      id="home"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-hero min-h-[760px] pt-[76px]"
    >
      <div className="cp-atmosphere" aria-hidden="true">
        <div className="cp-atmosphere-red" />
        <div className="cp-atmosphere-gold" />
        <div className="cp-grid" />
      </div>

      <div className="cp-container relative flex min-h-[684px] items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* COPY */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3">
              <span className="cp-line" />
              <span className="cp-label">{content.eyebrow}</span>
            </div>

            <div className="mt-8">
              <h1 className="max-w-[760px] text-[clamp(3.7rem,8vw,7.6rem)] font-medium leading-[0.96] tracking-[-0.055em] text-[#332d28]">
                {content.title}
                <span className="block text-[#c94a3d]">
                  {content.highlight}
                </span>
              </h1>
            </div>

            <p className="mt-8 max-w-[590px] text-base leading-8 text-[#786e65] sm:text-lg">
              {content.description}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#services" className="cp-button">
                {content.primary}
                <span className={isArabic ? "mr-2" : "ml-2"}>
                  {isArabic ? "←" : "→"}
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cp-link-line text-xs font-semibold text-[#554d46] transition-colors hover:text-[#c94a3d]"
              >
                {content.secondary}
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#ded6ce] pt-6 text-[10px] font-medium uppercase tracking-[0.12em] text-[#8a8078]">
              <span>{content.travel}</span>
              <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />
              <span>{content.business}</span>
              <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />
              <span>{content.study}</span>
              <span className="h-1 w-1 rounded-full bg-[#c94a3d]" />
              <span>{content.trade}</span>
            </div>
          </motion.div>

          {/* VISUAL */}
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
            <div className="relative mx-auto aspect-[0.82] w-full max-w-[500px] overflow-hidden rounded-[2px] border border-white/70 bg-[#e9e1d8] shadow-[0_35px_100px_rgba(50,40,30,0.14)]">
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
                sizes="(max-width: 1024px) 90vw, 500px"
                className="object-cover object-center transition-transform duration-[1800ms] ease-out hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1814]/45 via-transparent to-white/5" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/65">
                      {content.label}
                    </p>

                    <p className="mt-2 text-xl font-medium">
                      {content.location}
                    </p>
                  </div>

                  <span className="text-[10px] tracking-[0.2em] text-white/60">
                    01
                  </span>
                </div>
              </div>
            </div>

            {/* FLOATING LABEL */}
            <motion.div
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 left-5 z-20 hidden border border-[#e0d5c8] bg-[#fffdf9]/90 px-5 py-4 shadow-[0_18px_50px_rgba(50,40,30,0.1)] backdrop-blur-md sm:block"
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#c94a3d]">
                CHINA / 01
              </p>
              <p className="mt-1 text-xs text-[#786e65]">
                {content.label}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* LOWER EDGE */}
      <div className="cp-container pb-7">
        <div className="flex items-center justify-between border-t border-[#ded6ce] pt-5 text-[9px] uppercase tracking-[0.25em] text-[#9a9087]">
          <span>China Planet</span>
          <Link
            href={`/${language}/destinations`}
            className="cp-link-line"
          >
            {isArabic ? "الوجهات" : language === "zh" ? "目的地" : "Destinations"}
          </Link>
        </div>
      </div>
    </section>
  );
}
