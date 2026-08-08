"use client";

import { motion } from "framer-motion";

const categories = [
  "سياحة",
  "تعليم",
  "لغة",
  "تجارة",
  "خدمات",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#080808] text-white"
    >
      {/* صورة الخلفية */}
      <div className="absolute inset-0">
        <motion.img
          src="/cities/shanghai.jpg"
          alt="شنغهاي - الصين"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-full w-full object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/55 to-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-32 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          {/* العلامة */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-white" />

            <span className="text-xs text-white/70">
              CHINA PLANET
            </span>

            <span className="text-[10px] text-white/35">
              بوابتك إلى الصين
            </span>
          </motion.div>

          {/* العنوان */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-black leading-[1.05] tracking-tight sm:text-7xl lg:text-8xl"
          >
            الصين
            <span className="block text-white/35">
              أقرب مما تتخيل.
            </span>
          </motion.h1>

          {/* الوصف */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg"
          >
            كوكب الصين يساعدك على اكتشاف الصين، الدراسة فيها،
            تعلم لغتها، بناء تجارتك، والحصول على الخدمات التي
            تحتاجها من البداية حتى النهاية.
          </motion.p>

          {/* الأزرار */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a
              href="#services"
              className="rounded-full bg-white px-7 py-4 text-center text-sm font-bold !text-black transition-all hover:scale-[1.02] hover:bg-white/90"
            >
              اكتشف خدماتنا
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/20 bg-black/20 px-7 py-4 text-center text-sm font-medium text-white transition-all hover:border-white/40 hover:bg-white/10"
            >
              تواصل معنا
            </a>
          </motion.div>

          {/* التصنيفات */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/45 backdrop-blur-sm"
              >
                {category}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* مؤشر النزول */}
      <motion.a
        href="#why-us"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="text-[10px] tracking-[0.25em] text-white/30">
          SCROLL
        </div>

        <div className="mx-auto mt-3 h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </motion.a>
    </section>
  );
}