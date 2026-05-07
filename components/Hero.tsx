"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative w-full">
      <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 py-24">
        <div
          className="rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
          style={{
            backgroundColor: "rgba(14, 10, 31, 0.45)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "var(--text)" }}
          >
            付加価値、
            <br className="sm:hidden" />
            一緒に上げませんか。
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-8 space-y-3 text-base sm:text-lg"
            style={{ color: "var(--text)" }}
          >
            <p>月給14万から始めて、毎年100万ずつ年収を上げてきた。</p>
            <p>今では月単価101万＋α。借金300万を返して、資格を30個取った。</p>
            <p>Xには化け物みたいな人がいる中、私は最小限の努力でここまで来ました。</p>
            <p>たぶん、再現できます。</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-10"
          >
            <Link
              href={withUtm(LINKS.line, "hero", "cta")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--accent-orange)",
                color: "var(--bg)",
                boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.4)",
              }}
            >
              ちょっと話してみる
            </Link>
            <p
              className="mt-4 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              今は無料相談だけ。近いうちに、有料のAzureコーチングを始めようと思っています。
            </p>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mx-auto mt-12 max-w-xl border-l-4 px-6 py-2 text-center leading-relaxed"
            style={{
              borderColor: "var(--accent-orange)",
              color: "var(--text)",
              fontSize: "1.25rem",
            }}
          >
            <p>別に、取って食べようというわけじゃありません。</p>
            <p>技術を深く身につけて、最小の努力でたくさん稼いで、</p>
            <p>その分を社会に貢献していきたい。</p>
            <p>そんな同じ熱意を持てる仲間を、探しているだけでございます。</p>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
