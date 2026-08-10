"use client";

const services = [
  {
    title: "سياحة",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 16.5 22 8l-4 4-5.5 1.5L9 19l-2-1 1-4-6-1.5Z" />
        <path d="m13 13.5 3 3" />
      </svg>
    ),
  },
  {
    title: "دراسة",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
        <path d="M6 11.5V16c2 1.8 10 1.8 12 0v-4.5" />
        <path d="M21 10v5" />
      </svg>
    ),
  },
  {
    title: "لغة صينية",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 5h16" />
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <path d="M6 10h12" />
        <path d="M8 14h8" />
        <path d="M10 18h4" />
        <path d="M12 10v11" />
      </svg>
    ),
  },
  {
    title: "مصانع",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 21V10l6 3V9l6 3V7l6 3v11H3Z" />
        <path d="M6 17h2" />
        <path d="M11 17h2" />
        <path d="M16 17h2" />
      </svg>
    ),
  },
  {
    title: "استيراد وتجارة",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7h18" />
        <path d="M5 7l1.5-3h11L19 7" />
        <path d="M4 7v13h16V7" />
        <path d="M9 11h6" />
        <path d="M9 15h6" />
      </svg>
    ),
  },
  {
    title: "خدمات الشركات",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="6" width="18" height="14" rx="2" />
        <path d="M8 6V4h8v2" />
        <path d="M3 11h18" />
        <path d="M10 11v2h4v-2" />
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[760px] overflow-hidden bg-black"
    >
      {/* صورة الصين - صورة موجودة أصلًا في المشروع */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/cities/beijing.jpg')",
        }}
      />

      {/* طبقة داكنة */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/60" />

      {/* تظليل سفلي */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/90 to-transparent" />

      {/* المحتوى */}
      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center justify-center px-6 pb-10 pt-32 lg:px-10">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">

          {/* العنوان */}
          <div className="max-w-4xl">
            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
              {/* الصين فقط بالذهبي */}
              <span className="bg-gradient-to-b from-[#ffe59a] via-[#f4b942] to-[#c97816] bg-clip-text text-transparent">
                الصين
              </span>

              <br />

              {/* أقرب مما تتخيل أبيض */}
              <span className="text-white">
                أقرب مما تتخيل
              </span>
            </h1>

            <p className="mt-7 text-lg font-medium text-white/90 sm:text-xl md:text-2xl">
              اكتشفها . ادرسها . تجارتك تبدأ منها
            </p>
          </div>

          {/* الخدمات */}
          <div className="mt-10 grid grid-cols-3 gap-x-8 gap-y-7 sm:grid-cols-6 sm:gap-x-7">
            {services.map((service) => (
              <div
                key={service.title}
                className="group flex min-w-[72px] flex-col items-center gap-2"
              >
                {/* الأيقونة */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#e6ad45]/50 bg-black/40 text-[#f5c75c] backdrop-blur-md transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#ffd76b] group-hover:bg-[#8b0000]/50">
                  {service.icon}
                </div>

                {/* اسم الخدمة */}
                <span className="whitespace-nowrap text-xs font-semibold text-white/90 sm:text-sm">
                  {service.title}
                </span>
              </div>
            ))}
          </div>

          {/* الأزرار */}
          <div className="mt-11 flex flex-col-reverse items-center gap-4 sm:flex-row">

            {/* واتساب */}
            <a
              href="#contact"
              className="flex h-14 min-w-[230px] items-center justify-center gap-3 rounded-2xl border border-white/80 bg-black/30 px-7 text-base font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-black/60"
            >
              <span className="text-xl text-[#f5c75c]">
                ✆
              </span>

              تواصل معنا على واتساب
            </a>

            {/* ابدأ رحلتك */}
            <a
              href="#services"
              className="flex h-14 min-w-[250px] items-center justify-center gap-4 rounded-2xl border border-[#ff6b45] bg-gradient-to-r from-[#d71919] to-[#f13c20] px-8 text-base font-black text-white shadow-[0_12px_40px_rgba(220,30,20,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(220,30,20,0.5)]"
            >
              <span className="text-xl">
                →
              </span>

              ابدأ رحلتك الآن

              <span className="text-xl">
                ✈
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* نقاط السلايدر */}
      <div className="absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 md:flex">
        <span className="h-4 w-4 rounded-full border-2 border-white bg-[#c91515] shadow-lg" />
        <span className="h-4 w-4 rounded-full border-2 border-white/80 bg-transparent" />
        <span className="h-4 w-4 rounded-full border-2 border-white/80 bg-transparent" />
      </div>

      {/* لمعة ذهبية */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d99b31]/10 blur-[100px]" />
    </section>
  );
}