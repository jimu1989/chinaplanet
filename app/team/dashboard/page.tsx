import Link from "next/link";
import { redirect } from "next/navigation";
import TeamDashboard from "../dashboard-client";
import { hasTeamPermission } from "../../../lib/team-permissions";

export default async function DevelopmentPage() {
  const allowed = await hasTeamPermission("manage_project");

  if (!allowed) {
    redirect("/team");
  }

  return (
    <main
      dir="rtl"
      className="min-h-[calc(100vh-125px)] bg-[#f3f0eb]"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">

        {/* HEADER */}
        <section className="rounded-[38px] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] lg:p-12">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#c94a3d]" />

            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              DEVELOPMENT
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#40372f] lg:text-4xl">
            التطوير
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#8a8179]">
            مساحة العمل الخاصة بتطوير ومتابعة موقع China Planet والوظائف
            البرمجية والأنظمة الداخلية.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/team"
              className="rounded-full bg-[#c94a3d] px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#a9362b]"
            >
              العودة للفريق
            </Link>

            <Link
              href="/"
              target="_blank"
              className="rounded-full border border-[#e4ddd5] bg-[#f8f6f2] px-5 py-3 text-xs font-semibold text-[#554d46] transition hover:border-[#c94a3d]"
            >
              معاينة الموقع ←
            </Link>
          </div>
        </section>

        <TeamDashboard />

        {/* DEVELOPMENT TOOLS */}
        <section className="mt-10">
          <div className="mb-7">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#c94a3d]" />

              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                DEVELOPMENT WORKSPACE
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[#40372f]">
              أدوات التطوير
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#c94a3d]">
                01
              </span>

              <h3 className="mt-5 text-xl font-bold text-[#40372f]">
                حالة النظام
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                متابعة حالة الخدمات والوظائف الأساسية داخل المشروع.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                متاح
              </div>
            </div>

            <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#c94a3d]">
                02
              </span>

              <h3 className="mt-5 text-xl font-bold text-[#40372f]">
                APIs
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                متابعة وربط الخدمات البرمجية وواجهات API الخاصة بالمشروع.
              </p>

              <div className="mt-6 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                متاح
              </div>
            </div>

            <div className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)]">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#c94a3d]">
                03
              </span>

              <h3 className="mt-5 text-xl font-bold text-[#40372f]">
                تجربة الموقع
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                فتح الموقع ومراجعة الواجهات والوظائف أثناء التطوير.
              </p>

              <Link
                href="/"
                target="_blank"
                className="mt-6 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46] transition hover:bg-[#eee8e2]"
              >
                فتح الموقع ←
              </Link>
            </div>

          </div>
        </section>

        {/* SYSTEM */}
        <section className="mt-10 rounded-[38px] bg-[#171717] p-8 text-white lg:p-10">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#c94a3d]">
            SYSTEM
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            مساحة التطوير
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-8 text-white/60">
            هذه الصفحة هي نقطة الدخول الخاصة بالمطور. يمكننا من هنا إضافة
            أدوات الفحص والنشر ومراقبة الخدمات والوظائف البرمجية لاحقًا.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/team"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/80 transition hover:bg-white/10"
            >
              لوحة الفريق
            </Link>

            <Link
              href="/team/requests"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/80 transition hover:bg-white/10"
            >
              طلبات العملاء
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
