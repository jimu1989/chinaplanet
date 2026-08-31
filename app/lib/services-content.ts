import type { Language } from "./i18n";

export type ServiceSlug = "business" | "travel" | "study" | "trade";

export type Article = {
  slug: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  image: string;
};

export type ServiceContent = {
  slug: ServiceSlug;
  title: Record<Language, string>;
  description: Record<Language, string>;
  heroImage: string;
  articles: Article[];
};

export const servicesContent: ServiceContent[] = [
  {
    slug: "business",
    title: {
      ar: "حلول الأعمال",
      en: "Business Solutions",
      zh: "商业解决方案",
    },
    description: {
      ar: "دليلك لفهم السوق الصيني وبناء علاقات أعمال أكثر وضوحًا وثقة.",
      en: "A practical guide to understanding China and building stronger business relationships.",
      zh: "帮助您了解中国市场并建立更加可靠的商业关系。",
    },
    heroImage: "/images/services/business/hero.jpg",
    articles: [
      {
        slug: "market-entry",
        title: {
          ar: "كيف تبدأ دخول السوق الصيني؟",
          en: "How to Enter the Chinese Market",
          zh: "如何进入中国市场？",
        },
        excerpt: {
          ar: "أهم الخطوات التي تحتاج إلى معرفتها قبل بدء نشاطك التجاري في الصين.",
          en: "The key steps to understand before starting your business journey in China.",
          zh: "开始中国商业之旅前需要了解的关键步骤。",
        },
        image: "/images/services/business/market-entry.jpg",
      },
      {
        slug: "chinese-partners",
        title: {
          ar: "كيف تختار شريكًا تجاريًا في الصين؟",
          en: "How to Choose a Chinese Business Partner",
          zh: "如何选择中国商业伙伴？",
        },
        excerpt: {
          ar: "نقاط مهمة تساعدك على تقييم الشريك المناسب وبناء علاقة طويلة الأمدد.",
          en: "Important points for evaluating the right partner and building a long-term relationship.",
          zh: "帮助您评估合适伙伴并建立长期合作关系。",
        },
        image: "/images/services/business/chinese-partners.jpg",
      },
    ],
  },

  {
    slug: "travel",
    title: {
      ar: "السفر والسياحة",
      en: "Travel & Tourism",
      zh: "旅游与旅行",
    },
    description: {
      ar: "اكتشف الصين من خلال أدلة عملية تساعدك على التخطيط لرحلة أفضل.",
      en: "Discover China through practical guides designed to help you plan a better trip.",
      zh: "通过实用指南，更轻松地规划您的中国之旅。",
    },
    heroImage: "/images/services/travel/hero.jpg",
    articles: [
      {
        slug: "beijing",
        title: {
          ar: "دليل المسافر إلى بكين",
          en: "A Traveler's Guide to Beijing",
          zh: "北京旅行指南",
        },
        excerpt: {
          ar: "أهم ما تحتاج معرفته قبل زيارة العاصمة الصينية.",
          en: "What you should know before visiting China's capital.",
          zh: "前往中国首都前需要了解的重要信息。",
        },
        image: "/images/services/travel/beijing.jpg",
      },
      {
        slug: "shanghai",
        title: {
          ar: "دليل المسافر إلى شنغهاي",
          en: "A Traveler's Guide to Shanghai",
          zh: "上海旅行指南",
        },
        excerpt: {
          ar: "مدينة تجمع بين الأعمال والتسوق والثقافة والحياة العصرية.",
          en: "A city where business, shopping, culture, and modern life meet.",
          zh: "融合商务、购物、文化与现代生活的国际都市。",
        },
        image: "/images/services/travel/shanghai.jpg",
      },
    ],
  },

  {
    slug: "study",
    title: {
      ar: "الدراسة واللغة",
      en: "Study & Chinese Language",
      zh: "留学与中文",
    },
    description: {
      ar: "معلومات عملية تساعد الطلاب والعائلات على فهم خيارات الدراسة واللغة في الصين.",
      en: "Practical information for students and families exploring education and language opportunities in China.",
      zh: "为学生和家庭提供中国留学与中文学习的实用信息。",
    },
    heroImage: "/images/services/study/hero.jpg",
    articles: [
      {
        slug: "universities",
        title: {
          ar: "كيف تختار الجامعة المناسبة في الصين؟",
          en: "How to Choose a University in China",
          zh: "如何选择适合的中国大学？",
        },
        excerpt: {
          ar: "أهم المعايير التي يجب التفكير فيها قبل اختيار الجامعة.",
          en: "The most important factors to consider before choosing a university.",
          zh: "选择大学前需要考虑的重要因素。",
        },
        image: "/images/services/study/universities.jpg",
      },
      {
        slug: "chinese-language",
        title: {
          ar: "تعلم اللغة الصينية في الصين",
          en: "Learning Chinese in China",
          zh: "在中国学习中文",
        },
        excerpt: {
          ar: "لماذا يمكن أن تكون دراسة اللغة داخل الصين تجربة مختلفة؟",
          en: "Why studying Chinese in China can offer a different learning experience.",
          zh: "为什么在中国学习中文可能带来不同的学习体验？",
        },
        image: "/images/services/study/chinese-language.jpg",
      },
    ],
  },

  {
    slug: "trade",
    title: {
      ar: "التجارة والتوريد",
      en: "Trade & Sourcing",
      zh: "贸易与采购",
    },
    description: {
      ar: "أدلة تساعدك على فهم التوريد والتعامل مع المصانع والموردين في الصين.",
      en: "Guides to help you understand sourcing and working with factories and suppliers in China.",
      zh: "帮助您了解中国采购以及与工厂和供应商合作的方法。",
    },
    heroImage: "/images/services/trade/hero.jpg",
    articles: [
      {
        slug: "factories",
        title: {
          ar: "كيف تجد المصنع المناسب في الصين؟",
          en: "How to Find the Right Factory in China",
          zh: "如何找到合适的中国工厂？",
        },
        excerpt: {
          ar: "خطوات عملية تساعدك على البحث والمقارنة قبل اختيار المصنع.",
          en: "Practical steps for researching and comparing factories before making a choice.",
          zh: "选择工厂前进行搜索和比较的实用步骤。",
        },
        image: "/images/services/trade/factories.jpg",
      },
      {
        slug: "suppliers",
        title: {
          ar: "كيف تتحقق من المورد الصيني؟",
          en: "How to Verify a Chinese Supplier",
          zh: "如何核实中国供应商？",
        },
        excerpt: {
          ar: "أهم النقاط التي يجب التحقق منها قبل بدء التعاون.",
          en: "Key points to verify before starting a supplier relationship.",
          zh: "开始供应商合作前需要核实的重要事项。",
        },
        image: "/images/services/trade/suppliers.jpg",
      },
    ],
  },
];

export function getService(slug: string) {
  return servicesContent.find((service) => service.slug === slug);
}

export function getArticle(serviceSlug: string, articleSlug: string) {
  return getService(serviceSlug)?.articles.find(
    (article) => article.slug === articleSlug,
  );
}
