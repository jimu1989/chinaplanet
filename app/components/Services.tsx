"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "السياحة في الصين",
    description:
      "برامج سياحية متكاملة، حجوزات فنادق وطيران، استقبال من المطار، ومرشدين سياحيين.",
    items: [
      "برامج مخصصة",
      "حجز الفنادق والطيران",
      "استقبال من المطار",
      "مرشد سياحي",
    ],
  },
  {
    number: "02",
    title: "الدراسة في الصين",
    description:
      "نساعدك في اختيار الجامعة، التقديم، المنح، السكن، ومتابعة الطالب.",
    items: [
      "الجامعات والمعاهد",
      "القبول والتسجيل",
      "المنح الدراسية",
      "السكن الطلابي",
    ],
  },
  {
    number: "03",
    title: "تعلم اللغة الصينية",
    description:
      "دورات اللغة الصينية لجميع المستويات، حضوريًا أو أونلاين، مع التركيز على المحادثة.",
    items: [
      "جميع المستويات",
      "HSK",
      "دورات أونلاين",
      "محادثة يومية",
    ],
  },
  {
    number: "04",
    title: "التجارة والاستيراد",
    description:
      "نساعدك في الوصول إلى المورد المناسب والتفاوض والفحص والشحن من الصين.",
    items: [
      "البحث عن موردين",
      "التحقق من المورد",
      "التفاوض على الأسعار",
      "الشحن والاستيراد",
    ],
  },
  {
    number: "05",
    title: "خدمات الشركات",
    description:
      "حلول متكاملة للشركات ورجال الأعمال الراغبين في بناء أعمالهم داخل الصين.",
    items: [
      "تأسيس الشركات",
      "البحث عن شركاء",
      "الترجمة التجارية",
      "المعارض والمؤتمرات",
    ],
  },
  {
    number: "06",
    title: "خدمات الأفراد",
    description:
      "مرافقة وترجمة ومساعدة في الإجراءات اليومية التي تحتاجها أثناء وجودك في الصين.",
    items: [
      "مرافقة وترجمة",
      "فتح حساب بنكي",
      "شريحة واتصال",
      "نصائح وإرشادات",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#080808] px-6 py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-between gap-8 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <span className="text-xs tracking-[0.25em] text-white/25">
              OUR SERVICES
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              كل ما تحتاجه
              <span className="block text-white/25">
                عن الصين في مكان واحد.
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-white/35">
              من أول خطوة في التخطيط إلى الوصول والتنفيذ، نقدم لك حلولًا
              متكاملة للأفراد والشركات.
            </p>
          </div>

          <a
            href="#contact"
            className="w-fit rounded-full bg-white px-7 py-4 text-sm font-bold !text-black transition hover:scale-[1.02] hover:bg-white/90"
          >
            اطلب خدمتك
          </a>
        </motion.div>

        {/* الخدمات */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="group rounded-[28px] border border-white/10 bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/20">
                  {service.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition group-hover:border-white/30 group-hover:text-white">
                  →
                </span>
              </div>

              <h3 className="mt-10 text-xl font-bold sm:text-2xl">
                {service.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/35">
                {service.description}
              </p>

              <div className="mt-7 border-t border-white/10 pt-6">
                <ul className="space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-xs text-white/45"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}