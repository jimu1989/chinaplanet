"use client";

import Image from "next/image";
import Link from "next/link";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import { useCallback, useEffect, useRef, useState } from "react";

const cities = [
  {
    key: "beijing",
    image: "/cities/beijing.jpg",
    english: "BEIJING",
  },
  {
    key: "shanghai",
    image: "/cities/shanghai.jpg",
    english: "SHANGHAI",
  },
  {
    key: "shenzhen",
    image: "/cities/shenzhen.jpg",
    english: "SHENZHEN",
  },
  {
    key: "guangzhou",
    image: "/cities/guangzhou.jpg",
    english: "GUANGZHOU",
  },
  {
    key: "chengdu",
    image: "/cities/chengdu.jpg",
    english: "CHENGDU",
  },
];

const cityTranslations: Record<
  Language,
  Record<string, { name: string; description: string }>
> = {
  ar: {
    beijing: {
      name: "بكين",
      description: "التاريخ، الثقافة، والقلب السياسي للصين.",
    },
    shanghai: {
      name: "شنغهاي",
      description: "الحداثة، الأعمال، وأفق المدينة العالمي.",
    },
    shenzhen: {
      name: "شنتشن",
      description: "التقنية، الابتكار، وفرص الأعمال المستقبلية.",
    },
    guangzhou: {
      name: "قوانغتشو",
      description: "التجارة، المعارض، والأسواق العالمية.",
    },
    chengdu: {
      name: "تشنغدو",
      description: "تجربة مختلفة تجمع الطبيعة والثقافة والحياة العصرية.",
    },
  },
  en: {
    beijing: {
      name: "Beijing",
      description: "History, culture, and the political heart of China.",
    },
    shanghai: {
      name: "Shanghai",
      description: "Modernity, business, and a truly global city skyline.",
    },
    shenzhen: {
      name: "Shenzhen",
      description: "Technology, innovation, and future business opportunities.",
    },
    guangzhou: {
      name: "Guangzhou",
      description: "Trade, exhibitions, and global markets.",
    },
    chengdu: {
      name: "Chengdu",
      description:
        "A unique experience blending nature, culture, and modern life.",
    },
  },
  zh: {
    beijing: {
      name: "北京",
      description: "历史、文化与中国的政治中心。",
    },
    shanghai: {
      name: "上海",
      description: "现代化、商业与国际化都市天际线。",
    },
    shenzhen: {
      name: "深圳",
      description: "科技、创新与未来商业机遇。",
    },
    guangzhou: {
      name: "广州",
      description: "贸易、展会与全球市场。",
    },
    chengdu: {
      name: "成都",
      description: "融合自然、文化与现代生活的独特体验。",
    },
  },
};

export default function Destinations({
  language = "ar",
}: {
  language?: Language;
}) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const t = translations[language].destinations;
  const isArabic = language === "ar";

  const localizedCities = cities.map((city) => ({
    ...city,
    name: cityTranslations[language][city.key].name,
    description: cityTranslations[language][city.key].description,
  }));

  const cityCount = localizedCities.length;
  const current = localizedCities[active];

  const next = useCallback(() => {
    setActive((index) => (index + 1) % cityCount);
  }, [cityCount]);

  const previous = useCallback(() => {
    setActive((index) => (index - 1 + cityCount) % cityCount);
  }, [cityCount]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    touchEnd.current = event.changedTouches[0].clientX;

    if (touchStart.current !== null && touchEnd.current !== null) {
      const distance = touchStart.current - touchEnd.current;

      if (Math.abs(distance) > 50) {
        if (distance > 0) {
          next();
        } else {
          previous();
        }
      }
    }

    touchStart.current = null;
    touchEnd.current = null;
  };

  useEffect(() => {
    if (!lightbox) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(false);
      }

      if (event.key === "ArrowLeft") {
        next();
      }

      if (event.key === "ArrowRight") {
        previous();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox, next, previous]);

  return (
    <section
      id="destinations"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-editorial-section cp-section-atmosphere"
    >
      <div className="cp-editorial-container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="cp-editorial-kicker">
              <span>{t.label}</span>
            </div>

            <h2 className="cp-editorial-heading mt-6">
              <span className="block">
                {language === "ar"
                  ? "الصين"
                  : language === "zh"
                    ? "中国"
                    : "China"}
              </span>

              <span className="cp-editorial-accent block">
                {language === "ar"
                  ? "على طريقتك."
                  : language === "zh"
                    ? "按你的方式。"
                    : "Your way."}
              </span>
            </h2>
          </div>

          <div className="max-w-md md:pb-2">
            <p className="cp-editorial-copy">
              {language === "ar"
                ? "من المدن الكبرى إلى الوجهات التي تصنع الفرق، نقرّب لك الصين ونساعدك تختار المكان المناسب لهدفك."
                : language === "zh"
                  ? "从国际都市到特色目的地，我们帮助您更清晰地了解中国，并找到适合您目标的城市。"
                  : "From global cities to distinctive destinations, we help you understand China and choose the city that fits your goal."}
            </p>
          </div>
        </div>

        <div
          className="mt-16 overflow-hidden border-y border-[var(--cp-line)] bg-[var(--cp-brown-deep)]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid lg:grid-cols-[1.55fr_0.45fr]">
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="group relative min-h-[500px] overflow-hidden text-start sm:min-h-[620px] lg:min-h-[690px]"
              aria-label={
                language === "ar"
                  ? `عرض صورة ${current.name}`
                  : language === "zh"
                    ? `查看${current.name}图片`
                    : `View ${current.name} image`
              }
            >
              <Image
                key={current.image}
                src={current.image}
                alt={current.name}
                fill
                priority
                className="object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.035]"
                sizes="(max-width: 1024px) 100vw, 77vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />

              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-10 lg:p-14">
                <div className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.28em] text-white/65">
                  <span>{String(active + 1).padStart(2, "0")}</span>
                  <span className="h-px w-9 bg-[var(--cp-red-soft)]" />
                  <span>{current.english}</span>
                </div>

                <h3 className="mt-4 text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-8xl">
                  {current.name}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/72 sm:text-base">
                  {current.description}
                </p>
              </div>

              <span className="absolute right-7 top-7 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-lg text-white transition-all duration-500 group-hover:scale-110 group-hover:border-white group-hover:bg-white group-hover:text-[var(--cp-brown)] sm:right-10 sm:top-10">
                ↗
              </span>
            </button>

            <div className="border-t border-white/10 lg:border-t-0 lg:border-s lg:border-white/10">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-6 sm:px-8">
                  <span className="text-[10px] font-semibold tracking-[0.24em] text-white/45">
                    {language === "ar"
                      ? "وجهات الصين"
                      : language === "zh"
                        ? "中国目的地"
                        : "CHINA DESTINATIONS"}
                  </span>

                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white/35">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(cityCount).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col">
                  {localizedCities.map((city, index) => {
                    const isActive = index === active;

                    return (
                      <button
                        key={city.key}
                        type="button"
                        onClick={() => setActive(index)}
                        className={[
                          "group flex flex-1 items-center justify-between border-b border-white/10 px-6 py-6 text-start transition-all duration-500 sm:px-8",
                          isActive
                            ? "bg-white/[0.07]"
                            : "hover:bg-white/[0.035]",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-4">
                          <span
                            className={[
                              "text-[10px] font-semibold tracking-[0.18em] transition-colors duration-300",
                              isActive
                                ? "text-[var(--cp-red-soft)]"
                                : "text-white/30",
                            ].join(" ")}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span
                            className={[
                              "text-lg font-medium transition-all duration-300 sm:text-xl",
                              isActive
                                ? "translate-x-1 text-white"
                                : "text-white/48 group-hover:text-white/80",
                            ].join(" ")}
                          >
                            {city.name}
                          </span>
                        </span>

                        <span
                          className={[
                            "text-sm transition-all duration-300",
                            isActive
                              ? "translate-x-0 text-[var(--cp-red-soft)]"
                              : "translate-x-2 text-white/20 group-hover:translate-x-0 group-hover:text-white/60",
                          ].join(" ")}
                        >
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2">
                  <button
                    type="button"
                    onClick={previous}
                    className="flex h-16 items-center justify-center border-e border-white/10 text-white/55 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white"
                    aria-label={
                      language === "ar"
                        ? "المدينة السابقة"
                        : language === "zh"
                          ? "上一个城市"
                          : "Previous city"
                    }
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="flex h-16 items-center justify-center text-white/55 transition-colors duration-300 hover:bg-white/[0.05] hover:text-white"
                    aria-label={
                      language === "ar"
                        ? "المدينة التالية"
                        : language === "zh"
                          ? "下一个城市"
                          : "Next city"
                    }
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-6 text-[var(--cp-muted-light)]">
            {language === "ar"
              ? "اكتشف المدن، تعرّف على الفرص، وخلك أقرب إلى الصين."
              : language === "zh"
                ? "了解城市、发现机会，让中国离您更近。"
                : "Explore the cities, discover the opportunities, and get closer to China."}
          </p>

          <Link
            href={`/${language}/destinations`}
            className="cp-editorial-button inline-flex w-fit items-center gap-4"
          >
            {language === "ar"
              ? "استكشف كل الوجهات"
              : language === "zh"
                ? "探索所有目的地"
                : "Explore All Destinations"}

            <span>{isArabic ? "←" : "→"}</span>
          </Link>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.name}
          onClick={() => setLightbox(false)}
        >
          <div
            className="relative h-[82vh] w-full max-w-[1200px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-contain"
              sizes="100vw"
            />

            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute end-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/30 text-xl text-white backdrop-blur-md"
              aria-label={
                language === "ar"
                  ? "إغلاق"
                  : language === "zh"
                    ? "关闭"
                    : "Close"
              }
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
