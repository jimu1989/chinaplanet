"use client";

import type { Language } from "../lib/i18n";
import { useState } from "react";
import { siteConfig } from "../lib/site";

const services = {
  ar: [
    "السياحة في الصين",
    "الدراسة في الصين",
    "تعلم اللغة الصينية",
    "التجارة والاستيراد",
    "خدمات الشركات",
    "خدمات الأفراد",
  ],
  en: [
    "China Tourism",
    "Study in China",
    "Learn Chinese",
    "Trade & Import",
    "Corporate Services",
    "Individual Services",
  ],
  zh: [
    "中国旅游",
    "中国留学",
    "学习中文",
    "贸易与进口",
    "企业服务",
    "个人服务",
  ],
} as const;

const contactTranslations = {
  ar: {
    label: "تواصل معنا",
    title: "ماذا تحتاج من",
    titleAccent: "كوكب الصين؟",
    description:
      "اختر الخدمة وأخبرنا بالتفاصيل، وسنجهز لك رسالة واتساب مباشرة.",
    request: "YOUR REQUEST",
    choose: "اختر ما تحتاج إليه",
    name: "الاسم",
    namePlaceholder: "اسمك الكامل",
    chooseService: "اختر الخدمة",
    chooseServiceHint: "اختر الخيار الأقرب لاحتياجك",
    details: "تفاصيل طلبك",
    detailsPlaceholder: "اكتب لنا ما تريد معرفته أو تفاصيل طلبك...",
    whatsappButton: "تواصل معنا عبر واتساب",
    whatsappHint: "سيتم فتح واتساب مع تجهيز رسالة الطلب تلقائيًا.",
    brand: "CHINA PLANET",
    heading: "نحن هنا.",
    headingAccent: "لنبدأ معك.",
    paragraph:
      "سواء كنت تخطط للسفر أو الدراسة، أو تبحث عن فرصة تجارية في الصين، تحدث معنا مباشرة وسنساعدك في الخطوة التالية.",
    phone: "اتصل بنا",
    email: "راسلنا عبر البريد",
    whatsapp: "تواصل معنا مباشرة",
    phoneLabel: "PHONE",
    emailLabel: "EMAIL",
    whatsappLabel: "WHATSAPP",
    location: "السعودية · الصين",
    whatsappGreeting: "السلام عليكم،",
    whatsappName: "أنا",
    whatsappService: "أرغب بالاستفسار عن:",
    whatsappDetails: "تفاصيل الطلب:",
    whatsappSource: "أرسلت هذا الطلب من موقع كوكب الصين.",
    defaultName: "عميل",
    defaultService: "استفسار عام",
    defaultDetails: "أرغب في معرفة المزيد عن الخدمة.",
  },

  en: {
    label: "CONTACT US",
    title: "What do you need from",
    titleAccent: "China Planet?",
    description:
      "Choose a service and tell us the details. We’ll prepare a WhatsApp message for you.",
    request: "YOUR REQUEST",
    choose: "Tell us what you need",
    name: "Name",
    namePlaceholder: "Your full name",
    chooseService: "Choose a service",
    chooseServiceHint: "Select the option closest to your needs",
    details: "Request details",
    detailsPlaceholder: "Tell us what you would like to know or share your request details...",
    whatsappButton: "Contact us on WhatsApp",
    whatsappHint: "WhatsApp will open with your request message prepared automatically.",
    brand: "CHINA PLANET",
    heading: "We’re here.",
    headingAccent: "Let’s get started.",
    paragraph:
      "Whether you’re planning a trip or studying in China, or looking for a business opportunity, talk to us directly and we’ll help you with the next step.",
    phone: "Call us",
    email: "Email us",
    whatsapp: "Contact us directly",
    phoneLabel: "PHONE",
    emailLabel: "EMAIL",
    whatsappLabel: "WHATSAPP",
    location: "Saudi Arabia · China",
    whatsappGreeting: "Hello,",
    whatsappName: "My name is",
    whatsappService: "I would like to inquire about:",
    whatsappDetails: "Request details:",
    whatsappSource: "I sent this request from the China Planet website.",
    defaultName: "Customer",
    defaultService: "General inquiry",
    defaultDetails: "I would like to know more about the service.",
  },

  zh: {
    label: "联系我们",
    title: "您需要中国星球",
    titleAccent: "为您提供什么？",
    description:
      "选择您需要的服务并告诉我们详情，我们会为您准备 WhatsApp 消息。",
    request: "YOUR REQUEST",
    choose: "告诉我们您的需求",
    name: "姓名",
    namePlaceholder: "您的姓名",
    chooseService: "选择服务",
    chooseServiceHint: "请选择最符合您需求的选项",
    details: "需求详情",
    detailsPlaceholder: "请告诉我们您想了解的内容或您的具体需求...",
    whatsappButton: "通过 WhatsApp 联系我们",
    whatsappHint: "WhatsApp 将自动打开，并准备好您的需求消息。",
    brand: "CHINA PLANET",
    heading: "我们就在这里。",
    headingAccent: "让我们从这里开始。",
    paragraph:
      "无论您计划来中国旅行、留学，还是正在寻找中国的商业机会，都可以直接联系我们，我们会帮助您完成下一步。",
    phone: "联系我们",
    email: "发送邮件",
    whatsapp: "直接联系我们",
    phoneLabel: "PHONE",
    emailLabel: "EMAIL",
    whatsappLabel: "WHATSAPP",
    location: "沙特阿拉伯 · 中国",
    whatsappGreeting: "您好，",
    whatsappName: "我的名字是",
    whatsappService: "我想咨询：",
    whatsappDetails: "需求详情：",
    whatsappSource: "此请求来自中国星球官方网站。",
    defaultName: "客户",
    defaultService: "一般咨询",
    defaultDetails: "我想了解更多关于这项服务的信息。",
  },
} as const;

export default function Contact({
  language = "ar",
}: {
  language?: Language;
}) {
  const [service, setService] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const t = contactTranslations[language];
  const currentServices = services[language];
  const isArabic = language === "ar";
  const direction = language === "ar" ? "rtl" : "ltr";

  const handleWhatsApp = () => {
    const customerName = name.trim();
    const customerEmail = email.trim();
    const customerPhone = phone.trim();
    const selectedService = service;
    const customerDetails = details.trim();

    if (!customerName || !selectedService) {
      return;
    }

    const message = [
      t.whatsappGreeting,
      "",
      t.whatsappName + " " + customerName + ".",
      "",
      "البريد الإلكتروني: " + (customerEmail || "غير مذكور"),
      "رقم الجوال: " + (customerPhone || "غير مذكور"),
      "",
      t.whatsappService + " " + selectedService,
      "",
      t.whatsappDetails,
      customerDetails,
      "",
      t.whatsappSource,
    ].join(String.fromCharCode(10));

    const whatsappUrl =
      "https://api.whatsapp.com/send?phone=" +
      siteConfig.contact.whatsapp +
      "&text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    void fetch("/api/service-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        service: selectedService,
        details: customerDetails,
        language,
      }),
    }).catch((error) => {
      console.error("SERVICE REQUEST SUBMIT ERROR:", error);
    });
  };

  return (
    <section
      id="contact"
      dir={direction}
      className="cp-section bg-[#f8f6f2]"
    >
      <div className="cp-container">
        <div className="max-w-3xl">
          <div
            className={`flex items-center gap-3 ${
              !isArabic ? "flex-row" : ""
            }`}
          >
            <span className="h-px w-10 bg-[#c94a3d]" />
            <span className="text-[10px] font-semibold tracking-[0.28em] text-[#9a9087]">
              {t.label}
            </span>
          </div>

          <h2 className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.25] tracking-tight text-[#171717] sm:text-5xl lg:text-[56px]">
            {t.title}
            <br />
            <span className="text-[#c94a3d]">{t.titleAccent}</span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-8 text-[#786e65]">
            {t.description}
          </p>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_0.72fr] lg:items-start lg:gap-24">
          <div className="rounded-[32px] bg-white p-7 shadow-[0_20px_70px_rgba(40,30,20,0.045)] sm:p-10 lg:p-12">
            <div className="mb-10">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#b5966c]">
                {t.request}
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#171717]">
                {t.choose}
              </h3>
            </div>

            <div className="grid gap-8">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-3 block text-xs font-semibold text-[#554d46]"
                >
                  {t.name}
                </label>

                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.namePlaceholder}
                  autoComplete="name"
                  className="w-full rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-5 py-4 text-sm text-[#302c28] outline-none transition-all duration-300 placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white focus:shadow-[0_8px_30px_rgba(201,74,61,0.06)]"
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-3 block text-xs font-semibold text-[#554d46]"
                  >
                    رقم الجوال
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    autoComplete="tel"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-5 py-4 text-sm text-[#302c28] outline-none transition-all duration-300 placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white focus:shadow-[0_8px_30px_rgba(201,74,61,0.06)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-3 block text-xs font-semibold text-[#554d46]"
                  >
                    البريد الإلكتروني
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#e3ddd6] bg-[#faf9f7] px-5 py-4 text-sm text-[#302c28] outline-none transition-all duration-300 placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:bg-white focus:shadow-[0_8px_30px_rgba(201,74,61,0.06)]"
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#554d46]">
                    {t.chooseService}
                  </p>

                  <p className="mt-1 text-[11px] text-[#9a9087]">
                    {t.chooseServiceHint}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {currentServices.map((item) => {
                    const selected = service === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setService(item)}
                        aria-pressed={selected}
                        className={`group relative min-h-[68px] rounded-2xl border px-5 py-4 text-sm font-medium transition-all duration-300 ${
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
                  {t.details}
                </label>

                <textarea
                  id="contact-details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder={t.detailsPlaceholder}
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
                  <span>{t.whatsappButton}</span>

                  <span className="text-base transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                </button>

                <p className="mt-4 text-center text-[10px] leading-6 text-[#9a9087]">
                  {t.whatsappHint}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pt-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#c94a3d]" />

              <span className="text-[10px] font-semibold tracking-[0.28em] text-[#9a9087]">
                {t.brand}
              </span>
            </div>

            <h3 className="mt-7 text-4xl font-semibold leading-[1.25] text-[#171717]">
              {t.heading}
              <br />
              <span className="text-[#c94a3d]">{t.headingAccent}</span>
            </h3>

            <p className="mt-6 max-w-md text-sm leading-8 text-[#786e65]">
              {t.paragraph}
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
                      {t.phoneLabel}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#302c28] transition-colors duration-300 group-hover:text-[#c94a3d]">
                      {t.phone}
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
                      {t.emailLabel}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#302c28] transition-colors duration-300 group-hover:text-[#c94a3d]">
                      {t.email}
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
                      {t.whatsappLabel}
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#302c28] transition-colors duration-300 group-hover:text-[#c94a3d]">
                      {t.whatsapp}
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
              {t.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
