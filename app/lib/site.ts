export const siteConfig = {
  name: "كوكب الصين",
  nameEn: "China Planet",

  description:
    "كوكب الصين — خدمات متكاملة للسياحة والدراسة وتعلم اللغة الصينية والتجارة والاستيراد وخدمات الشركات بين السعودية والصين.",

  contact: {
    phone: "+966560406506",
    whatsapp: "966560406506",
    email: "jimu1989@gmail.com",
  },

  location: {
    country: "المملكة العربية السعودية",
    countries: ["المملكة العربية السعودية", "الصين"],
  },

  social: {
    instagram: "",
    facebook: "",
    linkedin: "",
    tiktok: "",
  },

  // نضع الدومين الحقيقي هنا قبل النشر على Vercel.
  url: "",

  business: {
    serviceArea: "السعودية والصين",
    languages: ["العربية", "中文", "English"],
  },
} as const;
