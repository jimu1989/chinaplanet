import { notFound } from "next/navigation";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import WhyUs from "../components/WhyUs";
import Destinations from "../components/Destinations";
import Goals from "../components/Goals";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

import { isLanguage, languages, type Language } from "../lib/i18n";

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

  const language: Language = lang;

  return (
    <>
      <Navbar language={language} />

      <main>
        <Hero language={language} />
        <Services language={language} />
        <WhyUs language={language} />
        <Destinations language={language} />
        <Goals language={language} />
        <Testimonials language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} />
    </>
  );
}
