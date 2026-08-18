import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "../../lib/supabase-server";

const roleLabels: Record<string, string> = {
  executive: "المدير التنفيذي",
  admin: "مدير النظام",
  developer: "المبرمج",
  designer: "المصمم",
  editor: "المحرر",
  support: "الدعم",
  member: "عضو الفريق",
};

const roleDescriptions: Record<string, string> = {
  executive: "صلاحية كاملة لإدارة المشروع والفريق.",
  admin: "إدارة النظام وأعضاء الفريق.",
  developer: "تطوير الموقع والوظائف البرمجية.",
  designer: "التصميم والهوية البصرية.",
  editor: "إدارة المحتوى والصفحات.",
  support: "متابعة العملاء والدعم.",
  member: "الوصول إلى مساحة الفريق الأساسية.",
};

export default async function TeamPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/team/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role;

  const allowedRoles = [
    "executive",
    "admin",
    "developer",
    "designer",
    "editor",
    "support",
    "member",
  ];

  if (!role || !allowedRoles.includes(role)) {
    redirect("/account");
  }

  const name =
    profile?.full_name?.trim() ||
    user.email?.split("@")[0] ||
    "عضو الفريق";

  const roleLabel = roleLabels[role] || "عضو الفريق";
  const roleDescription =
    roleDescriptions[role] || "الوصول إلى مساحة الفريق.";

  const isExecutive = role === "executive";
  const isAdmin = role === "admin" || isExecutive;
  const isDeveloper = role === "developer" || isExecutive;
  const isContent =
    role === "editor" ||
    role === "designer" ||
    isExecutive;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f7f4ee] text-[#171717]"
    >
      {/* HERO */}
      <section className="relative min-h-[470px] overflow-hidden bg-[#171717]">
        <Image
          src="/images/hero-china.png"
          alt=""
          fill
          priority
          className="object-cover opacity-45"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/70 via-[#171717]/65 to-[#171717]" />

        <div className="relative z-10 mx-auto max-w-[1450px] px-5 py-8">
          <div className="flex items-center justify-between gap-5">
            <Image
              src="/images/china-planet-logo.png"
              alt="China Planet"
              width={180}
              height={65}
              priority
              className="h-auto w-[150px] object-contain sm:w-[180px] lg:w-[220px]"
            />

            <Link
              href="/auth/signout"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              تسجيل الخروج
            </Link>
          </div>

          <div className="mt-24 max-w-3xl text-white">
            <div className="mb-5 h-[2px] w-10 bg-[#c94a3d]" />

            <p className="text-[11px] font-semibold tracking-[0.35em] text-white/45">
              CHINA PLANET TEAM
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
              أهلًا بك،
              <br />
              {name}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-8 text-white/65">
              هذه مساحتك الخاصة داخل كوكب الصين لإدارة العمل،
              الفريق، والخدمات.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1450px] px-5 pb-20">

        {/* PROFILE */}
        <section className="relative z-20 -mt-16 rounded-[38px] border border-[#e4ddd5] bg-white p-7 shadow-[0_25px_80px_rgba(40,30,20,0.08)] lg:p-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#171717] text-2xl font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                  PROFILE
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {name}
                </h2>

                <p className="mt-2 text-sm text-[#8a8179]">
                  {roleLabel}
                </p>
              </div>
            </div>

            <div className="rounded-[24px] bg-[#f8f6f2] px-7 py-5">
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#a69c93]">
                ACCESS LEVEL
              </p>

              <div className="mt-3 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#4d8060]" />

                <span className="text-sm font-semibold text-[#40372f]">
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ACCOUNT INFO */}
          <div className="mt-8 grid gap-4 border-t border-[#eee8e2] pt-8 md:grid-cols-2">

            <div className="rounded-2xl bg-[#f8f6f2] px-5 py-4">
              <p className="text-xs font-semibold text-[#8a8179]">
                البريد الإلكتروني
              </p>

              <p
                dir="ltr"
                className="mt-2 break-all text-sm font-semibold text-[#40372f]"
              >
                {user.email || "—"}
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f6f2] px-5 py-4">
              <p className="text-xs font-semibold text-[#8a8179]">
                الصلاحية
              </p>

              <p className="mt-2 text-sm font-semibold text-[#40372f]">
                {roleDescription}
              </p>
            </div>

          </div>
        </section>

        {/* WORKSPACE */}
        <section className="mt-10">

          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#c94a3d]" />

              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                TEAM WORKSPACE
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold">
              مساحة العمل
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8a8179]">
              الأدوات المتاحة لك تعتمد على الدور والصلاحيات المرتبطة بحسابك.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {isAdmin && (
              <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:-translate-y-1">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                  01
                </span>

                <h3 className="mt-6 text-xl font-bold">
                  إدارة الفريق
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                  إدارة أعضاء الفريق وتحديد الأدوار والصلاحيات.
                </p>

                <div className="mt-7 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                  متاح لك
                </div>
              </div>
            )}

            {isDeveloper && (
              <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:-translate-y-1">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                  02
                </span>

                <h3 className="mt-6 text-xl font-bold">
                  التطوير
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                  إدارة وتطوير الموقع والوظائف البرمجية.
                </p>

                <div className="mt-7 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                  متاح لك
                </div>
              </div>
            )}

            {isContent && (
              <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:-translate-y-1">
                <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                  03
                </span>

                <h3 className="mt-6 text-xl font-bold">
                  المحتوى والتصميم
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                  إدارة المحتوى والتصميم والهوية البصرية.
                </p>

                <div className="mt-7 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                  متاح لك
                </div>
              </div>
            )}

            <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:-translate-y-1">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                04
              </span>

              <h3 className="mt-6 text-xl font-bold">
                دعم العملاء
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                متابعة طلبات العملاء والتواصل والمساعدة.
              </p>

              <div className="mt-7 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                متاح
              </div>
            </div>

            <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:-translate-y-1">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                05
              </span>

              <h3 className="mt-6 text-xl font-bold">
                حسابي
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                معلومات حسابك ودورك ومستوى الوصول.
              </p>

              <div className="mt-7 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                متاح
              </div>
            </div>

          </div>
        </section>

        {/* EXECUTIVE */}
        {isExecutive && (
          <section className="relative mt-10 overflow-hidden rounded-[38px] bg-[#171717] p-8 text-white lg:p-12">

            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full border border-[#c94a3d]/30" />

            <div className="absolute -left-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

            <div className="relative z-10 max-w-3xl">

              <p className="text-[10px] font-semibold tracking-[0.3em] text-[#b5966c]">
                EXECUTIVE ACCESS
              </p>

              <h2 className="mt-5 text-3xl font-bold">
                المدير التنفيذي
              </h2>

              <p className="mt-5 text-sm leading-8 text-white/60">
                لديك أعلى مستوى من الصلاحيات في مساحة الفريق.
                من هنا سنضيف لاحقًا إدارة أعضاء الفريق، التحكم في
                الأدوار، متابعة النشاط، وإدارة العمليات الداخلية للمشروع.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/70">
                  إدارة الفريق
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/70">
                  إدارة الصلاحيات
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/70">
                  إدارة المشروع
                </span>
              </div>

            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4ddd5] pt-7">

          <p className="text-xs text-[#a69c93]">
            CHINA PLANET · TEAM WORKSPACE
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="text-xs font-semibold text-[#756c64] transition hover:text-[#b5966c]"
            >
              الرئيسية
            </Link>

            <Link
              href="/account"
              className="text-xs font-semibold text-[#756c64] transition hover:text-[#b5966c]"
            >
              حسابي
            </Link>
          </div>

        </footer>

      </div>
    </main>
  );
}
