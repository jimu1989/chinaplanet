import {
  Factory,
  GraduationCap,
  Languages,
  Plane,
  Ship,
} from "lucide-react";

export type CustomerGoalId =
  | "travel"
  | "study"
  | "language"
  | "trade"
  | "factory";

export type CustomerGoal = {
  id: CustomerGoalId;
  icon: typeof Plane;
  ar: {
    title: string;
    short: string;
    description: string;
  };
  en: {
    title: string;
    short: string;
    description: string;
  };
  zh: {
    title: string;
    short: string;
    description: string;
  };
  next: {
    ar: string[];
    en: string[];
    zh: string[];
  };
};

export const customerGoals: CustomerGoal[] = [
  {
    id: "travel",
    icon: Plane,
    ar: {
      title: "أسافر",
      short: "سفر",
      description: "رحلات، حجوزات، استقبال وبرامج داخل الصين.",
    },
    en: {
      title: "I want to travel",
      short: "TRAVEL",
      description: "Trips, bookings, reception and programs across China.",
    },
    zh: {
      title: "我要旅行",
      short: "旅行",
      description: "旅行、预订、接待以及中国境内的行程安排。",
    },
    next: {
      ar: ["رحلة سياحية", "رحلة عمل", "استقبال وترتيبات", "برنامج خاص"],
      en: ["Holiday", "Business trip", "Reception & arrangements", "Private program"],
      zh: ["旅游", "商务出行", "接待与安排", "私人行程"],
    },
  },

  {
    id: "study",
    icon: GraduationCap,
    ar: {
      title: "أدرس",
      short: "دراسة",
      description: "جامعات، منح، سكن وبرامج دراسية في الصين.",
    },
    en: {
      title: "I want to study",
      short: "STUDY",
      description: "Universities, scholarships, housing and study programs in China.",
    },
    zh: {
      title: "我要留学",
      short: "留学",
      description: "大学、奖学金、住宿以及中国留学项目。",
    },
    next: {
      ar: ["بكالوريوس", "ماجستير", "دكتوراه", "لغة صينية"],
      en: ["Bachelor's", "Master's", "PhD", "Chinese language"],
      zh: ["本科", "硕士", "博士", "中文课程"],
    },
  },

  {
    id: "language",
    icon: Languages,
    ar: {
      title: "أتعلم الصينية",
      short: "لغة",
      description: "برامج لغة صينية وHSK حسب مستواك وهدفك.",
    },
    en: {
      title: "I want to learn Chinese",
      short: "LANGUAGE",
      description: "Chinese and HSK programs based on your level and goals.",
    },
    zh: {
      title: "我要学习中文",
      short: "中文",
      description: "根据您的水平与目标安排中文和HSK课程。",
    },
    next: {
      ar: ["مبتدئ", "متوسط", "متقدم", "HSK"],
      en: ["Beginner", "Intermediate", "Advanced", "HSK"],
      zh: ["初级", "中级", "高级", "HSK"],
    },
  },

  {
    id: "trade",
    icon: Ship,
    ar: {
      title: "أتاجر",
      short: "تجارة",
      description: "استيراد، موردين، تفاوض، شحن ومتابعة.",
    },
    en: {
      title: "I want to trade",
      short: "TRADE",
      description: "Importing, sourcing, negotiation, shipping and follow-up.",
    },
    zh: {
      title: "我要做贸易",
      short: "贸易",
      description: "进口、采购、谈判、运输以及供应商跟进。",
    },
    next: {
      ar: ["أبحث عن منتج", "أبحث عن مورد", "استيراد", "شحن"],
      en: ["Find a product", "Find a supplier", "Importing", "Shipping"],
      zh: ["寻找产品", "寻找供应商", "进口", "运输"],
    },
  },

  {
    id: "factory",
    icon: Factory,
    ar: {
      title: "أبحث عن مصنع",
      short: "مصنع",
      description: "نبحث لك عن المصنع المناسب حسب المنتج والمواصفات.",
    },
    en: {
      title: "I need a factory",
      short: "FACTORY",
      description: "Find suitable manufacturers based on your product and specifications.",
    },
    zh: {
      title: "我要找工厂",
      short: "工厂",
      description: "根据您的产品和规格寻找合适的中国工厂。",
    },
    next: {
      ar: ["منتج جديد", "مصنع محدد", "تصنيع خاص", "مقارنة مصانع"],
      en: ["New product", "Specific factory", "Custom manufacturing", "Compare factories"],
      zh: ["新产品", "指定工厂", "定制生产", "工厂比较"],
    },
  },
];

export function getCustomerGoal(
  id: CustomerGoalId,
): CustomerGoal | undefined {
  return customerGoals.find((goal) => goal.id === id);
}
