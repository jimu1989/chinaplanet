import Link from "next/link";
import { siteConfig } from "../lib/site";

export const metadata = {
  title: "الشروط والأحكام | كوكب الصين",
  description:
    "الشروط والأحكام الخاصة باستخدام موقع كوكب الصين وخدماته.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#d99a32] transition-colors hover:text-[#f3c76a]"
        >
          ← العودة إلى كوكب الصين
        </Link>

        <div className="mt-10">
          <span className="text-xs font-bold tracking-[0.2em] text-[#d99a32]">
            TERMS & CONDITIONS
          </span>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            الشروط والأحكام
          </h1>

          <p className="mt-5 text-sm leading-8 text-white/45">
            باستخدامك لموقع كوكب الصين أو تواصلك معنا، فإنك
            تقر بقراءة وفهم الشروط التالية.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold">
              طبيعة الموقع
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              يقدم الموقع معلومات تعريفية عن خدمات كوكب الصين
              ووسائل التواصل معنا. تختلف تفاصيل كل خدمة حسب
              احتياج العميل وطبيعة الطلب والاتفاق بين الطرفين.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              طلب الخدمات
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              إرسال طلب من خلال الموقع أو واتساب لا يعني
              بالضرورة إتمام الحجز أو التعاقد أو قبول الخدمة.
              يتم تأكيد التفاصيل والتكلفة والتوافر قبل تنفيذ
              أي خدمة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              الأسعار والتكاليف
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              قد تختلف الأسعار والتكاليف بحسب نوع الخدمة
              والتاريخ والوجهة والجهات الخارجية ذات العلاقة.
              يتم توضيح التفاصيل للعميل قبل الالتزام بالخدمة
              متى كان ذلك ممكنًا.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              معلومات الجهات الخارجية
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              بعض الخدمات قد تعتمد على جهات خارجية مثل شركات
              الطيران والفنادق والجامعات والموردين وشركات الشحن
              أو غيرها. وتخضع الخدمات المقدمة من تلك الجهات
              لشروطها وسياساتها الخاصة.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              دقة المعلومات
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              نسعى إلى تقديم معلومات دقيقة ومحدثة، لكن بعض
              المعلومات المتعلقة بالأسعار والتوافر والأنظمة
              والمتطلبات قد تتغير. لذلك ينبغي تأكيد التفاصيل
              قبل اتخاذ قرار نهائي.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              التواصل
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              للاستفسارات أو طلب توضيح حول أي خدمة، يمكنك
              التواصل معنا مباشرة:
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-[#d99a32] hover:text-[#f3c76a]"
                dir="ltr"
              >
                {siteConfig.contact.email}
              </a>

              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="block text-[#d99a32] hover:text-[#f3c76a]"
                dir="ltr"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
          </section>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/privacy"
            className="text-sm text-[#d99a32] hover:text-[#f3c76a]"
          >
            ← سياسة الخصوصية
          </Link>
        </div>
      </div>
    </main>
  );
}
