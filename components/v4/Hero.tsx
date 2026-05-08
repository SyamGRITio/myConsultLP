"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col justify-center pt-32"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-5 flex items-center gap-3"
        >
          <Image
            src="/avatar.png"
            alt="syam"
            width={48}
            height={48}
            className="rounded-full border-2"
            style={{
              imageRendering: "pixelated",
              borderColor: "var(--accent)",
            }}
          />
          <p
            className="font-mono text-sm md:text-base"
            style={{ color: "var(--accent)" }}
          >
            Hi, I&apos;m
          </p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-3 text-5xl font-bold md:text-7xl"
          style={{ color: "var(--text-headline)" }}
        >
          syam.
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
          style={{ color: "var(--text-secondary)" }}
        >
          付加価値、
          <br />
          一緒に上げませんか。
        </motion.h2>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 max-w-2xl space-y-2 text-base leading-relaxed md:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>月給14万から始めて、毎年100万ずつ年収を上げてきた。</p>
          <p>今では月単価101万＋α。借金300万を返して、資格を30個取った。</p>
          <p>Xには化け物みたいな人がいる中、私は最小限の努力でここまで来ました。</p>
          <p>たぶん、再現できます。</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start gap-4"
        >
          <Link
            href={withUtm(LINKS.line, "hero", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-md border px-8 py-4 font-mono transition-colors"
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
            ちょっと話してみる
          </Link>
          <p
            className="text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            今は無料相談だけ。近いうちに、有料のAzureコーチングを始めようと思っています。
          </p>
        </motion.div>

        <motion.blockquote
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-20 max-w-3xl border-l-4 py-2 pl-6 italic leading-relaxed"
          style={{
            borderColor: "var(--accent)",
            color: "var(--text-primary)",
          }}
        >
          <p>別に、取って食べようというわけじゃありません。</p>
          <p>技術を深く身につけて、最小の努力でたくさん稼いで、</p>
          <p>その分を社会に貢献していきたい。</p>
          <p>そんな同じ熱意を持てる仲間を、探しているだけです。</p>
        </motion.blockquote>
      </motion.div>
    </section>
  );
}
