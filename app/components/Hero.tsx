"use client";

import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import Image from "next/image";
import { siteConfig } from "../lib/site";

export default function Hero({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = translations[language];
  const isArabic = language === "ar";

  const whatsappMessages: Record<Language, string> = {
    ar: "السلام عليكم، أرغب في التواصل مع كوكب الصين والاستفسار عن خدماتكم.",
    en: "Hello, I would like to contact China Planet and learn more about your services.",
    zh: "您好，我想联系中国星球并了解贵公司的服务。",
  };

  const whatsappUrl = `https://wa.me/${
    siteConfig.contact.whatsapp
  }?text=${encodeURIComponent(whatsappMessages[language])}`;

  const heroTitle: Record<Language, string> = {
    ar: "كوكب الصين",
    en: "China Planet",
    zh: "中国星球",
  };

  const heroSubtitle: Record<Language, string> = {
    ar: "أقرب مما تتخيل",
    en: "Closer Than You Imagine",
    zh: "比您想象的更近",
  };

  const heroTrust: Record<
    Language,
    {
      location: string;
      audience: string;
      services: string;
    }
  > = {
    ar: {
      location: "السعودية والصين",
      audience: "للأفراد والشركات",
      services: "خدمات متكاملة",
    },
    en: {
      location: "Saudi Arabia & China",
      audience: "For Individuals & Businesses",
      services: "Integrated Services",
    },
    zh: {
      location: "沙特阿拉伯与中国",
      audience: "面向个人与企业",
      services: "一站式综合服务",
    },
  };

  const trust = heroTrust[language];

  return (
    <>
      {/* HERO */}
      <section
        id="home"
        dir={isArabic ? "rtl" : "ltr"}
        className="relative h-[calc(100vh-80px)] min-h-[650px] overflow-hidden bg-[#f8f6f2]"
      >
        <Image
          src="/images/hero-china.png"
          alt={
            language === "ar"
              ? "منظر هادئ من الصين"
              : language === "zh"
                ? "中国宁静的风景"
                : "A peaceful view of China"
          }
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

        <div className="absolute left-1/2 top-[25%] z-10 -translate-x-1/2">
          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            width={220}
            height={80}
            priority
            className="h-auto w-[150px] object-contain sm:w-[180px] lg:w-[220px]"
          />
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[8px] font-semibold tracking-[0.4em] text-white/80">
            SCROLL
          </span>

          <span className="h-10 w-px bg-gradient-to-b from-white/80 to-transparent" />
        </div>
      </section>

      {/* CONTENT BELOW HERO */}
      <section
        dir={isArabic ? "rtl" : "ltr"}
        className="bg-[#f8f6f2] px-6 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1200px] text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/china-planet-logo.png"
              alt="China Planet"
              width={180}
              height={65}
              className="h-[65px] w-[180px] object-contain"
            />
          </div>

          <div className="mx-auto max-w-[850px]">
            <h1 className="text-[clamp(3.2rem,7vw,7rem)] font-medium leading-[1.05] text-[#171717]">
              {heroTitle[language]}
            </h1>

            <p className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight text-[#746a62]">
              {heroSubtitle[language]}
            </p>
          </div>

          <p className="mx-auto mt-9 max-w-[650px] text-base leading-9 text-[#665d55] sm:text-lg">
            {t.hero.description}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#services"
              className="cp-button min-w-[155px]"
            >
              {t.services.explore}

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

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#50473f] transition-colors duration-300 hover:text-[#d8795e]"
            >
              {t.contact.label}
            </a>
          </div>

          <div className="mx-auto mt-14 flex max-w-[850px] flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-[#ded6ce] pt-7 text-[10px] text-[#8a8078]">
            <span>{trust.location}</span>

            <span className="h-1 w-1 rounded-full bg-[#d8795e]/70" />

            <span>{trust.audience}</span>

            <span className="h-1 w-1 rounded-full bg-[#d8795e]/70" />

            <span>{trust.services}</span>
          </div>
        </div>
      </section>
    </>
  );
}