"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: Props) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full px-6 py-20 sm:py-24 ${className}`}
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
        style={{
          backgroundColor: "rgba(14, 10, 31, 0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        {children}
      </div>
    </motion.section>
  );
}
