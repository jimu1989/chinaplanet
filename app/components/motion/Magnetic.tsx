"use client";

import {
  type ReactNode,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.22,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 280,
    damping: 22,
    mass: 0.35,
  });

  const springY = useSpring(y, {
    stiffness: 280,
    damping: 22,
    mass: 0.35,
  });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const dx =
      event.clientX - (rect.left + rect.width / 2);

    const dy =
      event.clientY - (rect.top + rect.height / 2);

    x.set(dx * strength);
    y.set(dy * strength);

    setActive(true);
  }

  function reset() {
    x.set(0);
    y.set(0);
    setActive(false);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      animate={{
        scale: active ? 1.025 : 1,
      }}
      transition={{
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
