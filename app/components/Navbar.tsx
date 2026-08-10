"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "المدن الصينية", href: "#gallery" },
  { label: "عن كوكب الصين", href: "#why-us" },
  { label: "المدونة", href: "#goals" },
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
          <div className="flex h-[74px] items-center justify-between gap-4 px-4 sm:px-6">
            {/* LOGO */}

            <a
              href="#home"
              aria-label="كوكب الصين - China Planet"
              onClick={() => setOpen(false)}
              className="shrink-0"
            >
              <Image
                src="/brand/china-planet-logo.png"
                alt="كوكب الصين China Planet"
                width={330}
                height={100}
                priority
                className="h-[58px] w-auto object-contain sm:h-[66px]"
              />
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

            {/* LANGUAGE */}

            <div className="hidden items-center gap-5 text-sm xl:flex">
              <button className="rounded-xl border border-red-400/50 bg-red-950/40 px-4 py-2.5 text-white">
                العربية
                <span className="mr-2 text-[#f3c76a]">⌄</span>
              </button>

              <button className="text-white/80 transition-colors hover:text-white">
                中文
              </button>

              <button className="text-white/80 transition-colors hover:text-white">
                EN
              </button>

              <span className="text-xl text-white/80">
                ◎
              </span>
            </div>

            {/* MOBILE BUTTON */}

            <button
              type="button"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] text-xl text-white xl:hidden"
            >
              {open ? "×" : "☰"}
            </button>
          </div>

          {/* MOBILE MENU */}

          <div
            className={`overflow-hidden transition-all duration-500 xl:hidden ${
              open
                ? "max-h-[600px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-white/10 px-4 pb-5 pt-3">
              <div className="grid gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-sm text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button className="rounded-xl border border-red-400/30 bg-red-950/40 py-3 text-xs text-white">
                  العربية
                </button>

                <button className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-xs text-white/70">
                  中文
                </button>

                <button className="rounded-xl border border-white/10 bg-white/[0.04] py-3 text-xs text-white/70">
                  EN
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}