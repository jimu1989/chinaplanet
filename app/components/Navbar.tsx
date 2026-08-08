"use client";

import { useState } from "react";

const links = [
  { label: "الرئيسية", href: "#home" },
  { label: "لماذا نحن", href: "#why-us" },
  { label: "الخدمات", href: "#services" },
  { label: "المدن", href: "#gallery" },
  { label: "تواصل معنا", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="rounded-2xl border border-white/10 bg-black/55 px-4 py-3 shadow-2xl backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* الشعار */}
            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black !text-black transition-transform group-hover:rotate-6">
                CP
              </div>

              <div className="hidden text-right sm:block">
                <div className="text-sm font-black text-white">
                  كوكب الصين
                </div>

                <div className="text-[9px] tracking-[0.2em] text-white/30">
                  CHINA PLANET
                </div>
              </div>
            </a>

            {/* روابط سطح المكتب */}
            <div className="hidden items-center gap-1 lg:flex">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-xs text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* زر التواصل */}
            <a
              href="#contact"
              className="hidden rounded-full bg-white px-5 py-3 text-xs font-bold !text-black transition-transform hover:scale-[1.02] sm:block"
            >
              ابدأ الآن
            </a>

            {/* زر الجوال */}
            <button
              type="button"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
            >
              <span className="text-lg">
                {open ? "×" : "☰"}
              </span>
            </button>
          </div>

          {/* قائمة الجوال */}
          {open && (
            <div className="mt-3 border-t border-white/10 pt-3 lg:hidden">
              <div className="grid gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}

                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-bold !text-black"
                >
                  ابدأ الآن
                </a>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}