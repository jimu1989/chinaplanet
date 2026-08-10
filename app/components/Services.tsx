"use client";

import Image from "next/image";

type IconName =
  | "plane"
  | "study"
  | "language"
  | "shopping"
  | "factory"
  | "company";

const services = [
  {
    title: "السياحة في الصين",
    description: "برامج سياحية، حجوزات، استقبال ومرافقة",
    image: "/cities/beijing.jpg",
    icon: "plane" as IconName,
  },
  {
    title: "الدراسة في الصين",
    description: "جامعات، قبول، منح دراسية وسكن واستشارات",
    image: "/cities/shanghai.jpg",
    icon: "study" as IconName,
  },
  {
    title: "تعلم اللغة الصينية",
    description: "دورات لغة، محادثة، HSK ولغة الأعمال",
    image: "/cities/chengdu.jpg",
    icon: "language" as IconName,
  },
  {
    title: "الاستيراد والتجارة",
    description: "اختر أفضل المنتجات واستورد بأمان وسهولة",
    image: "/cities/guangzhou.jpg",
    icon: "shopping" as IconName,
  },
  {
    title: "المصانع والموردون",
    description: "البحث عن المصانع والموردين وزيارات ميدانية وتدقيق",
    image: "/cities/shenzhen.jpg",
    icon: "factory" as IconName,
  },
  {
    title: "خدمات الشركات",
    description: "دعم ومرافقة واستشارات وحلول أعمال متكاملة",
    image: "/cities/beijing.jpg",
    icon: "company" as IconName,
  },
];

function ServiceIcon({ name }: { name: IconName }) {
  const common = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "plane") {
    return (
      <svg {...common}>
        <path d="M2 16.5 22 12 2 7.5l4 4.5-4 4.5Z" />
        <path d="M6 12h16" />
        <path d="m10 13 3 6" />
        <path d="m10 11 3-6" />
      </svg>
    );
  }

  if (name === "study") {
    return (
      <svg {...common}>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 11.5V16c3 2 7 2 10 0v-4.5" />
        <path d="M21 9v6" />
      </svg>
    );
  }

  if (name === "language") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9" />
        <path d="M12 3c-2.5 2.5-3.5 5.5-3.5 9s1 6.5 3.5 9" />
      </svg>
    );
  }

  if (name === "shopping") {
    return (
      <svg {...common}>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );
  }

  if (name === "factory") {
    return (
      <svg {...common}>
        <path d="M3 21V9l7 4V9l7 4V5h4v16H3Z" />
        <path d="M6 17h2" />
        <path d="M11 17h2" />
        <path d="M16 17h2" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M8 5V3h8v2" />
      <path d="M3 10h18" />
      <path d="M9 14h6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28"
    >
      {/* إضاءة خلفية */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#8f090d]/15 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* العنوان */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d99a32]" />

            <span className="text-sm font-bold text-[#f3c76a]">
              خدماتنا
            </span>

            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d99a32]" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            ماذا تريد من{" "}
            <span className="bg-gradient-to-b from-[#ffe59a] via-[#f4b942] to-[#c97816] bg-clip-text text-transparent">
              الصين؟
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/45 sm:text-base">
            نقدم لك حلولًا متكاملة لتحقيق أهدافك في الصين
          </p>
        </div>

        {/* الكروت */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-visible rounded-2xl border border-white/10 bg-[#111111] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-[#d99a32]/30 hover:shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
            >
              {/* الصورة */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              {/* الأيقونة - لا تتغير */}
              <div className="absolute right-5 top-[172px] z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-[#111111] bg-[#8f090d] text-[#f3c76a] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#c5161d] group-hover:text-[#ffd98a]">
                <ServiceIcon name={service.icon} />
              </div>

              {/* محتوى الكرت */}
              <div className="px-5 pb-6 pt-12 text-right">
                <h3 className="text-lg font-black text-white">
                  {service.title}
                </h3>

                <p className="mt-2 min-h-[52px] text-sm leading-6 text-white/45">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#f3c76a] transition-all duration-300 group-hover:gap-3"
                >
                  اكتشف المزيد
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* الخط السفلي */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-gradient-to-l from-[#8f090d] to-transparent" />

          <span className="h-2 w-2 rotate-45 bg-[#d99a32]" />

          <span className="h-px w-20 bg-gradient-to-r from-[#8f090d] to-transparent" />
        </div>
      </div>
    </section>
  );
}