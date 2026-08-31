import WhyUs from "../../components/WhyUs";
import type { Language } from "../../lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;

  return <WhyUs language={lang} />;
}
