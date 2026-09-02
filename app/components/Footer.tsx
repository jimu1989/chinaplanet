import Image from "next/image";
import Link from "next/link";
import type { Language } from "../lib/i18n";
import { translations } from "../lib/i18n";
import { siteConfig } from "../lib/site";

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

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden border-t border-[var(--cp-line)] bg-[var(--cp-ivory)] text-[var(--cp-brown)]"
    >
      <div className="pointer-events-none absolute -bottom-44 -end-44 h-[420px] w-[420px] rounded-full border border-[var(--cp-red)]/[0.06]" />

      <div className="cp-editorial-container relative">
        <div className="grid gap-14 py-16 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:py-20">
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

          <div>
            <p className="cp-label">
              {language === "ar"
                ? "استكشف"
                : language === "zh"
                  ? "探索"
                  : "EXPLORE"}
            </p>

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

          <div>
            <p className="cp-label">
              {language === "ar"
                ? "تواصل"
                : language === "zh"
                  ? "联系"
                  : "CONTACT"}
            </p>

            <div className="mt-7 grid gap-5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--cp-muted)] transition-colors duration-300 hover:text-[var(--cp-red)]"
              >
                {t.footer.whatsapp}
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="break-all text-sm text-[var(--cp-muted)] transition-colors duration-300 hover:text-[var(--cp-red)]"
              >
                {siteConfig.contact.email}
              </a>

              <span className="pt-1 text-xs text-[var(--cp-muted-light)]">
                {language === "ar"
                  ? "السعودية · الصين"
                  : language === "zh"
                    ? "沙特阿拉伯 · 中国"
                    : "Saudi Arabia · China"}
              </span>
            </div>
          </div>
        </div>

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
