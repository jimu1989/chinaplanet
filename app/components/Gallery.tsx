"use client";

import { motion } from "framer-motion";

const cities = [
  {
    name: "بكين",
    english: "BEIJING",
    description: "العاصمة والتاريخ والثقافة الصينية.",
    image: "/cities/beijing.jpg",
  },
  {
    name: "شنغهاي",
    english: "SHANGHAI",
    description: "مدينة عالمية تجمع الأعمال والحياة العصرية.",
    image: "/cities/shanghai.jpg",
  },
  {
    name: "شنتشن",
    english: "SHENZHEN",
    description: "مدينة التكنولوجيا والابتكار والأعمال الحديثة.",
    image: "/cities/shenzhen.jpg",
  },
  {
    name: "قوانغتشو",
    english: "GUANGZHOU",
    description: "واحدة من أهم مراكز التجارة والأسواق في الصين.",
    image: "/cities/guangzhou.jpg",
  },
  {
    name: "تشنغدو",
    english: "CHENGDU",
    description: "مدينة مميزة بطابعها وثقافتها وطبيعتها.",
    image: "/cities/chengdu.jpg",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#090909] py-24 sm:py-28"
    >
      {/* إضاءة خلفية */}
      <div className="pointer-events-none absolute right-0 top-20 h-80 w-80 rounded-full bg-[#8f090d]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#d99a32]" />

            <span className="text-xs font-bold tracking-[0.25em] text-[#f3c76a]">
              DISCOVER CHINA
            </span>

            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d99a32]" />
          </div>

          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            اكتشف أهم{" "}
            <span className="bg-gradient-to-b from-[#ffe59a] via-[#f4b942] to-[#c97816] bg-clip-text text-transparent">
              مدن الصين
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/40 sm:text-base">
            من العاصمة التاريخية إلى المدن التجارية والتكنولوجية،
            نساعدك على اختيار الوجهة المناسبة لهدفك.
          </p>
        </motion.div>

        {/* المدن */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, index) => (
            <motion.article
              key={city.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className={`group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111111] ${
                index === 0
                  ? "sm:row-span-2 lg:row-span-2"
                  : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0 ? "h-[520px]" : "h-[360px]"
                }`}
              >
                {/* الصورة */}
                <motion.img
                  src={city.image}
                  alt={`مدينة ${city.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                />

                {/* التعتيم */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />

                {/* لمسة حمراء */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#4d0508]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* المحتوى */}
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  <span className="text-[10px] font-medium tracking-[0.3em] text-[#f3c76a]/70">
                    {city.english}
                  </span>

                  <h3 className="mt-2 text-3xl font-black text-white">
                    {city.name}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                    {city.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-[#f3c76a]/60 transition-colors group-hover:text-[#f3c76a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d99a32]" />

                    اكتشف المدينة

                    <span className="transition-transform duration-300 group-hover:-translate-x-1">
                      ←
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* الفاصل */}
        <div className="mt-14 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-gradient-to-l from-[#8f090d] to-transparent" />

          <span className="h-2 w-2 rotate-45 bg-[#d99a32]" />

          <span className="h-px w-20 bg-gradient-to-r from-[#8f090d] to-transparent" />
        </div>
      </div>
    </section>
  );
}