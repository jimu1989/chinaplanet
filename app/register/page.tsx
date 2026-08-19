"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createSupabaseBrowserClient } from "../../lib/supabase-browser";
import { translations, type Language } from "../lib/i18n";

const registerTranslations = {
  ar: {
    welcome: "أنشئ حسابك وابدأ تجربتك مع China Planet. كل ما تحتاجه للوصول إلى الصين، في مكان واحد.",
    home: "← العودة إلى الرئيسية",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    phonePlaceholder: "05xxxxxxxx",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    createAccount: "إنشاء الحساب",
    unexpectedError: "حدث خطأ غير متوقع. حاول مرة أخرى.",
  },

  en: {
    welcome:
      "Create your account and start your China Planet experience. Everything you need to reach China, all in one place.",
    home: "← Back to home",
    name: "Name",
    email: "Email address",
    phone: "Phone number",
    phonePlaceholder: "05xxxxxxxx",
    password: "Password",
    confirmPassword: "Confirm password",
    createAccount: "Create account",
    unexpectedError: "An unexpected error occurred. Please try again.",
  },

  zh: {
    welcome:
      "创建您的账户，开启 China Planet 体验。您前往中国所需的一切，都在这里。",
    home: "← 返回首页",
    name: "姓名",
    email: "电子邮箱",
    phone: "手机号码",
    phonePlaceholder: "05xxxxxxxx",
    password: "密码",
    confirmPassword: "确认密码",
    createAccount: "创建账户",
    unexpectedError: "发生意外错误，请重试。",
  },
} as const;

export default function RegisterPage() {
  const [currentLanguage, setCurrentLanguage] =
    useState<Language>("ar");

  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname.startsWith("/en")) {
      setCurrentLanguage("en");
    } else if (pathname.startsWith("/zh")) {
      setCurrentLanguage("zh");
    } else {
      setCurrentLanguage("ar");
    }
  }, []);

  const t = translations[currentLanguage].auth;
  const rt = registerTranslations[currentLanguage];

  const direction = currentLanguage === "ar" ? "rtl" : "ltr";

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim()) {
      setError(t.name);
      return;
    }

    if (!email.trim()) {
      setError(t.emailRequired);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordShort);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordsMismatch);
      return;
    }

    try {
      setLoading(true);

      const { data, error: signUpError } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: name.trim(),
            },
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (!data.user) {
        setError(t.createFailed);
        return;
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: name.trim(),
          phone: phone.trim() || null,
        });

      if (profileError) {
        setError(t.profileFailed);
        return;
      }

      setMessage(t.accountCreated);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push(
          currentLanguage === "en"
            ? "/en/login"
            : currentLanguage === "zh"
              ? "/zh/login"
              : "/login"
        );
      }, 2500);
    } catch {
      setError(rt.unexpectedError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir={direction}
      className="min-h-screen bg-[#f7f4ee] px-5 py-12 text-[#171717]"
    >
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1100px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-[#e4dbd2] bg-white shadow-[0_25px_80px_rgba(40,30,20,0.08)] lg:grid-cols-2">

          {/* الجانب التعريفي */}
          <div className="relative hidden min-h-[650px] overflow-hidden bg-[#171717] lg:block">
            <img
              src="/images/hero-china.png"
              alt="China Planet"
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
                  {rt.welcome}
                </p>
              </div>
            </div>
          </div>

          {/* نموذج التسجيل */}
          <div className="flex min-h-[650px] items-center p-7 sm:p-10 lg:p-14">
            <div className="w-full max-w-[430px]">

              <Link
                href={
                  currentLanguage === "en"
                    ? "/en"
                    : currentLanguage === "zh"
                      ? "/zh"
                      : "/"
                }
                className="text-xs text-[#8a8179] transition hover:text-[#c94a3d]"
              >
                {rt.home}
              </Link>

              <div className="mt-10">
                <div className="mb-4 h-[2px] w-8 bg-[#c94a3d]" />

                <h2 className="text-3xl font-bold tracking-tight">
                  {t.registerTitle}
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#756c64]">
                  {t.registerDescription}
                </p>
              </div>

              <form
                onSubmit={handleRegister}
                className="mt-8 grid gap-5"
              >

                {/* الاسم */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    {rt.name}
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder={t.fullName}
                    autoComplete="name"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* البريد */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    {rt.email}
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="name@example.com"
                    autoComplete="email"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* الجوال */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    {rt.phone}
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder={rt.phonePlaceholder}
                    autoComplete="tel"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* كلمة المرور */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    {rt.password}
                  </label>

                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="••••••••"
                    autoComplete="new-password"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* تأكيد كلمة المرور */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    {rt.confirmPassword}
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="••••••••"
                    autoComplete="new-password"
                    dir="ltr"
                    className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
                  />
                </div>

                {/* الخطأ */}
                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                )}

                {/* النجاح */}
                {message && (
                  <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                    {message}
                  </div>
                )}

                {/* زر التسجيل */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 rounded-2xl bg-[#171717] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#c94a3d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? t.creatingAccount
                    : rt.createAccount}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#756c64]">
                {t.hasAccount}{" "}

                <Link
                  href={
                    currentLanguage === "en"
                      ? "/en/login"
                      : currentLanguage === "zh"
                        ? "/zh/login"
                        : "/login"
                  }
                  className="font-semibold text-[#c94a3d] transition hover:text-[#171717]"
                >
                  {t.login}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}