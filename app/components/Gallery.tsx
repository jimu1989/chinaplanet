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
      className="bg-[#080808] px-6 py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="text-xs tracking-[0.25em] text-white/25">
            DISCOVER CHINA
          </span>

          <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            اكتشف أهم
            <span className="block text-white/25">
              مدن الصين.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-sm leading-8 text-white/35">
            من العاصمة التاريخية إلى المدن التجارية والتكنولوجية،
            نساعدك على اختيار الوجهة المناسبة لهدفك.
          </p>
        </motion.div>

        {/* المدن */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((city, index) => (
            <motion.article
              key={city.name}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.02] ${
                index === 0
                  ? "sm:row-span-2 lg:row-span-2"
                  : ""
              }`}
            >
              <div
                className={`relative ${
                  index === 0
                    ? "h-[520px]"
                    : "h-[360px]"
                }`}
              >
                {/* الصورة */}
                <motion.img
                  src={city.image}
                  alt={`مدينة ${city.name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  whileHover={{
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                />

                {/* طبقة التعتيم */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

                {/* المحتوى */}
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  <span className="text-[10px] tracking-[0.3em] text-white/40">
                    {city.english}
                  </span>

                  <h3 className="mt-2 text-3xl font-black">
                    {city.name}
                  </h3>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/55">
                    {city.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs text-white/40 transition-colors group-hover:text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
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
      </div>
    </section>
  );
}