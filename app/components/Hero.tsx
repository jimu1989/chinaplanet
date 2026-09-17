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
    more: "اكتشف المزيد",
    label: "السعودية × الصين",
    orbit: "CHINA PLANET",
    since: "2006 — الآن",
  },

  en: {
    title: "China?",
    highlight: "China Planet brings it closer.",
    description:
      "From Saudi Arabia to China, we shorten the distance between you and real opportunities through local expertise, trusted connections, and tailored services.",
    primary: "Explore services",
    secondary: "Talk to us",
    more: "Discover more",
    label: "Saudi Arabia × China",
    orbit: "CHINA PLANET",
    since: "2006 — NOW",
  },

  zh: {
    title: "中国？",
    highlight: "中国星球，让中国更近。",
    description:
      "从沙特到中国，我们用本地经验、可靠资源和专业服务，为你连接真正值得把握的机会。",
    primary: "探索服务",
    secondary: "联系我们",
    more: "探索更多",
    label: "沙特 × 中国",
    orbit: "CHINA PLANET",
    since: "2006 — 至今",
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

  const whatsappUrl = `https://wa.me/${
    siteConfig.contact.whatsapp
  }?text=${encodeURIComponent(whatsappMessages[language])}`;

  return (
    <section
      id="home"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-[#17120f] text-white"
    >
      {/* =========================================================
          BACKGROUND
         ========================================================= */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-china-blur.jpg"
          alt=""
          fill
          priority
          quality={72}
          sizes="100vw"
          className="object-cover"
        />

        {/* Readability layers */}
        <div className="absolute inset-0 bg-black/42" />
        <div className="absolute inset-0 bg-[#241914]/18" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/85" />

        {/* Subtle radial light around content */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_48%,rgba(201,74,61,0.08),transparent_34%)]" />
      </div>

      {/* =========================================================
          CINEMATIC INTRO
         ========================================================= */}
      <motion.div
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: 0,
          pointerEvents: "none",
        }}
        transition={{
          delay: 0.15,
          duration: 0.65,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-0 z-50 flex items-center justify-center bg-[#17120f]"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.86,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.95,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative flex h-[180px] w-[180px] items-center justify-center sm:h-[220px] sm:w-[220px]"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border border-[#c96b52]/30"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[16px] rounded-full border border-transparent border-t-[#c96b52] border-r-[#d6bd94]/60"
          />

          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            width={230}
            height={230}
            priority
            className="relative z-10 h-auto w-[125px] object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:w-[155px]"
          />
        </motion.div>
      </motion.div>

      {/* =========================================================
          MAIN CONTENT
         ========================================================= */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto w-full max-w-[1480px] px-6 py-28 sm:px-10 lg:px-16">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.48fr)] lg:gap-16">
            {/* ===================================================
                TEXT SIDE
               =================================================== */}
            <div className="max-w-5xl">
              {/* Brand context */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 2.2,
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-7 flex items-center gap-4"
              >
                <span className="h-px w-12 bg-[#c96b52]" />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
                  {t.label}
                </span>
              </motion.div>

              {/* Main title */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-balance text-[clamp(3.6rem,7.4vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.06em]"
              >
                {t.title}

                <br />

                <span className="font-serif italic text-[#d9876e]">
                  {t.highlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.65,
                  duration: 0.55,
                }}
                className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
              >
                {t.description}
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.55,
                }}
                className="mt-9 flex flex-wrap items-center gap-3"
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

            {/* ===================================================
                LOGO / ORBIT SIDE
               =================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                x: isArabic ? -30 : 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto flex h-[340px] w-full max-w-[410px] items-center justify-center lg:h-[500px]"
            >
              {/* Large outer orbit */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[275px] w-[275px] rounded-full border border-white/10 sm:h-[340px] sm:w-[340px] lg:h-[425px] lg:w-[425px]"
              />

              {/* Main elegant orbit */}
              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[225px] w-[225px] rounded-full border border-transparent border-t-[#c96b52] border-r-[#c96b52]/65 border-b-[#d6bd94]/20 sm:h-[285px] sm:w-[285px] lg:h-[355px] lg:w-[355px]"
              />

              {/* Moving orbit point */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[225px] w-[225px] sm:h-[285px] sm:w-[285px] lg:h-[355px] lg:w-[355px]"
              >
                <span className="absolute left-1/2 top-[-2px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#d6bd94] shadow-[0_0_20px_rgba(214,189,148,0.7)]" />
              </motion.div>

              {/* Soft glow behind logo */}
              <div className="absolute h-[190px] w-[190px] rounded-full bg-[#c96b52]/[0.09] blur-3xl sm:h-[235px] sm:w-[235px] lg:h-[290px] lg:w-[290px]" />

              {/* Logo chamber */}
              <div className="relative flex h-[160px] w-[160px] items-center justify-center rounded-full border border-[#d6bd94]/35 bg-[#17120f]/48 shadow-[0_35px_100px_rgba(0,0,0,0.45)] backdrop-blur-md sm:h-[190px] sm:w-[190px] lg:h-[225px] lg:w-[225px]">
                <div className="absolute inset-[10px] rounded-full border border-white/10" />

                <div className="absolute inset-[18px] rounded-full border border-[#c96b52]/15" />

                <Image
                  src="/images/china-planet-logo.png"
                  alt="China Planet"
                  width={250}
                  height={250}
                  className="relative z-10 h-auto w-[92px] object-contain sm:w-[112px] lg:w-[135px]"
                />
              </div>

              {/* Orbit label */}
              <div className="absolute bottom-[4%] flex items-center gap-3 text-[9px] uppercase tracking-[0.28em] text-white/40">
                <span className="h-px w-7 bg-[#d6bd94]/45" />

                {t.orbit}

                <span className="h-px w-7 bg-[#d6bd94]/45" />
              </div>

              {/* Since label */}
              <span className="absolute right-[4%] top-[13%] text-[9px] uppercase tracking-[0.22em] text-white/30">
                {t.since}
              </span>
            </motion.div>
          </div>

          {/* ===================================================
              BOTTOM BAR
             =================================================== */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.0,
              duration: 0.6,
            }}
            className="mt-10 flex items-center justify-between border-t border-white/10 pt-5"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
              CHINA PLANET
            </span>

            <Link
              href={`/${language}/destinations`}
              className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
            >
              {t.more}

              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          GRAIN
         ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.028]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E\")",
        }}
      />
    </section>
  );
}
