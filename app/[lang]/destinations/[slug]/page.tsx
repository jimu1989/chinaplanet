import Image from "next/image";
import Link from "next/link";
import type { Language } from "../../../lib/i18n";

type Destination = {
  slug: string;
  title: {
    ar: string;
    en: string;
    zh: string;
  };
  subtitle: {
    ar: string;
    en: string;
    zh: string;
  };
  description: {
    ar: string;
    en: string;
    zh: string;
  };
  details: {
    ar: string[];
    en: string[];
    zh: string[];
  };
  image: string;
};

const destinations: Destination[] = [
  {
    slug: "beijing",
    title: { ar: "بكين", en: "Beijing", zh: "北京" },
    subtitle: {
      ar: "قلب الصين السياسي والثقافي",
      en: "The political and cultural heart of China",
      zh: "中国的政治与文化中心",
    },
    description: {
      ar: "اكتشف بكين، المدينة التي تجمع بين التاريخ الإمبراطوري والحياة العصرية.",
      en: "Discover Beijing, a city where imperial history meets modern Chinese life.",
      zh: "探索北京，一座将悠久历史与现代生活完美融合的城市。",
    },
    details: {
      ar: ["سور الصين العظيم", "المدينة المحرمة", "القصر الصيفي", "الأسواق والأحياء التاريخية"],
      en: ["Great Wall of China", "Forbidden City", "Summer Palace", "Historic markets and neighborhoods"],
      zh: ["长城", "故宫", "颐和园", "历史街区与传统市场"],
    },
    image: "/images/destinations/beijing.jpg",
  },
  {
    slug: "shanghai",
    title: { ar: "شنغهاي", en: "Shanghai", zh: "上海" },
    subtitle: {
      ar: "المدينة التي تلتقي فيها الحداثة بالتاريخ",
      en: "Where modernity meets history",
      zh: "现代与历史交汇的城市",
    },
    description: {
      ar: "شنغهاي وجهة مثالية للأعمال والسياحة، وتتميز بأفقها العصري وواجهتها البحرية.",
      en: "Shanghai is an ideal destination for business and tourism, known for its modern skyline and waterfront.",
      zh: "上海是商务与旅游的理想目的地，以现代天际线和滨水景观闻名。",
    },
    details: {
      ar: ["واجهة البوند", "برج شنغهاي", "حديقة يو", "الأسواق والمناطق التجارية"],
      en: ["The Bund", "Shanghai Tower", "Yu Garden", "Markets and business districts"],
      zh: ["外滩", "上海中心大厦", "豫园", "市场与商业区"],
    },
    image: "/images/destinations/shanghai.jpg",
  },
  {
    slug: "guangzhou",
    title: { ar: "قوانغتشو", en: "Guangzhou", zh: "广州" },
    subtitle: {
      ar: "بوابة التجارة والأعمال",
      en: "A gateway to trade and business",
      zh: "贸易与商业的重要门户",
    },
    description: {
      ar: "وجهة رئيسية للتجارة والاستيراد والتوريد، وتتمتع بتاريخ وثقافة جنوب الصين.",
      en: "A major destination for trade, sourcing, and business with a rich southern Chinese heritage.",
      zh: "中国南方重要的贸易、采购与商业中心，拥有深厚的文化底蕴。",
    },
    details: {
      ar: ["معرض كانتون", "أسواق الجملة", "برج كانتون", "نهر اللؤلؤ"],
      en: ["Canton Fair", "Wholesale markets", "Canton Tower", "Pearl River"],
      zh: ["广交会", "批发市场", "广州塔", "珠江"],
    },
    image: "/images/destinations/guangzhou.jpg",
  },
  {
    slug: "shenzhen",
    title: { ar: "شينزن", en: "Shenzhen", zh: "深圳" },
    subtitle: {
      ar: "عاصمة الابتكار والتقنية",
      en: "China's innovation powerhouse",
      zh: "中国创新科技之都",
    },
    description: {
      ar: "مدينة عالمية للتقنية والتصنيع وريادة الأعمال، ومركز مهم لسلاسل التوريد.",
      en: "A global center for technology, manufacturing, entrepreneurship, and supply chains.",
      zh: "全球重要的科技、制造、创业与供应链中心。",
    },
    details: {
      ar: ["مراكز التقنية", "أسواق الإلكترونيات", "التصنيع", "المناطق التجارية"],
      en: ["Technology hubs", "Electronics markets", "Manufacturing", "Business districts"],
      zh: ["科技园区", "电子市场", "制造业", "商业区"],
    },
    image: "/images/destinations/shenzhen.jpg",
  },
  {
    slug: "yiwu",
    title: { ar: "إيوو", en: "Yiwu", zh: "义乌" },
    subtitle: {
      ar: "مدينة الأسواق والتوريد العالمي",
      en: "The world's sourcing marketplace",
      zh: "全球采购之都",
    },
    description: {
      ar: "واحدة من أهم الوجهات العالمية للشراء بالجملة والتوريد والاستيراد.",
      en: "One of the world's most important destinations for wholesale sourcing and importing.",
      zh: "全球重要的批发采购、供应与进口目的地。",
    },
    details: {
      ar: ["سوق فوتيان", "المنتجات بالجملة", "الموردون", "الشحن والتوريد"],
      en: ["Futian Market", "Wholesale products", "Suppliers", "Shipping and sourcing"],
      zh: ["义乌国际商贸城", "批发商品", "供应商", "物流与采购"],
    },
    image: "/images/destinations/yiwu.jpg",
  },
  {
    slug: "hangzhou",
    title: { ar: "هانغتشو", en: "Hangzhou", zh: "杭州" },
    subtitle: {
      ar: "الطبيعة والأعمال في مكان واحد",
      en: "Nature, culture, and business",
      zh: "自然、文化与商业的融合",
    },
    description: {
      ar: "مدينة تجمع بين الطبيعة الجميلة، الثقافة، والتقنية الحديثة.",
      en: "A city combining beautiful nature, culture, and modern technology.",
      zh: "自然风光、文化底蕴与现代科技相结合的城市。",
    },
    details: {
      ar: ["البحيرة الغربية", "مزارع الشاي", "مراكز التقنية", "المناطق التاريخية"],
      en: ["West Lake", "Tea plantations", "Technology centers", "Historic areas"],
      zh: ["西湖", "茶园", "科技中心", "历史街区"],
    },
    image: "/images/destinations/hangzhou.jpg",
  },
];

const copy = {
  ar: {
    back: "العودة إلى الوجهات",
    explore: "اكتشف الوجهة",
    highlights: "أبرز التجارب",
    contact: "خطط لرحلتك إلى الصين",
  },
  en: {
    back: "Back to destinations",
    explore: "Discover the destination",
    highlights: "Highlights",
    contact: "Plan your China journey",
  },
  zh: {
    back: "返回目的地",
    explore: "探索目的地",
    highlights: "精彩体验",
    contact: "规划您的中国之旅",
  },
};

function getLanguage(value: string): Language {
  if (value === "en" || value === "zh") return value;
  return "ar";
}

export async function generateStaticParams() {
  return [
    { lang: "ar", slug: "beijing" },
    { lang: "ar", slug: "shanghai" },
    { lang: "ar", slug: "guangzhou" },
    { lang: "ar", slug: "shenzhen" },
    { lang: "ar", slug: "yiwu" },
    { lang: "ar", slug: "hangzhou" },

    { lang: "en", slug: "beijing" },
    { lang: "en", slug: "shanghai" },
    { lang: "en", slug: "guangzhou" },
    { lang: "en", slug: "shenzhen" },
    { lang: "en", slug: "yiwu" },
    { lang: "en", slug: "hangzhou" },

    { lang: "zh", slug: "beijing" },
    { lang: "zh", slug: "shanghai" },
    { lang: "zh", slug: "guangzhou" },
    { lang: "zh", slug: "shenzhen" },
    { lang: "zh", slug: "yiwu" },
    { lang: "zh", slug: "hangzhou" },
  ];
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug } = await params;

  const lang = getLanguage(rawLang);
  const destination = destinations.find((item) => item.slug === slug);

  if (!destination) {
    return null;
  }

  const t = copy[lang];
  const title = destination.title[lang];
  const subtitle = destination.subtitle[lang];
  const description = destination.description[lang];
  const details = destination.details[lang];
  const isArabic = lang === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f8f6f2] text-[#40372f]"
    >
      {/* HERO */}
      <section className="px-5 pb-16 pt-32 lg:px-8 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-[1250px]">
          <Link
            href={`/${lang}/destinations`}
            className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#c94a3d] transition-all hover:gap-4"
          >
            <span>{isArabic ? "→" : "←"}</span>
            <span>{t.back}</span>
          </Link>

          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#c94a3d]">
                {t.explore}
              </p>

              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.04em] md:text-7xl lg:text-[82px]">
                {title}
              </h1>

              <div className="mt-7 h-px w-14 bg-[#d8795e]" />

              <p className="mt-7 text-lg leading-9 text-[#786e65]">
                {subtitle}
              </p>
            </div>

            <div className="overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#eeeae4]">
                <Image
                  src={destination.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="border-t border-[#e5ddd5] px-5 lg:px-8">
        <div className="mx-auto grid max-w-[1250px] lg:grid-cols-[1fr_1fr]">
          <div className="border-b border-[#e5ddd5] py-14 lg:border-b-0 lg:border-e lg:pe-16 lg:py-20">
            <p className="max-w-[650px] text-base leading-9 text-[#786e65] md:text-lg">
              {description}
            </p>
          </div>

          <div className="py-14 lg:ps-16 lg:py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b5966c]">
              {t.highlights}
            </p>

            <div className="mt-8 grid gap-0">
              {details.map((detail, index) => (
                <div
                  key={detail}
                  className="flex items-center justify-between border-b border-[#e5ddd5] py-5"
                >
                  <span className="text-sm font-medium text-[#554d46]">
                    {detail}
                  </span>

                  <span className="text-[10px] text-[#c94a3d]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1250px]">
          <div className="relative overflow-hidden bg-[#40372f] px-7 py-14 text-center md:px-12 md:py-20">
            <div className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-[#c94a3d]/20 blur-3xl" />

            <p className="relative text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d8795e]">
              China Planet
            </p>

            <h2 className="relative mx-auto mt-4 max-w-[700px] text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
              {t.contact}
            </h2>

            <Link
              href={`/${lang}#contact`}
              className="relative mt-8 inline-flex rounded-full bg-white px-7 py-3 text-[11px] font-semibold text-[#40372f] transition-transform duration-300 hover:-translate-y-1"
            >
              {t.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
