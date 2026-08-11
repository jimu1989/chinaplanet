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
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold tracking-wide text-[#f3c76a]">
            تواصل معنا
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            ابدأ رحلتك مع الصين
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-white/60 sm:text-base">
            أخبرنا بما تحتاج إليه، وسنتواصل معك عبر WhatsApp لمساعدتك في اختيار
            الخدمة المناسبة.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          {/* FORM */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            <div className="grid gap-5">
              {/* NAME */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  الاسم
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="اكتب اسمك"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-[#d99a32]/60 focus:ring-1 focus:ring-[#d99a32]/30"
                />
              </div>

              {/* SERVICE */}
              <div>
                <label
                  htmlFor="contact-service"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  الخدمة المطلوبة
                </label>

                <select
                  id="contact-service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition focus:border-[#d99a32]/60 focus:ring-1 focus:ring-[#d99a32]/30"
                >
                  <option value="" className="bg-[#111111]">
                    اختر الخدمة
                  </option>

                  {services.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[#111111]"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* DETAILS */}
              <div>
                <label
                  htmlFor="contact-details"
                  className="mb-2 block text-sm font-semibold text-white"
                >
                  كيف يمكننا مساعدتك؟
                </label>

                <textarea
                  id="contact-details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder="اكتب تفاصيل طلبك أو استفسارك..."
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm leading-7 text-white placeholder:text-white/30 outline-none transition focus:border-[#d99a32]/60 focus:ring-1 focus:ring-[#d99a32]/30"
                />
              </div>

              {/* WHATSAPP CTA */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="rounded-2xl bg-[#d99a32] px-6 py-4 text-sm font-bold text-black transition-all hover:bg-[#f3c76a] hover:shadow-lg hover:shadow-[#d99a32]/20 active:scale-[0.99]"
              >
                إرسال الطلب عبر WhatsApp
              </button>

              <p className="text-center text-xs leading-6 text-white/40">
                سيتم فتح WhatsApp برسالة جاهزة تحتوي على بيانات طلبك.
              </p>
            </div>
          </div>

          {/* DIRECT CONTACT */}
          <div className="rounded-3xl border border-[#d99a32]/20 bg-[#4d0508]/40 p-6 sm:p-8">
            <p className="text-sm font-bold text-[#f3c76a]">
              تواصل مباشر
            </p>

            <h3 className="mt-3 text-2xl font-bold text-white">
              نحن هنا لمساعدتك
            </h3>

            <p className="mt-4 text-sm leading-8 text-white/60">
              سواء كنت تخطط لرحلة إلى الصين، أو تبحث عن فرصة للدراسة، أو تريد
              البدء في التجارة والاستيراد، يمكنك التواصل معنا مباشرة.
            </p>

            <div className="mt-8 grid gap-3">
              {/* PHONE */}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                aria-label={`الاتصال على ${siteConfig.contact.phone}`}
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white transition hover:border-[#d99a32]/40 hover:bg-black/30"
              >
                <span className="block text-xs text-white/40">
                  الهاتف
                </span>

                <span className="mt-1 block font-semibold">
                  {siteConfig.contact.phone}
                </span>
              </a>

              {/* EMAIL */}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                aria-label={`إرسال بريد إلى ${siteConfig.contact.email}`}
                className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4 text-sm text-white transition hover:border-[#d99a32]/40 hover:bg-black/30"
              >
                <span className="block text-xs text-white/40">
                  البريد الإلكتروني
                </span>

                <span className="mt-1 block break-all font-semibold">
                  {siteConfig.contact.email}
                </span>
              </a>

              {/* WHATSAPP */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="rounded-2xl border border-[#d99a32]/30 bg-[#d99a32]/10 px-5 py-4 text-right text-sm text-white transition hover:bg-[#d99a32]/15"
              >
                <span className="block text-xs text-white/40">
                  WhatsApp
                </span>

                <span className="mt-1 block font-semibold text-[#f3c76a]">
                  تواصل معنا مباشرة
                </span>
              </button>
            </div>

            {/* SERVICE AREA */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs text-white/40">
                نطاق الخدمة
              </p>

              <p className="mt-2 text-sm font-semibold text-white">
                السعودية والصين
              </p>

              <p className="mt-2 text-xs leading-6 text-white/40">
                العربية · 中文 · English
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
