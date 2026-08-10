"use client";

import { useState } from "react";

const services = [
  "السياحة في الصين",
  "الدراسة في الصين",
  "تعلم اللغة الصينية",
  "التجارة والاستيراد",
  "خدمات الشركات",
  "خدمات الأفراد",
];

export default function Contact() {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const whatsappNumber = "966560406506";

  const sendWhatsApp = () => {
    const message = `مرحبًا، أريد التواصل مع كوكب الصين.

الاسم: ${name || "لم يذكر الاسم"}
الخدمة: ${service || "لم يتم اختيار خدمة"}

تفاصيل الطلب:
${details || "لا توجد تفاصيل إضافية."}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <section
      id="contact"
      dir="rtl"
      className="relative overflow-hidden bg-[#080808] py-20 text-white sm:py-28"
    >
      {/* لمعة ذهبية */}
      <div className="pointer-events-none absolute right-[-150px] top-1/3 h-96 w-96 rounded-full bg-[#d99a32]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* النص */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#d99a32]" />

              <span className="text-xs font-bold tracking-[0.2em] text-[#d99a32]">
                CONTACT CHINA PLANET
              </span>
            </div>

            <h2 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              خطوتك الأولى
              <span className="block text-white/25">
                تبدأ من هنا.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-8 text-white/40">
              أخبرنا بما تحتاجه في الصين، وسيتواصل معك فريقنا
              لمساعدتك واختيار الحل المناسب لك.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="tel:+966560406506"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#d99a32]/30 hover:bg-white/[0.06]"
              >
                <div className="text-[10px] text-[#d99a32]/60">
                  الهاتف
                </div>

                <div className="mt-2 text-sm font-medium">
                  +966 56 040 6506
                </div>
              </a>

              <a
                href="mailto:jimu1989@gmail.com"
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-[#d99a32]/30 hover:bg-white/[0.06]"
              >
                <div className="text-[10px] text-[#d99a32]/60">
                  البريد الإلكتروني
                </div>

                <div className="mt-2 text-sm font-medium">
                  jimu1989@gmail.com
                </div>
              </a>
            </div>
          </div>

          {/* النموذج */}
          <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-6 sm:p-9">
            <h3 className="text-2xl font-bold">
              ماذا تحتاج من الصين؟
            </h3>

            <p className="mt-2 text-sm text-white/30">
              اختر الخدمة وأخبرنا بالتفاصيل.
            </p>

            {/* الاسم */}
            <div className="mt-8">
              <label className="mb-2 block text-xs text-white/40">
                الاسم
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="اكتب اسمك"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d99a32]/50"
              />
            </div>

            {/* الخدمات */}
            <div className="mt-6">
              <label className="mb-3 block text-xs text-white/40">
                اختر الخدمة
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setService(item)}
                    className={`rounded-2xl border px-4 py-4 text-right text-sm transition-all ${
                      service === item
                        ? "border-[#d99a32] bg-[#d99a32] text-black"
                        : "border-white/10 bg-white/[0.02] text-white/50 hover:border-[#d99a32]/40 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* التفاصيل */}
            <div className="mt-6">
              <label className="mb-2 block text-xs text-white/40">
                تفاصيل طلبك
              </label>

              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="اكتب لنا ما تحتاجه بالتفصيل..."
                rows={5}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none placeholder:text-white/20 transition-colors focus:border-[#d99a32]/50"
              />
            </div>

            {/* واتساب */}
            <button
              type="button"
              onClick={sendWhatsApp}
              className="mt-8 w-full rounded-2xl bg-[#d99a32] px-6 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:bg-[#f3c76a]"
            >
              تواصل معنا عبر واتساب
            </button>

            <p className="mt-4 text-center text-[11px] text-white/20">
              سيتم فتح واتساب مع تجهيز رسالة الطلب تلقائيًا.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}