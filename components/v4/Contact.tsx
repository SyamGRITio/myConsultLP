"use client";

import { motion } from "framer-motion";
import { IconBrandLine, IconBrandX } from "@tabler/icons-react";
import { LINKS, withUtm } from "@/lib/constants";
import { CtaLink } from "./CtaLink";

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
        <br />
        今は無料相談だけ。近いうちに、有料のAzureコーチングを始めようと思っています。
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <CtaLink
          href={withUtm(LINKS.line, "contact", "cta")}
          cta_location="contact"
          destination="line"
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
        </CtaLink>
        <CtaLink
          href={withUtm(LINKS.x, "contact", "dm")}
          cta_location="contact"
          destination="x_dm"
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
        </CtaLink>
      </div>
    </motion.section>
  );
}
