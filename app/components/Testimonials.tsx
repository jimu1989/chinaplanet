import {
  ArrowLeft,
  ArrowRight,
  Compass,
  MessageCircle,
  Route,
} from "lucide-react";
import type { Language } from "../lib/i18n";

export default function Testimonials({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";

  const content = {
    ar: {
      label: "ليش كوكب الصين؟",
      titleTop: "مو بس نوصلك.",
      titleBottom: "نفهمك الطريق.",
      statement:
        "الصين مو مكان واحد، ولا احتياجك يشبه غيرك. لذلك نبدأ منك، ونبني لك الطريق المناسب.",
      points: [
        {
          number: "01",
          title: "نفهم احتياجك",
          description:
            "نبدأ من هدفك الحقيقي، ونفهم وش تحتاج قبل ما نقترح عليك أي خطوة.",
          Icon: MessageCircle,
        },
        {
          number: "02",
          title: "نرتّب الطريق",
          description:
            "نحوّل الخيارات الكثيرة إلى خطوات واضحة ومفهومة تقدر تمشي عليها.",
          Icon: Route,
        },
        {
          number: "03",
          title: "نبقى معك",
          description:
            "ما ينتهي دورنا عند أول تواصل. نتابع معك ونوضح لك الخطوة التالية.",
          Icon: Compass,
        },
      ],
      footerLabel: "CHINA PLANET",
      footerText: "الصين أقرب لما تكون الصورة أوضح.",
      region: "السعودية × الصين",
    },

    en: {
      label: "WHY CHINA PLANET?",
      titleTop: "We don't just get you there.",
      titleBottom: "We make the way clearer.",
      statement:
        "China is not one destination, and your needs are not one-size-fits-all. We start with you and build the right path from there.",
      points: [
        {
          number: "01",
          title: "We understand first",
          description:
            "We start with what you actually need before recommending the next step.",
          Icon: MessageCircle,
        },
        {
          number: "02",
          title: "We make the way clear",
          description:
            "We turn complex options into clear, practical steps you can act on.",
          Icon: Route,
        },
        {
          number: "03",
          title: "We stay involved",
          description:
            "Our role does not end at the first conversation. We stay close to the next step.",
          Icon: Compass,
        },
      ],
      footerLabel: "CHINA PLANET",
      footerText: "China feels closer when the picture is clear.",
      region: "SAUDI ARABIA × CHINA",
    },

    zh: {
      label: "为什么选择中国星球？",
      titleTop: "我们不只是带您到中国。",
      titleBottom: "我们让这条路更清晰。",
      statement:
        "中国不是一个单一的目的地，您的需求也各不相同。我们从您的需求出发，为您找到合适的方向。",
      points: [
        {
          number: "01",
          title: "先了解您的需求",
          description:
            "我们先了解您的真正目标，再为您建议下一步。",
          Icon: MessageCircle,
        },
        {
          number: "02",
          title: "把路径变清晰",
          description:
            "把复杂的选择整理成清晰、实际、可以执行的步骤。",
          Icon: Route,
        },
        {
          number: "03",
          title: "持续陪伴",
          description:
            "我们的工作不会停留在第一次沟通，而是继续陪您走向下一步。",
          Icon: Compass,
        },
      ],
      footerLabel: "CHINA PLANET",
      footerText: "当方向更清晰，中国自然更近。",
      region: "沙特阿拉伯 × 中国",
    },
  };

  const c = content[language];

  return (
    <section
      id="trust"
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[var(--cp-ivory)] text-[var(--cp-brown)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 top-20 h-[420px] w-[420px] rounded-full bg-[var(--cp-red-soft)]/[0.05] blur-3xl"
      />

      <div className="cp-editorial-container relative z-10 py-24 sm:py-28 lg:py-32">
        <div className="border-t border-[var(--cp-line)] pt-8">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
            <div>
              <div className="flex items-center gap-3 text-[var(--cp-red)]">
                <span className="h-px w-12 bg-current" />

                <span className="text-[10px] font-semibold tracking-[0.28em]">
                  {c.label}
                </span>
              </div>
            </div>

            <div>
              <h2 className="max-w-5xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
                <span className="block">{c.titleTop}</span>

                <span className="mt-3 block text-[var(--cp-red-soft)]">
                  {c.titleBottom}
                </span>
              </h2>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="relative overflow-hidden bg-[var(--cp-brown-deep)] p-8 sm:p-10 lg:p-14">
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -start-8 text-[210px] font-semibold leading-none tracking-[-0.12em] text-white/[0.035]"
              >
                CP
              </div>

              <div className="relative z-10">
                <span className="text-[9px] font-semibold tracking-[0.28em] text-[var(--cp-gold-light)]">
                  CHINA PLANET
                </span>

                <p className="mt-10 max-w-3xl text-2xl font-medium leading-[1.35] tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">
                  {c.statement}
                </p>

                <div className="mt-12 flex items-center gap-4">
                  <span className="h-px w-14 bg-[var(--cp-red-soft)]" />

                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white/45">
                    {c.region}
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-[var(--cp-line)] bg-[var(--cp-white)]">
              <div className="border-b border-[var(--cp-line)] bg-[var(--cp-ivory)] px-7 py-6 sm:px-8">
                <span className="text-[9px] font-semibold tracking-[0.28em] text-[var(--cp-muted-light)]">
                  03 THINGS THAT MATTER
                </span>
              </div>

              <div>
                {c.points.map((point, index) => {
                  const Icon = point.Icon;

                  return (
                    <div
                      key={point.number}
                      className={[
                        "group relative px-7 py-8 transition-colors duration-300 sm:px-8",
                        index < c.points.length - 1
                          ? "border-b border-[var(--cp-line)]"
                          : "",
                        "hover:bg-[var(--cp-ivory)]",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-6">
                        <span className="text-[10px] font-semibold tracking-[0.22em] text-[var(--cp-red)]">
                          {point.number}
                        </span>

                        <Icon
                          size={20}
                          strokeWidth={1.25}
                          className="text-[var(--cp-gold)] transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <h3 className="mt-8 text-xl font-semibold tracking-[-0.03em]">
                        {point.title}
                      </h3>

                      <p className="mt-3 max-w-md text-sm leading-7 text-[var(--cp-muted)]">
                        {point.description}
                      </p>

                      <span className="absolute bottom-0 start-7 h-px w-0 bg-[var(--cp-red)] transition-all duration-500 group-hover:w-10 sm:start-8" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-[var(--cp-line)] pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-muted-light)]">
                {c.footerLabel}
              </span>

              <p className="mt-4 max-w-xl text-xl font-medium tracking-[-0.03em] text-[var(--cp-brown)] sm:text-2xl">
                {c.footerText}
              </p>
            </div>

            <div className="flex items-center gap-3 text-[var(--cp-red)]">
              {isArabic ? (
                <ArrowLeft size={18} strokeWidth={1.3} />
              ) : (
                <ArrowRight size={18} strokeWidth={1.3} />
              )}

              <span className="text-[10px] font-semibold tracking-[0.22em]">
                03 / 03
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
