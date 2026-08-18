"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

const links = [
  { label: "الرئيسية", href: "#home" },
  { label: "الخدمات", href: "#services" },
  { label: "الوجهات", href: "#destinations" },
  { label: "لماذا نحن", href: "#why-us" },
  { label: "تواصل معنا", href: "#contact" },
];

const WHATSAPP_NUMBER = "966560406506";

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email ?? null);
      setLoadingUser(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setLoadingUser(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();

    await supabase.auth.signOut();

    setUserEmail(null);
    setOpen(false);

    router.push("/");
    router.refresh();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#f8f6f2]/95 shadow-sm backdrop-blur-xl"
          : "bg-[#f8f6f2]/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1250px] items-center justify-between px-5 lg:px-8">

        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            width={180}
            height={65}
            priority
            className="h-[52px] w-[150px] object-contain"
          />
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] font-medium text-[#554d46] transition-colors duration-300 hover:text-[#c94a3d]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden items-center gap-3 lg:flex">
          {!loadingUser && userEmail ? (
            <>
              <Link
                href="/account"
                className="rounded-full border border-[#cdbfb4] px-5 py-2.5 text-[11px] font-semibold text-[#554d46] transition-all hover:border-[#c94a3d] hover:text-[#c94a3d]"
              >
                حسابي
              </Link>

              <button
                type="button"
                aria-label="فتح القائمة"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all ${
                  open
                    ? "border-[#c94a3d] bg-[#c94a3d] text-white"
                    : "border-[#cdbfb4] text-[#554d46] hover:border-[#c94a3d] hover:text-[#c94a3d]"
                }`}
              >
                {open ? "×" : "☰"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[11px] font-semibold text-[#554d46] transition hover:text-[#c94a3d]"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/team/login"
                className="text-[11px] font-semibold text-[#554d46] transition hover:text-[#c94a3d]"
              >
                دخول الفريق
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#c94a3d] px-5 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#b83e33] hover:shadow-md"
              >
                إنشاء حساب
              </Link>

              <button
                type="button"
                aria-label="فتح القائمة"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
                className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all ${
                  open
                    ? "border-[#c94a3d] bg-[#c94a3d] text-white"
                    : "border-[#cdbfb4] text-[#554d46] hover:border-[#c94a3d] hover:text-[#c94a3d]"
                }`}
              >
                {open ? "×" : "☰"}
              </button>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label="فتح القائمة"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg transition-all lg:hidden ${
            open
              ? "border-[#c94a3d] bg-[#c94a3d] text-white"
              : "border-[#cdbfb4] text-[#554d46]"
          }`}
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {/* MENU PANEL */}
      {open && (
        <div className="absolute inset-x-0 top-[76px] border-t border-[#e7e0d8] bg-[#f8f6f2]/98 shadow-[0_20px_50px_rgba(30,20,10,0.08)] backdrop-blur-xl">
          <div className="mx-auto max-w-[1250px] px-5 py-7 lg:px-8">

            <div className="grid gap-8 lg:grid-cols-[1fr_auto]">

              {/* LINKS */}
              <div>
                <p className="mb-5 text-[10px] font-semibold tracking-[0.25em] text-[#9a9189]">
                  CHINA PLANET
                </p>

                <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                  {links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between border-b border-[#e7e0d8] py-4 text-sm font-medium text-[#554d46] transition hover:text-[#c94a3d]"
                    >
                      <span>{link.label}</span>

                      <span className="translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* ACCOUNT PANEL */}
              <div className="min-w-[250px] rounded-[24px] bg-[#171717] p-6 text-white">

                {userEmail ? (
                  <>
                    <p className="text-[10px] tracking-[0.2em] text-white/40">
                      MEMBER AREA
                    </p>

                    <h3 className="mt-3 text-lg font-bold">
                      حسابك
                    </h3>

                    <p
                      dir="ltr"
                      className="mt-2 truncate text-xs text-white/60"
                    >
                      {userEmail}
                    </p>

                    <div className="mt-6 grid gap-2">
                      <Link
                        href="/account"
                        onClick={() => setOpen(false)}
                        className="rounded-xl bg-white px-4 py-3 text-center text-xs font-semibold text-[#171717] transition hover:bg-[#c94a3d] hover:text-white"
                      >
                        الذهاب إلى حسابي
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="rounded-xl border border-white/15 px-4 py-3 text-xs font-semibold text-white/70 transition hover:border-[#c94a3d] hover:text-white"
                      >
                        تسجيل الخروج
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] tracking-[0.2em] text-white/40">
                      CHINA PLANET MEMBERS
                    </p>

                    <h3 className="mt-3 text-lg font-bold">
                      انضم إلى كوكب الصين
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-white/55">
                      أنشئ حسابك للوصول إلى تجربة وخدمات أكثر سهولة.
                    </p>

                    <div className="mt-6 grid gap-2">

                      {/* LOGIN */}
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="rounded-xl border border-[#cdbfb4] bg-[#f8f6f2] px-4 py-3 text-center text-xs font-semibold !text-[#554d46] transition-all duration-300 hover:border-[#c94a3d] hover:!text-[#c94a3d]"
                      >
                        تسجيل الدخول
                      </Link>

                      {/* REGISTER */}
                      <Link
                        href="/register"
                        onClick={() => setOpen(false)}
                        className="rounded-xl border border-white/15 px-4 py-3 text-center text-xs font-semibold text-white/80 transition hover:border-[#c94a3d] hover:text-white"
                      >
                        إنشاء حساب
                      </Link>

                    </div>
                  </>
                )}
              </div>
            </div>

            {/* WHATSAPP */}
            <div className="mt-7 flex flex-col gap-4 border-t border-[#e7e0d8] pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs text-[#8a8179]">
                تحتاج مساعدة؟ تواصل معنا مباشرة.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-[#cdbfb4] px-6 py-3 text-xs font-semibold text-[#554d46] transition hover:border-[#c94a3d] hover:text-[#c94a3d]"
              >
                تواصل معنا عبر واتساب
              </a>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}