import type { Language } from "../lib/i18n";
import { siteConfig } from "../lib/site";

const footerLinks = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "الوجهات", href: "#destinations" },
  { label: "لماذا نحن", href: "#why-us" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Footer({
  language = "ar",
}: {
  language?: Language;
}) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  return (
    <footer className="border-t border-[#e7e0d8] bg-[#f7f4ee] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">

          {/* BRAND */}
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
              كوكب الصين — بوابتك الموثوقة لاكتشاف الصين،
              خدماتها، وجهاتها، وفرصها.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-[#171717]">
              روابط سريعة
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

          {/* CONTACT */}
          <div>
            <h3 className="mb-5 text-sm font-semibold text-[#171717]">
              تواصل معنا
            </h3>

            <div className="grid gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#6b625b] transition-colors duration-300 hover:text-[#c94a3d]"
              >
                واتساب
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

        {/* BOTTOM */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[#e2d9cf] pt-6 text-xs text-[#8a8179] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} China Planet. جميع الحقوق محفوظة.
          </p>

          <div className="flex gap-5">
            <a
              href="/privacy"
              className="transition-colors duration-300 hover:text-[#c94a3d]"
            >
              الخصوصية
            </a>

            <a
              href="/terms"
              className="transition-colors duration-300 hover:text-[#c94a3d]"
            >
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}