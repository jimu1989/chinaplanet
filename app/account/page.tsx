import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../lib/supabase-server";

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const email = user.email ?? "—";

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  const name = profile?.full_name?.trim() || "عضو China Planet";
  const phone = profile?.phone?.trim() || "—";

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("ar-SA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const initial = name.charAt(0).toUpperCase();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f6f2] px-5 pb-20 pt-32 text-[#171717]"
    >
      <div className="mx-auto max-w-[1450px]">

        <div className="mb-8 flex justify-center">
          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            width={180}
            height={65}
            priority
            className="h-[65px] w-[180px] object-contain"
          />
        </div>

        <section className="mb-12">
          <p className="text-sm font-medium text-[#8a8179]">
            مرحبًا {name}، في مساحتك الخاصة داخل China Planet.
          </p>

          <p className="mt-2 text-sm leading-7 text-[#8a8179]">
            من هنا يمكنك متابعة معلومات حسابك والوصول إلى الخدمات الخاصة
            بالأعضاء.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-[520px_1fr]">

          <div className="relative min-h-[620px] overflow-hidden rounded-[42px] bg-[#171717] p-12 text-white">

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full border border-[#c94a3d]/40" />

            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative z-10 flex h-full flex-col">

              <p className="text-[11px] font-semibold tracking-[0.35em] text-white/45">
                CHINA PLANET
              </p>

              <h2 className="mt-12 max-w-[300px] text-4xl font-bold leading-[1.35]">
                أقرب مما
                <br />
                تتخيل.
              </h2>

              <p className="mt-8 max-w-[360px] text-base leading-8 text-white/60">
                حسابك هو بوابتك للوصول إلى تجربة China Planet والخدمات التي
                سنقدمها لك مستقبلًا.
              </p>

              <div className="my-12 h-px w-full bg-white/10" />

              <Link
                href="/"
                className="inline-flex w-full max-w-[300px] items-center justify-center rounded-full bg-[#f8f6f2] px-8 py-4 text-sm font-semibold !text-[#554d46] transition-all duration-300 hover:bg-[#c94a3d] hover:!text-white"
              >
                استكشف الموقع
              </Link>

            </div>
          </div>

          <div className="rounded-[42px] border border-[#e4ddd5] bg-white p-8 shadow-[0_20px_60px_rgba(40,30,20,0.04)] lg:p-12">

            <div className="flex items-start justify-between gap-6">

              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] text-[#a69c93]">
                  PROFILE
                </p>

                <h1 className="mt-5 text-3xl font-bold">
                  معلومات الحساب
                </h1>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#171717] text-2xl font-semibold text-white">
                {initial}
              </div>

            </div>

            <div className="mt-12 grid gap-6">

              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  الاسم
                </p>

                <p className="mt-4 text-lg font-medium text-[#302c28]">
                  {name}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  البريد الإلكتروني
                </p>

                <p
                  dir="ltr"
                  className="mt-4 text-left text-lg font-medium text-[#302c28]"
                >
                  {email}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  رقم الجوال
                </p>

                <p
                  dir="ltr"
                  className="mt-4 text-left text-lg font-medium text-[#302c28]"
                >
                  {phone}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  تاريخ إنشاء الحساب
                </p>

                <p className="mt-4 text-lg font-medium text-[#302c28]">
                  {createdAt}
                </p>
              </div>

              <div className="rounded-[24px] bg-[#f8f6f2] p-7">

                <div className="flex items-center justify-between gap-6">

                  <div>
                    <p className="text-xs font-medium text-[#a69c93]">
                      حالة الحساب
                    </p>

                    <p className="mt-4 text-lg font-medium text-[#302c28]">
                      حساب نشط
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ee] px-4 py-2 text-xs font-semibold text-[#4d8060]">
                    <span className="h-2 w-2 rounded-full bg-[#4d8060]" />
                    نشط
                  </span>

                </div>

              </div>

            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[42px] border border-[#e4ddd5] bg-white p-8 shadow-[0_20px_60px_rgba(40,30,20,0.04)] lg:p-12">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-[#b5966c]">
                MEMBER SERVICES
              </p>

              <h2 className="mt-5 text-3xl font-bold">
                خدماتك
              </h2>
            </div>

            <p className="max-w-[650px] text-sm leading-8 text-[#8a8179]">
              هذه المساحة جاهزة للتوسع مع المشروع وإضافة الخدمات والحجوزات
              والطلبات الخاصة بالأعضاء.
            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-[26px] border border-[#e9e3dc] bg-[#f8f6f2] p-7">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                01
              </span>

              <h3 className="mt-6 text-lg font-bold">
                الخدمات
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                ستتمكن من الوصول إلى الخدمات المتاحة للأعضاء.
              </p>

            </div>

            <div className="rounded-[26px] border border-[#e9e3dc] bg-[#f8f6f2] p-7">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                02
              </span>

              <h3 className="mt-6 text-lg font-bold">
                الحجوزات
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                مساحة مخصصة للحجوزات والطلبات الخاصة بك.
              </p>

            </div>

            <div className="rounded-[26px] border border-[#e9e3dc] bg-[#f8f6f2] p-7">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                03
              </span>

              <h3 className="mt-6 text-lg font-bold">
                المساعدة
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                تواصل معنا مباشرة عند الحاجة إلى أي مساعدة.
              </p>

            </div>

          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center gap-4">

          <Link
            href="/"
            className="rounded-full bg-[#171717] px-7 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#c94a3d]"
          >
            العودة إلى الرئيسية
          </Link>

          <Link
            href="/auth/signout"
            className="rounded-full border border-[#cdbfb4] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#554d46] transition hover:border-[#c94a3d] hover:text-[#c94a3d]"
          >
            تسجيل الخروج
          </Link>

        </div>

      </div>
    </main>
  );
}
