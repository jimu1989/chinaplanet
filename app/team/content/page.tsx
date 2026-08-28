"use client";

import Link from "next/link";

const sections = [
  {
    number: "01",
    title: "محتوى الموقع",
    description: "مراجعة وتطوير النصوص والمعلومات المعروضة على موقع China Planet.",
    status: "قيد الإدارة",
  },
  {
    number: "02",
    title: "الهوية البصرية",
    description: "إدارة الصور والشعار والألوان والعناصر البصرية المستخدمة في الموقع.",
    status: "قيد الإدارة",
  },
  {
    number: "03",
    title: "الخدمات",
    description: "مراجعة محتوى الخدمات ووصفها وتجربة عرضها للعملاء.",
    status: "قيد الإدارة",
  },
  {
    number: "04",
    title: "مراجعة التصميم",
    description: "متابعة الملاحظات والتعديلات المطلوبة على واجهات الموقع.",
    status: "قيد الإدارة",
  },
];

export default function ContentDesignPage() {
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
              CONTENT & DESIGN
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#40372f] lg:text-4xl">
            المحتوى والتصميم
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#8a8179]">
            مساحة العمل الخاصة بإدارة محتوى China Planet والهوية البصرية
            ومراجعة تجربة الموقع.
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

        {/* WORKSPACE */}
        <section className="mt-10">
          <div className="mb-7">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#c94a3d]" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#a69c93]">
                WORKSPACE
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-[#40372f]">
              أدوات المحتوى والتصميم
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.number}
                className="rounded-[30px] border border-[#e4ddd5] bg-white p-8 shadow-[0_15px_50px_rgba(40,30,20,0.04)] transition hover:-translate-y-1 hover:border-[#c94a3d]"
              >
                <span className="text-xs font-semibold tracking-[0.2em] text-[#c94a3d]">
                  {section.number}
                </span>

                <h3 className="mt-5 text-xl font-bold text-[#40372f]">
                  {section.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                  {section.description}
                </p>

                <div className="mt-6 inline-flex rounded-full bg-[#f8f6f2] px-4 py-2 text-[11px] font-semibold text-[#554d46]">
                  {section.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="mt-10 rounded-[38px] bg-[#171717] p-8 text-white lg:p-10">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#c94a3d]">
            QUICK ACTIONS
          </p>

          <h2 className="mt-4 text-2xl font-bold">
            إجراءات سريعة
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-8 text-white/60">
            من هنا نقدر نضيف لاحقًا أدوات التحرير وإدارة الصور والخدمات
            ومراجعة المحتوى بدون التأثير على بقية لوحة الفريق.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/team/requests"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/80 transition hover:bg-white/10"
            >
              طلبات العملاء
            </Link>

            <Link
              href="/team"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white/80 transition hover:bg-white/10"
            >
              لوحة الفريق
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
