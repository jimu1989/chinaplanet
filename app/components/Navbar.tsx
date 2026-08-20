"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  languages,
  translations,
  type Language,
} from "../lib/i18n";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

const WHATSAPP_NUMBER = "966560406506";
const LANGUAGE_COOKIE = "china-planet-language";

export default function Navbar({
  language = "ar",
}: {
  language?: Language;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const currentLanguage: Language =
    pathname.startsWith("/en")
      ? "en"
      : pathname.startsWith("/zh")
        ? "zh"
        : pathname.startsWith("/ar")
          ? "ar"
          : language;

  const t = translations[currentLanguage].nav;

  const links = [
    { label: t.home, href: "#home" },
    { label: t.services, href: "#services" },
    { label: t.destinations, href: "#destinations" },
    { label: t.whyUs, href: "#why-us" },
    { label: t.contact, href: "#contact" },
  ];

  useEffect(() => {
    document.cookie = `${LANGUAGE_COOKIE}=${currentLanguage}; path=/; max-age=31536000; samesite=lax`;
  }, [currentLanguage]);

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

  function localizedPath(lang: Language) {
    const cleanPath =
      pathname.replace(/^\/(ar|en|zh)/, "") || "/";

    if (lang === "ar") {
      return `/ar${cleanPath === "/" ? "" : cleanPath}`;
    }

    return `/${lang}${cleanPath === "/" ? "" : cleanPath}`;
  }

  function handleLanguageChange(lang: Language) {
    setOpen(false);

    const target = localizedPath(lang);

    router.push(target);
    router.refresh();
  }

  function accountPath() {
    return `/account?lang=${currentLanguage}`;
  }

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();

    await supabase.auth.signOut();

    setUserEmail(null);
    setOpen(false);

    router.push(localizedPath(currentLanguage));
    router.refresh();
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

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
          href={localizedPath(currentLanguage)}
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

        {/* LANGUAGES */}
        <div className="hidden items-center gap-1 lg:flex">
          {(Object.keys(languages) as Language[]).map((lang) => {
            const active = currentLanguage === lang;

            return (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`rounded-full px-3 py-2 text-[10px] font-semibold transition ${
                  active
                    ? "bg-[#c94a3d] text-white"
                    : "text-[#786e65] hover:bg-[#f3f0eb]"
                }`}
              >
                {languages[lang].short}
              </button>
            );
          })}
        </div>

        {/* DESKTOP ACCOUNT AREA */}
        <div className="hidden items-center gap-3 lg:flex">
          {!loadingUser && userEmail ? (
            <>
              <Link
                href={accountPath()}
                className="rounded-full border border-[#cdbfb4] px-5 py-2.5 text-[11px] font-semibold text-[#554d46] transition-all hover:border-[#c94a3d] hover:text-[#c94a3d]"
              >
                {t.account}
              </Link>

              <button
                type="button"
                aria-label={t.menu}
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
                href={`/login?lang=${currentLanguage}`}
                className="text-[11px] font-semibold text-[#554d46] transition hover:text-[#c94a3d]"
              >
                {t.login}
              </Link>

              <Link
                href={`/team/login?lang=${currentLanguage}`}
                className="text-[11px] font-semibold text-[#554d46] transition hover:text-[#c94a3d]"
              >
                {t.team}
              </Link>

              <Link
                href={`/register?lang=${currentLanguage}`}
                className="rounded-full bg-[#c94a3d] px-6 py-3 text-[12px] font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#b83e33] hover:shadow-md"
              >
                {t.register}
              </Link>

              <button
                type="button"
                aria-label={t.menu}
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
          aria-label={t.menu}
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

      {/* MOBILE MENU */}
      {open && (
        <div className="border-t border-[#e5ddd5] bg-[#f8f6f2] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#554d46]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* MOBILE LANGUAGES */}
          <div className="mt-5 flex gap-2 border-t border-[#e5ddd5] pt-5">
            {(Object.keys(languages) as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`rounded-full px-4 py-2 text-xs font-semibold ${
                  currentLanguage === lang
                    ? "bg-[#c94a3d] text-white"
                    : "bg-[#eeeae4] text-[#554d46]"
                }`}
              >
                {languages[lang].short}
              </button>
            ))}
          </div>

          {/* MOBILE ACCOUNT */}
          <div className="mt-5 flex flex-col gap-3 border-t border-[#e5ddd5] pt-5">
            {!loadingUser && userEmail ? (
              <>
                <Link
                  href={accountPath()}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-[#554d46]"
                >
                  {t.account}
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-start text-sm font-semibold text-[#c94a3d]"
                >
                  {currentLanguage === "en"
                    ? "Logout"
                    : currentLanguage === "zh"
                      ? "退出登录"
                      : "تسجيل الخروج"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/login?lang=${currentLanguage}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-[#554d46]"
                >
                  {t.login}
                </Link>

                <Link
                  href={`/team/login?lang=${currentLanguage}`}
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-[#554d46]"
                >
                  {t.team}
                </Link>

                <Link
                  href={`/register?lang=${currentLanguage}`}
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#c94a3d] px-5 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#b83e33]"
                >
                  {t.register}
                </Link>
              </>
            )}

            {/* WHATSAPP */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#cdbfb4] px-5 py-3 text-center text-sm font-semibold text-[#554d46] transition hover:border-[#c94a3d] hover:text-[#c94a3d]"
            >
              {translations[currentLanguage].footer.whatsapp}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}