import Image from "next/image";
import Link from "next/link";
import type { Language } from "../lib/i18n";

export default function WhyUs({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const content = {
    ar: {
      label: "ليش كوكب الصين؟",
      eyebrow: "منذ 2006 · خبرة تمتد لأكثر من 20 عامًا",
      titleTop: "مو بس نوصلك.",
      titleBottom: "نفهمك الطريق.",
      description:
        "نعرف الصين من الداخل، ونعرف كيف نترجم احتياجك إلى خطوة واضحة. من السعودية إلى الصين، نقرّب لك الصورة والعلاقات والفرص.",
      experience: "20+",
      experienceLabel: "عامًا من الخبرة والارتباط بالصين",
      since: "2006",
      sinceLabel: "البداية",
      bridge: "السعودية × الصين",
      bridgeText:
        "خبرة محلية هنا، ومعرفة عملية هناك. وهذا هو الفرق.",
      education: "التعليم",
      educationText:
        "نفهم الجامعات والبيئة التعليمية والمسارات التي تناسب الطالب.",
      business: "الأعمال",
      businessText:
        "نفهم السوق والتواصل والعلاقات التي تحتاجها لتتحرك بثقة.",
      button: "تعرف علينا أكثر",
      visionLabel: "نظرة أبعد",
      visionTitle: "نبني جسورًا تستمر.",
      visionText:
        "العلاقة بين السعودية والصين تكبر كل يوم. ونحن نرى فرصًا أكبر في التعليم والتجارة والاستثمار والتبادل الثقافي.",
      imageAlt: "منظر من تشنغدو في الصين",
      region: "CHENGDU · CHINA",
    },
    en: {
      label: "WHY CHINA PLANET?",
      eyebrow: "SINCE 2006 · MORE THAN 20 YEARS OF EXPERIENCE",
      titleTop: "We don't just get you there.",
      titleBottom: "We help you understand the way.",
      description:
        "We know China from the inside, and we know how to turn what you need into a clear next step. From Saudi Arabia to China, we make the picture, relationships, and opportunities easier to navigate.",
      experience: "20+",
      experienceLabel: "Years of experience and connection with China",
      since: "2006",
      sinceLabel: "Started",
      bridge: "SAUDI ARABIA × CHINA",
      bridgeText:
        "Local understanding here. Practical knowledge there. That is the difference.",
      education: "Education",
      educationText:
        "We understand universities, the educational environment, and the right paths for students.",
      business: "Business",
      businessText:
        "We understand the market, communication, and relationships you need to move with confidence.",
      button: "Learn More About Us",
      visionLabel: "LOOKING AHEAD",
      visionTitle: "Building bridges that last.",
      visionText:
        "The relationship between Saudi Arabia and China continues to grow, creating bigger opportunities across education, trade, investment, and cultural exchange.",
      imageAlt: "A view of Chengdu, China",
      region: "CHENGDU · CHINA",
    },
    zh: {
      label: "为什么选择中国星球？",
      eyebrow: "始于2006年 · 20多年中国经验",
      titleTop: "我们不只是带您到达。",
      titleBottom: "我们更懂该怎么走。",
      description:
        "我们深入了解中国，也知道如何把您的需求转化为清晰的下一步。从沙特到中国，让信息、关系与机会更容易被理解与连接。",
      experience: "20+",
      experienceLabel: "年中国经验与连接",
      since: "2006",
      sinceLabel: "始于",
      bridge: "沙特 × 中国",
      bridgeText:
        "连接沙特本地理解与中国市场实践，这就是我们的不同。",
      education: "教育",
      educationText:
        "深入了解中国高校、教育环境以及适合学生的发展路径。",
      business: "商业",
      businessText:
        "理解中国市场、沟通方式以及建立商业关系所需要的实际经验。",
      button: "了解更多",
      visionLabel: "面向未来",
      visionTitle: "连接持续发生的机会。",
      visionText:
        "沙特与中国的关系不断深入，在教育、贸易、投资与文化交流领域带来更多机会。",
      imageAlt: "中国成都风景",
      region: "成都 · 中国",
    },
  };

  const c = content[language];

  return (
    <section
      id="why-us"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[var(--cp-ivory)] text-[var(--cp-brown)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 top-0 h-[500px] w-[500px] rounded-full bg-[var(--cp-red-soft)]/[0.045] blur-3xl"
      />

      <div className="cp-editorial-container relative z-10 py-24 sm:py-28 lg:py-32">
        <div className="flex flex-col gap-6 border-t border-[var(--cp-line)] pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3 text-[var(--cp-red)]">
            <span className="h-px w-12 bg-current" />
            <span className="text-[10px] font-semibold tracking-[0.28em]">
              {c.label}
            </span>
          </div>

          <span className="text-[10px] font-semibold tracking-[0.2em] text-[var(--cp-muted-light)]">
            {c.eyebrow}
          </span>
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <h2 className="max-w-4xl text-[clamp(3.5rem,8vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
              <span className="block">{c.titleTop}</span>
              <span className="mt-3 block text-[var(--cp-red-soft)]">
                {c.titleBottom}
              </span>
            </h2>

            <p className="mt-9 max-w-2xl text-sm leading-8 text-[var(--cp-muted)] sm:text-base">
              {c.description}
            </p>
          </div>

          <div className="relative lg:pt-12">
            <div className="relative overflow-hidden bg-[var(--cp-brown-deep)] px-7 py-8 sm:px-10 sm:py-10">
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -end-12 text-[190px] font-semibold leading-none tracking-[-0.1em] text-white/[0.035]"
              >
                20
              </div>

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.28em] text-[var(--cp-red-soft)]">
                      {c.since} — NOW
                    </span>

                    <p className="mt-2 text-[10px] font-semibold tracking-[0.2em] text-white/40">
                      {c.sinceLabel}
                    </p>
                  </div>

                  <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--cp-gold-light)]">
                    {c.bridge}
                  </span>
                </div>

                <div className="mt-20">
                  <span className="text-[clamp(6rem,12vw,10rem)] font-semibold leading-[0.7] tracking-[-0.1em] text-white">
                    {c.experience}
                  </span>

                  <p className="mt-8 max-w-sm text-sm leading-7 text-white/60">
                    {c.experienceLabel}
                  </p>
                </div>

                <div className="mt-10 h-px bg-white/10" />

                <p className="mt-5 max-w-sm text-xs leading-7 text-white/40">
                  {c.bridgeText}
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -start-5 h-24 w-24 border border-[var(--cp-gold)]/25" />
          </div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.52fr_1.48fr]">
          <div className="relative min-h-[440px] overflow-hidden bg-[var(--cp-brown-deep)]">
            <Image
              src="/cities/chengdu.jpg"
              alt={c.imageAlt}
              fill
              className="object-cover transition duration-[1200ms] ease-out hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 38vw"
            />

            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(43,37,33,0.72),rgba(43,37,33,0.08)_55%,rgba(43,37,33,0.08))]" />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <span className="text-[9px] font-semibold tracking-[0.28em] text-white/60">
                {c.region}
              </span>
            </div>
          </div>

          <div className="border border-[var(--cp-line)] bg-[var(--cp-white)]">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 sm:p-10 lg:p-12">
                <p className="max-w-xl text-base leading-8 text-[var(--cp-muted)] sm:text-lg sm:leading-9">
                  {c.bridgeText}
                </p>

                <Link
                  href={`/${language}/about`}
                  className="group mt-10 inline-flex items-center gap-4 border-b border-[var(--cp-brown)] pb-3 text-[11px] font-semibold tracking-[0.14em] text-[var(--cp-brown)] transition-colors hover:border-[var(--cp-red)] hover:text-[var(--cp-red)]"
                >
                  {c.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    {isArabic ? "←" : "→"}
                  </span>
                </Link>
              </div>

              <div className="border-t border-[var(--cp-line)] bg-[var(--cp-ivory)] lg:border-s lg:border-t-0">
                <div className="border-b border-[var(--cp-line)] p-8 sm:p-10">
                  <span className="text-[9px] font-semibold tracking-[0.22em] text-[var(--cp-red)]">
                    01
                  </span>

                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em]">
                    {c.education}
                  </h3>

                  <p className="mt-4 text-xs leading-7 text-[var(--cp-muted)]">
                    {c.educationText}
                  </p>
                </div>

                <div className="p-8 sm:p-10">
                  <span className="text-[9px] font-semibold tracking-[0.22em] text-[var(--cp-gold)]">
                    02
                  </span>

                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.03em]">
                    {c.business}
                  </h3>

                  <p className="mt-4 text-xs leading-7 text-[var(--cp-muted)]">
                    {c.businessText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-[var(--cp-line)] pt-10 lg:grid-cols-[0.52fr_1.48fr]">
          <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-red)]">
            {c.visionLabel}
          </span>

          <div>
            <h3 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              {c.visionTitle}
            </h3>

            <p className="mt-5 max-w-3xl text-sm leading-8 text-[var(--cp-muted)] sm:text-base">
              {c.visionText}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-muted-light)]">
            CHINA PLANET
          </span>

          <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--cp-muted-light)]">
            SAUDI ARABIA × CHINA
          </span>
        </div>
      </div>
    </section>
  );
}
