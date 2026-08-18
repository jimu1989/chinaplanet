"use client";

import type { Language } from "../lib/i18n";
import { useState } from "react";
import { siteConfig } from "../lib/site";

const services = [
  "السياحة في الصين",
  "الدراسة في الصين",
  "تعلم اللغة الصينية",
  "التجارة والاستيراد",
  "خدمات الشركات",
  "خدمات الأفراد",
];

export default function Contact({
  language = "ar",
}: {
  language?: Language;
}) {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const isArabic = language === "ar";

  const handleWhatsApp = () => {
    const customerName = name.trim() || "عميل";
    const selectedService = service || "استفسار عام";
    const customerDetails =
      details.trim() || "أرغب في معرفة المزيد عن الخدمة.";

    const message = [
      "السلام عليكم،",
      "",
      `أنا ${customerName}.`,
      "",
      `أرغب بالاستفسار عن: ${selectedService}`,
      "",
      "تفاصيل الطلب:",
      customerDetails,
      "",
      "أرسلت هذا الطلب من موقع كوكب الصين.",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      dir={isArabic ? "rtl" : "ltr"}
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#c94a3d]" />
            <span className="text-[10px] font-semibold tracking-[0.28em] text-[#9a9087]">
              تواصل معنا
            </span>
          </div>

          <h2 className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.25] tracking-tight text-[#171717] sm:text-5xl lg:text-[56px]">
            ماذا تحتاج من
            <br />
            <span className="text-[#c94a3d]">كوكب الصين؟</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-[#786e65]">
            اختر الخدمة وأخبرنا بالتفاصيل، وسنجهز لك رسالة واتساب مباشرة.
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.72fr] lg:items-start lg:gap-24">
          <div className="rounded-[32px] bg-white p-7 shadow-[0_20px_70px_rgba(40,30,20,0.045)] sm:p-10 lg:p-12">
            <div className="mb-10">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#b5966c]">
                YOUR REQUEST
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#171717]">
                اختر ما تحتاج إليه
              </h3>
            </div>

            <div className="grid gap-8">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-3 block text-xs font-semibold text-[#554d46]"
                >
                  الاسم
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="اسمك الكامل"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-5 py-4 text-sm text-[#302c28] outline-none transition-all duration-300 placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white focus:shadow-[0_8px_30px_rgba(201,74,61,0.06)]"
                />
              </div>

              <div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#554d46]">
                    اختر الخدمة
                  </p>

                  <p className="mt-1 text-[11px] text-[#9a9087]">
                    اختر الخيار الأقرب لاحتياجك
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((item) => {
                    const selected = service === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setService(item)}
                        aria-pressed={selected}
                        className={`group relative min-h-[68px] rounded-2xl border px-5 py-4 text-right text-sm font-medium transition-all duration-300 ${
                          selected
                            ? "border-[#c94a3d] bg-[#c94a3d] text-white shadow-[0_12px_30px_rgba(201,74,61,0.16)]"
                            : "border-[#e3ddd6] bg-[#faf9f7] text-[#554d46] hover:-translate-y-0.5 hover:border-[#c94a3d] hover:bg-white hover:shadow-[0_8px_25px_rgba(40,30,20,0.06)]"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span>{item}</span>

                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] transition-all duration-300 ${
                              selected
                                ? "border-white/30 bg-white text-[#c94a3d]"
                                : "border-[#d9d1c9] text-transparent group-hover:border-[#c94a3d]"
                            }`}
                          >
                            ✓
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-details"
                  className="mb-3 block text-xs font-semibold text-[#554d46]"
                >
                  تفاصيل طلبك
                </label>

                <textarea
                  id="contact-details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="اكتب لنا ما تريد معرفته أو تفاصيل طلبك..."
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-5 py-4 text-sm leading-7 text-[#302c28] outline-none transition-all duration-300 placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white focus:shadow-[0_8px_30px_rgba(201,74,61,0.06)]"
                />
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="group flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl bg-[#171717] px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#c94a3d] hover:shadow-[0_12px_30px_rgba(201,74,61,0.16)]"
                >
                  <span>تواصل معنا عبر واتساب</span>

                  <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </button>

                <p className="mt-4 text-center text-[10px] leading-6 text-[#9a9087]">
                  سيتم فتح واتساب مع تجهيز رسالة الطلب تلقائيًا.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c94a3d]" />

              <span className="text-[10px] font-semibold tracking-[0.28em] text-[#9a9087]">
                CHINA PLANET
              </span>
            </div>

            <h3 className="mt-7 text-4xl font-semibold leading-[1.25] text-[#171717]">
              نحن هنا.
              <br />
              <span className="text-[#c94a3d]">لنبدأ معك.</span>
            </h3>

            <p className="mt-6 max-w-md text-sm leading-8 text-[#786e65]">
              سواء كنت تخطط للسفر أو الدراسة، أو تبحث عن فرصة تجارية في الصين،
              تحدث معنا مباشرة وسنساعدك في الخطوة التالية.
            </p>

            <div className="mt-10 border-t border-[#ded7d0]">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group flex items-center justify-between border-b border-[#ded7d0] py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ded7d0] bg-[#faf9f7] text-[#554d46] transition-all duration-500 group-hover:border-[#c94a3d] group-hover:bg-[#c94a3d] group-hover:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-[19px] w-[19px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.8 3.5H5.6A2.1 2.1 0 0 0 3.5 5.6C3.5 14 10 20.5 18.4 20.5a2.1 2.1 0 0 0 2.1-2.1v-2.2a1.6 1.6 0 0 0-1.2-1.5l-3-.7a1.6 1.6 0 0 0-1.7.7l-.9 1.2a13.5 13.5 0 0 1-4.6-4.6l1.2-.9a1.6 1.6 0 0 0 .7-1.7l-.7-3A1.6 1.6 0 0 0 7.8 3.5Z"
                      />
                    </svg>
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a69c93]">
                      PHONE
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#302c28] transition-colors duration-300 group-hover:text-[#c94a3d]">
                      اتصل بنا
                    </p>
                  </div>
                </div>

                <span className="text-lg text-[#b8afa7] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#c94a3d]">
                  ←
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-center justify-between border-b border-[#ded7d0] py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ded7d0] bg-[#faf9f7] text-[#554d46] transition-all duration-500 group-hover:border-[#c94a3d] group-hover:bg-[#c94a3d] group-hover:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-[19px] w-[19px]"
                    >
                      <rect
                        x="3.5"
                        y="5"
                        width="17"
                        height="14"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 7 7.5 5.3L19.5 7"
                      />
                    </svg>
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a69c93]">
                      EMAIL
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#302c28] transition-colors duration-300 group-hover:text-[#c94a3d]">
                      راسلنا عبر البريد
                    </p>
                  </div>
                </div>

                <span className="text-lg text-[#b8afa7] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#c94a3d]">
                  ←
                </span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[#ded7d0] py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ded7d0] bg-[#faf9f7] text-[#554d46] transition-all duration-500 group-hover:border-[#c94a3d] group-hover:bg-[#c94a3d] group-hover:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-[19px] w-[19px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.3 3.7A10.7 10.7 0 0 0 3.2 16.8L2.5 21.5l4.8-1.2A10.7 10.7 0 1 0 20.3 3.7Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.2 7.8c.3-.4.6-.4.9-.1l1.2 1.4c.2.3.2.6 0 .9l-.7.8a8.4 8.4 0 0 0 3.6 3.6l.8-.7c.3-.2.7-.2.9 0l1.4 1.2c.3.3.3.6-.1.9-1.3.4-2.7.2-3.7-.7a11.2 11.2 0 0 1-3.9-3.9c-1-1-1.2-2.4-.7-3.7Z"
                      />
                    </svg>
                  </span>

                  <div>
                    <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a69c93]">
                      WHATSAPP
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#302c28] transition-colors duration-300 group-hover:text-[#c94a3d]">
                      تواصل معنا مباشرة
                    </p>
                  </div>
                </div>

                <span className="text-lg text-[#b8afa7] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#c94a3d]">
                  ←
                </span>
              </a>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[10px] font-medium tracking-[0.15em] text-[#9a9087]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#c94a3d]" />
              السعودية · الصين
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}