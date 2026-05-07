"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #0E0A1F 0%, #1A1233 22%, #4B2E83 50%, #E94B8B 78%, #F4A26B 100%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 12% 18%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 28% 8%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 47% 22%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 63% 6%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 78% 14%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 88% 26%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 8% 34%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 36% 42%, #F4F0E0 50%, transparent 51%)," +
            "radial-gradient(1px 1px at 92% 38%, #F4F0E0 50%, transparent 51%)",
          backgroundSize: "100% 60%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.6) 3px 4px)," +
            "repeating-linear-gradient(90deg, transparent 0 3px, rgba(255,255,255,0.6) 3px 4px)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,10,31,0.7) 0%, rgba(14,10,31,0.7) 55%, rgba(14,10,31,0.92) 85%, #0E0A1F 100%)",
        }}
      />

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
