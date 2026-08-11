"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "../lib/site";

const links = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "المدن الصينية", href: "#gallery" },
  { label: "عن كوكب الصين", href: "#why-us" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
  };

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto max-w-[1500px] px-3 transition-all duration-500 sm:px-6 lg:px-8 ${
          scrolled ? "pt-2" : "pt-3"
        }`}
      >
        <nav
          className={`relative border transition-all duration-500 ${
            scrolled
              ? "rounded-2xl border-red-500/30 bg-[#4d0508]/90 shadow-2xl shadow-black/40 backdrop-blur-2xl"
              : "rounded-2xl border-white/10 bg-[#4d0508]/75 backdrop-blur-xl"
          }`}
        >
          <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6">
            {/* LOGO */}
            <a
              href="#home"
              onClick={closeMenu}
              aria-label="كوكب الصين - الرئيسية"
              className="flex min-w-0 items-center gap-3"
            >
              <Image
                src="/brand/china-planet-logo.png"
                alt="شعار كوكب الصين"
                width={52}
                height={52}
                priority
                className="h-11 w-11 object-contain sm:h-12 sm:w-12"
              />

              <div className="hidden min-w-0 sm:block">
                <div className="truncate text-base font-bold text-white">
                  كوكب الصين
                </div>

                <div className="text-[11px] tracking-[0.16em] text-[#f3c76a]">
                  CHINA PLANET
                </div>
              </div>
            </a>

            {/* DESKTOP NAV */}
            <div className="hidden items-center gap-1 xl:flex">
              {links.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                    index === 0
                      ? "font-bold text-[#f3c76a]"
                      : "text-white/80 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {link.label}

                  {index === 0 && (
                    <span className="absolute inset-x-3 -bottom-1 h-[2px] rounded-full bg-[#d99a32]" />
                  )}
                </a>
              ))}
            </div>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-2 xl:flex">
              <span
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/60"
                title="اللغات الإضافية قادمة"
              >
                العربية
              </span>

              <span
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/35"
                title="النسخة الصينية قادمة"
              >
                中文 قريبًا
              </span>

              <span
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/35"
                title="النسخة الإنجليزية قادمة"
              >
                EN قريبًا
              </span>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                aria-label="الاتصال بكوكب الصين"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg text-white/70 transition-all hover:border-[#d99a32]/40 hover:text-[#f3c76a]"
              >
                ☎
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="التواصل عبر واتساب"
                className="rounded-xl bg-[#d99a32] px-4 py-2.5 text-sm font-bold text-black transition-all hover:bg-[#f3c76a]"
              >
                واتساب
              </a>
            </div>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-xl text-white transition-all hover:border-[#d99a32]/40 hover:text-[#f3c76a] xl:hidden"
            >
              {open ? "×" : "☰"}
            </button>
          </div>

          {/* MOBILE MENU */}
          <div
            className={`overflow-hidden transition-all duration-500 xl:hidden ${
              open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-white/10 px-4 pb-5 pt-3">
              <div className="grid gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3.5 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <span className="rounded-xl border border-red-400/30 bg-red-950/40 py-3 text-center text-xs text-white">
                  العربية
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-center text-xs text-white/35">
                  中文 قريبًا
                </span>

                <span className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-center text-xs text-white/35">
                  EN قريبًا
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] py-3.5 text-sm font-bold text-white transition-all hover:border-[#d99a32]/40 hover:text-[#f3c76a]"
                >
                  ☎ اتصال
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl bg-[#d99a32] py-3.5 text-sm font-bold text-black transition-all hover:bg-[#f3c76a]"
                >
                  واتساب
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
