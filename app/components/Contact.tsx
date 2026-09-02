"use client";

import type { Language } from "../lib/i18n";
import { useState } from "react";
import { siteConfig } from "../lib/site";

const services = {
  ar: [
    "السياحة في الصين",
    "الدراسة في الصين",
    "تعلم اللغة الصينية",
    "الترجمة",
    "تنظيم الفعاليات الصينية",
    "التجارة والاستيراد",
    "خدمات الشركات",
    "خدمات الأفراد",
  ],
  en: [
    "China Tourism",
    "Study in China",
    "Learn Chinese",
    "Translation",
    "Chinese Events & Celebrations",
    "Trade & Import",
    "Corporate Services",
    "Individual Services",
  ],
  zh: [
    "中国旅游",
    "中国留学",
    "学习中文",
    "翻译服务",
    "中国主题活动与庆典策划",
    "贸易与进口",
    "企业服务",
    "个人服务",
  ],
} as const;

const contactTranslations = {
  ar: {
    label: "تواصل معنا",
    title: "الصين؟",
    titleAccent: "خلّها علينا.",
    description:
      "قل لنا وش تحتاج، ونرتّب لك الخطوة التالية مع كوكب الصين.",
    request: "YOUR REQUEST",
    choose: "وش تحتاج؟",
    name: "الاسم",
    namePlaceholder: "اسمك الكامل",
    chooseService: "الخدمة",
    chooseServiceHint: "اختر الخدمة الأقرب لاحتياجك",
    details: "تفاصيل طلبك",
    detailsPlaceholder: "اكتب لنا التفاصيل أو الشيء الذي تريد معرفته...",
    whatsappButton: "تواصل معنا عبر واتساب",
    whatsappHint: "ستفتح واتساب مع تجهيز رسالة طلبك تلقائيًا.",
    brand: "CHINA PLANET",
    heading: "جاهز تبدأ؟",
    headingAccent: "خلّنا نبدأ.",
    phone: "اتصل بنا",
    email: "راسلنا عبر البريد",
    whatsapp: "واتساب",
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
    title: "China?",
    titleAccent: "We’ll Bring It Closer.",
    description:
      "Tell us what you need, and we’ll help you take the next step with China Planet.",
    request: "YOUR REQUEST",
    choose: "What do you need?",
    name: "Name",
    namePlaceholder: "Your full name",
    chooseService: "Service",
    chooseServiceHint: "Choose the service closest to your needs",
    details: "Request details",
    detailsPlaceholder: "Tell us what you need or what you would like to know...",
    whatsappButton: "Contact us on WhatsApp",
    whatsappHint: "WhatsApp will open with your request prepared automatically.",
    brand: "CHINA PLANET",
    heading: "Ready to start?",
    headingAccent: "Let’s begin.",
    phone: "Call us",
    email: "Email us",
    whatsapp: "WhatsApp",
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
    title: "中国？",
    titleAccent: "让我们为您拉近距离。",
    description:
      "告诉我们您的需求，我们会帮助您与中国星球一起迈出下一步。",
    request: "YOUR REQUEST",
    choose: "您需要什么？",
    name: "姓名",
    namePlaceholder: "您的姓名",
    chooseService: "服务",
    chooseServiceHint: "请选择最符合您需求的服务",
    details: "需求详情",
    detailsPlaceholder: "请告诉我们您的需求或想了解的内容...",
    whatsappButton: "通过 WhatsApp 联系我们",
    whatsappHint: "WhatsApp 将自动打开并准备好您的需求消息。",
    brand: "CHINA PLANET",
    heading: "准备好了吗？",
    headingAccent: "让我们开始。",
    phone: "联系我们",
    email: "发送邮件",
    whatsapp: "WhatsApp",
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

  const handleWhatsApp = async () => {
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
      customerDetails || t.defaultDetails,
      "",
      t.whatsappSource,
    ].join(String.fromCharCode(10));

    const whatsappUrl =
      "https://api.whatsapp.com/send?phone=" +
      siteConfig.contact.whatsapp +
      "&text=" +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    try {
      await fetch("/api/service-requests", {
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
      });
    } catch {
      // WhatsApp already opened; request logging is best-effort.
    }
  };

  return (
    <section
      id="contact"
      dir={direction}
      className="cp-editorial-section bg-[var(--cp-brown-deep)] text-white"
    >
      <div className="cp-editorial-container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3 text-[var(--cp-red-soft)]">
              <span className="h-px w-10 bg-current" />
              <span className="text-[10px] font-semibold tracking-[0.25em]">
                {t.label}
              </span>
            </div>

            <h2 className="mt-7 max-w-3xl text-[clamp(3.3rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              <span className="block">{t.title}</span>
              <span className="block text-[var(--cp-red-soft)]">
                {t.titleAccent}
              </span>
            </h2>
          </div>

          <div className={isArabic ? "lg:pr-10" : "lg:pl-10"}>
            <p className="max-w-xl text-sm leading-8 text-white/55 sm:text-base">
              {t.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.24em] text-white/30">
                CHINA PLANET
              </span>
              <span className="h-px w-10 bg-[var(--cp-red-soft)]" />
              <span className="text-[10px] font-semibold tracking-[0.18em] text-white/30">
                {t.location}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid overflow-hidden border border-white/10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <span className="pointer-events-none absolute -bottom-10 -start-2 text-[180px] font-semibold leading-none tracking-[-0.12em] text-white/[0.035]">
              →
            </span>

            <div className="relative z-10">
              <p className="text-[10px] font-semibold tracking-[0.24em] text-white/30">
                {t.request}
              </p>

              <h3 className="mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {t.heading}
              </h3>

              <p className="mt-2 text-2xl text-[var(--cp-red-soft)] sm:text-3xl">
                {t.headingAccent}
              </p>

              <div className="mt-12 space-y-3 text-sm text-white/50">
                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="w-20 text-[9px] font-semibold tracking-[0.2em] text-white/25">
                    {t.phoneLabel}
                  </span>
                  <span>{t.phone}</span>
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="w-20 text-[9px] font-semibold tracking-[0.2em] text-white/25">
                    {t.emailLabel}
                  </span>
                  <span className="truncate">{siteConfig.contact.email}</span>
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                  <span className="w-20 text-[9px] font-semibold tracking-[0.2em] text-white/25">
                    {t.whatsappLabel}
                  </span>
                  <span>{t.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.035] p-7 sm:p-10 lg:border-s lg:border-t-0 lg:p-12">
            <div className="grid gap-7">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-white/40"
                >
                  {t.name}
                </label>

                <input
                  id="contact-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--cp-red-soft)]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-service"
                  className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-white/40"
                >
                  {t.chooseService}
                </label>

                <select
                  id="contact-service"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none focus:border-[var(--cp-red-soft)]"
                >
                  <option value="" className="bg-[var(--cp-brown-deep)] text-white">
                    {t.chooseServiceHint}
                  </option>

                  {currentServices.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-[var(--cp-brown-deep)] text-white"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-white/40"
                >
                  {t.email}
                </label>

                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={siteConfig.contact.email}
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--cp-red-soft)]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-white/40"
                >
                  {t.phone}
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+966..."
                  className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--cp-red-soft)]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-details"
                  className="mb-3 block text-[10px] font-semibold tracking-[0.2em] text-white/40"
                >
                  {t.details}
                </label>

                <textarea
                  id="contact-details"
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder={t.detailsPlaceholder}
                  rows={4}
                  className="w-full resize-none border-b border-white/15 bg-transparent px-0 py-3 text-sm leading-7 text-white outline-none placeholder:text-white/25 focus:border-[var(--cp-red-soft)]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={!name.trim() || !service}
                  className="group inline-flex min-h-12 items-center gap-4 border border-[var(--cp-red-soft)] px-6 text-sm font-semibold text-white transition-all duration-500 hover:bg-[var(--cp-red-soft)] disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/25"
                >
                  <span>{t.whatsappButton}</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    {isArabic ? "←" : "→"}
                  </span>
                </button>

                <p className="mt-4 text-[11px] leading-6 text-white/30">
                  {t.whatsappHint}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/35">{t.location}</p>

          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[var(--cp-red-soft)]" />
            <span className="text-[10px] font-semibold tracking-[0.24em] text-white/25">
              CHINA PLANET
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
