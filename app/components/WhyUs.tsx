/* eslint-disable @typescript-eslint/no-unused-vars */

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
      label: "من نحن",
      eyebrow: "أكثر من 20 عامًا من الخبرة في الصين · منذ 2006",
      title: (
        <>
          خبرة تعرف الصين.
          <br />
          <span className="text-[#c94a3d]">وثقة تفتح لك الطريق.</span>
        </>
      ),
      description:
        "منذ عام 2006، نعيش الصين عن قرب ونفهم تفاصيلها من الداخل؛ من التعليم والدراسة إلى التجارة والأعمال. نستخدم هذه الخبرة لنقرّب لك الطريق، ونساعدك على الوصول إلى الصين وفهمها والتعامل معها بوضوح وثقة.",
      story:
        "اليوم، أضع هذه المعرفة والخبرة في خدمة الأفراد والشركات في المملكة العربية السعودية، لمساعدتهم على فهم الصين والوصول إليها والتعامل معها بصورة أكثر وضوحًا وثقة. ومن هنا جاءت China Planet؛ لتكون جسرًا موثوقًا بين السعودية والصين.",
      experience: "20+",
      experienceLabel: "عامًا من الخبرة والارتباط بالصين",
      education: "التعليم",
      educationText:
        "الدراسة في الصين وفهم البيئة التعليمية والفرص المتاحة للطلاب.",
      business: "التجارة والأعمال",
      businessText:
        "خبرة عملية في التعامل مع السوق الصيني وبناء العلاقات والتواصل.",
      bridge: "السعودية × الصين",
      bridgeText:
        "نربط احتياجات عملائنا بالمعرفة والخبرة والفرص المناسبة في الصين.",
      visionLabel: "رؤية السعودية 2030",
      visionTitle: "نبني جسورًا للمستقبل.",
      visionText:
        "نؤمن بأن الشراكة المتنامية بين المملكة العربية السعودية والصين تفتح آفاقًا واسعة في التعليم والتجارة والاستثمار والتبادل الثقافي.",
      button: "تعرف علينا أكثر",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "منظر من الصين",
    },
    en: {
      label: "ABOUT US",
      eyebrow: "OVER 20 YEARS OF EXPERIENCE IN CHINA · SINCE 2006",
      title: (
        <>
          Experience that knows China.
          <br />
          <span className="text-[#c94a3d]">
            Trust that opens the way.
          </span>
        </>
      ),
      description:
        "My journey with China began in 2006. Over the years, that experience grew into deep practical knowledge of education, business, trade, and the Chinese market.",
      story:
        "Today, I bring that knowledge to individuals and businesses in Saudi Arabia, helping them understand China, access its opportunities, and navigate the market with greater clarity and confidence.",
      experience: "20+",
      experienceLabel: "Years of experience and connection with China",
      education: "Education",
      educationText:
        "First-hand experience studying in China and understanding its educational landscape.",
      business: "Business & Trade",
      businessText:
        "Practical experience with the Chinese market, relationships, and communication.",
      bridge: "SAUDI ARABIA × CHINA",
      bridgeText:
        "Connecting Saudi clients with the right knowledge, relationships, and opportunities in China.",
      visionLabel: "SAUDI VISION 2030",
      visionTitle: "Building bridges for the future.",
      visionText:
        "We believe the growing partnership between Saudi Arabia and China creates significant opportunities across education, trade, investment, and cultural exchange.",
      button: "Learn More About Us",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "A view of China",
    },
    zh: {
      label: "关于我们",
      eyebrow: "20 多年中国经验 · 始于 2006 年",
      title: (
        <>
          深入了解中国。
          <br />
          <span className="text-[#c94a3d]">以信任连接未来。</span>
        </>
      ),
      description:
        "2006年，我来到中国求学。多年来，这段经历逐渐发展为对中国教育、商业、贸易和市场环境的深入了解。",
      story:
        "如今，我将这些知识与实践经验服务于沙特阿拉伯的个人与企业，帮助他们更加清晰、自信地了解中国并寻找合适的机会。",
      experience: "20+",
      experienceLabel: "年深耕中国的经验",
      education: "教育",
      educationText:
        "亲身经历中国留学，并深入了解中国的教育环境与学习机会。",
      business: "贸易与商业",
      businessText:
        "了解中国市场，积累商业沟通、市场连接与合作经验。",
      bridge: "沙特 × 中国",
      bridgeText:
        "连接沙特客户的需求与中国的知识、资源及合适的机会。",
      visionLabel: "沙特 2030 愿景",
      visionTitle: "携手构建面向未来的桥梁。",
      visionText:
        "我们相信，沙特阿拉伯与中国不断深化的合作，将在教育、贸易、投资和文化交流等领域创造更多机会。",
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
      className="cp-editorial-section relative overflow-hidden bg-[#f3f0eb]"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full border border-[#b5966c]/10" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#c94a3d]/[0.025] blur-3xl" />

      <div className="cp-editorial-container relative mx-auto w-full max-w-[1250px] px-5 md:px-8">
        {/* HEADER */}
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c94a3d]" />
              <span className="cp-label">{c.label}</span>
            </div>

            <p className="mt-8 text-[10px] font-semibold tracking-[0.24em] text-[#b5966c]">
              {c.eyebrow}
            </p>
          </div>

          <div className={isArabic ? "lg:pr-10" : "lg:pl-10"}>
            <h2 className="text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#40372f]">
              {c.title}
            </h2>

            <p className="mt-8 max-w-[650px] text-sm leading-8 text-[#786e65] md:text-base">
              {c.description}
            </p>
          </div>
        </div>

        {/* STORY */}
        <div className="mt-20 grid lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative min-h-[300px] overflow-hidden bg-[#201b17] p-8 text-white md:p-10">
            <span className="absolute -bottom-6 -left-2 text-[150px] font-semibold leading-none tracking-[-0.1em] text-white/[0.035]">
              20
            </span>

            <div className="relative">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#c94a3d]">
                2006 — 2030+
              </p>

              <p className="mt-8 text-[clamp(4rem,8vw,7rem)] font-semibold leading-none tracking-[-0.07em]">
                {c.experience}
              </p>

              <p className="mt-4 max-w-[260px] text-sm leading-7 text-white/60">
                {c.experienceLabel}
              </p>

              <div className="mt-12 h-px w-full bg-white/10" />

              <p className="mt-5 text-[10px] font-semibold tracking-[0.2em] text-white/45">
                {c.region}
              </p>
            </div>
          </div>

          <div className="border-y border-[#ded6ce] bg-[#fffdf9] p-8 md:p-12 lg:p-14">
            <p className="max-w-[720px] text-base leading-8 text-[#756b62] md:text-lg md:leading-9">
              {c.story}
            </p>

            <div className="mt-12 grid border-t border-[#ded6ce] sm:grid-cols-3">
              <div className="border-b border-[#ded6ce] py-7 sm:border-b-0 sm:pe-6">
                <div className="mb-5 h-px w-8 bg-[#c94a3d]" />
                <h3 className="text-sm font-semibold text-[#40372f]">
                  {c.education}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[#8a8179]">
                  {c.educationText}
                </p>
              </div>

              <div className="border-b border-[#ded6ce] py-7 sm:border-x sm:border-b-0 sm:px-6">
                <div className="mb-5 h-px w-8 bg-[#c94a3d]" />
                <h3 className="text-sm font-semibold text-[#40372f]">
                  {c.business}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[#8a8179]">
                  {c.businessText}
                </p>
              </div>

              <div className="py-7 sm:ps-6">
                <div className="mb-5 h-px w-8 bg-[#c94a3d]" />
                <h3 className="text-sm font-semibold text-[#40372f]">
                  {c.bridge}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[#8a8179]">
                  {c.bridgeText}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="group relative mt-20 aspect-[5/3] overflow-hidden bg-[#ddd6ce] md:aspect-[16/7]">
          <Image
            src="/cities/chengdu.jpg"
            alt={c.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 1250px"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#201b17]/65 via-[#201b17]/5 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white md:p-10">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.28em] text-white/55">
                CHINA PLANET / 03
              </p>
              <p className="mt-2 text-xl font-medium md:text-2xl">
                {c.region}
              </p>
            </div>

            <span className="hidden text-[10px] tracking-[0.2em] text-white/55 sm:block">
              CHINA
            </span>
          </div>
        </div>

        {/* VISION */}
        <div className="mt-12 border-t border-[#ded6ce] pt-10">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="cp-label">{c.visionLabel}</p>
              <h3 className="mt-5 max-w-[480px] text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#40372f] md:text-4xl">
                {c.visionTitle}
              </h3>
            </div>

            <div className="lg:pt-1">
              <p className="max-w-[680px] text-sm leading-8 text-[#786e65] md:text-base">
                {c.visionText}
              </p>

              <a
                href="#contact"
                className="cp-editorial-button group mt-8 inline-flex items-center gap-4"
              >
                {c.button}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  {isArabic ? "←" : "→"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
