import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "../../lib/supabase-server";

type Language = "ar" | "en" | "zh";

const content = {
  ar: {
    dir: "rtl",
    locale: "ar-SA",
    backHome: "العودة إلى الرئيسية",
    explore: "استكشف الموقع",
    welcome: "مرحبًا",
    welcomeDescription:
      "من هنا يمكنك متابعة معلومات حسابك والوصول إلى الخدمات الخاصة بالأعضاء.",
    profile: "معلومات الحساب",
    profileLabel: "PROFILE",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    createdAt: "تاريخ إنشاء الحساب",
    accountStatus: "حالة الحساب",
    activeAccount: "حساب نشط",
    active: "نشط",
    memberServices: "MEMBER SERVICES",
    servicesTitle: "خدماتك",
    servicesDescription:
      "هذه المساحة جاهزة للتوسع مع المشروع وإضافة الخدمات والحجوزات والطلبات الخاصة بالأعضاء.",
    services: "الخدمات",
    servicesDescriptionShort:
      "ستتمكن من الوصول إلى الخدمات المتاحة للأعضاء.",
    bookings: "الحجوزات",
    bookingsDescription: "مساحة مخصصة للحجوزات والطلبات الخاصة بك.",
    help: "المساعدة",
    helpDescription: "تواصل معنا مباشرة عند الحاجة إلى أي مساعدة.",
    logout: "تسجيل الخروج",
    brandTitle: "أقرب مما",
    brandTitle2: "تتخيل.",
    brandDescription:
      "حسابك هو بوابتك للوصول إلى تجربة China Planet والخدمات التي سنقدمها لك مستقبلًا.",
    member: "عضو China Planet",
  },

  en: {
    dir: "ltr",
    locale: "en-US",
    backHome: "Back to home",
    explore: "Explore the website",
    welcome: "Welcome",
    welcomeDescription:
      "From here you can manage your account information and access member services.",
    profile: "Account Information",
    profileLabel: "PROFILE",
    name: "Name",
    email: "Email",
    phone: "Phone number",
    createdAt: "Account created",
    accountStatus: "Account status",
    activeAccount: "Active account",
    active: "Active",
    memberServices: "MEMBER SERVICES",
    servicesTitle: "Your Services",
    servicesDescription:
      "This space is ready to grow with the project and include services, bookings, and member requests.",
    services: "Services",
    servicesDescriptionShort:
      "You will be able to access services available to members.",
    bookings: "Bookings",
    bookingsDescription: "A dedicated space for your bookings and requests.",
    help: "Support",
    helpDescription: "Contact us directly whenever you need assistance.",
    logout: "Sign out",
    brandTitle: "Closer than",
    brandTitle2: "you imagine.",
    brandDescription:
      "Your account is your gateway to the China Planet experience and the services we will offer you in the future.",
    member: "China Planet Member",
  },

  zh: {
    dir: "ltr",
    locale: "zh-CN",
    backHome: "返回首页",
    explore: "探索网站",
    welcome: "欢迎",
    welcomeDescription:
      "您可以在这里查看账户信息并访问会员专属服务。",
    profile: "账户信息",
    profileLabel: "PROFILE",
    name: "姓名",
    email: "电子邮箱",
    phone: "手机号码",
    createdAt: "账户创建日期",
    accountStatus: "账户状态",
    activeAccount: "账户正常",
    active: "正常",
    memberServices: "MEMBER SERVICES",
    servicesTitle: "您的服务",
    servicesDescription:
      "该区域将随着项目发展，逐步加入服务、预订和会员专属请求。",
    services: "服务",
    servicesDescriptionShort:
      "您将可以访问会员可用的服务。",
    bookings: "预订",
    bookingsDescription: "用于管理您的预订和专属请求。",
    help: "帮助",
    helpDescription: "如有需要，欢迎直接联系我们。",
    logout: "退出登录",
    brandTitle: "比您想象的",
    brandTitle2: "更近。",
    brandDescription:
      "您的账户是进入 China Planet 体验以及未来会员服务的入口。",
    member: "China Planet 会员",
  },
} as const;

function getLanguage(value: string | undefined): Language {
  if (value === "en" || value === "zh") {
    return value;
  }

  return "ar";
}

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const cookieStore = await cookies();

  const savedLanguage =
    cookieStore.get("china-planet-language")?.value ??
    cookieStore.get("language")?.value ??
    cookieStore.get("NEXT_LOCALE")?.value;

  const lang = getLanguage(savedLanguage);
  const t = content[lang];

  const homeHref = `/${lang}`;

  const email = user.email ?? "—";

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .maybeSingle();

  const name =
    profile?.full_name?.trim() ||
    t.member;

  const phone = profile?.phone?.trim() || "—";

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString(t.locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  const initial = name.charAt(0).toUpperCase();

  return (
    <main
      dir={t.dir}
      className="min-h-screen bg-[#f8f6f2] px-5 pb-20 pt-32 text-[#171717]"
    >
      <div className="mx-auto max-w-[1450px]">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link href={homeHref} aria-label={t.backHome}>
            <Image
              src="/images/china-planet-logo.png"
              alt="China Planet"
              width={180}
              height={65}
              priority
              className="h-[65px] w-[180px] object-contain"
            />
          </Link>
        </div>

        {/* Welcome */}
        <section className="mb-12">
          <p className="text-sm font-medium text-[#8a8179]">
            {t.welcome} {name}، {lang === "ar"
              ? "في مساحتك الخاصة داخل China Planet."
              : lang === "en"
                ? "to your private space inside China Planet."
                : "欢迎进入您的 China Planet 专属空间。"}
          </p>

          <p className="mt-2 text-sm leading-7 text-[#8a8179]">
            {t.welcomeDescription}
          </p>
        </section>

        {/* Main grid */}
        <section className="grid gap-8 lg:grid-cols-[520px_1fr]">

          {/* Brand card */}
          <div className="relative min-h-[620px] overflow-hidden rounded-[42px] bg-[#171717] p-12 text-white">

            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full border border-[#c94a3d]/40" />

            <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative z-10 flex h-full flex-col">

              <p className="text-[11px] font-semibold tracking-[0.35em] text-white/45">
                CHINA PLANET
              </p>

              <h2 className="mt-12 max-w-[300px] text-4xl font-bold leading-[1.35]">
                {t.brandTitle}
                <br />
                {t.brandTitle2}
              </h2>

              <p className="mt-8 max-w-[360px] text-base leading-8 text-white/60">
                {t.brandDescription}
              </p>

              <div className="my-12 h-px w-full bg-white/10" />

              <Link
                href={homeHref}
                className="inline-flex w-full max-w-[300px] items-center justify-center rounded-full bg-[#f8f6f2] px-8 py-4 text-sm font-semibold !text-[#554d46] transition-all duration-300 hover:bg-[#c94a3d] hover:!text-white"
              >
                {t.explore}
              </Link>

            </div>
          </div>

          {/* Profile */}
          <div className="rounded-[42px] border border-[#e4ddd5] bg-white p-8 shadow-[0_20px_60px_rgba(40,30,20,0.04)] lg:p-12">

            <div className="flex items-start justify-between gap-6">

              <div>
                <p className="text-[11px] font-semibold tracking-[0.3em] text-[#a69c93]">
                  {t.profileLabel}
                </p>

                <h1 className="mt-5 text-3xl font-bold">
                  {t.profile}
                </h1>
              </div>

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#171717] text-2xl font-semibold text-white">
                {initial}
              </div>

            </div>

            <div className="mt-12 grid gap-6">

              {/* Name */}
              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  {t.name}
                </p>

                <p className="mt-4 text-lg font-medium text-[#302c28]">
                  {name}
                </p>
              </div>

              {/* Email */}
              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  {t.email}
                </p>

                <p
                  dir="ltr"
                  className="mt-4 text-left text-lg font-medium text-[#302c28]"
                >
                  {email}
                </p>
              </div>

              {/* Phone */}
              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  {t.phone}
                </p>

                <p
                  dir="ltr"
                  className="mt-4 text-left text-lg font-medium text-[#302c28]"
                >
                  {phone}
                </p>
              </div>

              {/* Created at */}
              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <p className="text-xs font-medium text-[#a69c93]">
                  {t.createdAt}
                </p>

                <p className="mt-4 text-lg font-medium text-[#302c28]">
                  {createdAt}
                </p>
              </div>

              {/* Status */}
              <div className="rounded-[24px] bg-[#f8f6f2] p-7">
                <div className="flex items-center justify-between gap-6">

                  <div>
                    <p className="text-xs font-medium text-[#a69c93]">
                      {t.accountStatus}
                    </p>

                    <p className="mt-4 text-lg font-medium text-[#302c28]">
                      {t.activeAccount}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ee] px-4 py-2 text-xs font-semibold text-[#4d8060]">
                    <span className="h-2 w-2 rounded-full bg-[#4d8060]" />
                    {t.active}
                  </span>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Member services */}
        <section className="mt-8 rounded-[42px] border border-[#e4ddd5] bg-white p-8 shadow-[0_20px_60px_rgba(40,30,20,0.04)] lg:p-12">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-[11px] font-semibold tracking-[0.3em] text-[#b5966c]">
                {t.memberServices}
              </p>

              <h2 className="mt-5 text-3xl font-bold">
                {t.servicesTitle}
              </h2>
            </div>

            <p className="max-w-[650px] text-sm leading-8 text-[#8a8179]">
              {t.servicesDescription}
            </p>

          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {/* Services */}
            <div className="rounded-[26px] border border-[#e9e3dc] bg-[#f8f6f2] p-7">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                01
              </span>

              <h3 className="mt-6 text-lg font-bold">
                {t.services}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                {t.servicesDescriptionShort}
              </p>

            </div>

            {/* Bookings */}
            <div className="rounded-[26px] border border-[#e9e3dc] bg-[#f8f6f2] p-7">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                02
              </span>

              <h3 className="mt-6 text-lg font-bold">
                {t.bookings}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                {t.bookingsDescription}
              </p>

            </div>

            {/* Help */}
            <div className="rounded-[26px] border border-[#e9e3dc] bg-[#f8f6f2] p-7">

              <span className="text-xs font-semibold tracking-[0.2em] text-[#b5966c]">
                03
              </span>

              <h3 className="mt-6 text-lg font-bold">
                {t.help}
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8a8179]">
                {t.helpDescription}
              </p>

            </div>

          </div>
        </section>

        {/* Bottom actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">

          <Link
            href={homeHref}
            className="rounded-full bg-[#171717] px-7 py-3.5 text-sm font-semibold !text-white transition hover:bg-[#c94a3d]"
          >
            {t.backHome}
          </Link>

          <Link
            href="/auth/signout"
            className="rounded-full border border-[#cdbfb4] bg-transparent px-7 py-3.5 text-sm font-semibold text-[#554d46] transition hover:border-[#c94a3d] hover:text-[#c94a3d]"
          >
            {t.logout}
          </Link>

        </div>

      </div>
    </main>
  );
}