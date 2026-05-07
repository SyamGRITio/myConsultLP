"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-pixel-sunset.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,10,31,0.55) 0%, rgba(14,10,31,0.75) 60%, rgba(14,10,31,1) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-6 py-24">
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
          <p>借金300万を返して、資格を30個取った。</p>
          <p>正直、全然頑張ってないんです。</p>
          <p>Xには化け物みたいな人がいる中、最小限の努力でここまで来ました。</p>
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
            今は無料相談だけ。近いうちにAzureコーチング始めます。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
