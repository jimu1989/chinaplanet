import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLanguage, languages } from "../lib/i18n";

export const metadata: Metadata = {
  title: "كوكب الصين | China Planet",
  description:
    "نقرّب لك الصين، من السفر والدراسة واللغة إلى التجارة والأعمال.",
};

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  return (
    <div lang={lang} dir={languages[lang].dir}>
      {children}
    </div>
  );
}
