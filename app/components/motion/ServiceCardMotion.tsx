"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function ServiceCardMotion({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border-b border-[#e5ddd5] px-6 py-10 text-center transition-all duration-300 md:border-l md:last:border-l-0 lg:border-b-0"
    >
      {children}
    </motion.article>
  );
}
