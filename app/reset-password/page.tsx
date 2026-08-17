"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "../../lib/supabase-browser";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError("تعذر تغيير كلمة المرور. قد يكون رابط الاستعادة منتهي الصلاحية.");
        return;
      }

      setMessage("تم تغيير كلمة المرور بنجاح. سيتم تحويلك لتسجيل الدخول.");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
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
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[520px] items-center justify-center">
        <div className="w-full rounded-[32px] border border-[#e4dbd2] bg-white p-8 shadow-[0_25px_80px_rgba(40,30,20,0.08)] sm:p-12">

          <div className="mb-5 h-[2px] w-8 bg-[#c94a3d]" />

          <h1 className="text-3xl font-bold">
            تغيير كلمة المرور
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#756c64]">
            أدخل كلمة المرور الجديدة لحسابك.
          </p>

          <form onSubmit={handleResetPassword} className="mt-8 grid gap-5">

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-semibold text-[#554d46]"
              >
                كلمة المرور الجديدة
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                dir="ltr"
                className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-semibold text-[#554d46]"
              >
                تأكيد كلمة المرور
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                dir="ltr"
                className="w-full rounded-2xl border border-[#ddd4cb] bg-[#faf8f5] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#aaa19a] focus:border-[#c94a3d] focus:ring-2 focus:ring-[#c94a3d]/10"
              />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-[#171717] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#c94a3d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "جاري تغيير كلمة المرور..." : "تغيير كلمة المرور"}
            </button>

          </form>

        </div>
      </div>
    </main>
  );
}
