"use client";

import Image from "next/image";

const serviceLinks = [
  "السياحة في الصين",
  "الدراسة في الصين",
  "تعلم اللغة الصينية",
  "التجارة والاستيراد",
];

const chinaLinks = [
  "بكين",
  "شنغهاي",
  "شنتشن",
  "قوانغتشو",
  "تشنغدو",
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* الهوية */}
          <div>
            <a
              href="#home"
              className="flex items-center gap-3"
            >
              <Image
                src="/logo/logo.png"
                alt="كوكب الصين"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />

              <div>
                <div className="font-black text-white">
                  كوكب الصين
                </div>

                <div className="mt-1 text-[8px] tracking-[0.3em] text-[#d99a32]/40">
                  CHINA PLANET
                </div>
              </div>
            </a>

            <p className="mt-6 max-w-xs text-sm leading-7 text-white/30">
              من بوابتك إلى الصين... إلى شريكك فيها.
              سياحة، تعليم، لغة، تجارة وخدمات متكاملة.
            </p>
          </div>

          {/* الخدمات */}
          <div>
            <h3 className="text-sm font-bold text-[#d99a32]">
              خدماتنا
            </h3>

            <div className="mt-5 space-y-3">
              {serviceLinks.map((item) => (
                <a
                  key={item}
                  href="#services"
                  className="block text-xs text-white/30 transition-colors hover:text-[#d99a32]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* المدن */}
          <div>
            <h3 className="text-sm font-bold text-[#d99a32]">
              اكتشف الصين
            </h3>

            <div className="mt-5 space-y-3">
              {chinaLinks.map((item) => (
                <a
                  key={item}
                  href="#gallery"
                  className="block text-xs text-white/30 transition-colors hover:text-[#d99a32]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* التواصل */}
          <div>
            <h3 className="text-sm font-bold text-[#d99a32]">
              تواصل معنا
            </h3>

            <div className="mt-5 space-y-4 text-xs text-white/30">
              <a
                href="tel:+966560406506"
                className="block transition-colors hover:text-[#d99a32]"
              >
                +966 56 040 6506
              </a>

              <a
                href="mailto:jimu1989@gmail.com"
                className="block transition-colors hover:text-[#d99a32]"
              >
                jimu1989@gmail.com
              </a>

              <div>
                المملكة العربية السعودية
                <br />
                والصين
              </div>
            </div>

            <a
              href="https://wa.me/966560406506"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full border border-[#d99a32]/40 px-5 py-3 text-xs text-[#d99a32] transition-all hover:bg-[#d99a32] hover:text-black"
            >
              تواصل عبر واتساب
            </a>
          </div>
        </div>

        {/* أسفل الفوتر */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} China Planet. جميع الحقوق محفوظة.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="transition-colors hover:text-[#d99a32]"
            >
              الخصوصية
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#d99a32]"
            >
              الشروط والأحكام
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}