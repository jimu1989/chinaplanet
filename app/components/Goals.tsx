"use client";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import type { Language } from "../lib/i18n";
import {
  customerGoals,
  type CustomerGoalId,
} from "../lib/journey/customerJourney";

export default function Goals({
  language = "ar",
}: {
  language?: Language;
}) {
  const isArabic = language === "ar";
  const direction = isArabic ? "rtl" : "ltr";

  const [activeId, setActiveId] =
    useState<CustomerGoalId>("travel");

  const activeGoal =
    customerGoals.find((goal) => goal.id === activeId) ??
    customerGoals[0];

  const ActiveIcon = activeGoal.icon;

  const title =
    language === "en"
      ? "What do you need from China?"
      : language === "zh"
        ? "您需要从中国得到什么？"
        : "وش تبي من الصين؟";

  const eyebrow =
    language === "en"
      ? "YOUR CHINA JOURNEY"
      : language === "zh"
        ? "您的中国之旅"
        : "رحلتك مع الصين";

  const description =
    language === "en"
      ? "Start with what you need. We will help you find the right path."
      : language === "zh"
        ? "从您的需求开始，我们帮您找到合适的方向。"
        : "ابدأ من احتياجك، ونقرّب لك الطريق المناسب.";

  const getCopy = (
    goal: typeof activeGoal,
  ) => goal[language];

  const current = getCopy(activeGoal);

  return (
    <section
      id="goals"
      dir={direction}
      className="relative overflow-hidden bg-[var(--cp-ivory)] text-[var(--cp-brown)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-40 -top-40 h-[520px] w-[520px] rounded-full bg-[var(--cp-red-soft)]/[0.055] blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -start-32 bottom-0 h-[360px] w-[360px] rounded-full bg-[var(--cp-gold)]/[0.07] blur-3xl"
      />

      <div className="cp-editorial-container relative z-10 py-24 sm:py-28 lg:py-32">
        <div className="border-t border-[var(--cp-line)] pt-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-12 bg-[var(--cp-red)]" />

                <span className="text-[10px] font-semibold tracking-[0.28em] text-[var(--cp-red)]">
                  {eyebrow}
                </span>
              </div>

              <h2 className="mt-8 max-w-[780px] text-[clamp(3.5rem,8vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.08em]">
                {title}
              </h2>

              <p className="mt-8 max-w-xl text-sm leading-8 text-[var(--cp-muted)] sm:text-base">
                {description}
              </p>
            </div>

            <div className="lg:pt-14">
              <div className="relative overflow-hidden bg-[var(--cp-brown-deep)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(201,74,61,0.2),transparent_32%),radial-gradient(circle_at_15%_100%,rgba(181,150,108,0.12),transparent_30%)]" />

                <div className="relative p-7 sm:p-10">
                  <div className="flex items-start justify-between gap-8">
                    <div>
                      <span className="text-[10px] font-semibold tracking-[0.28em] text-[var(--cp-gold-light)]">
                        {String(
                          customerGoals.findIndex(
                            (goal) => goal.id === activeGoal.id,
                          ) + 1,
                        ).padStart(2, "0")}{" "}
                        / 05
                      </span>

                      <p className="mt-3 text-[9px] font-semibold tracking-[0.28em] text-[var(--cp-red-soft)]">
                        {current.short}
                      </p>
                    </div>

                    <ActiveIcon
                      size={30}
                      strokeWidth={1.2}
                      className="text-[var(--cp-red-soft)]"
                    />
                  </div>

                  <h3 className="mt-20 text-3xl font-semibold leading-tight tracking-[-0.045em] text-white sm:text-5xl">
                    {current.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-sm leading-8 text-white/65 sm:text-base">
                    {current.description}
                  </p>

                  <div className="mt-10 flex items-center gap-3 text-white">
                    <span className="h-px w-10 bg-[var(--cp-red-soft)]" />

                    <span className="text-[10px] font-semibold tracking-[0.2em]">
                      {language === "ar"
                        ? "وش تحتاج بعد؟"
                        : language === "zh"
                          ? "您接下来需要什么？"
                          : "WHAT DO YOU NEED NEXT?"}
                    </span>
                  </div>

                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {activeGoal.next[language].map(
                      (item) => (
                        <span
                          key={item}
                          className="border border-white/10 px-4 py-3 text-xs text-white/70"
                        >
                          {item}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="h-1 bg-white/10">
                  <div
                    className="h-full bg-[var(--cp-red)] transition-all duration-500"
                    style={{
                      width: `${((customerGoals.findIndex((goal) => goal.id === activeGoal.id) + 1) / customerGoals.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid border-y border-[var(--cp-line)] md:grid-cols-5">
            {customerGoals.map((goal, index) => {
              const active = goal.id === activeGoal.id;
              const Icon = goal.icon;
              const copy = goal[language];

              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setActiveId(goal.id)}
                  className={[
                    "group relative min-h-[155px] px-5 py-6 text-start transition-all duration-400 sm:px-6",
                    index < customerGoals.length - 1
                      ? "border-b border-[var(--cp-line)] md:border-b-0 md:border-e"
                      : "",
                    active
                      ? "bg-[var(--cp-white)]"
                      : "hover:bg-[var(--cp-white)]",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={[
                        "text-[10px] font-semibold tracking-[0.22em]",
                        active
                          ? "text-[var(--cp-red)]"
                          : "text-[var(--cp-muted-light)]",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <Icon
                      size={18}
                      strokeWidth={1.25}
                      className={[
                        "transition-colors duration-300",
                        active
                          ? "text-[var(--cp-red)]"
                          : "text-[var(--cp-muted-light)] group-hover:text-[var(--cp-brown)]",
                      ].join(" ")}
                    />
                  </div>

                  <div className="mt-9">
                    <span className="text-[9px] font-semibold tracking-[0.2em] text-[var(--cp-muted-light)]">
                      {copy.short}
                    </span>

                    <p className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                      {copy.title}
                    </p>
                  </div>

                  <span
                    className={[
                      "absolute bottom-0 start-0 h-1 bg-[var(--cp-red)] transition-all duration-400",
                      active ? "w-full" : "w-0 group-hover:w-1/2",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.24em] text-[var(--cp-muted-light)]">
              CHINA PLANET
            </span>

            <div className="flex items-center gap-3 text-[var(--cp-red)]">
              {isArabic ? (
                <ArrowLeft size={16} strokeWidth={1.3} />
              ) : (
                <ArrowRight size={16} strokeWidth={1.3} />
              )}

              <span className="text-[10px] font-semibold tracking-[0.2em]">
                {String(
                  customerGoals.findIndex(
                    (goal) => goal.id === activeGoal.id,
                  ) + 1,
                ).padStart(2, "0")}{" "}
                / 05
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
