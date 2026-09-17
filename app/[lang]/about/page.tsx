import WhyUs from "../../components/WhyUs";
import Footer from "../../components/Footer";
import type { Language } from "../../lib/i18n";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;

  return (
    <>

      <main>
        <WhyUs language={lang} />

        <section
          dir={lang === "ar" ? "rtl" : "ltr"}
          className="border-t border-[#e4ddd4] bg-[#fbf9f5]"
        >
          <div className="mx-auto max-w-[1380px] px-6 py-20 sm:px-10 lg:px-16">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.65fr]">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c94a3d]">
                  {lang === "ar"
                    ? "المؤسس"
                    : lang === "zh"
                      ? "创始人"
                      : "FOUNDER"}
                </p>

                <h2 className="mt-4 max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em] text-[#40372f]">
                  {lang === "ar"
                    ? "المهندس والمدرب جميل خنكار"
                    : lang === "zh"
                      ? "工程师与培训师 Jameel Khonkar"
                      : "Engineer & Trainer Jameel Khonkar"}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#786e65]">
                  {lang === "ar"
                    ? "المؤسس والمدير التنفيذي لـChina Planet، وصاحب رحلة بدأت في الصين عام 2006 واستمرت لأكثر من 11 سنة."
                    : lang === "zh"
                      ? "China Planet 创始人兼首席执行官。2006年开始中国之旅，并在中国生活超过11年。"
                      : "Founder and CEO of China Planet, whose journey in China began in 2006 and lasted more than 11 years."}
                </p>
              </div>

              <div className="flex lg:justify-end">
                <a
                  href={`/${lang}/about/founder`}
                  className="group inline-flex items-center gap-6 border border-[#40372f] bg-[#40372f] px-7 py-4 text-sm font-medium text-white transition-all duration-400 hover:border-[#c94a3d] hover:bg-[#c94a3d]"
                >
                  {lang === "ar"
                    ? "تعرف على قصة المؤسس"
                    : lang === "zh"
                      ? "了解创始人的故事"
                      : "Meet the founder"}

                  <span className="transition-transform duration-400 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer language={lang} />
    </>
  );
}
