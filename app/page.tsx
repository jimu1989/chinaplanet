import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Destinations from "./components/Destinations";
import Goals from "./components/Goals";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* 1 — Hero */}
        <Hero />

        {/* 2 — Services */}
        <Services />

        {/* 3 — Why Us */}
        <WhyUs />

        {/* 4 — Destinations */}
        <Destinations />

        {/* 5 — Goals */}
        <Goals />

        {/* 6 — Trust */}
        <Testimonials />

        {/* 7 — Contact */}
        <Contact />
      </main>

      {/* 8 — Footer */}
      <Footer />
    </>
  );
}