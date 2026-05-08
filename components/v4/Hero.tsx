"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";
import { PixelCloud } from "@/components/pixel/PixelCloud";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/pixel-city-sunset.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            imageRendering: "pixelated",
            objectPosition: "center",
          }}
        />
        <PixelCloud className="absolute top-[12%] animate-cloud-band-1 opacity-70" />
        <PixelCloud className="absolute top-[22%] animate-cloud-band-2 opacity-60" />
        <PixelCloud className="absolute top-[8%] animate-cloud-band-3 opacity-80" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,10,31,0.55) 0%, rgba(14,10,31,0.6) 50%, rgba(14,10,31,0.85) 100%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
        className="relative grid items-center gap-10 md:grid-cols-[3fr_2fr]"
      >
        <div>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 text-5xl font-bold leading-tight md:text-7xl"
            style={{ color: "var(--text-headline)" }}
          >
            付加価値、
            <br />
            一緒に上げませんか。
          </motion.h1>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 max-w-2xl space-y-2 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-primary)" }}
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
            className="mt-16 max-w-2xl border-l-4 py-2 pl-6 italic leading-relaxed"
            style={{
              borderColor: "var(--accent)",
              color: "var(--text-headline)",
            }}
          >
            <p>別に、取って食べようというわけじゃありません。</p>
            <p>技術を深く身につけて、最小の努力でたくさん稼いで、</p>
            <p>その分を社会に貢献していきたい。</p>
            <p>そんな同じ熱意を持てる仲間を、探しているだけです。</p>
          </motion.blockquote>
        </div>

        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center md:justify-end"
        >
          <Image
            src="/avatar.png"
            alt="syam"
            width={320}
            height={320}
            priority
            className="w-full max-w-[260px] md:max-w-[320px]"
            style={{
              imageRendering: "pixelated",
              height: "auto",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
