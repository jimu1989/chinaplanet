"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  const springX = useSpring(x, {
    stiffness: 80,
    damping: 24,
    mass: 0.7,
  });

  const springY = useSpring(y, {
    stiffness: 80,
    damping: 24,
    mass: 0.7,
  });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener(
      "pointermove",
      move,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        move,
      );
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        left: springX,
        top: springY,
      }}
      className="pointer-events-none fixed z-[9998] hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c94a3d]/[0.035] blur-3xl md:block"
    />
  );
}
