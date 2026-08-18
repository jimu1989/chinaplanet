import { notFound } from "next/navigation";
import HomePage from "../page";
import { isLanguage, languages } from "../lib/i18n";

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
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

  return <HomePage language={lang} />;
}
