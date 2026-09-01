import Image from "next/image";
import Link from "next/link";
import type { Language } from "../../lib/i18n";

type Destination = {
  slug: string;
  image: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  description: Record<Language, string>;
};

const destinations: Destination[] = [
  {
    slug: "beijing",
    image: "/images/destinations/beijing.jpg",
    title: { ar: "بكين", en: "Beijing", zh: "北京" },
    subtitle: {
      ar: "قلب الصين السياسي والثقافي",
      en: "China's cultural and political heart",
      zh: "中国的文化与政治中心",
    },
    description: {
      ar: "تاريخ عريق، ثقافة عميقة، ومشهد أعمال متطور.",
      en: "Ancient history, deep culture, and a dynamic business scene.",
      zh: "悠久的历史、深厚的文化与充满活力的商业环境。",
    },
  },
  {
    slug: "shanghai",
    image: "/images/destinations/shanghai.jpg",
    title: { ar: "شنغهاي", en: "Shanghai", zh: "上海" },
    subtitle: {
      ar: "مدينة الأعمال والانفتاح العالمي",
      en: "A global business metropolis",
      zh: "国际商业大都市",
    },
    description: {
      ar: "مدينة تجمع التجارة العالمية بالعمارة والثقافة الحديثة.",
      en: "Where global commerce meets modern architecture and culture.",
      zh: "全球商业、现代建筑与文化交汇之城。",
    },
  },
  {
    slug: "guangzhou",
    image: "/images/destinations/guangzhou.jpg",
    title: { ar: "قوانغتشو", en: "Guangzhou", zh: "广州" },
    subtitle: {
      ar: "بوابة التجارة والتوريد",
      en: "A gateway to trade and sourcing",
      zh: "贸易与采购门户",
    },
    description: {
      ar: "من أهم مراكز التجارة والتوريد في جنوب الصين.",
      en: "One of southern China's leading trade and sourcing hubs.",
      zh: "中国南方重要的贸易与采购中心。",
    },
  },
  {
    slug: "shenzhen",
    image: "/images/destinations/shenzhen.jpg",
    title: { ar: "شنتشن", en: "Shenzhen", zh: "深圳" },
    subtitle: {
      ar: "التقنية والابتكار",
      en: "Technology and innovation",
      zh: "科技与创新",
    },
    description: {
      ar: "مدينة المستقبل، التقنية، وريادة الأعمال.",
      en: "A city shaped by technology, innovation, and entrepreneurship.",
      zh: "科技、创新与创业精神塑造的未来之城。",
    },
  },
  {
    slug: "chengdu",
    image: "/images/destinations/chengdu.jpg",
    title: { ar: "تشنغدو", en: "Chengdu", zh: "成都" },
    subtitle: {
      ar: "ثقافة وطبيعة بإيقاع مختلف",
      en: "Culture and nature at a different pace",
      zh: "独特节奏的文化与自然",
    },
    description: {
      ar: "ثقافة محلية، طبيعة، وتجربة مختلفة في غرب الصين.",
      en: "Local culture, nature, and a different side of China.",
      zh: "体验中国西部独特的文化与自然。",
    },
  },
  {
    slug: "hangzhou",
    image: "/images/destinations/hangzhou.jpg",
    title: { ar: "هانغتشو", en: "Hangzhou", zh: "杭州" },
    subtitle: {
      ar: "الجمال الطبيعي والأعمال الحديثة",
      en: "Natural beauty and modern business",
      zh: "自然之美与现代商业",
    },
    description: {
      ar: "أناقة البحيرة الغربية مع اقتصاد حديث ومتطور.",
      en: "The elegance of West Lake alongside a thriving modern economy.",
      zh: "西湖之美与现代经济发展的完美融合。",
    },
  },
];

const copy = {
  ar: {
    eyebrow: "CHINA PLANET / DESTINATIONS",
    title: "اكتشف الصين.",
    accent: "مدينة بعد مدينة.",
    intro:
      "نأخذك إلى المدن التي تصنع الصين الحديثة — من قلب التاريخ إلى مراكز الأعمال والابتكار.",
    scroll: "استكشف الوجهات",
    destinations: "وجهات مختارة",
    view: "اكتشف المدينة",
    contactEyebrow: "خطوتك التالية",
    contactTitle: "الصين أقرب مما تتخيل.",
    contactText:
      "دعنا نصمم لك تجربة تناسب هدفك، سواء كانت رحلة، دراسة، أو فرصة أعمال.",
    contact: "تواصل معنا",
  },
  en: {
    eyebrow: "CHINA PLANET / DESTINATIONS",
    title: "Discover China.",
    accent: "One city at a time.",
    intro:
      "We take you to the cities shaping modern China — from historic capitals to global business and innovation hubs.",
    scroll: "Explore destinations",
    destinations: "Selected destinations",
    view: "Discover city",
    contactEyebrow: "YOUR NEXT STEP",
    contactTitle: "China is closer than you think.",
    contactText:
      "Let us design an experience around your goal — travel, study, or business.",
    contact: "Contact us",
  },
  zh: {
    eyebrow: "CHINA PLANET / 目的地",
    title: "探索中国。",
    accent: "一座城市，一种体验。",
    intro:
      "从历史名城到全球商业与创新中心，带您深入了解正在塑造现代中国的城市。",
    scroll: "探索目的地",
    destinations: "精选目的地",
    view: "探索城市",
    contactEyebrow: "下一步",
    contactTitle: "中国，比你想象的更近。",
    contactText:
      "无论旅行、留学还是商务，我们都可以为您打造专属体验。",
    contact: "联系我们",
  },
} satisfies Record<
  Language,
  {
    eyebrow: string;
    title: string;
    accent: string;
    intro: string;
    scroll: string;
    destinations: string;
    view: string;
    contactEyebrow: string;
    contactTitle: string;
    contactText: string;
    contact: string;
  }
>;

const validLanguages: Language[] = ["ar", "en", "zh"];

export function generateStaticParams() {
  return validLanguages.map((lang) => ({ lang }));
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const currentLanguage: Language = validLanguages.includes(lang) ? lang : "ar";
  const t = copy[currentLanguage];
  const isArabic = currentLanguage === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen overflow-hidden bg-[#f8f6f2] text-[#40372f]"
    >
      {/* HERO */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden px-5 pb-14 pt-32 md:px-8 md:pb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-china.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.16]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f2]/95 via-[#f8f6f2]/70 to-[#f8f6f2]" />
        </div>

        <div className="relative mx-auto w-full max-w-[1250px]">
          <div className="max-w-[980px]">
            <p className="animate-[destinationFade_700ms_ease-out_both] text-[10px] font-semibold tracking-[0.28em] text-[#c94a3d]">
              {t.eyebrow}
            </p>

            <h1 className="mt-6 animate-[destinationRise_900ms_120ms_ease-out_both] text-[clamp(3.8rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.065em] text-[#40372f]">
              {t.title}
              <br />
              <span className="text-[#c94a3d]">{t.accent}</span>
            </h1>

            <div className="mt-9 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-[570px] animate-[destinationRise_900ms_260ms_ease-out_both] text-base leading-8 text-[#786e65] md:text-lg">
                {t.intro}
              </p>

              <a
                href="#destinations"
                className="group inline-flex w-fit animate-[destinationFade_900ms_420ms_ease-out_both] items-center gap-4 text-[10px] font-semibold tracking-[0.16em] text-[#554d46]"
              >
                <span className="h-px w-10 bg-[#c94a3d] transition-all duration-500 group-hover:w-16" />
                {t.scroll}
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full border border-[#c94a3d]/10" />
        <div className="pointer-events-none absolute -bottom-28 -right-20 h-[300px] w-[300px] rounded-full border border-[#c94a3d]/10" />
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="mb-14 flex items-end justify-between gap-8">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-[#c94a3d]">
                01 / {t.destinations}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">
                {t.destinations}
              </h2>
            </div>

            <span className="hidden text-[10px] tracking-[0.18em] text-[#9a9087] md:block">
              {String(destinations.length).padStart(2, "0")} CITIES
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            {destinations.map((destination, index) => {
              const featured = index === 0 || index === 3;
              const wide = index === 1 || index === 4;

              return (
                <Link
                  key={destination.slug}
                  href={`/${currentLanguage}/destinations/${destination.slug}`}
                  className={[
                    "group relative overflow-hidden bg-[#ddd6ce]",
                    featured
                      ? "md:col-span-7"
                      : wide
                        ? "md:col-span-7"
                        : "md:col-span-5",
                    index === 0
                      ? "min-h-[560px]"
                      : index === 1
                        ? "min-h-[460px]"
                        : "min-h-[400px]",
                  ].join(" ")}
                >
                  <Image
                    src={destination.image}
                    alt={destination.title[currentLanguage]}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#201b17]/85 via-[#201b17]/15 to-transparent transition-opacity duration-700 group-hover:from-[#201b17]/90" />

                  <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-white/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-sm transition-all duration-500 group-hover:border-[#c94a3d] group-hover:bg-[#c94a3d]">
                        {isArabic ? "↙" : "↗"}
                      </span>
                    </div>

                    <p className="text-[10px] font-semibold tracking-[0.16em] text-[#e8b2aa]">
                      {destination.subtitle[currentLanguage]}
                    </p>

                    <h3 className="mt-2 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
                      {destination.title[currentLanguage]}
                    </h3>

                    <div className="mt-5 grid grid-rows-[0fr] transition-all duration-700 group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-[520px] pb-1 text-sm leading-7 text-white/75">
                          {destination.description[currentLanguage]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3 text-[10px] font-semibold tracking-[0.12em] text-white">
                      <span className="h-px w-7 bg-[#c94a3d] transition-all duration-500 group-hover:w-12" />
                      {t.view}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-[1100px] text-center">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-[#c94a3d]">
            02 / CHINA PLANET
          </p>

          <h2 className="mt-7 text-4xl font-semibold leading-tight tracking-[-0.045em] md:text-6xl">
            {isArabic
              ? "ليست مجرد وجهة."
              : currentLanguage === "zh"
                ? "不只是一座目的地。"
                : "More than a destination."}
          </h2>

          <div className="mx-auto mt-8 h-px w-16 bg-[#c94a3d]" />

          <p className="mx-auto mt-8 max-w-[650px] text-sm leading-8 text-[#786e65] md:text-base">
            {isArabic
              ? "نربطك بالمكان، والناس، والفرص التي تجعل تجربتك في الصين مختلفة."
              : currentLanguage === "zh"
                ? "我们连接城市、人与机会，让您的中国之旅与众不同。"
                : "We connect you with the places, people, and opportunities that make China different."}
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-5 pb-10 md:px-8">
        <div className="relative mx-auto max-w-[1250px] overflow-hidden bg-[#c94a3d] px-7 py-16 md:px-16 md:py-24">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

          <div className="relative max-w-[800px]">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-white/60">
              {t.contactEyebrow}
            </p>

            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.045em] text-white md:text-6xl">
              {t.contactTitle}
            </h2>

            <p className="mt-6 max-w-[600px] text-sm leading-7 text-white/75 md:text-base">
              {t.contactText}
            </p>

            <Link
              href={`/${currentLanguage}#contact`}
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-white px-7 py-3.5 text-[10px] font-semibold text-[#40372f] transition-all duration-500 hover:-translate-y-1 hover:px-9"
            >
              {t.contact}
              <span>{isArabic ? "←" : "→"}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
