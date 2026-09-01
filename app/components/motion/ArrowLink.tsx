"use client";

import Link, { type LinkProps } from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ArrowLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  arrowClassName?: string;
};

export default function ArrowLink({
  children,
  className = "",
  arrowClassName = "",
  ...props
}: ArrowLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span>{children}</span>

      <motion.span
        aria-hidden="true"
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ${arrowClassName}`}
        initial="rest"
        whileHover="hover"
      >
        <motion.span
          variants={{
            rest: {
              x: 0,
              y: 0,
              opacity: 1,
            },
            hover: {
              x: 22,
              y: -22,
              opacity: 0,
            },
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute"
        >
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </motion.span>

        <motion.span
          variants={{
            rest: {
              x: -22,
              y: 22,
              opacity: 0,
            },
            hover: {
              x: 0,
              y: 0,
              opacity: 1,
            },
          }}
          transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute"
        >
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </motion.span>
      </motion.span>
    </Link>
  );
}
