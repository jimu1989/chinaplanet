"use client";

import { useEffect } from "react";

export default function MouseMotion() {
  useEffect(() => {
    const root = document.documentElement;

    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;

    const update = () => {
      root.style.setProperty("--mouse-x", `${mouseX}px`);
      root.style.setProperty("--mouse-y", `${mouseY}px`);
      root.style.setProperty(
        "--mouse-x-percent",
        `${(mouseX / Math.max(window.innerWidth, 1)) * 100}%`,
      );
      root.style.setProperty(
        "--mouse-y-percent",
        `${(mouseY / Math.max(window.innerHeight, 1)) * 100}%`,
      );

      raf = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (!raf) {
        raf = requestAnimationFrame(update);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return null;
}
