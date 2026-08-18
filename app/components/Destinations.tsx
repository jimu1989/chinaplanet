"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const cities = [
  {
    name: "بكين",
    english: "BEIJING",
    image: "/cities/beijing.jpg",
    description: "التاريخ، الثقافة، والقلب السياسي للصين.",
  },
  {
    name: "شنغهاي",
    english: "SHANGHAI",
    image: "/cities/shanghai.jpg",
    description: "الحداثة، الأعمال، وأفق المدينة العالمي.",
  },
  {
    name: "شنتشن",
    english: "SHENZHEN",
    image: "/cities/shenzhen.jpg",
    description: "التقنية، الابتكار، وفرص الأعمال المستقبلية.",
  },
  {
    name: "قوانغتشو",
    english: "GUANGZHOU",
    image: "/cities/guangzhou.jpg",
    description: "التجارة، المعارض، والأسواق العالمية.",
  },
  {
    name: "تشنغدو",
    english: "CHENGDU",
    image: "/cities/chengdu.jpg",
    description: "تجربة مختلفة تجمع الطبيعة والثقافة والحياة العصرية.",
  },
];

export default function Destinations() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  const current = cities[active];

  const next = () => {
    setActive((index) => (index + 1) % cities.length);
  };

  const previous = () => {
    setActive((index) => (index - 1 + cities.length) % cities.length);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    touchEnd.current = event.changedTouches[0].clientX;

    if (
      touchStart.current !== null &&
      touchEnd.current !== null
    ) {
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
  }, [lightbox]);

  return (
    <section
      id="destinations"
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">

        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="cp-line" />
            <span className="cp-label">
              وجهات مختارة
            </span>
            <span className="cp-line" />
          </div>

          <h2 className="mt-5 text-3xl font-medium text-[#40372f] sm:text-4xl lg:text-[42px]">
            الصين كما لم ترها من قبل
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#786e65]">
            اختر المدينة التي تناسب رحلتك، عملك، دراستك
            أو تجربتك القادمة.
          </p>
        </div>

        {/* FEATURED GALLERY */}
        <div className="mt-16">

          <div
            className="relative overflow-hidden rounded-[30px] bg-[#171717] shadow-[0_25px_80px_rgba(40,30,20,0.10)]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >

            {/* MAIN IMAGE */}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="group relative block h-[430px] w-full cursor-zoom-in overflow-hidden text-right sm:h-[520px] lg:h-[620px]"
              aria-label={`تكبير صورة ${current.name}`}
            >
              <Image
                key={current.image}
                src={current.image}
                alt={current.name}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.025]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />

              {/* CITY INFO */}
              <div className="absolute bottom-0 right-0 left-0 p-7 sm:p-10 lg:p-12">

                <div className="flex items-end justify-between gap-6">

                  <div>
                    <span className="text-[9px] font-semibold tracking-[0.3em] text-white/65">
                      {current.english}
                    </span>

                    <h3 className="mt-2 text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
                      {current.name}
                    </h3>

                    <p className="mt-3 max-w-md text-xs leading-6 text-white/70 sm:text-sm">
                      {current.description}
                    </p>
                  </div>

                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-[#171717] sm:flex">
                    ↗
                  </span>

                </div>
              </div>
            </button>

            {/* ARROWS */}
            <button
              type="button"
              onClick={previous}
              aria-label="الصورة السابقة"
              className="absolute right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/15 text-xl text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#171717] sm:right-7"
            >
              →
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="الصورة التالية"
              className="absolute left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/15 text-xl text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#171717] sm:left-7"
            >
              ←
            </button>

            {/* COUNTER */}
            <div className="absolute left-7 top-7 rounded-full border border-white/20 bg-black/15 px-4 py-2 text-[10px] font-semibold tracking-[0.2em] text-white backdrop-blur-md sm:left-10 sm:top-10">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(cities.length).padStart(2, "0")}
            </div>
          </div>

          {/* THUMBNAILS */}
          <div className="mt-5 grid grid-cols-5 gap-2 sm:gap-3">
            {cities.map((city, index) => (
              <button
                key={city.english}
                type="button"
                onClick={() => setActive(index)}
                className={`group relative overflow-hidden rounded-xl transition-all duration-500 ${
                  active === index
                    ? "ring-2 ring-[#c94a3d] ring-offset-2 ring-offset-[#f8f6f2]"
                    : "opacity-55 hover:opacity-100"
                }`}
                aria-label={`عرض ${city.name}`}
              >
                <div className="relative aspect-[1.5]">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    sizes="20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </button>
            ))}
          </div>

          {/* MOBILE HINT */}
          <p className="mt-5 text-center text-[10px] tracking-[0.12em] text-[#9a9087] sm:hidden">
            اسحب الصورة للتنقل بين الوجهات
          </p>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#171717]/95 p-5 backdrop-blur-md sm:p-10"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            aria-label="إغلاق"
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:bg-white hover:text-[#171717]"
          >
            ×
          </button>

          <div
            className="relative h-[70vh] w-full max-w-6xl overflow-hidden rounded-[24px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={current.image}
              alt={current.name}
              fill
              sizes="100vw"
              className="object-contain"
            />

            <div className="absolute bottom-5 right-5 rounded-full bg-black/40 px-4 py-2 text-xs text-white backdrop-blur-md">
              {current.name} ·{" "}
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(cities.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
