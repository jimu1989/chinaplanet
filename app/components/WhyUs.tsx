import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import Image from "next/image";

export default function WhyUs({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = translations[language].whyUs;
  const isArabic = language === "ar";

  const content = {
    ar: {
      title: (
        <>
          خبرة تعرف الصين.
          <br />
          وثقة تفتح لك الطريق.
        </>
      ),
      description:
        "نفهم احتياجات العميل العربي ونفهم طبيعة السوق الصيني، لنحوّل الوصول إلى الصين إلى تجربة أوضح، أسهل، وأكثر موثوقية.",
      button: "تعرف علينا أكثر",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "منظر من الصين",
    },
    en: {
      title: (
        <>
          Experience that understands China.
          <br />
          Trust that opens the way.
        </>
      ),
      description:
        "We understand the needs of our clients and the nature of the Chinese market, turning access to China into a clearer, easier, and more reliable experience.",
      button: "Learn More About Us",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "A view of China",
    },
    zh: {
      title: (
        <>
          深入了解中国。
          <br />
          值得信赖，为您开启通往中国的道路。
        </>
      ),
      description:
        "我们了解客户的需求，也熟悉中国市场，将通往中国的过程变得更加清晰、轻松和值得信赖。",
      button: "了解更多",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "中国风景",
    },
  };

  const contentForLanguage = content[language];

  return (
    <section
      id="why-us"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-section bg-[#f3f0eb]"
    >
      <div className="cp-container">
        <div className="mx-auto max-w-4xl text-center">
          {/* CONTENT */}
          <div className="mx-auto max-w-3xl">
            {/* LOGO */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/china-planet-logo.png"
                alt="China Planet"
                width={150}
                height={55}
                className="h-auto w-[150px] object-contain"
              />
            </div>

            {/* LABEL */}
            <div className="flex items-center justify-center gap-3">
              <span className="cp-line" />

              <span className="cp-label">
                {t.label}
              </span>

              <span className="cp-line" />
            </div>

            {/* TITLE */}
            <h2 className="mt-6 text-3xl font-medium leading-[1.35] tracking-tight text-[#40372f] sm:text-4xl lg:text-[46px]">
              {contentForLanguage.title}
            </h2>

            {/* DESCRIPTION */}
            <p className="mt-7 text-sm leading-8 text-[#756b62] sm:text-base">
              {contentForLanguage.description}
            </p>

            {/* ACTION */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="cp-button"
              >
                {contentForLanguage.button}
              </a>

              <span className="text-[10px] tracking-[0.18em] text-[#a3978d]">
                {contentForLanguage.region}
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative mt-16 aspect-[5/4] overflow-hidden rounded-2xl">
            <Image
              src="/cities/chengdu.jpg"
              alt={contentForLanguage.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />

            <div
              className={`absolute bottom-5 ${
                isArabic ? "right-5" : "left-5"
              }`}
            >
              <div className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[9px] font-semibold tracking-[0.22em] text-white backdrop-blur-md">
                CHINA PLANET
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}