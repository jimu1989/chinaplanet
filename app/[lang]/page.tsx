import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Hero from "../components/Hero";
import Services from "../components/Services";
import Destinations from "../components/Destinations";
import Goals from "../components/Goals";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import {
  isLanguage,
  languages,
  type Language,
} from "../lib/i18n";

const baseUrl = "https://chinaplanet.vercel.app";

const seo = {
  ar: {
    title: "الصين كوكب | السفر والسياحة والدراسة والتجارة في الصين",
    description:
      "الصين كوكب يساعدك في السفر إلى الصين والسياحة والدراسة والتجارة والاستيراد والتعامل مع المصانع والأسواق الصينية.",
  },
  en: {
    title: "China Planet | Travel, Study, Trade & Business in China",
    description:
      "China Planet helps you travel, study, trade, import, and build business opportunities with China.",
  },
  zh: {
    title: "中国星球 | 中国旅游、留学、贸易与商业服务",
    description:
      "中国星球为您提供中国旅游、留学、贸易、进口、工厂和商业机会相关服务。",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({
    lang,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const language: Language = lang;
  const current = seo[language];

  return {
    title: current.title,
    description: current.description,
    alternates: {
      canonical: `${baseUrl}/${language}`,
      languages: {
        "ar-SA": `${baseUrl}/ar`,
        en: `${baseUrl}/en`,
        zh: `${baseUrl}/zh`,
        "x-default": `${baseUrl}/ar`,
      },
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${language}`,
      title: current.title,
      description: current.description,
      siteName: "China Planet",
      locale:
        language === "ar"
          ? "ar_SA"
          : language === "zh"
            ? "zh_CN"
            : "en_US",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  const language: Language = lang;

  return (
    <>

      <main>
        {/* 01 — HERO */}
        <Hero language={language} />

        {/* 02 — INTRO / SERVICES */}
        <Services language={language} />

        {/* 03 — DESTINATIONS */}
        <Destinations language={language} />

        {/* 04 — WHY CHINA PLANET */}

        {/* 05 — EXPERIENCE / PROCESS */}
        <Goals language={language} />

        {/* 06 — TESTIMONIALS */}
        <Testimonials language={language} />

        {/* 07 — CONTACT / CTA */}
        <Contact language={language} />
      </main>

      <Footer language={language} />
    </>
  );
}
