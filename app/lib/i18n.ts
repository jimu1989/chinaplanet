export const languages = {
  ar: { label: "العربية", short: "AR", dir: "rtl" },
  en: { label: "English", short: "EN", dir: "ltr" },
  zh: { label: "中文", short: "中", dir: "ltr" },
} as const;

export type Language = keyof typeof languages;

export const defaultLanguage: Language = "ar";

export function isLanguage(value: string): value is Language {
  return value in languages;
}

export const translations = {
  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      destinations: "الوجهات",
      whyUs: "لماذا كوكب الصين؟",
      contact: "تواصل معنا",
      login: "تسجيل الدخول",
      team: "دخول الفريق",
      register: "إنشاء حساب",
      account: "حسابي",
    },
    hero: {
      title: "الصين كما لم ترها من قبل",
      description:
        "نقرّب لك الصين، من السفر والدراسة واللغة إلى التجارة والأعمال.",
    },
    whyUs: {
      label: "لماذا كوكب الصين؟",
    },
    footer: {
      help: "تحتاج مساعدة؟ تواصل معنا مباشرة.",
      whatsapp: "تواصل معنا عبر واتساب",
    },
    worldTime: {
      saudi: "السعودية",
      china: "الصين",
    },
    currency: {
      title: "العملات",
      sar: "ريال سعودي",
      cny: "يوان صيني",
      usd: "دولار أمريكي",
    },
  },

  en: {
    nav: {
      home: "Home",
      services: "Services",
      destinations: "Destinations",
      whyUs: "Why China Planet?",
      contact: "Contact Us",
      login: "Login",
      team: "Team Login",
      register: "Create Account",
      account: "My Account",
    },
    hero: {
      title: "China Like You Have Never Seen It",
      description:
        "We bring China closer to you — from travel, education and language to trade and business.",
    },
    whyUs: {
      label: "Why China Planet?",
    },
    footer: {
      help: "Need help? Get in touch with us directly.",
      whatsapp: "Contact us on WhatsApp",
    },
    worldTime: {
      saudi: "Saudi Arabia",
      china: "China",
    },
    currency: {
      title: "Currencies",
      sar: "Saudi Riyal",
      cny: "Chinese Yuan",
      usd: "US Dollar",
    },
  },

  zh: {
    nav: {
      home: "首页",
      services: "服务",
      destinations: "目的地",
      whyUs: "为什么选择中国星球？",
      contact: "联系我们",
      login: "登录",
      team: "团队登录",
      register: "创建账户",
      account: "我的账户",
    },
    hero: {
      title: "探索你从未见过的中国",
      description:
        "让中国离你更近，从旅行、留学和语言，到贸易与商业。",
    },
    whyUs: {
      label: "为什么选择中国星球？",
    },
    footer: {
      help: "需要帮助？欢迎直接联系我们。",
      whatsapp: "通过 WhatsApp 联系我们",
    },
    worldTime: {
      saudi: "沙特阿拉伯",
      china: "中国",
    },
    currency: {
      title: "货币",
      sar: "沙特里亚尔",
      cny: "人民币",
      usd: "美元",
    },
  },
} as const;
