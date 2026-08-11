import Link from "next/link";
import { siteConfig } from "../lib/site";

export const metadata = {
  title: "سياسة الخصوصية | كوكب الصين",
  description:
    "سياسة الخصوصية الخاصة بموقع كوكب الصين وخدماته الرقمية.",
};

export default function PrivacyPage() {
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
            PRIVACY POLICY
          </span>

          <h1 className="mt-4 text-4xl font-black sm:text-5xl">
            سياسة الخصوصية
          </h1>

          <p className="mt-5 text-sm leading-8 text-white/45">
            نحرص في كوكب الصين على احترام خصوصيتك والتعامل مع
            معلوماتك بطريقة مسؤولة وشفافة.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="text-2xl font-bold">
              المعلومات التي قد تقدمها لنا
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              قد يطلب الموقع بعض المعلومات التي تختار أنت
              تقديمها عند التواصل معنا، مثل الاسم ورقم الهاتف
              وعنوان البريد الإلكتروني وتفاصيل الطلب أو الخدمة
              التي ترغب بها.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              كيف نستخدم المعلومات؟
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              نستخدم المعلومات التي تقدمها للتواصل معك وفهم
              احتياجك والرد على استفسارك وتقديم الخدمات أو
              المعلومات المتعلقة بطلبك.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              التواصل عبر واتساب
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              عند اختيار التواصل عبر واتساب، يتم فتح خدمة
              واتساب وإرسال الرسالة التي جهزتها من خلال الموقع.
              يخضع استخدام واتساب أيضًا لسياسة الخصوصية وشروط
              الخدمة الخاصة بواتساب.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              حماية المعلومات
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              نتخذ إجراءات مناسبة للمساعدة في حماية المعلومات
              التي يتم تقديمها لنا من الوصول أو الاستخدام غير
              المصرح به، مع العلم أن نقل المعلومات عبر الإنترنت
              لا يمكن ضمان أمانه بشكل مطلق.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              التواصل معنا
            </h2>

            <p className="mt-4 leading-8 text-white/55">
              إذا كان لديك سؤال يتعلق بالخصوصية أو بطريقة
              استخدام معلوماتك، يمكنك التواصل معنا عبر:
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
            href="/terms"
            className="text-sm text-[#d99a32] hover:text-[#f3c76a]"
          >
            الشروط والأحكام →
          </Link>
        </div>
      </div>
    </main>
  );
}
