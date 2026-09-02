"use client";

import { useEffect, useRef } from "react";

export default function ScrollBlur() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const velocity = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    const animate = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastY.current);

      const target = Math.min(delta * 1.8, 10);

      velocity.current += (target - velocity.current) * 0.16;

      const blur = velocity.current;
      const opacity = 0.015 + velocity.current * 0.012;

      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(
          Math.min(opacity, 0.13),
        );

        overlayRef.current.style.backdropFilter = `blur(${blur}px)`;
      }

      lastY.current = currentY;

      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[999] opacity-0"
      style={{
        background: "rgba(255,255,255,0.018)",
        backdropFilter: "blur(0px)",
        willChange: "backdrop-filter, opacity",
      }}
    />
  );
}
