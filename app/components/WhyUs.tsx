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
          <span className="text-[#c94a3d]">
            وثقة تفتح لك الطريق.
          </span>
        </>
      ),
      description:
        "منذ عام 2006، نعيش الصين عن قرب ونفهم تفاصيلها من الداخل؛ من التعليم والدراسة إلى التجارة والأعمال. نستخدم هذه الخبرة لنقرّب لك الطريق، ونساعدك على الوصول إلى الصين وفهمها والتعامل معها بوضوح وثقة.",
      story:
        "اليوم، أضع هذه المعرفة والخبرة في خدمة الأفراد والشركات في المملكة العربية السعودية، لمساعدتهم على فهم الصين والوصول إليها والتعامل معها بصورة أكثر وضوحًا وثقة. ومن هنا جاءت China Planet؛ لتكون جسرًا موثوقًا بين السعودية والصين، ونحوّل من خلاله تعقيدات التعامل مع الصين إلى فرص وخطوات أكثر وضوحًا.",
      experience: "أكثر من 20 عامًا",
      experienceLabel: "من الخبرة والارتباط بالصين",
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
        "نؤمن بأن الشراكة المتنامية بين المملكة العربية السعودية والصين تفتح آفاقًا واسعة في التعليم والتجارة والاستثمار والتبادل الثقافي. ونسعى من خلال China Planet إلى المساهمة في هذه الرحلة بما ينسجم مع مستهدفات رؤية السعودية 2030.",
      button: "تعرف علينا أكثر",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "منظر من الصين",
    },

    en: {
      label: "ABOUT US",
      eyebrow: "SINCE 2006",
      title: (
        <>
          My journey with China began as a student...
          <br />
          <span className="text-[#c94a3d]">
            Today, I help open its doors to others.
          </span>
        </>
      ),
      description:
        "My journey with China began in 2006, when I moved there to study. Over the years, that experience grew into deep practical knowledge of China, extending from education and study to business, trade, and working with the Chinese market.",
      story:
        "Today, I bring that knowledge and experience to individuals and businesses in Saudi Arabia, helping them understand China, access its opportunities, and navigate the market with greater clarity and confidence. This is the foundation of China Planet: a trusted bridge between Saudi Arabia and China, turning the complexity of dealing with China into clearer steps and meaningful opportunities.",
      experience: "20+ Years",
      experienceLabel: "Of experience and connection with China",
      education: "Education",
      educationText:
        "First-hand experience with studying in China and understanding its educational landscape.",
      business: "Business & Trade",
      businessText:
        "Practical experience with the Chinese market, relationships, and business communication.",
      bridge: "SAUDI ARABIA × CHINA",
      bridgeText:
        "Connecting the needs of Saudi clients with the right knowledge, relationships, and opportunities in China.",
      visionLabel: "SAUDI VISION 2030",
      visionTitle: "Building bridges for the future.",
      visionText:
        "We believe the growing partnership between Saudi Arabia and China creates significant opportunities across education, trade, investment, and cultural exchange. Through China Planet, we aim to contribute to this journey in alignment with the goals of Saudi Vision 2030.",
      button: "Learn More About Us",
      region: "SAUDI ARABIA × CHINA",
      imageAlt: "A view of China",
    },

    zh: {
      label: "关于我们",
      eyebrow: "始于 2006 年",
      title: (
        <>
          我与中国的故事，始于求学时期……
          <br />
          <span className="text-[#c94a3d]">
            如今，我希望为更多人打开通往中国的大门。
          </span>
        </>
      ),
      description:
        "2006年，我来到中国求学。从那时起，我与中国的缘分不断延续，并逐渐从学习经历发展为对中国社会、教育、商业和市场环境的深入了解。",
      story:
        "如今，我将多年积累的知识与实践经验服务于沙特阿拉伯的个人与企业，帮助他们更加清晰、自信地了解中国、连接中国并寻找合适的机会。China Planet 也因此而诞生——成为连接沙特阿拉伯与中国的可靠桥梁，让与中国合作的过程更加清晰、高效和值得信赖。",
      experience: "20+ 年",
      experienceLabel: "深耕中国的经验",
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
        "我们相信，沙特阿拉伯与中国不断深化的合作，将在教育、贸易、投资和文化交流等领域创造更多机会。China Planet 希望凭借自身经验，为这一长期合作贡献力量，并与沙特 2030 愿景的发展方向相契合。",
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
      className="cp-section bg-[#f3f0eb]"
    >
      <div className="cp-container">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/china-planet-logo.png"
                alt="China Planet"
                width={150}
                height={55}
                className="h-auto w-[150px] object-contain"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <span className="cp-line" />
              <span className="cp-label">{c.label}</span>
              <span className="cp-line" />
            </div>

            <p className="mt-8 text-[11px] font-semibold tracking-[0.28em] text-[#b5966c]">
              {c.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-medium leading-[1.4] tracking-tight text-[#40372f] sm:text-4xl lg:text-[48px]">
              {c.title}
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-sm leading-8 text-[#756b62] sm:text-base">
              {c.description}
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-[28px] bg-[#171717] p-8 text-white sm:p-10">
              <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {c.experience}
              </p>

              <p className="mt-3 max-w-xs text-sm leading-7 text-[#b9b1aa]">
                {c.experienceLabel}
              </p>

              <div className="mt-10 h-px bg-white/10" />

              <p className="mt-7 text-[10px] font-semibold tracking-[0.25em] text-[#c94a3d]">
                2006 — 2030+
              </p>

              <p className="mt-3 text-sm leading-7 text-[#d6d0ca]">
                {c.bridgeText}
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_70px_rgba(40,30,20,0.045)] sm:p-10">
              <p className="text-sm leading-8 text-[#756b62]">
                {c.story}
              </p>

              <div className="mt-9 grid gap-6 sm:grid-cols-3">
                <div>
                  <div className="mb-3 h-1 w-8 rounded-full bg-[#c94a3d]" />
                  <h3 className="text-sm font-semibold text-[#40372f]">
                    {c.education}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#8a8179]">
                    {c.educationText}
                  </p>
                </div>

                <div>
                  <div className="mb-3 h-1 w-8 rounded-full bg-[#c94a3d]" />
                  <h3 className="text-sm font-semibold text-[#40372f]">
                    {c.business}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#8a8179]">
                    {c.businessText}
                  </p>
                </div>

                <div>
                  <div className="mb-3 h-1 w-8 rounded-full bg-[#c94a3d]" />
                  <h3 className="text-sm font-semibold text-[#40372f]">
                    {c.bridge}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-[#8a8179]">
                    {c.bridgeText}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-16 aspect-[5/4] overflow-hidden rounded-[28px] sm:aspect-[16/8]">
            <Image
              src="/cities/chengdu.jpg"
              alt={c.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.025]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-white/5" />

            <div
              className={`absolute bottom-6 ${
                isArabic ? "right-6" : "left-6"
              }`}
            >
              <div className="rounded-full border border-white/30 bg-black/20 px-5 py-2.5 text-[9px] font-semibold tracking-[0.22em] text-white backdrop-blur-md">
                CHINA PLANET
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-[#ddd5cc] bg-[#eae5df] p-8 sm:p-10 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#b5966c]">
                  {c.visionLabel}
                </p>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#40372f] sm:text-3xl">
                  {c.visionTitle}
                </h3>
              </div>

              <p className="text-sm leading-8 text-[#756b62]">
                {c.visionText}
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="cp-button">
              {c.button}
            </a>

            <span className="text-[10px] tracking-[0.18em] text-[#a3978d]">
              {c.region}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
