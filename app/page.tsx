import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Destinations from "./components/Destinations";
import Goals from "./components/Goals";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import type { Language } from "./lib/i18n";

export default function Home({
  language = "ar",
}: {
  language?: Language;
}) {
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
