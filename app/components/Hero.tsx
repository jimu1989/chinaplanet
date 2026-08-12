"use client";

import { siteConfig } from "../lib/site";

const services = [
  {
    title: "سياحة",
    description: "رحلات وتجارب في الصين",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "دراسة",
    description: "جامعات وفرص تعليمية",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 11.5V16c2.8 2.2 7.2 2.2 10 0v-4.5" />
        <path d="M21 9v6" />
      </svg>
    ),
  },
  {
    title: "لغة صينية",
    description: "تعلم اللغة الصينية",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M4 5h9" />
        <path d="M8.5 3v2" />
        <path d="M6 5c.5 5 3.3 8.4 7 10" />
        <path d="M5 11c2.2 0 4.5-.7 6.5-2" />
        <path d="M14 14h6l-3-6-3 6Z" />
        <path d="M15 12h2" />
        <path d="M14 18h6" />
      </svg>
    ),
  },
  {
    title: "مصانع",
    description: "الوصول إلى المصانع",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M3 21h18" />
        <path d="M5 21V9l6 4V9l6 4V5h2v16" />
        <path d="M8 17h2" />
        <path d="M13 17h2" />
        <path d="M8 13h2" />
        <path d="M13 13h2" />
      </svg>
    ),
  },
  {
    title: "استيراد وتجارة",
    description: "توريد وتجارة من الصين",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M3 7h13v10H3z" />
        <path d="M16 10h3l2 3v4h-5z" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
        <path d="M6 4h6" />
        <path d="M9 2v4" />
      </svg>
    ),
  },
  {
    title: "خدمات الشركات",
    description: "حلول للأعمال والشركات",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </svg>
    ),
  },
  {
    title: "فعاليات ومناسبات",
    description: "تنظيم الحفلات والفعاليات والمناسبات الرسمية",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10" />
        <path d="M8 4v4a4 4 0 0 0 8 0V4" />
        <path d="M8 7H5a4 4 0 0 0 4 4" />
        <path d="M16 7h3a4 4 0 0 1-4 4" />
        <path d="M10 14h4" />
      </svg>
    ),
  },
];

export default function Hero() {
  const handleWhatsApp = () => {
    const message =
      "السلام عليكم، أرغب في التواصل مع كوكب الصين والاستفسار عن خدماتكم.";

    const whatsappUrl = `https://wa.me/${
      siteConfig.contact.whatsapp
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black"
      dir="rtl"
    >
      {/* صورة الصين */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/cities/beijing.jpg')",
        }}
        role="img"
        aria-label="منظر من مدينة بكين في الصين"
      />

      {/* طبقة حماية للصورة */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/55" />

      {/* تظليل سفلي */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* إضاءة ذهبية خفيفة */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d99b31]/10 blur-[110px]" />

      {/* المحتوى */}
      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center justify-center px-5 pb-12 pt-32 sm:px-6 lg:px-10">
        <div className="flex w-full max-w-6xl flex-col items-center text-center">
          {/* العلامة الصغيرة */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d99a32]/30 bg-black/30 px-4 py-2 text-xs font-semibold text-[#f3c76a] backdrop-blur-md sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#d99a32]" />
            بوابتك إلى الصين من السعودية
          </div>

          {/* العنوان الرئيسي */}
          <div className="max-w-5xl">
            <h1
              id="hero-title"
              className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]"
            >
              <span className="bg-gradient-to-b from-[#ffe59a] via-[#f4b942] to-[#c97816] bg-clip-text text-transparent">
                الصين
              </span>

              <br />

              <span className="text-white">
                أقرب مما تتخيل
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base font-medium leading-8 text-white/90 sm:text-xl md:text-2xl">
              اكتشفها . ادرسها . تعلّم لغتها . وابنِ تجارتك منها
            </p>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              كوكب الصين يقدم خدمات متكاملة للسياحة والدراسة واللغة الصينية
              والتجارة والاستيراد وخدمات الشركات وتنظيم الفعاليات والمناسبات
              بين السعودية والصين.
            </p>
          </div>

          {/* الخدمات */}
          <div className="mt-10 grid w-full max-w-5xl grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-x-5">
            {services.map((service) => (
              <div
                key={service.title}
                className="group flex min-w-0 flex-col items-center gap-2"
                title={service.description}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e6ad45]/50 bg-black/40 text-[#f5c75c] backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ffd76b] group-hover:bg-[#8b0000]/50">
                  {service.icon}
                </div>

                <span className="text-center text-[10px] font-semibold leading-5 text-white/90 sm:text-sm">
                  {service.title}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-11 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            {/* WhatsApp */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex h-14 w-full min-w-[230px] items-center justify-center gap-3 rounded-2xl border border-white/80 bg-black/30 px-7 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-black/60 sm:w-auto"
            >
              <span
                className="text-xl text-[#f5c75c]"
                aria-hidden="true"
              >
                ✆
              </span>

              تواصل معنا على WhatsApp
            </button>

            {/* الخدمات */}
            <a
              href="#services"
              className="flex h-14 w-full min-w-[250px] items-center justify-center gap-4 rounded-2xl border border-[#ff6b45] bg-gradient-to-r from-[#d71919] to-[#f13c20] px-8 text-base font-black text-white shadow-[0_12px_40px_rgba(220,30,20,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(220,30,20,0.5)] sm:w-auto"
            >
              <span className="text-xl" aria-hidden="true">
                →
              </span>

              ابدأ رحلتك الآن

              <span className="text-xl" aria-hidden="true">
                ✈
              </span>
            </a>
          </div>

          {/* الثقة */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/45 sm:text-sm">
            <span>السعودية والصين</span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <span>العربية · 中文 · English</span>

            <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />

            <span>خدمات للأفراد والشركات</span>
          </div>
        </div>
      </div>

      {/* نقاط جانبية */}
      <div
        className="absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 md:flex"
        aria-hidden="true"
      >
        <span className="h-4 w-4 rounded-full border-2 border-white bg-[#c91515] shadow-lg" />
        <span className="h-4 w-4 rounded-full border-2 border-white/80 bg-transparent" />
        <span className="h-4 w-4 rounded-full border-2 border-white/80 bg-transparent" />
      </div>
    </section>
  );
}