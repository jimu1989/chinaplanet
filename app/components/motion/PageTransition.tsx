"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const COVER_DELAY = 650;
const REVEAL_DURATION = 750;

export default function PageTransition() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"cover" | "reveal">("cover");

  const clearTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    clearTimers();

    setPhase("cover");
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setPhase("reveal");

      revealTimerRef.current = setTimeout(() => {
        setVisible(false);
        revealTimerRef.current = null;
      }, REVEAL_DURATION);

      timerRef.current = null;
    }, COVER_DELAY);

    return () => {
      clearTimers();
    };

  }, [pathname]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={[
        "pointer-events-none fixed inset-0 z-[999999]",
        "flex items-center justify-center",
        "bg-[var(--cp-ivory)]",
        "transition-opacity",
        "ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "cover"
          ? "opacity-100 duration-300"
          : "opacity-0 duration-[900ms]",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex items-center justify-center",
          "transition-all",
          "ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === "cover"
            ? "scale-100 opacity-100 duration-500"
            : "scale-[0.94] opacity-0 duration-[800ms]",
        ].join(" ")}
      >
        <div className="absolute h-48 w-48 rounded-full bg-[var(--cp-red)]/[0.035] blur-3xl" />

        <div className="absolute h-[150px] w-[150px] rounded-full border border-[var(--cp-red)]/10" />

        <div
          className="absolute h-[150px] w-[150px] rounded-full border border-transparent animate-[chinaPlanetSpin_1.5s_linear_infinite]"
          style={{
            borderTopColor: "var(--cp-red)",
            borderRightColor: "rgba(201,74,61,0.10)",
          }}
        />

        <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cp-red)] shadow-[0_0_18px_rgba(201,74,61,0.4)] animate-[chinaPlanetOrbit_1.5s_linear_infinite]" />

        <div className="relative h-[78px] w-[185px] sm:h-[88px] sm:w-[210px]">
          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            fill
            priority
            sizes="210px"
            className="object-contain"
          />
        </div>

        <p className="absolute top-[calc(100%+24px)] whitespace-nowrap text-[9px] font-semibold tracking-[0.35em] text-[var(--cp-muted)]">
          CHINA PLANET
        </p>
      </div>
    </div>
  );
}
