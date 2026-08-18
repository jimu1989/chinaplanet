import { notFound } from "next/navigation";
import HomePage from "../page";
import { isLanguage } from "../lib/i18n";

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    notFound();
  }

  return <HomePage />;
}
