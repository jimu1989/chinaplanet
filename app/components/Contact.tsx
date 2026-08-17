"use client";

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

export default function Contact() {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

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

    const whatsappUrl = `https://wa.me/${
      siteConfig.contact.whatsapp
    }?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">

        {/* HEADER */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#c94a3d]" />

            <span className="text-[10px] font-semibold tracking-[0.28em] text-[#9a9087]">
              تواصل معنا
            </span>
          </div>

          <h2 className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.25] tracking-tight text-[#171717] sm:text-5xl lg:text-[56px]">
            ابدأ رحلتك
            <br />
            <span className="text-[#c94a3d]">مع الصين.</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-[#786e65]">
            أخبرنا بما تبحث عنه، وسنساعدك في الوصول إلى الخيار
            الأنسب لك في الصين.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.72fr] lg:items-start lg:gap-24">

          {/* FORM */}
          <div className="rounded-[32px] bg-white p-7 shadow-[0_20px_70px_rgba(40,30,20,0.045)] sm:p-10 lg:p-12">

            <div className="mb-10">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#b5966c]">
                YOUR REQUEST
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#171717]">
                أخبرنا بما تحتاج إليه
              </h3>
            </div>

            <div className="grid gap-8">

              {/* NAME */}
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
                  className="w-full rounded-xl border border-[#e3ddd6] bg-[#faf9f7] px-4 py-4 text-sm text-[#302c28] outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white"
                />
              </div>

              {/* SERVICE */}
              <div>
                <label
                  htmlFor="contact-service"
                  className="mb-3 block text-xs font-semibold text-[#554d46]"
                >
                  ماذا تحتاج؟
                </label>

                <select
                  id="contact-service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full rounded-xl border border-[#e3ddd6] bg-[#faf9f7] px-4 py-4 text-sm text-[#302c28] outline-none transition focus:border-[#c94a3d] focus:bg-white"
                >
                  <option value="">اختر الخدمة المناسبة</option>

                  {services.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* DETAILS */}
              <div>
                <label
                  htmlFor="contact-details"
                  className="mb-3 block text-xs font-semibold text-[#554d46]"
                >
                  كيف يمكننا مساعدتك؟
                </label>

                <textarea
                  id="contact-details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="اكتب لنا ما تريد معرفته أو تفاصيل طلبك..."
                  rows={5}
                  className="w-full resize-none rounded-xl border border-[#e3ddd6] bg-[#faf9f7] px-4 py-4 text-sm leading-7 text-[#302c28] outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white"
                />
              </div>

              <div className="pt-1">

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex min-h-[54px] w-full items-center justify-center rounded-xl bg-[#171717] px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#c94a3d]"
                >
                  إرسال الطلب عبر WhatsApp
                </button>

                <p className="mt-4 text-center text-[10px] leading-6 text-[#9a9087]">
                  سيتم فتح WhatsApp برسالة جاهزة تحتوي على بيانات طلبك.
                </p>

              </div>
            </div>
          </div>

          {/* CONTACT INFO */}
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
              سواء كنت تخطط للسفر أو الدراسة، أو تبحث عن فرصة
              تجارية في الصين، تحدث معنا مباشرة وسنساعدك في
              الخطوة التالية.
            </p>

            <div className="mt-10 border-t border-[#ded7d0]">

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group flex items-center justify-between border-b border-[#ded7d0] py-5"
              >
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a69c93]">
                    PHONE
                  </p>

                  <p
                    dir="ltr"
                    className="mt-2 text-sm font-semibold text-[#302c28] transition-colors group-hover:text-[#c94a3d]"
                  >
                    {siteConfig.contact.phone}
                  </p>
                </div>

                <span className="text-lg text-[#b8afa7] transition-transform group-hover:-translate-x-1">
                  ←
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group flex items-center justify-between border-b border-[#ded7d0] py-5"
              >
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a69c93]">
                    EMAIL
                  </p>

                  <p className="mt-2 break-all text-sm font-semibold text-[#302c28] transition-colors group-hover:text-[#c94a3d]">
                    {siteConfig.contact.email}
                  </p>
                </div>

                <span className="text-lg text-[#b8afa7] transition-transform group-hover:-translate-x-1">
                  ←
                </span>
              </a>

              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between border-b border-[#ded7d0] py-5"
              >
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.25em] text-[#a69c93]">
                    WHATSAPP
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#302c28] transition-colors group-hover:text-[#c94a3d]">
                    تواصل معنا مباشرة
                  </p>
                </div>

                <span className="text-lg text-[#b8afa7] transition-transform group-hover:-translate-x-1">
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
