"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Language } from "../lib/i18n";
import { siteConfig } from "../lib/site";

interface HeroProps {
  language: Language;
}

const content = {
  ar: {
    title: "الصين؟",
    highlight: "كوكب الصين يقرّبها لك.",
    description:
      "من السعودية إلى الصين، نختصر عليك الطريق بخبرة محلية، علاقات موثوقة، وخدمات مصممة لتوصلك إلى فرص حقيقية.",
    primary: "اكتشف خدماتنا",
    secondary: "تحدث معنا",
    scroll: "اكتشف المزيد",
  },
  en: {
    title: "China?",
    highlight: "China Planet brings it closer.",
    description:
      "From Saudi Arabia to China, we shorten the distance between you and real opportunities through local expertise, trusted connections, and tailored services.",
    primary: "Explore services",
    secondary: "Talk to us",
    scroll: "Discover more",
  },
  zh: {
    title: "中国？",
    highlight: "中国星球，让中国更近。",
    description:
      "从沙特到中国，我们用本地经验、可靠资源和专业服务，为你连接真正值得把握的机会。",
    primary: "探索服务",
    secondary: "联系我们",
    scroll: "探索更多",
  },
};

export default function Hero({ language }: HeroProps) {
  const isArabic = language === "ar";
  const t = content[language];

  const whatsappMessages = {
    ar: "مرحباً، أريد الاستفسار عن خدمات China Planet",
    en: "Hello, I would like to inquire about China Planet services",
    zh: "你好，我想咨询 China Planet 的服务",
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    whatsappMessages[language],
  )}`;

  return (
    <section
      id="home"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-[#17120f] text-white"
    >
      {/* CINEMATIC INTRO */}
      <motion.div
        initial={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        animate={{
          opacity: 0,
          scale: 1.06,
          filter: "blur(18px)",
        }}
        transition={{
          delay: 1.8,
          duration: 1.5,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="pointer-events-none absolute inset-0 z-50"
      >
        <Image
          src="/images/hero-china.png"
          alt="China Planet"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/30" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-x-0 top-[30%] flex justify-center"
        >
          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            width={220}
            height={220}
            className="h-auto w-[150px] object-contain drop-shadow-[0_12px_35px_rgba(0,0,0,0.35)] sm:w-[190px]"
          />
        </motion.div>

        {/* Intro label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-3 whitespace-nowrap text-[9px] uppercase tracking-[0.32em] text-white/70">
            <span className="h-px w-8 bg-white/50" />
            China Planet
            <span className="h-px w-8 bg-white/50" />
          </div>
        </motion.div>
      </motion.div>

      {/* BLURRED BACKGROUND */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-china.png"
          alt=""
          fill
          priority
          className="scale-110 object-cover blur-[14px]"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[#241914]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1380px] px-6 py-32 sm:px-10 lg:px-16">
          <div className="max-w-4xl">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.7,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-[#c96b52]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/65">

              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 2.85,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-balance text-[clamp(3.5rem,8vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.055em]"
            >
              {t.title}
              <br />

              <span className="font-serif italic text-[#d9876e]">
                {t.highlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.1,
                duration: 0.8,
              }}
              className="mt-9 max-w-xl text-base leading-8 text-white/65 sm:text-lg"
            >
              {t.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.3,
                duration: 0.8,
              }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#services"
                className="group inline-flex items-center gap-5 border border-[#c96b52] bg-[#c96b52] px-7 py-4 text-sm font-medium text-white transition-all duration-500 hover:bg-transparent"
              >
                {t.primary}

                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-4 border border-white/20 bg-white/5 px-7 py-4 text-sm text-white/85 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/10"
              >
                {t.secondary}

                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </motion.div>
          </div>

          {/* Bottom line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 3.6,
              duration: 1,
            }}
            className="absolute bottom-8 left-6 right-6 flex items-end justify-between border-t border-white/10 pt-5 sm:left-10 sm:right-10 lg:left-16 lg:right-16"
          >
            <div className="text-[9px] uppercase tracking-[0.28em] text-white/40">
              Saudi Arabia × China
            </div>

            <Link
              href={`/${language}/destinations`}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/55 transition-colors hover:text-white"
            >
              {t.scroll}

              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  );
}
