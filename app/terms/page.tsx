import Link from "next/link";
import { siteConfig } from "../lib/site";

export const metadata = {
  title: "الشروط والأحكام | كوكب الصين",
  description:
    "الشروط والأحكام الخاصة باستخدام موقع كوكب الصين وخدماته.",
};

const sections = [
  {
    title: "طبيعة الموقع",
    text: "يقدم الموقع معلومات تعريفية عن خدمات كوكب الصين ووسائل التواصل معنا. تختلف تفاصيل كل خدمة حسب احتياج العميل وطبيعة الطلب والاتفاق بين الطرفين.",
  },
  {
    title: "طلب الخدمات",
    text: "إرسال طلب من خلال الموقع أو واتساب لا يعني بالضرورة إتمام الحجز أو التعاقد أو قبول الخدمة. يتم تأكيد التفاصيل والتكلفة والتوافر قبل تنفيذ أي خدمة.",
  },
  {
    title: "الأسعار والتكاليف",
    text: "قد تختلف الأسعار والتكاليف بحسب نوع الخدمة والتاريخ والوجهة والجهات الخارجية ذات العلاقة. يتم توضيح التفاصيل للعميل قبل الالتزام بالخدمة متى كان ذلك ممكنًا.",
  },
  {
    title: "معلومات الجهات الخارجية",
    text: "بعض الخدمات قد تعتمد على جهات خارجية مثل شركات الطيران والفنادق والجامعات والموردين وشركات الشحن أو غيرها. وتخضع الخدمات المقدمة من تلك الجهات لشروطها وسياساتها الخاصة.",
  },
  {
    title: "دقة المعلومات",
    text: "نسعى إلى تقديم معلومات دقيقة ومحدثة، لكن بعض المعلومات المتعلقة بالأسعار والتوافر والأنظمة والمتطلبات قد تتغير. لذلك ينبغي تأكيد التفاصيل قبل اتخاذ قرار نهائي.",
  },
];

export default function TermsPage() {
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
              TERMS & CONDITIONS
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-medium leading-tight text-[#40372f] sm:text-5xl lg:text-6xl">
            الشروط والأحكام
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-8 text-[#786e65] sm:text-base">
            باستخدامك لموقع كوكب الصين أو تواصلك معنا، فإنك
            تقر بقراءة وفهم الشروط التالية.
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
              06
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#40372f] sm:text-2xl">
                التواصل معنا
              </h2>

              <p className="mt-4 text-sm leading-8 text-[#786e65] sm:text-base">
                للاستفسارات أو طلب توضيح حول أي خدمة، يمكنك
                التواصل معنا مباشرة:
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
            href="/privacy"
            className="font-semibold text-[#554b43] transition-colors hover:text-[#d8795e]"
          >
            سياسة الخصوصية
            <span className="mr-2 text-[#d8795e]">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}