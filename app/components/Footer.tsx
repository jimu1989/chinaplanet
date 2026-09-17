import Image from "next/image";
import Link from "next/link";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import { siteConfig } from "../lib/site";
import {
  Mail,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

export default function Footer({
  language = "ar",
}: {
  language?: Language;
}) {
  const t = translations[language];
  const isArabic = language === "ar";

  const footerLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.destinations, href: "#destinations" },
    { label: t.nav.whyUs, href: "#why-us" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  const contactLabels = {
    ar: {
      whatsapp: "واتساب",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      whatsappAria: "تواصل معنا عبر واتساب",
      emailAria: "راسلنا عبر البريد الإلكتروني",
      phoneAria: "اتصل بنا",
      explore: "استكشف",
      contact: "تواصل",
      location: "السعودية · الصين",
      founder: "عن المؤسس",
    },
    en: {
      whatsapp: "WhatsApp",
      email: "Email",
      phone: "Phone",
      whatsappAria: "Contact us on WhatsApp",
      emailAria: "Email China Planet",
      phoneAria: "Call China Planet",
      explore: "EXPLORE",
      contact: "CONTACT",
      location: "Saudi Arabia · China",
      founder: "About the Founder",
    },
    zh: {
      whatsapp: "WhatsApp",
      email: "电子邮件",
      phone: "电话",
      whatsappAria: "通过 WhatsApp 联系我们",
      emailAria: "发送电子邮件",
      phoneAria: "联系我们",
      explore: "探索",
      contact: "联系",
      location: "沙特阿拉伯 · 中国",
      founder: "关于创始人",
    },
  };

  const labels = contactLabels[language];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden border-t border-[var(--cp-line)] bg-[var(--cp-ivory)] text-[var(--cp-brown)]"
    >
      {/* Decorative orbit */}
      <div className="pointer-events-none absolute -bottom-44 -end-44 h-[420px] w-[420px] rounded-full border border-[var(--cp-red)]/[0.06]" />

      <div className="cp-editorial-container relative">
        <div className="grid gap-14 py-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:py-20">
          {/* Brand */}
          <div>
            <Link
              href={`/${language}`}
              className="group inline-flex items-center"
              aria-label="China Planet"
            >
              <Image
                src="/images/china-planet-logo.png"
                alt="China Planet"
                width={175}
                height={62}
                className="h-auto w-[150px] object-contain transition-transform duration-500 group-hover:scale-[1.02] sm:w-[175px]"
              />
            </Link>

            <p className="mt-7 max-w-md text-sm leading-8 text-[var(--cp-muted)]">
              {language === "ar" &&
                "كوكب الصين — نقرّب لك الصين، ونساعدك تبدأ رحلتك بثقة ووضوح."}

              {language === "en" &&
                "China Planet — bringing China closer and helping you move forward with clarity and confidence."}

              {language === "zh" &&
                "中国星球——让中国更近，帮助您更清晰、更自信地迈出下一步。"}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[var(--cp-red)]" />

              <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-muted-light)]">
                SAUDI ARABIA × CHINA
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="cp-label">{labels.explore}</p>

            <nav className="mt-7 grid gap-4">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-3 text-sm text-[var(--cp-muted)] transition-colors duration-300 hover:text-[var(--cp-red)]"
                >
                  <span className="h-px w-0 bg-current transition-all duration-300 group-hover:w-5" />
                  <span>{link.label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="cp-label">{labels.contact}</p>

            <div className="mt-7 flex items-center gap-3">
              {/* WhatsApp */}
              <div className="group relative">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={labels.whatsappAria}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--cp-line-dark)] bg-[var(--cp-white)] text-[var(--cp-brown)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cp-red)] hover:bg-[var(--cp-red)] hover:text-white"
                >
                  <MessageCircle size={19} strokeWidth={1.7} />
                </a>

                <span className="pointer-events-none absolute bottom-full start-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--cp-line)] bg-[var(--cp-brown-deep)] px-3 py-1.5 text-[9px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
                  {labels.whatsapp}
                </span>
              </div>

              {/* Email */}
              <div className="group relative">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  aria-label={labels.emailAria}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--cp-line-dark)] bg-[var(--cp-white)] text-[var(--cp-brown)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cp-red)] hover:bg-[var(--cp-red)] hover:text-white"
                >
                  <Mail size={19} strokeWidth={1.7} />
                </a>

                <span className="pointer-events-none absolute bottom-full start-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--cp-line)] bg-[var(--cp-brown-deep)] px-3 py-1.5 text-[9px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
                  {labels.email}
                </span>
              </div>

              {/* Phone */}
              <div className="group relative">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  aria-label={labels.phoneAria}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--cp-line-dark)] bg-[var(--cp-white)] text-[var(--cp-brown)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cp-red)] hover:bg-[var(--cp-red)] hover:text-white"
                >
                  <PhoneCall size={19} strokeWidth={1.7} />
                </a>

                <span className="pointer-events-none absolute bottom-full start-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--cp-line)] bg-[var(--cp-brown-deep)] px-3 py-1.5 text-[9px] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:opacity-100">
                  {labels.phone}
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs text-[var(--cp-muted-light)]">
              {labels.location}
            </p>

            <Link
              href={`/${language}/about/founder`}
              className="mt-5 inline-flex items-center gap-3 text-xs font-semibold text-[var(--cp-muted)] transition-colors duration-300 hover:text-[var(--cp-red)]"
            >
              {labels.founder}
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 border-t border-[var(--cp-line)] py-6 text-xs text-[var(--cp-muted-light)] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} China Planet.{" "}
            {language === "ar" && "جميع الحقوق محفوظة."}
            {language === "en" && "All rights reserved."}
            {language === "zh" && "版权所有。"}
          </p>

          <div className="flex flex-wrap gap-5">
            <Link
              href={`/${language}/privacy`}
              className="transition-colors duration-300 hover:text-[var(--cp-red)]"
            >
              {language === "ar" && "الخصوصية"}
              {language === "en" && "Privacy"}
              {language === "zh" && "隐私政策"}
            </Link>

            <Link
              href={`/${language}/terms`}
              className="transition-colors duration-300 hover:text-[var(--cp-red)]"
            >
              {language === "ar" && "الشروط والأحكام"}
              {language === "en" && "Terms & Conditions"}
              {language === "zh" && "条款与条件"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
