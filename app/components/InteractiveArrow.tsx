"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type InteractiveArrowProps = {
  size?: number;
  className?: string;
};

export default function InteractiveArrow({
  size = 18,
  className = "",
}: InteractiveArrowProps) {
  return (
    <motion.span
      className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
      initial="rest"
      whileHover="hover"
    >
      <motion.span
        variants={{
          rest: {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          },
          hover: {
            x: 22,
            y: -22,
            opacity: 0,
            rotate: 8,
          },
        }}
        transition={{
          duration: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute"
      >
        <ArrowUpRight
          size={size}
          strokeWidth={1.65}
        />
      </motion.span>

      <motion.span
        variants={{
          rest: {
            x: -22,
            y: 22,
            opacity: 0,
            rotate: -8,
          },
          hover: {
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          },
        }}
        transition={{
          duration: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute"
      >
        <ArrowUpRight
          size={size}
          strokeWidth={1.65}
        />
      </motion.span>
    </motion.span>
  );
}
