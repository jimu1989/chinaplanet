import type { Language } from "../lib/i18n";
import Image from "next/image";
import Link from "next/link";

export default function WhyUs({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const content = {
    ar: {
      label: "من نحن",
      eyebrow: "أكثر من 20 عامًا من الخبرة في الصين · منذ 2006",
      titleTop: "نعرف الصين.",
      titleBottom: "ونعرف كيف نقرّبها لك.",
      description:
        "منذ 2006، نعيش الصين عن قرب ونفهم التعليم والتجارة والأعمال والثقافة من الداخل. اليوم نستخدم هذه الخبرة لنساعد الأفراد والشركات في السعودية على الوصول إلى الصين بوضوح وثقة.",
      story:
        "كوكب الصين يجمع بين الخبرة المحلية في السعودية والمعرفة العملية بالسوق الصيني، حتى تكون خطواتك أوضح من أول قرار إلى آخر تفصيل.",
      experience: "20+",
      experienceLabel: "عامًا من الخبرة والارتباط بالصين",
      bridge: "السعودية × الصين",
      bridgeText:
        "نربط احتياجاتك بالمعرفة والعلاقات والفرص المناسبة في الصين.",
      education: "التعليم",
      educationText:
        "فهم البيئة التعليمية والجامعات والفرص المتاحة للطلاب في الصين.",
      business: "الأعمال",
      businessText:
        "خبرة عملية في التواصل والسوق الصيني وبناء العلاقات التجارية.",
      visionLabel: "رؤية السعودية 2030",
      visionTitle: "نبني جسورًا للمستقبل.",
      visionText:
        "نؤمن بأن العلاقة المتنامية بين السعودية والصين تصنع فرصًا أكبر في التعليم والتجارة والاستثمار والتبادل الثقافي.",
      button: "تعرف علينا أكثر",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "منظر من الصين",
    },

    en: {
      label: "ABOUT US",
      eyebrow: "OVER 20 YEARS OF EXPERIENCE IN CHINA · SINCE 2006",
      titleTop: "We know China.",
      titleBottom: "And we know how to bring it closer.",
      description:
        "Since 2006, we have built first-hand knowledge of China across education, trade, business, and culture. Today, we use that experience to help individuals and businesses in Saudi Arabia navigate China with clarity and confidence.",
      story:
        "China Planet brings together local understanding in Saudi Arabia and practical knowledge of China, making every step clearer from the first decision to the final detail.",
      experience: "20+",
      experienceLabel: "Years of experience and connection with China",
      bridge: "SAUDI ARABIA × CHINA",
      bridgeText:
        "Connecting your needs with the right knowledge, relationships, and opportunities in China.",
      education: "Education",
      educationText:
        "Understanding China's universities, educational environment, and opportunities for students.",
      business: "Business",
      businessText:
        "Practical experience with the Chinese market, communication, and commercial relationships.",
      visionLabel: "SAUDI VISION 2030",
      visionTitle: "Building bridges for the future.",
      visionText:
        "We believe the growing Saudi-China relationship creates greater opportunities in education, trade, investment, and cultural exchange.",
      button: "Learn More About Us",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "A view of China",
    },

    zh: {
      label: "关于我们",
      eyebrow: "20 多年中国经验 · 始于 2006 年",
      titleTop: "我们了解中国。",
      titleBottom: "也知道如何让中国离您更近。",
      description:
        "自 2006 年以来，我们长期深入中国，积累了教育、贸易、商业与文化方面的实践经验。如今，我们将这些经验服务于沙特的个人与企业，帮助您更清晰、更自信地走进中国。",
      story:
        "中国星球结合沙特本地理解与中国市场的实践经验，让您从第一步到最后一个细节，都能更清楚地前进。",
      experience: "20+",
      experienceLabel: "年深耕中国的经验",
      bridge: "沙特 × 中国",
      bridgeText:
        "连接您的需求与中国的知识、关系和合适的机会。",
      education: "教育",
      educationText:
        "深入了解中国高校、教育环境以及学生可获得的学习机会。",
      business: "商业",
      businessText:
        "积累中国市场、商业沟通与合作关系方面的实践经验。",
      visionLabel: "沙特 2030 愿景",
      visionTitle: "携手构建面向未来的桥梁。",
      visionText:
        "我们相信，沙特与中国日益深入的合作将为教育、贸易、投资与文化交流带来更多机会。",
      button: "了解更多",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "中国风景",
    },
  };

  const c = content[language];

  return (
    <section
      id="why-us"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-editorial-section"
    >
      <div className="cp-editorial-container">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <div className="cp-editorial-kicker">
              <span>{c.label}</span>
            </div>

            <p className="mt-8 max-w-sm text-[10px] font-semibold tracking-[0.22em] text-[var(--cp-gold)]">
              {c.eyebrow}
            </p>
          </div>

          <div className={isArabic ? "lg:pr-10" : "lg:pl-10"}>
            <h2 className="cp-editorial-heading">
              <span className="block">{c.titleTop}</span>
              <span className="cp-editorial-accent block">
                {c.titleBottom}
              </span>
            </h2>

            <p className="cp-editorial-copy mt-8 max-w-2xl">
              {c.description}
            </p>
          </div>
        </div>

        <div className="mt-20 grid lg:grid-cols-[0.7fr_1.3fr]">
          <div className="cp-editorial-dark relative min-h-[430px] overflow-hidden p-8 sm:p-10 lg:p-12">
            <span className="pointer-events-none absolute -bottom-16 -left-4 text-[190px] font-semibold leading-none tracking-[-0.12em] text-white/[0.035]">
              20
            </span>

            <div className="relative z-10">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-red-soft)]">
                2006 — 2030+
              </p>

              <div className="mt-14">
                <p className="text-[clamp(5rem,10vw,8.5rem)] font-semibold leading-[0.8] tracking-[-0.09em] text-white">
                  {c.experience}
                </p>

                <p className="mt-7 max-w-xs text-sm leading-7 text-white/55">
                  {c.experienceLabel}
                </p>
              </div>

              <div className="mt-16 h-px bg-white/10" />

              <p className="mt-5 text-[10px] font-semibold tracking-[0.22em] text-white/35">
                {c.region}
              </p>
            </div>
          </div>

          <div className="border-y border-[var(--cp-line)] bg-[var(--cp-white)]">
            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[430px] overflow-hidden">
                <Image
                  src="/cities/chengdu.jpg"
                  alt={c.imageAlt}
                  fill
                  className="object-cover transition duration-1000 ease-out hover:scale-[1.035]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <span className="absolute bottom-7 start-7 text-[10px] font-semibold tracking-[0.24em] text-white/75">
                  CHINA / CHENGDU
                </span>
              </div>

              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <p className="max-w-xl text-base leading-8 text-[var(--cp-muted)] sm:text-lg sm:leading-9">
                  {c.story}
                </p>

                <div className="mt-12 border-t border-[var(--cp-line)]">
                  <div className="grid sm:grid-cols-3">
                    <div className="border-b border-[var(--cp-line)] py-7 sm:border-b-0 sm:pe-6">
                      <span className="mb-5 block h-px w-8 bg-[var(--cp-red)]" />
                      <h3 className="text-sm font-semibold text-[var(--cp-brown)]">
                        {c.education}
                      </h3>
                      <p className="mt-3 text-xs leading-6 text-[var(--cp-muted-light)]">
                        {c.educationText}
                      </p>
                    </div>

                    <div className="border-b border-[var(--cp-line)] py-7 sm:border-x sm:border-b-0 sm:px-6">
                      <span className="mb-5 block h-px w-8 bg-[var(--cp-red)]" />
                      <h3 className="text-sm font-semibold text-[var(--cp-brown)]">
                        {c.business}
                      </h3>
                      <p className="mt-3 text-xs leading-6 text-[var(--cp-muted-light)]">
                        {c.businessText}
                      </p>
                    </div>

                    <div className="py-7 sm:ps-6">
                      <span className="mb-5 block h-px w-8 bg-[var(--cp-red)]" />
                      <h3 className="text-sm font-semibold text-[var(--cp-brown)]">
                        {c.bridge}
                      </h3>
                      <p className="mt-3 text-xs leading-6 text-[var(--cp-muted-light)]">
                        {c.bridgeText}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/${language}/about`}
                  className="cp-editorial-button mt-10 inline-flex w-fit items-center gap-4"
                >
                  {c.button}
                  <span>{isArabic ? "←" : "→"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-[var(--cp-line)] pt-10 lg:grid-cols-[0.7fr_1.3fr]">
          <p className="text-[10px] font-semibold tracking-[0.22em] text-[var(--cp-red)]">
            {c.visionLabel}
          </p>

          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.045em] text-[var(--cp-brown)] sm:text-4xl">
              {c.visionTitle}
            </h3>

            <p className="mt-5 max-w-3xl text-sm leading-8 text-[var(--cp-muted)] sm:text-base">
              {c.visionText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
