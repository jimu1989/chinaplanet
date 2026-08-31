import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Language } from "../../../../lib/i18n";
import { languages } from "../../../../lib/i18n";
import {
  getArticle,
  servicesContent,
} from "../../../../lib/services-content";

const articleBody: Record<
  string,
  Record<Language, string[]>
> = {
  "market-entry": {
    ar: [
      "دخول السوق الصيني يبدأ بفهم واضح للهدف، وليس بمجرد البحث عن شركة أو مورد.",
      "قبل التواصل مع أي جهة، من المهم تحديد المنتج أو الخدمة، العميل المستهدف، المدينة أو المنطقة المناسبة، وطبيعة التعاون التي تبحث عنها.",
      "بعد ذلك تأتي مرحلة دراسة الخيارات وبناء قائمة مختصرة من الشركات والشركاء المحتملين، ثم التواصل معهم بطريقة مهنية وواضحة.",
      "الهدف هو تقليل المفاجآت واتخاذ القرارات بناءً على معلومات أفضل قبل الالتزام بأي خطوة تجارية.",
    ],
    en: [
      "Entering the Chinese market starts with a clear objective, not simply with finding a company or supplier.",
      "Before contacting potential partners, define your product or service, target customer, suitable location, and the type of cooperation you are looking for.",
      "The next step is researching the available options, creating a shortlist, and communicating with potential partners clearly and professionally.",
      "The goal is to reduce uncertainty and make better-informed decisions before committing to a commercial relationship.",
    ],
    zh: [
      "进入中国市场首先需要明确目标，而不仅仅是寻找一家企业或供应商。",
      "在联系潜在合作伙伴之前，需要明确产品或服务、目标客户、适合的地区以及希望建立的合作方式。",
      "随后可以研究市场选择，筛选潜在企业，并以清晰、专业的方式进行沟通。",
      "最终目标是减少不确定性，在建立商业合作之前获得更加充分的信息。",
    ],
  },

  "chinese-partners": {
    ar: [
      "اختيار الشريك المناسب في الصين يحتاج إلى أكثر من مجرد مقارنة الأسعار.",
      "من المهم فهم نشاط الشركة وخبرتها وطبيعة عملائها وقدرتها الفعلية على تنفيذ ما تعد به.",
      "كما أن جودة التواصل وسرعة الاستجابة ووضوح الاتفاقات عوامل مهمة جدًا في بناء علاقة تجارية طويلة الأمد.",
      "كلما كان التحقق أفضل في البداية، أصبحت مراحل التعاون والمتابعة أكثر وضوحًا.",
    ],
    en: [
      "Choosing the right partner in China requires more than comparing prices.",
      "It is important to understand the company's business, experience, customers, and actual ability to deliver what it promises.",
      "Communication quality, responsiveness, and clear agreements also play an important role in building a long-term relationship.",
      "Better initial verification can make the cooperation and follow-up process much clearer.",
    ],
    zh: [
      "选择合适的中国合作伙伴不仅仅是比较价格。",
      "需要了解企业的业务、经验、客户以及实际履约能力。",
      "沟通质量、响应速度和清晰的合作约定，对于建立长期关系同样非常重要。",
      "前期进行充分核实，可以让后续合作和跟进更加清晰。",
    ],
  },

  beijing: {
    ar: [
      "بكين مدينة تجمع بين التاريخ والثقافة والحياة العصرية، ولذلك يمكن أن تكون نقطة بداية ممتازة لاكتشاف الصين.",
      "يمكن للمسافر أن يجمع بين المعالم التاريخية والتجارب الثقافية والمطاعم والأسواق الحديثة ضمن رحلة واحدة.",
      "التخطيط المسبق للمدن والأماكن التي تريد زيارتها يساعدك على الاستفادة من وقتك وتجنب التنقل غير الضروري.",
    ],
    en: [
      "Beijing combines history, culture, and modern life, making it an excellent starting point for discovering China.",
      "Travelers can combine historic landmarks, cultural experiences, restaurants, and modern shopping in one trip.",
      "Planning the places and neighborhoods you want to visit in advance can help you make better use of your time.",
    ],
    zh: [
      "北京融合了历史、文化与现代生活，是探索中国的理想起点。",
      "旅行者可以在一次行程中体验历史景点、文化、美食以及现代购物。",
      "提前规划想去的地点和区域，可以更有效地利用旅行时间。",
    ],
  },

  shanghai: {
    ar: [
      "شنغهاي من أكثر مدن الصين عالمية، وتناسب من يريد الجمع بين السياحة والتسوق والأعمال.",
      "المدينة تقدم مزيجًا واضحًا بين العمارة الحديثة والمناطق التاريخية والمطاعم والتجارب الثقافية.",
      "وإذا كانت الرحلة مرتبطة بالأعمال، يمكن استغلال الموقع الاستراتيجي للمدينة للجمع بين الاجتماعات واكتشاف المدينة.",
    ],
    en: [
      "Shanghai is one of China's most international cities and is ideal for combining tourism, shopping, and business.",
      "The city offers a strong mix of modern architecture, historic areas, restaurants, and cultural experiences.",
      "For business travelers, its location also makes it possible to combine meetings with exploring the city.",
    ],
    zh: [
      "上海是中国最具国际化的城市之一，非常适合将旅游、购物与商务结合起来。",
      "这座城市融合了现代建筑、历史街区、美食和丰富的文化体验。",
      "对于商务旅行者来说，也可以将商务会议与城市探索结合起来。",
    ],
  },

  universities: {
    ar: [
      "اختيار الجامعة المناسبة يبدأ بتحديد التخصص والهدف الدراسي والمدينة والميزانية.",
      "لا يكفي النظر إلى اسم الجامعة فقط؛ من المهم دراسة البرنامج الأكاديمي واللغة ومتطلبات القبول والبيئة المحيطة.",
      "المقارنة بين عدة خيارات قبل التقديم تساعد الطالب والأسرة على اتخاذ قرار أكثر وضوحًا.",
    ],
    en: [
      "Choosing the right university starts with defining your field, academic goal, location, and budget.",
      "The university name alone is not enough. Consider the academic program, language, admission requirements, and surrounding environment.",
      "Comparing several options before applying can help students and families make a clearer decision.",
    ],
    zh: [
      "选择合适的大学首先需要明确专业、学习目标、城市和预算。",
      "大学名称本身并不是唯一标准，还需要考虑专业课程、授课语言、申请要求以及学习环境。",
      "在申请前比较多个选择，可以帮助学生和家庭做出更加清晰的决定。",
    ],
  },

  "chinese-language": {
    ar: [
      "تعلم اللغة الصينية داخل الصين يمنح الطالب فرصة للجمع بين الدراسة والممارسة اليومية.",
      "الاحتكاك باللغة في المواصلات والمطاعم والجامعات والحياة اليومية يمكن أن يضيف جانبًا عمليًا مهمًا إلى التعلم.",
      "اختيار البرنامج المناسب يعتمد على المستوى الحالي والمدة والهدف من دراسة اللغة.",
    ],
    en: [
      "Learning Chinese in China allows students to combine classroom study with daily practice.",
      "Using the language in transportation, restaurants, universities, and everyday life can add an important practical dimension to learning.",
      "The right program depends on your current level, study duration, and learning goals.",
    ],
    zh: [
      "在中国学习中文，可以将课堂学习与日常实践结合起来。",
      "在交通、餐厅、大学和日常生活中使用中文，可以为学习增加重要的实践体验。",
      "合适的课程选择取决于目前的中文水平、学习时间以及学习目标。",
    ],
  },

  factories: {
    ar: [
      "البحث عن المصنع المناسب لا يعتمد فقط على السعر، بل على القدرة والجودة والتواصل والالتزام.",
      "ابدأ بتحديد المواصفات والكمية والجودة المطلوبة، ثم قارن بين عدة مصانع بدل الاعتماد على خيار واحد.",
      "قبل بدء الإنتاج، من المهم توضيح المواصفات والتغليف والكميات والجداول الزمنية وآلية المتابعة.",
    ],
    en: [
      "Finding the right factory is not only about price. Capability, quality, communication, and reliability matter as well.",
      "Start by defining specifications, quantity, and quality requirements, then compare several factories instead of relying on one option.",
      "Before production begins, clarify specifications, packaging, quantities, timelines, and follow-up procedures.",
    ],
    zh: [
      "寻找合适的工厂不仅要考虑价格，还需要关注生产能力、质量、沟通和可靠性。",
      "首先明确产品规格、数量和质量要求，然后比较多个工厂，而不是只依赖一个选择。",
      "开始生产前，应明确产品要求、包装、数量、时间安排和跟进方式。",
    ],
  },

  suppliers: {
    ar: [
      "التحقق من المورد خطوة أساسية قبل تحويل التعاون إلى طلب فعلي.",
      "من المفيد مراجعة معلومات الشركة، المنتجات، القدرة الإنتاجية، الخبرة، وطريقة التواصل معها.",
      "كما يجب أن تكون المواصفات والأسعار والكميات وشروط التعاون واضحة قبل الالتزام.",
    ],
    en: [
      "Supplier verification is an important step before turning a potential relationship into an actual order.",
      "Review the company's information, products, production capability, experience, and communication process.",
      "Specifications, prices, quantities, and cooperation terms should also be clear before making a commitment.",
    ],
    zh: [
      "在正式下单之前，核实供应商是非常重要的一步。",
      "可以了解企业信息、产品、生产能力、经验以及沟通方式。",
      "在正式合作前，还应明确产品规格、价格、数量和合作条件。",
    ],
  },
};

export function generateStaticParams() {
  return languages
    ? Object.keys(languages).flatMap((lang) =>
        servicesContent.flatMap((service) =>
          service.articles.map((article) => ({
            lang,
            slug: service.slug,
            article: article.slug,
          })),
        ),
      )
    : [];
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{
    lang: Language;
    slug: string;
    article: string;
  }>;
}) {
  const { lang, slug, article: articleSlug } = await params;

  const article = getArticle(slug, articleSlug);

  if (!article || !articleBody[articleSlug]) {
    notFound();
  }

  const isArabic = lang === "ar";
  const paragraphs = articleBody[articleSlug][lang];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f8f6f2] pt-[76px]"
    >
      <article>
        <section className="relative overflow-hidden">
          <div className="relative min-h-[520px]">
            <Image
              src={article.image}
              alt={article.title[lang]}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex min-h-[520px] items-end">
              <div className="cp-container w-full pb-16 sm:pb-20">
                <span className="text-[10px] font-semibold tracking-[0.3em] text-white/80">
                  CHINA PLANET · ARTICLE
                </span>

                <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                  {article.title[lang]}
                </h1>

                <p className="mt-6 max-w-2xl text-sm leading-8 text-white/85 sm:text-base">
                  {article.excerpt[lang]}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cp-section">
          <div className="cp-container">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-[30px] bg-white p-8 shadow-[0_18px_65px_rgba(40,30,20,0.06)] sm:p-12 lg:p-16">
                <div className="space-y-7">
                  {paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-9 text-[#574d45] sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-12 border-t border-[#e5ddd5] pt-8">
                  <Link
                    href={`/${lang}/services/${slug}`}
                    className="text-xs font-semibold text-[#786e65] transition-colors hover:text-[#c94a3d]"
                  >
                    {isArabic
                      ? "← العودة إلى القسم"
                      : lang === "zh"
                        ? "← 返回服务"
                        : "← Back to Service"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
