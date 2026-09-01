"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const INITIAL_DELAY = 700;
const NAVIGATION_DELAY = 120;
const REVEAL_DURATION = 700;

export default function PageTransition() {
  const pathname = usePathname();

  const previousPathname = useRef(pathname);
  const initialDone = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [visible, setVisible] = useState(true);
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

  const reveal = (delay: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
    }

    setVisible(true);
    setPhase("cover");

    timerRef.current = setTimeout(() => {
      setPhase("reveal");

      revealTimerRef.current = setTimeout(() => {
        setVisible(false);
        revealTimerRef.current = null;
      }, REVEAL_DURATION);

      timerRef.current = null;
    }, delay);
  };

  /*
   * INITIAL LOAD
   *
   * يظهر اللودر أول ما الموقع يفتح،
   * وبعدها يختفي تلقائيًا.
   *
   * لا نعتمد على firstRender حتى لا يعلق
   * مع React Strict Mode.
   */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      reveal(INITIAL_DELAY);
      initialDone.current = true;
    }, 0);

    return () => {
      window.clearTimeout(timer);
      clearTimers();
    };
  }, []);

  /*
   * PAGE NAVIGATION
   *
   * Next.js يغير pathname بعد التنقل.
   * عندها نظهر transition ونكشف الصفحة الجديدة.
   */
  useEffect(() => {
    if (!initialDone.current) return;

    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;

    reveal(NAVIGATION_DELAY);

    return () => {
      clearTimers();
    };
  }, [pathname]);

  /*
   * FINAL CLEANUP
   */
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
        "bg-white",
        "transition-opacity",
        "ease-[cubic-bezier(0.76,0,0.24,1)]",
        phase === "cover"
          ? "opacity-100 duration-[420ms]"
          : "opacity-0 duration-[700ms]",
      ].join(" ")}
    >
      <div
        className={[
          "relative flex items-center justify-center",
          "transition-all",
          "ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === "cover"
            ? "scale-100 opacity-100 duration-500"
            : "scale-[0.96] opacity-0 duration-500",
        ].join(" ")}
      >
        {/* SOFT ATMOSPHERE */}
        <div
          className="
            absolute
            h-44
            w-44
            rounded-full
            bg-[#c94a3d]/[0.025]
            blur-3xl
          "
        />

        {/* STATIC ORBIT RING */}
        <div
          className="
            absolute
            h-[142px]
            w-[142px]
            rounded-full
            border
            border-[#c94a3d]/10
          "
        />

        {/* ROTATING ORBIT */}
        <div
          className="
            absolute
            h-[142px]
            w-[142px]
            rounded-full
            border
            border-transparent
            animate-[chinaPlanetSpin_1.5s_linear_infinite]
          "
          style={{
            borderTopColor: "#c94a3d",
            borderRightColor: "rgba(201,74,61,0.08)",
          }}
        />

        {/* ORBITING DOT */}
        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-[7px]
            w-[7px]
            rounded-full
            bg-[#c94a3d]
            shadow-[0_0_18px_rgba(201,74,61,0.4)]
            animate-[chinaPlanetOrbit_1.5s_linear_infinite]
          "
        />

        {/* CHINA PLANET LOGO */}
        <div
          className="
            relative
            h-[72px]
            w-[175px]
            sm:h-[82px]
            sm:w-[200px]
          "
        >
          <Image
            src="/images/china-planet-logo.png"
            alt="China Planet"
            fill
            priority
            sizes="200px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
