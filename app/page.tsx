import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Goals from "./components/Goals";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* الصفحة الرئيسية */}
        <Hero />

        {/* ماذا يريد العميل من الصين؟ */}
        <Goals />

        {/* الخدمات */}
        <Services />

        {/* المدن الصينية */}
        <Gallery />

        {/* لماذا كوكب الصين؟ */}
        <WhyUs />

        {/* تجربة العميل */}
        <Testimonials />

        {/* التواصل */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
