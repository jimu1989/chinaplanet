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
      className="border-t border-[#e7e0d8] bg-[#f7f4ee] text-[#171717]"
    >
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a
              href="#home"
              className="inline-flex items-center"
              aria-label="China Planet"
            >
              <img
                src="/images/china-planet-logo.png"
                alt="China Planet"
                className="h-[58px] w-[165px] object-contain"
                draggable={false}
              />
            </a>

            <p className="mt-6 max-w-[380px] text-sm leading-7 text-[#6b625b]">
              {language === "ar" &&
                "كوكب الصين — بوابتك الموثوقة لاكتشاف الصين، خدماتها، وجهاتها، وفرصها."}

              {language === "en" &&
                "China Planet — your trusted gateway to discovering China, its services, destinations, and opportunities."}

              {language === "zh" &&
                "中国星球——探索中国、了解其服务、目的地与商机的可靠门户。"}
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-[#171717]">
              {language === "ar" && "روابط سريعة"}
              {language === "en" && "Quick Links"}
              {language === "zh" && "快速链接"}
            </h3>

            <nav className="grid gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-[#6b625b] transition-colors duration-300 hover:text-[#c94a3d]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-[#171717]">
              {t.nav.contact}
            </h3>

            <div className="grid gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6b625b] transition-colors duration-300 hover:text-[#c94a3d]"
              >
                {t.footer.whatsapp}
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-sm text-[#6b625b] transition-colors duration-300 hover:text-[#c94a3d]"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#e2d9cf] pt-6 text-xs text-[#8a8179] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} China Planet.{" "}
            {language === "ar" && "جميع الحقوق محفوظة."}
            {language === "en" && "All rights reserved."}
            {language === "zh" && "版权所有。"}
          </p>

          <div className="flex gap-5">
            <a
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#c94a3d]"
            >
              {language === "ar" && "الخصوصية"}
              {language === "en" && "Privacy"}
              {language === "zh" && "隐私政策"}
            </a>

            <a
              href="/terms"
              className="transition-colors duration-300 hover:text-[#c94a3d]"
            >
              {language === "ar" && "الشروط والأحكام"}
              {language === "en" && "Terms & Conditions"}
              {language === "zh" && "条款与条件"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}