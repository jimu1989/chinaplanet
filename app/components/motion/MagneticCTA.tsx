"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";
import InteractiveArrow from "../InteractiveArrow";

type MagneticCTAProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function MagneticCTA({
  href,
  children,
  className = "",
}: MagneticCTAProps) {
  return (
    <Magnetic strength={0.16}>
      <Link
        href={href}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#171717] px-6 py-3.5 text-xs font-semibold text-white transition-colors duration-500 hover:bg-[#c94a3d] ${className}`}
      >
        <span className="relative z-10">
          {children}
        </span>

        <span className="relative z-10 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/10">
          <InteractiveArrow
            size={16}
            className="text-white"
          />
        </span>

        <motion.span
          className="absolute inset-0 -z-0 bg-[#c94a3d]"
          initial={{ scale: 0, x: "70%", y: "70%" }}
          whileHover={{
            scale: 1.8,
            x: "0%",
            y: "0%",
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </Link>
    </Magnetic>
  );
}
