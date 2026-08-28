import Link from "next/link";
import { redirect } from "next/navigation";

import { hasTeamPermission } from "../../../lib/team-permissions";

const tools = [
  {
    title: "API Center",
    description: "استعراض واجهات API المتاحة ومعلوماتها وطرق استخدامها.",
    href: "/team/development/apis",
    status: "متاح",
  },
  {
    title: "System Health",
    description: "فحص حالة الخادم وقاعدة البيانات والخدمات الأساسية.",
    href: "/team/development/system",
    status: "متاح",
  },
];

export default async function DevelopmentOverviewPage() {
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
        <section className="rounded-[38px] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] lg:p-12">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-[#c94a3d]" />
            <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
              DEVELOPMENT CENTER
            </span>
          </div>

          <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-3xl font-bold text-[#40372f] lg:text-4xl">
                مركز التطوير
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-[#8a8179]">
                مساحة مركزية لمراقبة النظام وإدارة أدوات التطوير ومتابعة
                واجهات API والخدمات الأساسية في China Planet.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-[#f5f2ee] px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-[#665d55]">
                Development Access
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#eee9e3] bg-[#faf9f7] p-6">
              <div className="text-xs font-semibold text-[#a69c93]">
                SYSTEM
              </div>

              <div className="mt-4 text-2xl font-bold text-[#40372f]">
                Operational
              </div>

              <p className="mt-2 text-sm text-[#8a8179]">
                أدوات التطوير محمية بالصلاحية المطلوبة.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#eee9e3] bg-[#faf9f7] p-6">
              <div className="text-xs font-semibold text-[#a69c93]">
                API CENTER
              </div>

              <div className="mt-4 text-2xl font-bold text-[#40372f]">
                Available
              </div>

              <p className="mt-2 text-sm text-[#8a8179]">
                كتالوج واجهات النظام متاح للمطورين المصرح لهم.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#eee9e3] bg-[#faf9f7] p-6">
              <div className="text-xs font-semibold text-[#a69c93]">
                ACCESS
              </div>

              <div className="mt-4 text-2xl font-bold text-[#40372f]">
                manage_project
              </div>

              <p className="mt-2 text-sm text-[#8a8179]">
                الوصول إلى مركز التطوير يعتمد على الصلاحيات.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                DEVELOPMENT TOOLS
              </div>

              <h2 className="mt-2 text-2xl font-bold text-[#40372f]">
                أدوات التطوير
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[32px] border border-[#eee9e3] bg-white p-7 shadow-[0_12px_35px_rgba(40,30,20,0.03)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(40,30,20,0.07)]"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#40372f]">
                      {tool.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                      {tool.description}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#f3f7f2] px-3 py-1.5 text-xs font-semibold text-green-700">
                    {tool.status}
                  </span>
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-[#eee9e3] pt-5">
                  <span className="text-xs font-semibold text-[#a69c93]">
                    OPEN TOOL
                  </span>

                  <span className="text-lg text-[#c94a3d] transition-transform group-hover:-translate-x-1">
                    ←
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[32px] bg-[#40372f] p-7 text-white">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.3em] text-white/50">
                SECURITY
              </div>

              <h2 className="mt-2 text-xl font-bold">
                Development tools are permission protected
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65">
                الوصول إلى هذه المساحة وجميع أدواتها يعتمد على
                manage_project من نظام الصلاحيات المركزي.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-3 text-center">
              <div className="text-xs text-white/50">
                REQUIRED PERMISSION
              </div>

              <div className="mt-1 font-mono text-sm font-semibold">
                manage_project
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
