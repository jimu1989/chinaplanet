import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Language } from "../../../lib/i18n";
import { languages } from "../../../lib/i18n";
import { getService, servicesContent } from "../../../lib/services-content";

export function generateStaticParams() {
  return languages
    ? Object.keys(languages).flatMap((lang) =>
        servicesContent.map((service) => ({
          lang,
          slug: service.slug,
        })),
      )
    : [];
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: Language; slug: string }>;
}) {
  const { lang, slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const isArabic = lang === "ar";
  const title = service.title[lang];
  const description = service.description[lang];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-[#f8f6f2] pt-[76px]"
    >
      <section className="relative overflow-hidden">
        <div className="relative min-h-[500px]">
          <Image
            src={service.heroImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex min-h-[500px] items-end">
            <div className="cp-container w-full pb-16 sm:pb-20">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-white/80">
                CHINA PLANET
              </span>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/85 sm:text-base">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-section">
        <div className="cp-container">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12">
              <span className="cp-label">
                {isArabic ? "المقالات والأدلة" : lang === "zh" ? "文章与指南" : "ARTICLES & GUIDES"}
              </span>

              <h2 className="cp-title mt-4 text-3xl sm:text-4xl">
                {isArabic
                  ? "اكتشف المزيد"
                  : lang === "zh"
                    ? "了解更多"
                    : "Explore More"}
              </h2>
            </div>

            <div className="grid gap-7 md:grid-cols-2">
              {service.articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${lang}/services/${service.slug}/${article.slug}`}
                  className="group overflow-hidden rounded-[28px] bg-white shadow-[0_16px_55px_rgba(40,30,20,0.06)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title[lang]}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    <span className="absolute bottom-5 right-5 rounded-full border border-white/30 bg-black/20 px-4 py-2 text-[10px] font-semibold tracking-[0.18em] text-white backdrop-blur-md">
                      CHINA PLANET
                    </span>
                  </div>

                  <div className="p-7 sm:p-9">
                    <h3 className="text-2xl font-semibold text-[#40372f] transition-colors group-hover:text-[#c94a3d]">
                      {article.title[lang]}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#786e65]">
                      {article.excerpt[lang]}
                    </p>

                    <span className="mt-6 inline-flex text-xs font-semibold text-[#574d45]">
                      {isArabic ? "اقرأ المقال ←" : lang === "zh" ? "阅读文章 →" : "Read article →"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href={`/${lang}/services`}
                className="text-xs font-semibold text-[#786e65] transition-colors hover:text-[#c94a3d]"
              >
                {isArabic ? "العودة إلى الخدمات" : lang === "zh" ? "返回服务" : "Back to Services"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
