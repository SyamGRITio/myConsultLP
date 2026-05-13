"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LINKS, withUtm } from "@/lib/constants";
import { PixelCloud } from "@/components/pixel/PixelCloud";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const POP_DURATION_MS = 3000;

export function Hero() {
  const popTimer = useRef<number | null>(null);
  const [popping, setPopping] = useState(false);

  const triggerPop = () => {
    if (popTimer.current !== null) {
      window.clearTimeout(popTimer.current);
    }
    setPopping(true);
    popTimer.current = window.setTimeout(() => {
      setPopping(false);
      popTimer.current = null;
    }, POP_DURATION_MS);
  };

  useEffect(() => {
    return () => {
      if (popTimer.current !== null) {
        window.clearTimeout(popTimer.current);
        popTimer.current = null;
      }
    };
  }, []);

  const [hovered, setHovered] = useState(false);
  const showHover = hovered || popping;

  // Preload the hover variant once on mount so swapping the src doesn't
  // cause a flash of unloaded image on first hover.
  useEffect(() => {
    const img = new window.Image();
    img.src = "/avatar-hover.png";
  }, []);

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") triggerPop();
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center pt-20"
    >
      {/* S1: シーン設定バナー — 流入経路に依存せず「誰向け / 何を提供」を即提示 */}
      <div
        className="mb-6 flex flex-wrap items-center gap-3 rounded-md border-2 px-4 py-3"
        style={{
          borderColor: "var(--accent)",
          backgroundColor: "var(--accent-tint)",
        }}
      >
        <span
          className="font-pixel text-xs tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          ▶ FOR
        </span>
        <span
          className="text-sm md:text-base"
          style={{ color: "var(--text-headline)" }}
        >
          {"{{ シーン設定コピー未定 — 例: 運用保守・SES在籍の20代エンジニア向け }}"}
        </span>
      </div>

      <div className="relative mb-12 h-32 overflow-hidden rounded-lg md:h-48">
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
        <PixelCloud
          variant={1}
          className="absolute top-[15%] animate-cloud-band-1 opacity-45"
        />
        <PixelCloud
          variant={2}
          className="absolute top-[40%] animate-cloud-band-2 opacity-35"
        />
        <PixelCloud
          variant={3}
          className="absolute top-[8%] animate-cloud-band-3 opacity-50"
        />
        <PixelCloud
          variant={4}
          className="absolute top-[55%] animate-cloud-band-4 opacity-30"
        />
        <PixelCloud
          variant={5}
          className="absolute top-[25%] animate-cloud-band-5 opacity-40"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
        className="relative grid items-center gap-10 md:grid-cols-[3fr_2fr]"
      >
        <div>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 max-w-2xl"
          >
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--accent) 0 8px, transparent 8px 14px)",
              }}
            />
            <p
              className="my-3 font-pixel text-base tracking-[0.35em] md:text-lg"
              style={{ color: "var(--accent)" }}
            >
              インフラエンジニアの方へ
            </p>
            <div
              className="h-[3px] w-full"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--accent) 0 8px, transparent 8px 14px)",
              }}
            />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4 text-4xl font-bold leading-tight md:text-7xl"
            style={{
              color: "var(--text-headline)",
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }}
          >
            付加価値の上げ方、
            <br />
            知ってます。
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-8 text-2xl font-bold leading-snug md:text-4xl"
            style={{ color: "var(--accent-pink)" }}
          >
            たぶん、再現できます。
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 max-w-2xl space-y-2 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--text-primary)" }}
          >
            <p>月給13万から始めて、毎年100万ずつ年収を上げてきた。</p>
            <p>今では月単価101万＋α。借金300万を返して、資格を30個取った。</p>
            <p>Xには化け物みたいな人がいる中、私は最小限の努力でここまで来ました。</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-start gap-4"
          >
            {/* S5: CTA は主+第2の並列構造 */}
            <div className="flex flex-wrap items-center gap-3">
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
              {/* S5: 第2CTAスロット — ラベル・遷移先未定 */}
              <Link
                href="#"
                className="inline-block rounded-md border px-8 py-4 font-mono text-sm transition-colors"
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
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {"{{ 登録後の体験説明 未定 — 例: 営業しません。配信物の予告など }}"}
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
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onPointerUp={handlePointerUp}
            className="relative mx-auto aspect-square w-full max-w-[260px] md:max-w-[320px]"
          >
            <div
              className="absolute inset-0 rounded-lg border-2 transition-transform"
              style={{
                borderColor: "var(--accent)",
                transform: showHover
                  ? "translate(0.5rem, 0.5rem)"
                  : "translate(1rem, 1rem)",
              }}
            />
            <div
              className="relative h-full w-full overflow-hidden rounded-lg"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(244,162,107,0.25), rgba(233,75,139,0.25))",
              }}
            >
              <Image
                src={showHover ? "/avatar-hover.png" : "/avatar.png"}
                alt="syam"
                fill
                priority
                sizes="(min-width: 768px) 320px, 260px"
                className={`object-contain ${
                  showHover ? "motion-safe:animate-avatar-pop" : ""
                }`}
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
