"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconBrandLine, IconBrandX } from "@tabler/icons-react";
import { LINKS, withUtm } from "@/lib/constants";

export function CTA() {
  return (
    <motion.section
      id="cta"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full px-6 py-20 sm:py-24"
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl px-6 py-12 text-center sm:px-10 sm:py-16"
        style={{
          backgroundColor: "rgba(14, 10, 31, 0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text)" }}>
          話したい人は、こちらから
        </h2>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={withUtm(LINKS.line, "cta-final", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--accent-orange)",
              color: "var(--bg)",
              boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.5)",
            }}
          >
            <IconBrandLine size={20} stroke={2} />
            LINEに登録する
          </Link>
          <Link
            href={withUtm(LINKS.x, "cta-final", "dm")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              borderColor: "var(--text)",
              color: "var(--text)",
              backgroundColor: "rgba(14,10,31,0.4)",
            }}
          >
            <IconBrandX size={20} stroke={2} />
            XのDMでも気軽に
          </Link>
        </div>

        <p
          className="mt-8 max-w-md text-sm leading-relaxed mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          今は無料相談だけ。近いうちに、有料のAzureコーチングを始めようと思っています。
        </p>
      </div>
    </motion.section>
  );
}
