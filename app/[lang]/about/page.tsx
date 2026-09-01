import WhyUs from "../../components/WhyUs";
import Footer from "../../components/Footer";
import type { Language } from "../../lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;

  return (
    <>

      <main>
        <WhyUs language={lang} />
      </main>

      <Footer language={lang} />
    </>
  );
}
