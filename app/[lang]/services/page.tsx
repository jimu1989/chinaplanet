import Image from "next/image";
import Link from "next/link";
import type { Language } from "../../lib/i18n";

const content = {
  ar: {
    label: "ماذا نقدم",
    title: "شريكك الموثوق في الصين",
    intro:
      "خدمات واضحة ومدروسة تساعد الأفراد والشركات على الوصول إلى الصين بثقة، وفهم الفرص، واتخاذ الخطوة المناسبة.",
    cta: "تحدث معنا عبر واتساب",
    back: "العودة إلى الرئيسية",
    services: [
      {
        title: "حلول الأعمال",
        short:
          "نساعدك على بناء علاقات وفرص أعمال موثوقة في السوق الصيني.",
        text:
          "إذا كنت تبحث عن شريك صيني، أو ترغب في دخول السوق الصيني، أو تحتاج إلى فهم أفضل لطبيعة التعامل مع الشركات والموردين، نساعدك على تحويل الفكرة إلى خطوات عملية أوضح.",
        points: [
          "فهم السوق والفرص المناسبة",
          "المساعدة في بناء العلاقات والتواصل",
          "دعم التواصل مع الشركات والشركاء",
          "توضيح الخطوات قبل اتخاذ القرار",
        ],
        image: "/cities/shanghai.jpg",
        alt: "الأعمال والمدينة في الصين",
      },
      {
        title: "السفر والسياحة",
        short:
          "تجارب سفر مصممة بعناية لاكتشاف الصين بطريقة مريحة ومميزة.",
        text:
          "الصين أكبر من مجرد وجهات سياحية. نساعدك على التخطيط لرحلتك بطريقة تناسب هدفك، سواء كانت رحلة عائلية، أو زيارة مدن جديدة، أو رحلة تجمع بين السياحة والأعمال.",
        points: [
          "اختيار المدن والوجهات المناسبة",
          "تخطيط الرحلة بحسب احتياجاتك",
          "تنظيم تجربة سفر أكثر راحة",
          "الجمع بين السياحة والأعمال عند الحاجة",
        ],
        image: "/cities/chengdu.jpg",
        alt: "السفر والسياحة في الصين",
      },
      {
        title: "الدراسة واللغة",
        short:
          "مساعدة في الدراسة والجامعات وتعلّم اللغة الصينية.",
        text:
          "الدراسة في الصين فرصة لبناء تجربة تعليمية وحياة جديدة في بيئة مختلفة. نساعد الطلاب والأسر على فهم الخيارات المتاحة والوصول إلى الصورة الأوضح قبل البدء في رحلة الدراسة.",
        points: [
          "التعرف على خيارات الدراسة",
          "فهم البيئة التعليمية الصينية",
          "المساعدة في اختيار المسار المناسب",
          "التعرف على فرص تعلم اللغة الصينية",
        ],
        image: "/cities/beijing.jpg",
        alt: "الدراسة والتعليم في الصين",
      },
      {
        title: "التجارة والتوريد",
        short:
          "نربطك بالمصانع والفرص التجارية المناسبة في الصين.",
        text:
          "التعامل مع المصانع والموردين في الصين يحتاج إلى فهم السوق والتواصل والمتابعة. نساعدك على الوصول إلى الخيارات المناسبة بصورة أكثر وضوحًا وتقليل التعقيد في بداية رحلة التوريد.",
        points: [
          "البحث عن فرص وموردين مناسبين",
          "فهم احتياجات التوريد",
          "التواصل مع المصانع والشركات",
          "المساعدة في تنظيم خطوات التعاون",
        ],
        image: "/cities/guangzhou.jpg",
        alt: "التجارة والتوريد في الصين",
      },
    ],
  },

  en: {
    label: "WHAT WE OFFER",
    title: "Your Trusted Partner in China",
    intro:
      "Clear, practical services that help individuals and businesses access China with confidence and make better-informed decisions.",
    cta: "Talk to us on WhatsApp",
    back: "Back to Home",
    services: [
      {
        title: "Business Solutions",
        short:
          "We help you build reliable relationships and business opportunities in the Chinese market.",
        text:
          "Whether you are looking for a Chinese partner, exploring the market, or need help understanding how to work with companies and suppliers, we help turn your idea into clearer practical steps.",
        points: [
          "Understanding the market and relevant opportunities",
          "Building relationships and communication",
          "Support with companies and partners",
          "Clarifying the next steps before you decide",
        ],
        image: "/cities/shanghai.jpg",
        alt: "Business in China",
      },
      {
        title: "Travel & Tourism",
        short:
          "Thoughtfully designed travel experiences to discover China comfortably and meaningfully.",
        text:
          "China is more than a list of tourist destinations. We help you plan a trip around your goals, whether it is a family holiday, discovering new cities, or combining tourism with business.",
        points: [
          "Selecting the right cities and destinations",
          "Planning around your needs",
          "Creating a smoother travel experience",
          "Combining tourism and business when needed",
        ],
        image: "/cities/chengdu.jpg",
        alt: "Travel in China",
      },
      {
        title: "Study & Chinese Language",
        short:
          "Support with studying, universities, and learning the Chinese language.",
        text:
          "Studying in China can be an opportunity to build a valuable educational and personal experience. We help students and families understand their options before taking the next step.",
        points: [
          "Exploring study options",
          "Understanding the Chinese education environment",
          "Finding the right path",
          "Discovering Chinese language opportunities",
        ],
        image: "/cities/beijing.jpg",
        alt: "Study in China",
      },
      {
        title: "Trade & Sourcing",
        short:
          "We connect you with suitable factories and commercial opportunities in China.",
        text:
          "Working with factories and suppliers in China requires market understanding, communication, and follow-up. We help make the sourcing journey clearer and more structured.",
        points: [
          "Finding suitable suppliers and opportunities",
          "Understanding sourcing requirements",
          "Communicating with factories and companies",
          "Organizing the cooperation process",
        ],
        image: "/cities/guangzhou.jpg",
        alt: "Trade and sourcing in China",
      },
    ],
  },

  zh: {
    label: "我们的服务",
    title: "您值得信赖的中国合作伙伴",
    intro:
      "通过清晰、务实的服务，帮助个人与企业更加自信地了解中国、连接中国并寻找合适的机会。",
    cta: "通过 WhatsApp 联系我们",
    back: "返回首页",
    services: [
      {
        title: "商业解决方案",
        short:
          "帮助您在中国市场建立可靠的商业关系并寻找合适的机会。",
        text:
          "无论是寻找中国合作伙伴、进入中国市场，还是希望更好地了解中国企业与供应商，我们都可以帮助您将想法转化为更加清晰的实际步骤。",
        points: [
          "了解中国市场与相关机会",
          "建立商业关系与沟通",
          "协助连接企业与合作伙伴",
          "在决策前梳理下一步",
        ],
        image: "/cities/shanghai.jpg",
        alt: "中国商业",
      },
      {
        title: "旅游与旅行",
        short:
          "精心规划的旅行体验，让您更加舒适地探索中国。",
        text:
          "中国不仅仅是几个旅游城市。我们根据您的目标规划行程，无论是家庭旅行、城市探索，还是将旅游与商务结合。",
        points: [
          "选择合适的城市与目的地",
          "根据需求规划行程",
          "打造更加舒适的旅行体验",
          "根据需要结合旅游与商务",
        ],
        image: "/cities/chengdu.jpg",
        alt: "中国旅游",
      },
      {
        title: "留学与中文",
        short:
          "帮助您了解中国留学、大学以及中文学习机会。",
        text:
          "在中国学习不仅是教育经历，也是一段新的生活体验。我们帮助学生和家庭了解不同选择，并在出发前获得更加清晰的信息。",
        points: [
          "了解留学选择",
          "认识中国教育环境",
          "寻找适合的学习路径",
          "了解中文学习机会",
        ],
        image: "/cities/beijing.jpg",
        alt: "中国教育",
      },
      {
        title: "贸易与采购",
        short:
          "帮助您连接中国合适的工厂与商业机会。",
        text:
          "与中国工厂和供应商合作，需要市场理解、沟通和持续跟进。我们帮助您让采购过程更加清晰、有序。",
        points: [
          "寻找合适的供应商与机会",
          "了解采购需求",
          "与工厂和企业沟通",
          "梳理合作流程",
        ],
        image: "/cities/guangzhou.jpg",
        alt: "中国贸易与采购",
      },
    ],
  },
} satisfies Record<Language, unknown>;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const c = content[lang] as (typeof content)["ar"];
  const isArabic = lang === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f8f6f2] pt-[76px]"
    >
      <section className="cp-section">
        <div className="cp-container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-7 flex justify-center">
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

            <h1 className="mt-6 text-4xl font-medium leading-[1.35] tracking-tight text-[#40372f] sm:text-5xl lg:text-[58px]">
              {c.title}
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-[#786e65] sm:text-base">
              {c.intro}
            </p>
          </div>

          <div className="mt-16 space-y-8">
            {c.services.map((service, index) => (
              <article
                key={service.title}
                className="overflow-hidden rounded-[32px] bg-white shadow-[0_20px_70px_rgba(40,30,20,0.06)]"
              >
                <div className="grid lg:grid-cols-2">
                  <div
                    className={`relative min-h-[320px] lg:min-h-[520px] ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div
                      className={`absolute bottom-7 ${
                        isArabic ? "right-7" : "left-7"
                      }`}
                    >
                      <span className="rounded-full border border-white/30 bg-black/20 px-5 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md">
                        CHINA PLANET · {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
                    <span className="text-[10px] font-semibold tracking-[0.25em] text-[#b5966c]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#40372f] sm:text-4xl">
                      {service.title}
                    </h2>

                    <p className="mt-5 text-base font-medium leading-8 text-[#574d45]">
                      {service.short}
                    </p>

                    <p className="mt-5 text-sm leading-8 text-[#786e65]">
                      {service.text}
                    </p>

                    <div className="mt-7 space-y-3">
                      {service.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3 text-sm leading-7 text-[#6f665e]"
                        >
                          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c94a3d]" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-9">
                      <Link
                        href={`/${lang}#contact`}
                        className="cp-button inline-flex"
                      >
                        {c.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={`/${lang}`}
              className="text-xs font-semibold text-[#786e65] transition-colors hover:text-[#c94a3d]"
            >
              {c.back}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
