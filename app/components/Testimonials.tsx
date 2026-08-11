"use client";

import { motion } from "framer-motion";

const trustPoints = [
  {
    number: "01",
    title: "نتواصل معك مباشرة",
    description:
      "نبدأ بفهم هدفك واحتياجك قبل اقتراح الخدمة المناسبة لك.",
  },
  {
    number: "02",
    title: "حلول حسب احتياجك",
    description:
      "لا نقدم نفس الحل للجميع. نرتب الخدمة بما يناسب رحلتك أو دراستك أو تجارتك.",
  },
  {
    number: "03",
    title: "متابعة واضحة",
    description:
      "نبقى معك في الخطوات المهمة ونوضح لك ما تحتاج معرفته قبل اتخاذ القرار.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      {/* إضاءة خلفية */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-[#8f090d]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

            <span className="text-xs font-bold tracking-[0.2em] text-[#f3c76a]">
              YOUR JOURNEY WITH US
            </span>

            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#d99a32]" />
          </div>

          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            تجربتك مع
            <span className="bg-gradient-to-b from-[#ffe59a] via-[#f4b942] to-[#c97816] bg-clip-text text-transparent">
              {" "}
              كوكب الصين
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/40 sm:text-base">
            نؤمن أن أفضل خدمة تبدأ بفهم احتياجك بوضوح، ثم
            مساعدتك خطوة بخطوة للوصول إلى الحل المناسب.
          </p>
        </motion.div>

        {/* النقاط */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {trustPoints.map((point, index) => (
            <motion.article
              key={point.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group rounded-[28px] border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#d99a32]/30 hover:bg-white/[0.045] sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.2em] text-[#d99a32]/50">
                  {point.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#d99a32]/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#d99a32]/50 group-hover:text-[#d99a32]">
                  +
                </span>
              </div>

              <h3 className="mt-10 text-xl font-bold text-white sm:text-2xl">
                {point.title}
              </h3>

              <p className="mt-4 text-sm leading-8 text-white/40">
                {point.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* رسالة الثقة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-5 rounded-[30px] border border-[#d99a32]/20 bg-gradient-to-br from-[#8f090d]/20 via-white/[0.02] to-transparent p-8 sm:p-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#d99a32]/70">
                CHINA PLANET
              </span>

              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                عندك هدف في الصين؟
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/40">
                أخبرنا بما تحتاجه، ودعنا نبدأ معك من الخطوة
                الأولى.
              </p>
            </div>

            <a
              href="#contact"
              className="w-fit shrink-0 rounded-full bg-[#d99a32] px-7 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#f3c76a]"
            >
              ابدأ الآن
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
