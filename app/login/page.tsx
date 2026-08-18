"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";
import { translations, type Language } from "../lib/i18n";

export default function LoginPage() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "/ar";
  const currentLanguage: Language = pathname.startsWith("/en")
    ? "en"
    : pathname.startsWith("/zh")
      ? "zh"
      : "ar";
  const t = translations[currentLanguage].auth;
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleForgotPassword() {
    setError("");

    if (!email.trim()) {
      setError(t.forgotEmail);
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        setError(t.resetFailed);
        return;
      }

      setError(t.resetSent);
    } catch {
      setError(t.unexpected);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError(t.emailRequired);
      return;
    }

    if (!password) {
      setError(t.passwordRequired);
      return;
    }

    try {
      setLoading(true);

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError(
          t.invalidLogin
        );
        return;
      }

      router.push("/account");
      router.refresh();
    } catch {
      setError(t.unexpected);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] px-5 py-12 text-[#171717]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1100px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#e4dbd2] bg-white shadow-[0_25px_80px_rgba(40,30,20,0.08)] lg:grid-cols-2">

          {/* BRAND */}
          <div className="relative hidden min-h-[600px] overflow-hidden bg-[#171717] lg:block">
            <img
              src="/images/hero-china.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-55"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <img
                src="/images/china-planet-logo.png"
                alt="China Planet"
                className="h-[62px] w-[180px] object-contain object-right"
              />

              <div>
                <div className="mb-5 h-[2px] w-10 bg-[#c94a3d]" />

                <h1 className="max-w-[430px] text-4xl font-bold leading-tight">
                  {t.welcomeBack}
                  <br />
                  {t.toChinaPlanet}
                </h1>

                <p className="mt-5 max-w-[430px] text-sm leading-7 text-white/70">
                  سجّل دخولك للوصول إلى حسابك وتجربتك الخاصة مع China Planet.
                </p>
              </div>
            </div>
          </div>

          {/* LOGIN FORM */}
          <div className="flex min-h-[600px] items-center p-7 sm:p-10 lg:p-14">
            <div className="w-full max-w-[430px]">

              <Link
                href="/"
                className="text-xs text-[#8a8179] transition hover:text-[#c94a3d]"
              >
                {t.backHome}
              </Link>

              <div className="mt-10">
                <div className="mb-4 h-[2px] w-8 bg-[#c94a3d]" />

                <h2 className="text-3xl font-bold tracking-tight">
                  {t.loginTitle}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#756c64]">
                  {t.loginDescription}
                </p>
              </div>

              <form
                onSubmit={handleLogin}
                className="mt-8 grid gap-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    {t.email}
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-[#554d46]"
                    >
                      {t.password}
                    </label>

                    <button
                      type="button"
                      className="text-[11px] text-[#8a8179] transition hover:text-[#c94a3d]"
                      onClick={handleForgotPassword}
                    >
                      نسيت {t.password}؟
                    </button>
                  </div>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* ERROR */}
                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 rounded-2xl bg-[#171717] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#c94a3d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "جاري {t.loginTitle}..." : "{t.loginTitle}"}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#756c64]">
                {t.noAccount}{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#c94a3d] transition hover:text-[#171717]"
                >
                  {t.createAccount}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}