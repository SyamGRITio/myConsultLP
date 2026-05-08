"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
      variants={fadeUp}
      className="relative w-full"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 py-20">
        <div className="card-pixel w-full text-center sm:p-10">
          <p className="section-label mb-4">// HERO</p>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "var(--text)" }}
          >
            付加価値、
            <br className="sm:hidden" />
            一緒に上げませんか。
          </motion.h1>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 space-y-3 text-base sm:text-lg"
            style={{ color: "var(--text)" }}
          >
            <p>月給14万から始めて、毎年100万ずつ年収を上げてきた。</p>
            <p>今では月単価101万＋α。借金300万を返して、資格を30個取った。</p>
            <p>Xには化け物みたいな人がいる中、私は最小限の努力でここまで来ました。</p>
            <p>たぶん、再現できます。</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-10"
          >
            <Link
              href={withUtm(LINKS.line, "hero", "cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pixel"
            >
              ちょっと話してみる
            </Link>
            <p
              className="mt-6 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              今は無料相談だけ。近いうちに、有料のAzureコーチングを始めようと思っています。
            </p>
          </motion.div>

          <div className="divider-pixel my-10" />

          <motion.blockquote
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-xl border-l-4 px-6 py-2 text-center leading-relaxed"
            style={{
              borderColor: "var(--accent-orange)",
              color: "var(--text)",
              fontSize: "1.25rem",
            }}
          >
            <p>別に、取って食べようというわけじゃありません。</p>
            <p>技術を深く身につけて、最小の努力でたくさん稼いで、</p>
            <p>その分を社会に貢献していきたい。</p>
            <p>そんな同じ熱意を持てる仲間を、探しているだけです。</p>
          </motion.blockquote>
        </div>
      </div>
    </motion.section>
  );
}
