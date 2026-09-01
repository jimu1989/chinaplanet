"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, {
    stiffness: 260,
    damping: 30,
    mass: 0.25,
  });

  const springY = useSpring(y, {
    stiffness: 260,
    damping: 30,
    mass: 0.25,
  });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", move, { passive: true });

    return () => {
      window.removeEventListener("pointermove", move);
    };
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      style={{
        left: springX,
        top: springY,
      }}
      className="pointer-events-none fixed z-[9998] hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c94a3d]/[0.035] blur-3xl md:block"
    />
  );
}
