import WhyUs from "../../components/WhyUs";
import Navbar from "../../components/Navbar";
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
      <Navbar language={lang} />

      <main>
        <WhyUs language={lang} />
      </main>

      <Footer language={lang} />
    </>
  );
}
