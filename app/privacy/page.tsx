import Link from "next/link";
import { siteConfig } from "../lib/site";

export const metadata = {
  title: "سياسة الخصوصية | كوكب الصين",
  description:
    "سياسة الخصوصية الخاصة بموقع كوكب الصين وخدماته الرقمية.",
};

const sections = [
  {
    title: "المعلومات التي قد تقدمها لنا",
    text: "قد يطلب الموقع بعض المعلومات التي تختار أنت تقديمها عند التواصل معنا، مثل الاسم ورقم الهاتف وعنوان البريد الإلكتروني وتفاصيل الطلب أو الخدمة التي ترغب بها.",
  },
  {
    title: "كيف نستخدم المعلومات؟",
    text: "نستخدم المعلومات التي تقدمها للتواصل معك وفهم احتياجك والرد على استفسارك وتقديم الخدمات أو المعلومات المتعلقة بطلبك.",
  },
  {
    title: "التواصل عبر واتساب",
    text: "عند اختيار التواصل عبر واتساب، يتم فتح خدمة واتساب وإرسال الرسالة التي جهزتها من خلال الموقع. يخضع استخدام واتساب أيضًا لسياسة الخصوصية وشروط الخدمة الخاصة بواتساب.",
  },
  {
    title: "حماية المعلومات",
    text: "نتخذ إجراءات مناسبة للمساعدة في حماية المعلومات التي يتم تقديمها لنا من الوصول أو الاستخدام غير المصرح به، مع العلم أن نقل المعلومات عبر الإنترنت لا يمكن ضمان أمانه بشكل مطلق.",
  },
];

export default function PrivacyPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f8f6f2] text-[#40372f]"
    >
      {/* HEADER */}
      <div className="border-b border-[#e4dcd4] bg-[#f8f6f2]">
        <div className="cp-container flex min-h-[110px] items-center justify-between gap-6">
          <Link
            href="/"
            className="text-xs font-semibold text-[#554b43] transition-colors hover:text-[#d8795e]"
          >
            العودة إلى كوكب الصين
            <span className="mr-2 text-[#d8795e]">←</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-[9px] font-semibold tracking-[0.3em] text-[#8d8178]">
              CHINA PLANET
            </span>

            <span className="h-px w-7 bg-[#d8795e]" />
          </div>
        </div>
      </div>

      <div className="cp-container py-20 sm:py-24 lg:py-28">
        {/* TITLE */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="cp-line" />

            <span className="cp-label">
              PRIVACY POLICY
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-medium leading-tight text-[#40372f] sm:text-5xl lg:text-6xl">
            سياسة الخصوصية
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-8 text-[#786e65] sm:text-base">
            نحرص في كوكب الصين على احترام خصوصيتك والتعامل
            مع معلوماتك بطريقة مسؤولة وشفافة.
          </p>
        </div>

        {/* CONTENT */}
        <div className="mt-16 max-w-4xl border-t border-[#e4dcd4]">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className="grid gap-6 border-b border-[#e4dcd4] py-10 md:grid-cols-[150px_1fr] md:gap-12"
            >
              <div className="text-[10px] font-semibold tracking-[0.22em] text-[#b1a59b]">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#40372f] sm:text-2xl">
                  {section.title}
                </h2>

                <p className="mt-4 text-sm leading-8 text-[#786e65] sm:text-base">
                  {section.text}
                </p>
              </div>
            </section>
          ))}

          {/* CONTACT */}
          <section className="grid gap-6 border-b border-[#e4dcd4] py-10 md:grid-cols-[150px_1fr] md:gap-12">
            <div className="text-[10px] font-semibold tracking-[0.22em] text-[#b1a59b]">
              05
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#40372f] sm:text-2xl">
                التواصل معنا
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#786e65] sm:text-base">
                إذا كان لديك سؤال يتعلق بالخصوصية أو بطريقة
                استخدام معلوماتك، يمكنك التواصل معنا عبر:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="rounded-xl border border-[#ded5cd] bg-[#fffdf9] px-5 py-4 text-sm text-[#554b43] transition-all hover:border-[#d8795e] hover:text-[#d8795e]"
                  dir="ltr"
                >
                  {siteConfig.contact.email}
                </a>

                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="rounded-xl border border-[#ded5cd] bg-[#fffdf9] px-5 py-4 text-sm text-[#554b43] transition-all hover:border-[#d8795e] hover:text-[#d8795e]"
                  dir="ltr"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER NAV */}
        <div className="flex flex-col gap-4 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-[#786e65] transition-colors hover:text-[#d8795e]"
          >
            ← العودة إلى الصفحة الرئيسية
          </Link>

          <Link
            href="/terms"
            className="font-semibold text-[#554b43] transition-colors hover:text-[#d8795e]"
          >
            الشروط والأحكام
            <span className="mr-2 text-[#d8795e]">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}