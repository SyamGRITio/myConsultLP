"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconBrandLine, IconBrandX } from "@tabler/icons-react";
import { LINKS, withUtm } from "@/lib/constants";

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="mx-auto max-w-2xl py-40 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2
        className="mb-6 text-5xl font-bold md:text-6xl"
        style={{ color: "var(--text-headline)" }}
      >
        話したい人は
      </h2>
      <p
        className="mb-12 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        LINEで一言ください。XのDMでも全然OK。
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href={withUtm(LINKS.line, "contact", "cta")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border px-10 py-5 font-mono transition-colors"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-tint)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <IconBrandLine size={20} stroke={1.5} />
          LINEに登録する
        </Link>
        <Link
          href={withUtm(LINKS.x, "contact", "dm")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border px-10 py-5 font-mono transition-colors"
          style={{
            borderColor: "var(--text-secondary)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--text-secondary)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          <IconBrandX size={20} stroke={1.5} />
          XのDMでも気軽に
        </Link>
        {/* S5: 第2CTAスロット — ラベル・遷移先未定 */}
        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-md border px-10 py-5 font-mono text-sm transition-colors"
          style={{
            borderColor: "var(--text-secondary)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.color = "var(--accent)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--text-secondary)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          {"{{ 第2CTA未定 }}"}
        </Link>
      </div>

      {/* S6: 登録後説明スロット */}
      <p
        className="mt-8 text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {"{{ 登録後の体験説明 未定 — 例: 営業しません。週1で○○を配信、など }}"}
      </p>
    </motion.section>
  );
}
