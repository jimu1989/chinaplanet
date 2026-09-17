import Image from "next/image";
import Link from "next/link";
import type { Language } from "../../../lib/i18n";
import Footer from "../../../components/Footer";

const content = {
  ar: {
    back: "عن كوكب الصين",
    eyebrow: "المؤسس والمدير التنفيذي",
    name: "المهندس والمدرب",
    nameAccent: "جميل خنكار.",
    intro:
      "رحلة بدأت مع الصين في 2006، وعشت تفاصيلها لأكثر من 11 سنة. تعلّمت اللغة، درست، عملت، وخرجت من التجربة بفهم أعمق للطريق بين السعودية والصين.",
    founderMark: "FOUNDER",
    orbit: "CHINA PLANET",
    since: "2006 — NOW",
    portrait: "الصورة الشخصية",
    portraitNote: "نترك هذا المكان للصورة الرسمية للمؤسس",
    journeyLabel: "رحلة بدأت هناك",
    journeyTitle: "قبل أن أساعد الناس على الوصول إلى الصين، عشتها أنا أولًا.",
    journeyText:
      "في عام 2006 بدأت رحلتي مع الصين. لم تكن مجرد سنوات دراسة؛ كانت سنوات تعلّم يومي للغة، للناس، للبيئة، ولطريقة بناء العلاقات. عشت في الصين لأكثر من 11 سنة، وتدرجت من تعلم اللغة إلى البكالوريوس ثم الماجستير، وصولًا إلى تخصص هندسة الشبكات والاتصالات.",
    languageLabel: "اللغة",
    languageTitle: "اللغة كانت مفتاح الدخول.",
    languageText:
      "تعلمت الصينية من البيئة نفسها، ثم نقلت هذه التجربة إلى السعودية من خلال التدريب على اللغة الصينية. بالنسبة لي، اللغة لم تكن مادة دراسية فقط؛ كانت أداة لفهم الناس والتعامل معهم وبناء جسور حقيقية.",
    expertiseLabel: "الخبرة",
    expertiseTitle: "سنوات الصين غيّرت طريقة فهمي لها.",
    expertiseText:
      "مع الوقت، فهمت أن أصعب شيء في الصين ليس البعد الجغرافي. أحيانًا المشكلة ببساطة أن الطريق غير واضح: من أين تبدأ؟ من تسأل؟ كيف تتواصل؟ وكيف تتحول الرغبة إلى خطوة عملية؟",
    chinaPlanetLabel: "ولهذا وُلدت",
    chinaPlanetTitle: "China Planet.",
    chinaPlanetText:
      "أسست China Planet لأجمع هذه التجربة في مكان واحد. منصة تجعل الصين أقرب وأكثر وضوحًا لمن يريد السفر، الدراسة، تعلم اللغة، التجارة، أو الوصول إلى المصانع والعلاقات المناسبة.",
    roleLabel: "اليوم",
    roleTitle: "مؤسس China Planet ومديرها التنفيذي.",
    roleText:
      "أنا مؤسس China Planet ومديرها التنفيذي، ومؤسس الموقع ومبرمجه ومطوره. هذه المنصة ليست فكرة نظرية بالنسبة لي؛ هي امتداد لسنوات عشتها بنفسي بين السعودية والصين.",
    close:
      "الصين ليست بعيدة عندما تعرف الطريق.",
    cta: "اكتشف كوكب الصين",
  },

  en: {
    back: "About China Planet",
    eyebrow: "FOUNDER & CEO",
    name: "Engineer & Trainer",
    nameAccent: "Jameel Khonkar.",
    intro:
      "A journey that began with China in 2006. I lived there for more than 11 years, learned the language, studied, worked, and came away with a deeper understanding of the path between Saudi Arabia and China.",
    founderMark: "FOUNDER",
    orbit: "CHINA PLANET",
    since: "2006 — NOW",
    portrait: "PORTRAIT",
    portraitNote: "Reserved for the founder's official portrait",
    journeyLabel: "THE JOURNEY",
    journeyTitle: "Before helping people reach China, I lived it first.",
    journeyText:
      "My journey with China began in 2006. It was never just a period of study; it was years of learning the language, the people, the environment, and the way relationships are built. I lived in China for more than 11 years, moving from language study to a bachelor's degree, then a master's degree, specializing in network and telecommunications engineering.",
    languageLabel: "LANGUAGE",
    languageTitle: "Language was the key to entering the world.",
    languageText:
      "I learned Chinese from within the environment, then brought that experience back to Saudi Arabia through Chinese-language training. For me, language was never just a subject; it was a tool for understanding people, communicating naturally, and building real bridges.",
    expertiseLabel: "EXPERIENCE",
    expertiseTitle: "Years in China changed the way I understood it.",
    expertiseText:
      "Over time, I realized that the hardest part of China is not always the distance. Sometimes the problem is simply that the path is unclear: Where do you start? Who do you ask? How do you communicate? And how do you turn interest into a practical next step?",
    chinaPlanetLabel: "THAT IS WHY",
    chinaPlanetTitle: "China Planet was born.",
    chinaPlanetText:
      "I founded China Planet to bring that experience together in one place. A platform that makes China closer and easier to navigate for people who want to travel, study, learn Chinese, trade, or connect with the right factories and relationships.",
    roleLabel: "TODAY",
    roleTitle: "Founder & CEO of China Planet.",
    roleText:
      "I am the founder and CEO of China Planet, and the founder, programmer, and developer of this website. The platform is not a theoretical idea to me; it is an extension of the years I have personally lived between Saudi Arabia and China.",
    close:
      "China feels closer when you understand the way.",
    cta: "Explore China Planet",
  },

  zh: {
    back: "关于中国星球",
    eyebrow: "创始人兼首席执行官",
    name: "工程师与培训师",
    nameAccent: "Jameel Khonkar",
    intro:
      "一段始于2006年的中国之旅。我在中国生活了11年以上，学习中文、完成学业，并深入了解沙特与中国之间真正的沟通与连接方式。",
    founderMark: "FOUNDER",
    orbit: "CHINA PLANET",
    since: "2006 — 至今",
    portrait: "创始人照片",
    portraitNote: "这里将放置创始人的正式照片",
    journeyLabel: "这段旅程",
    journeyTitle: "在帮助别人走进中国之前，我先真正生活过中国。",
    journeyText:
      "我的中国之旅始于2006年。这从来不只是留学阶段，而是多年对语言、人物、环境以及人与人之间关系的深入学习。我在中国生活了11年以上，从中文学习开始，之后完成本科和硕士学习，专业方向为网络与通信工程。",
    languageLabel: "语言",
    languageTitle: "语言是进入这个世界的钥匙。",
    languageText:
      "我从真实环境中学习中文，之后把这段经验带回沙特，参与中文培训。对我而言，语言不只是一门课程，更是理解人、沟通人与建立真正连接的工具。",
    expertiseLabel: "经验",
    expertiseTitle: "多年在中国生活，改变了我理解中国的方式。",
    expertiseText:
      "慢慢地我发现，中国真正困难的地方不一定是距离，而是路径是否清晰：从哪里开始？应该问谁？如何沟通？怎样把兴趣真正变成下一步可以执行的事情？",
    chinaPlanetLabel: "因此",
    chinaPlanetTitle: "China Planet 诞生了。",
    chinaPlanetText:
      "我创立 China Planet，希望把这些经历真正整合起来。让旅行、留学、中文学习、贸易、寻找工厂以及建立可靠关系，都拥有更加清晰的入口。",
    roleLabel: "现在",
    roleTitle: "China Planet 创始人兼首席执行官。",
    roleText:
      "我是 China Planet 的创始人兼首席执行官，也是这个网站的创始人、程序员和开发者。这个平台并不是一个抽象的想法，而是我多年生活在沙特与中国之间的经历延伸。",
    close:
      "真正了解路线，中国就不会遥远。",
    cta: "探索中国星球",
  },
};

export default async function FounderPage({
  params,
}: {
  params: Promise<{ lang: Language }>;
}) {
  const { lang } = await params;
  const t = content[lang];
  const isArabic = lang === "ar";

  return (
    <>
      <main
        dir={isArabic ? "rtl" : "ltr"}
        className="overflow-hidden bg-[#f7f4ee] text-[#332d28]"
      >
        {/* =====================================================
            HERO
           ===================================================== */}
        <section className="relative overflow-hidden bg-[#2b2521] text-[#fbf9f5]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(201,74,61,0.15),transparent_30%)]" />

          <div className="absolute -end-40 -top-32 h-[600px] w-[600px] rounded-full border border-[#d6bd94]/10" />

          <div className="absolute -start-36 -bottom-40 h-[500px] w-[500px] rounded-full border border-white/[0.025]" />

          <div className="relative mx-auto grid min-h-[94vh] max-w-[1500px] items-end gap-16 px-6 pb-10 pt-28 sm:px-10 lg:grid-cols-[minmax(0,1fr)_430px] lg:px-16 lg:pb-16">
            {/* Main identity */}
            <div className="pb-3">
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-white/38 transition hover:text-white"
              >
                ← {t.back}
              </Link>

              <p className="mt-20 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d9876e]">
                {t.eyebrow}
              </p>

              <h1 className="mt-5 max-w-6xl text-[clamp(4rem,9vw,9.2rem)] font-medium leading-[0.84] tracking-[-0.07em]">
                {t.name}
                <br />
                <span className="font-serif italic text-[#d9876e]">
                  {t.nameAccent}
                </span>
              </h1>

              <p className="mt-10 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                {t.intro}
              </p>
            </div>

            {/* Founder visual */}
            <div className="relative mx-auto flex w-full max-w-[430px] items-center justify-center lg:mx-0 lg:justify-self-end">
              <div className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-[#40372f]">
                <div className="absolute inset-5 border border-[#d6bd94]/15" />

                {/* Animated brand orbit */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="founder-orbit founder-orbit-outer" />
                  <div className="founder-orbit founder-orbit-main" />

                  <div className="founder-orbit-dot founder-orbit-dot-main" />
                  <div className="founder-orbit-dot founder-orbit-dot-outer" />

                  <div className="founder-glow" />

                  <div className="founder-logo">
                    <div className="founder-logo-ring" />

                    <Image
                      src="/images/china-planet-logo.png"
                      alt="China Planet"
                      width={250}
                      height={250}
                      priority
                      className="relative z-10 h-auto w-[115px] object-contain sm:w-[135px]"
                    />
                  </div>
                </div>

                <div className="absolute bottom-5 start-5 text-[8px] font-semibold uppercase tracking-[0.28em] text-white/25">
                  {t.founderMark}
                </div>

                <div className="absolute bottom-5 end-5 text-[8px] uppercase tracking-[0.26em] text-white/20">
                  {t.since}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            JOURNEY
           ===================================================== */}
        <section className="mx-auto max-w-[1500px] px-6 py-28 sm:px-10 lg:px-16 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.23fr_0.77fr]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c94a3d]">
                {t.journeyLabel}
              </p>
            </div>

            <div>
              <h2 className="max-w-6xl text-[clamp(3rem,6vw,6.7rem)] font-medium leading-[0.9] tracking-[-0.06em]">
                {t.journeyTitle}
              </h2>

              <p className="mt-10 max-w-4xl text-lg leading-9 text-[#786e65]">
                {t.journeyText}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            THREE CHAPTERS
           ===================================================== */}
        <section className="border-y border-[#e4ddd4] bg-[#fbf9f5]">
          <div className="mx-auto max-w-[1500px]">
            <article className="grid gap-8 border-b border-[#e4ddd4] px-6 py-14 sm:px-10 lg:grid-cols-[0.23fr_0.77fr] lg:px-16 lg:py-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c94a3d]">
                {t.languageLabel}
              </p>

              <div>
                <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#40372f]">
                  {t.languageTitle}
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[#786e65]">
                  {t.languageText}
                </p>
              </div>
            </article>

            <article className="grid gap-8 border-b border-[#e4ddd4] px-6 py-14 sm:px-10 lg:grid-cols-[0.23fr_0.77fr] lg:px-16 lg:py-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c94a3d]">
                {t.expertiseLabel}
              </p>

              <div>
                <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#40372f]">
                  {t.expertiseTitle}
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[#786e65]">
                  {t.expertiseText}
                </p>
              </div>
            </article>

            <article className="grid gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[0.23fr_0.77fr] lg:px-16 lg:py-20">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c94a3d]">
                {t.roleLabel}
              </p>

              <div>
                <h2 className="max-w-4xl text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[0.94] tracking-[-0.05em] text-[#40372f]">
                  {t.roleTitle}
                </h2>

                <p className="mt-7 max-w-3xl text-base leading-8 text-[#786e65]">
                  {t.roleText}
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================
            CHINA PLANET
           ===================================================== */}
        <section className="relative overflow-hidden bg-[#40372f] text-[#fbf9f5]">
          <div className="absolute -start-48 -top-20 h-[500px] w-[500px] rounded-full border border-[#d6bd94]/10" />
          <div className="absolute -end-52 -bottom-48 h-[650px] w-[650px] rounded-full border border-[#c94a3d]/10" />

          <div className="relative mx-auto max-w-[1500px] px-6 py-28 sm:px-10 lg:px-16 lg:py-44">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d9876e]">
              {t.chinaPlanetLabel}
            </p>

            <h2 className="mt-6 max-w-6xl text-[clamp(4rem,8vw,8rem)] font-medium leading-[0.85] tracking-[-0.07em]">
              {t.chinaPlanetTitle}
            </h2>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_0.42fr]">
              <p className="max-w-4xl text-lg leading-9 text-white/58">
                {t.chinaPlanetText}
              </p>

              <div className="border-t border-white/10 pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#d9876e]">
                  {t.roleLabel}
                </p>

                <p className="mt-5 text-sm leading-8 text-white/45">
                  {t.roleText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CLOSING
           ===================================================== */}
        <section className="mx-auto max-w-[1500px] px-6 py-28 text-center sm:px-10 lg:px-16 lg:py-44">
          <p className="mx-auto max-w-6xl text-[clamp(3.2rem,7vw,8rem)] font-medium leading-[0.86] tracking-[-0.07em] text-[#40372f]">
            {t.close}
          </p>

          <Link
            href={`/${lang}`}
            className="group mt-12 inline-flex items-center gap-5 rounded-full border border-[#d6bd94] bg-[#d6bd94] px-8 py-4 text-sm font-semibold text-[#2b2521] shadow-[0_12px_35px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c94a3d] hover:bg-[#c94a3d] hover:text-white"
          >
            {t.cta}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>
      </main>

      <Footer language={lang} />

      <style>{`
        .founder-orbit {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }

        .founder-orbit-outer {
          width: 72%;
          aspect-ratio: 1;
          border: 1px solid rgba(214, 189, 148, 0.12);
          animation: founderOuterOrbit 24s linear infinite;
        }

        .founder-orbit-main {
          width: 57%;
          aspect-ratio: 1;
          border: 1.5px solid transparent;
          border-top-color: rgba(201, 74, 61, 0.9);
          border-right-color: rgba(201, 74, 61, 0.48);
          border-bottom-color: rgba(214, 189, 148, 0.14);
          animation: founderMainOrbit 12s linear infinite;
        }

        .founder-orbit-dot {
          position: absolute;
          border-radius: 9999px;
          transform-origin: center;
        }

        .founder-orbit-dot-main {
          width: 57%;
          aspect-ratio: 1;
          animation: founderMainOrbit 12s linear infinite;
        }

        .founder-orbit-dot-main::before {
          content: "";
          position: absolute;
          left: 50%;
          top: -3px;
          width: 8px;
          height: 8px;
          transform: translateX(-50%);
          border-radius: 9999px;
          background: #d6bd94;
          box-shadow: 0 0 18px rgba(214, 189, 148, 0.8);
        }

        .founder-orbit-dot-outer {
          width: 72%;
          aspect-ratio: 1;
          animation: founderOuterOrbit 24s linear infinite;
        }

        .founder-orbit-dot-outer::before {
          content: "";
          position: absolute;
          right: 9%;
          top: 8%;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: rgba(216, 121, 94, 0.9);
          box-shadow: 0 0 14px rgba(216, 121, 94, 0.6);
        }

        .founder-glow {
          position: absolute;
          width: 46%;
          aspect-ratio: 1;
          border-radius: 9999px;
          background: rgba(201, 74, 61, 0.12);
          filter: blur(38px);
          animation: founderGlow 4s ease-in-out infinite;
        }

        .founder-logo {
          position: relative;
          display: flex;
          width: 34%;
          aspect-ratio: 1;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          border: 1px solid rgba(214, 189, 148, 0.32);
          background: rgba(43, 37, 33, 0.44);
          box-shadow: 0 35px 100px rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          animation: founderLogoFloat 4.8s ease-in-out infinite;
        }

        .founder-logo-ring {
          position: absolute;
          inset: 9%;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        @keyframes founderOuterOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes founderMainOrbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes founderGlow {
          0%,
          100% {
            transform: scale(0.94);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.9;
          }
        }

        @keyframes founderLogoFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .founder-orbit,
          .founder-orbit-dot,
          .founder-glow,
          .founder-logo {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
