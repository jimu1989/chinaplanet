import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLanguage, languages } from "../lib/i18n";

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
    title: "كوكب الصين",
    description:
      "نقرّب لك الصين، من السفر والدراسة واللغة إلى التجارة والأعمال.",
  };
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
    <html lang={lang} dir={languages[lang].dir}>
      <body>{children}</body>
    </html>
  );
}
