import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "../../components/Footer";
import type { Language } from "../../lib/i18n";
import { isLanguage, languages } from "../../lib/i18n";
import Services from "../../components/Services";

const seo = {
  ar: {
    title: "خدماتنا | كوكب الصين",
    description:
      "اكتشف خدمات كوكب الصين في السفر والدراسة والتجارة والاستيراد والتوريد والتعامل مع السوق الصيني.",
  },
  en: {
    title: "Our Services | China Planet",
    description:
      "Discover China Planet services for travel, study, trade, import, sourcing, and business in China.",
  },
  zh: {
    title: "我们的服务 | 中国星球",
    description:
      "了解中国星球提供的中国旅行、留学、贸易、进口、采购及商业服务。",
  },
} as const;

export async function generateStaticParams() {
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

  return {
    title: seo[lang].title,
    description: seo[lang].description,
  };
}

export default async function ServicesPage({
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

      <main className="pt-[76px]">
        <Services language={language} />
      </main>

      <Footer language={language} />
    </>
  );
}
