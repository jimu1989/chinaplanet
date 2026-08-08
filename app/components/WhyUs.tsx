"use client";

import { motion } from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "خبرة حقيقية في الصين",
    description:
      "خبرة تتجاوز 10 سنوات في التعامل مع المدن والجامعات والموردين والخدمات داخل الصين.",
  },
  {
    number: "02",
    title: "متابعة من البداية للنهاية",
    description:
      "لا نتركك بعد إتمام الحجز أو الخدمة. نتابع معك خطوة بخطوة قبل وأثناء وبعد الخدمة.",
  },
  {
    number: "03",
    title: "حلول تناسب احتياجك",
    description:
      "سواء كنت سائحًا أو طالبًا أو رجل أعمال، نصمم الخدمة بما يناسب هدفك وميزانيتك.",
  },
  {
    number: "04",
    title: "شبكة قوية داخل الصين",
    description:
      "نعتمد على شبكة من الشركاء والموردين والمرشدين لتسهيل تجربتك والوصول إلى خيارات موثوقة.",
  },
];

const stats = [
  {
    value: "+10",
    label: "سنوات من الخبرة",
  },
  {
    value: "+50",
    label: "مدينة نغطيها",
  },
  {
    value: "+5000",
    label: "عميل خدمناه",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="bg-[#080808] px-6 py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end"
        >
          <div>
            <span className="text-xs tracking-[0.25em] text-white/25">
              WHY CHINA PLANET
            </span>

            <h2 className="mt-5 text-4xl font-black leading-[1.15] sm:text-5xl lg:text-7xl">
              أنت لا تحتاج
              <span className="block text-white/25">
                مجرد خدمة.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-lg font-medium leading-8 text-white/70 sm:text-xl">
              تحتاج شريكًا
              <span className="text-white"> يعرف الصين.</span>
            </p>

            <p className="mt-5 max-w-xl text-sm leading-8 text-white/35">
              من أول فكرة إلى آخر خطوة، نستخدم خبرتنا وعلاقاتنا داخل الصين
              لنختصر عليك الوقت ونساعدك على اتخاذ القرار المناسب.
            </p>
          </div>
        </motion.div>

        {/* الإحصائيات */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="rounded-[28px] border border-white/10 bg-white/[0.025] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.05] sm:p-9"
            >
              <div className="text-5xl font-black tracking-tight sm:text-6xl">
                {stat.value}
              </div>

              <div className="mt-3 text-xs text-white/30">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* الأسباب */}
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <motion.article
              key={reason.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
              className="group rounded-[28px] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045] sm:p-9"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs text-white/20">
                  {reason.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm text-white/30 transition-all duration-300 group-hover:rotate-45 group-hover:border-white/30 group-hover:text-white">
                  +
                </span>
              </div>

              <h3 className="mt-10 text-xl font-bold sm:text-2xl">
                {reason.title}
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-8 text-white/35">
                {reason.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* الرسالة الختامية */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-5 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-8 sm:p-12"
        >
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-xs text-white/25">
                CHINA PLANET
              </span>

              <h3 className="mt-3 max-w-2xl text-2xl font-black leading-tight sm:text-3xl">
                الصين كبيرة، لكن رحلتك معها
                <span className="text-white/30">
                  {" "}
                  لا يجب أن تكون معقدة.
                </span>
              </h3>
            </div>

            <a
              href="#contact"
              className="w-fit shrink-0 rounded-full bg-white px-7 py-4 text-sm font-bold !text-black transition-transform hover:scale-[1.02]"
            >
              ابدأ رحلتك
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}