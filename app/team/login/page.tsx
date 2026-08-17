"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../../lib/supabase-browser";

export default function TeamLoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("اكتب بريدك الإلكتروني.");
      return;
    }

    if (!password) {
      setError("اكتب كلمة المرور.");
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
        console.error("TEAM LOGIN SUPABASE ERROR:", loginError);

        setError(
          loginError.message ||
            "تعذر تسجيل الدخول. تأكد من البريد وكلمة المرور."
        );

        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("تعذر التحقق من الحساب.");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      const teamRoles = [
        "executive",
        "admin",
        "developer",
        "designer",
        "editor",
        "support",
        "member",
      ];

      if (!profile?.role || !teamRoles.includes(profile.role)) {
        await supabase.auth.signOut();
        setError("هذا الحساب ليس لديه صلاحية دخول الفريق.");
        return;
      }

      router.push("/team");
      router.refresh();
    } catch {
      setError("حدث خطأ غير متوقع. حاول مرة أخرى.");
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

          {/* BRAND / BACKGROUND */}
          <div className="relative hidden min-h-[620px] overflow-hidden bg-[#171717] lg:block">
            <Image
              src="/images/hero-china.png"
              alt=""
              fill
              priority
              className="object-cover opacity-55"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/50 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">

              <Image
                src="/images/china-planet-logo.png"
                alt="China Planet"
                width={180}
                height={62}
                priority
                className="h-[62px] w-[180px] object-contain object-right"
              />

              <div>
                <div className="mb-5 h-[2px] w-10 bg-[#c94a3d]" />

                <p className="mb-4 text-[11px] font-semibold tracking-[0.35em] text-white/45">
                  CHINA PLANET TEAM
                </p>

                <h1 className="max-w-[430px] text-4xl font-bold leading-tight">
                  مرحبًا بك
                  <br />
                  في مساحة الفريق
                </h1>

                <p className="mt-5 max-w-[430px] text-sm leading-7 text-white/70">
                  مساحة خاصة لفريق كوكب الصين لإدارة المشروع والعمل على
                  تطوير الخدمات والمحتوى والتجربة.
                </p>
              </div>
            </div>
          </div>

          {/* LOGIN */}
          <div className="flex min-h-[620px] items-center p-7 sm:p-10 lg:p-14">
            <div className="w-full max-w-[430px]">

              <a
                href="/"
                className="text-xs text-[#8a8179] transition hover:text-[#c94a3d]"
              >
                ← العودة إلى الرئيسية
              </a>

              <div className="mt-10">
                <div className="mb-4 h-[2px] w-8 bg-[#c94a3d]" />

                <p className="text-[11px] font-semibold tracking-[0.3em] text-[#a69c93]">
                  TEAM ACCESS
                </p>

                <h2 className="mt-4 text-3xl font-bold tracking-tight">
                  دخول الفريق
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#756c64]">
                  أدخل بيانات حسابك للوصول إلى مساحة الفريق.
                </p>
              </div>

              <form
                onSubmit={handleLogin}
                className="mt-8 grid gap-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="team-email"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    البريد الإلكتروني
                  </label>

                  <input
                    id="team-email"
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
                  <label
                    htmlFor="team-password"
                    className="mb-2 block text-xs font-semibold text-[#554d46]"
                  >
                    كلمة المرور
                  </label>

                  <input
                    id="team-password"
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
                  {loading ? "جاري التحقق..." : "دخول الفريق"}
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-3 text-[10px] text-[#a69c93]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4d8060]" />
                مساحة آمنة لأعضاء الفريق
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
