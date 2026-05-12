"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LINKS, withUtm } from "@/lib/constants";

type Sign = {
  num: string;
  year: string;
  title: string;
  body: string;
};

const SIGNS: Sign[] = [
  {
    num: "01",
    year: "2016",
    title: "大学中退",
    body: "第一志望の薬学部を諦めて入った大学が、居心地悪かった。お金と時間を払い続けても変わらない気がして、思い切って中退。9時〜24時のバイト掛け持ち、それなりに楽しい数年。",
  },
  {
    num: "02",
    year: "2018",
    title: "専門学校・借金300万",
    body: "薬業の専門学校に入った直後、当時の彼女にクレジットカードを使い込まれて貯金が消滅。気合で登録販売者の資格だけ取って中退。",
  },
  {
    num: "03",
    year: "2019",
    title: "薬局勤務",
    body: "登録販売者として薬局で勤務。本社が決めた商品を売る毎日に違和感。「自分なりに工夫して売りたい」が芽生える。",
  },
  {
    num: "04",
    year: "2019",
    title: "ネット旅行販売",
    body: "副業でネット旅行代理店。本気でやったら、フリーター月収を超える月も出てくる。",
  },
  {
    num: "05",
    year: "2020〜21",
    title: "コロナ撃沈",
    body: "コロナで旅行業が壊滅。弱ったところに詐欺被害も重なって撤退。300万のうち100万だけ返済、残りは任意整理。",
  },
  {
    num: "06",
    year: "2021",
    title: "IT手伝い",
    body: "旅行販売時代の知人が起業。社内ポータルとLP制作を任されて、気づけば「仕組み」側に興味が向く。",
  },
  {
    num: "07",
    year: "2021夏",
    title: "インフラへ",
    body: "プログラミングスクールに通うも、難しすぎて挫折。インフラという選択肢を知り、無料スクールへ。",
  },
  {
    num: "08",
    year: "2022.4",
    title: "SES入社・富山",
    body: "案件待機半年、富山へ単身赴任。引っ越し代は自腹、給料前借り、手取り12〜13万。",
  },
  {
    num: "09",
    year: "2023",
    title: "決意",
    body: "絶対稼ぐと決めて、学歴の代わりに資格を量産。3年で約30個、評価で月+12万、資格手当で借金完済。",
  },
  {
    num: "10",
    year: "2025.1",
    title: "独立",
    body: "会社では古い技術と遅いスピードに頭打ち。独立してフリーランスへ。単価67万スタート、副業を足して85万に。",
  },
  {
    num: "11",
    year: "2026.4",
    title: "NOW",
    body: "月単価101万＋α。来月から副業と友人企業のインフラ顧問も加わり、ありがたく引く手あまた状態。",
  },
];

const SCROLL_W = 5400;
const SCROLL_H = 720;
const START_PAD = 400;
const END_PAD = 360;
const SIGN_X_RANGE = SCROLL_W - START_PAD - END_PAD;
const SIGN_COUNT = SIGNS.length;
const HORIZON_Y = SCROLL_H * 0.62;

function getSignPos(i: number) {
  const x = START_PAD + (i / (SIGN_COUNT - 1)) * SIGN_X_RANGE;
  const baseY = SCROLL_H / 2;
  const amplitude = 140;
  const y = baseY + amplitude * Math.sin((i / (SIGN_COUNT - 1)) * Math.PI * 3.4);
  return { x, y };
}

function buildPath() {
  const points: { x: number; y: number }[] = [];
  points.push({ x: 80, y: SCROLL_H / 2 });
  for (let i = 0; i < SIGN_COUNT; i++) points.push(getSignPos(i));
  points.push({ x: SCROLL_W - 100, y: SCROLL_H / 2 });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

const PATH_D = buildPath();

export function Journey() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(0);
  const [activeSign, setActiveSign] = useState(0);
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const playerX = useMotionValue(80);
  const playerY = useMotionValue(SCROLL_H / 2);

  useEffect(() => {
    if (pathRef.current) setPathLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const unsub = scrollXProgress.on("change", (v) => {
      if (!pathRef.current || pathLen === 0) return;
      const pt = pathRef.current.getPointAtLength(v * pathLen);
      playerX.set(pt.x);
      playerY.set(pt.y);
    });
    return () => unsub();
  }, [scrollXProgress, pathLen, playerX, playerY]);

  // Closest-sign detection from scrollLeft. Deterministic across viewports.
  useEffect(() => {
    const c = scrollRef.current;
    if (!c) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const center = c.scrollLeft + c.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < SIGNS.length; i++) {
        const d = Math.abs(getSignPos(i).x - center);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveSign(best);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    c.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      c.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", compute);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.section
      id="journey"
      className="py-24 md:py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2
        className="mb-3 text-2xl font-bold md:text-3xl"
        style={{ color: "var(--text-headline)" }}
      >
        私について
      </h2>
      <div className="mb-10 space-y-1">
        <p
          className="text-lg font-bold md:text-xl"
          style={{ color: "var(--text-headline)" }}
        >
          月給14万までの、ちょっと長い助走
        </p>
        <p
          className="text-sm md:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          今のところ、引く手あまた
        </p>
      </div>

      <div
        className="relative rounded-2xl bg-[#1a1a1a] p-2 shadow-2xl md:rounded-3xl md:p-3"
        style={{
          border: "10px solid #2a2a2a",
          boxShadow: "inset 0 0 0 3px #4a4a4a, 0 12px 32px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 rounded bg-[#1a1a1a] px-3 py-1 font-pixel text-[10px] tracking-[0.25em] md:text-xs"
          style={{ color: "var(--accent)", border: "2px solid #2a2a2a" }}
        >
          ◆ SYAM RPG — JOURNEY MODE ◆
        </div>

        <div
          ref={scrollRef}
          className="relative overflow-x-auto overflow-y-hidden rounded-lg scroll-smooth"
          style={{ height: SCROLL_H, border: "3px solid #444" }}
        >
          <div
            className="relative"
            style={{ width: SCROLL_W, height: SCROLL_H }}
          >
            <Sky />
            <CelestialBodies />
            <StarsLayer />
            <DistantHills />
            <CityAndWater />

            <svg
              className="absolute inset-0 pointer-events-none"
              width={SCROLL_W}
              height={SCROLL_H}
            >
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="rgba(244,162,107,0.65)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="14 8"
              />
            </svg>

            <Decorations />

            <StartFlag />
            <ContinuesAfterNow />

            {SIGNS.map((sign, i) => (
              <SignBoardWithBubble
                key={sign.num}
                sign={sign}
                pos={getSignPos(i)}
                isActive={activeSign === i}
                boss={i === 1 ? "castle" : i === 4 ? "warrior" : undefined}
              />
            ))}

            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-20"
              style={{
                x: playerX,
                y: playerY,
                width: 76,
                height: 76,
                marginLeft: -38,
                marginTop: -52,
              }}
            >
              <Image
                src="/avatar.png"
                alt=""
                width={76}
                height={76}
                style={{ imageRendering: "pixelated" }}
                className="drop-shadow-[0_3px_0_rgba(0,0,0,0.65)]"
              />
            </motion.div>
          </div>
        </div>

        <p
          className="mt-3 text-center font-pixel text-xs tracking-widest"
          style={{ color: "var(--text-secondary)" }}
        >
          → 横にスワイプして、歩いてみる →
        </p>
      </div>

      <div className="mt-14 flex flex-col items-center gap-6 text-center">
        <p
          className="max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          あなたにはあなたの冒険がある。これから向かいたい先を教えてくれませんか？
        </p>
        <Link
          href={withUtm(LINKS.line, "journey", "cta")}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-3 px-7 py-4 font-pixel text-base tracking-widest transition-transform hover:-translate-y-0.5 md:text-lg"
          style={{
            backgroundColor: "#0a0820",
            color: "#fff",
            border: "3px solid #fff",
            boxShadow:
              "inset 0 0 0 2px #0a0820, inset 0 0 0 4px #fff, 4px 4px 0 rgba(0,0,0,0.55)",
          }}
        >
          <span
            aria-hidden
            className="motion-safe:animate-dq-cursor"
            style={{ color: "#fff", lineHeight: 1, fontSize: "1.1em" }}
          >
            ▶
          </span>
          <span>ちょっと話してみる</span>
        </Link>
      </div>
    </motion.section>
  );
}

// ── Background layers ──────────────────────────────────────────────

function Sky() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to right,
          #2a0e16 0%,
          #4a1a20 8%,
          #7a2a28 16%,
          #92352a 22%,
          #6a2a3a 32%,
          #3a1e4a 42%,
          #1a1240 52%,
          #0a0820 62%,
          #100b30 72%,
          #2a1850 80%,
          #6a2a5a 88%,
          #c0507a 94%,
          #f0a070 100%)`,
      }}
    >
      {/* Vertical darkening near bottom to suggest ground/horizon */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: SCROLL_H - HORIZON_Y,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}

function CelestialBodies() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Setting sun, sunset zone */}
      <div
        className="absolute rounded-full"
        style={{
          left: 760,
          top: HORIZON_Y - 70,
          width: 110,
          height: 110,
          background:
            "radial-gradient(circle, #ffd385 0%, #ff9a4a 45%, rgba(255,120,60,0) 75%)",
          opacity: 0.95,
        }}
      />
      {/* Moon, night zone */}
      <div
        className="absolute rounded-full"
        style={{
          left: 3250,
          top: 110,
          width: 56,
          height: 56,
          background:
            "radial-gradient(circle, #f4ecd0 0%, #d9c89a 60%, rgba(217,200,154,0) 100%)",
          opacity: 0.85,
          boxShadow: "0 0 24px rgba(244,236,208,0.35)",
        }}
      />
      {/* Rising sun, dawn zone */}
      <div
        className="absolute rounded-full"
        style={{
          left: SCROLL_W - 360,
          top: HORIZON_Y - 30,
          width: 90,
          height: 90,
          background:
            "radial-gradient(circle, #fff5d5 0%, #f4a26b 50%, rgba(244,162,107,0) 80%)",
          opacity: 0.9,
        }}
      />
    </div>
  );
}

function StarsLayer() {
  const stars = useMemo(() => {
    let seed = 1337;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const arr: { x: number; y: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 220; i++) {
      const x = rand() * SCROLL_W;
      // Density per zone via sample rejection
      const norm = x / SCROLL_W;
      let prob: number;
      if (norm < 0.22) prob = 0.18; // sunset: few
      else if (norm < 0.48) prob = 0.75; // twilight: more
      else if (norm < 0.72) prob = 1.0; // night: many
      else if (norm < 0.86) prob = 0.55; // dawn early: fading
      else prob = 0.15; // dawn: almost none
      if (rand() > prob) continue;
      const y = rand() * (HORIZON_Y - 20);
      arr.push({
        x,
        y,
        size: rand() < 0.78 ? 2 : 3,
        opacity: 0.4 + rand() * 0.55,
      });
    }
    return arr;
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute bg-white"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

function DistantHills() {
  // Layered hill silhouettes along horizon, throughout scroll
  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={SCROLL_W}
      height={SCROLL_H}
      shapeRendering="crispEdges"
    >
      {/* Far hills */}
      <path
        d={`M 0 ${HORIZON_Y + 10} Q 200 ${HORIZON_Y - 30}, 400 ${HORIZON_Y} T 800 ${HORIZON_Y - 10} T 1200 ${HORIZON_Y + 5} T 1700 ${HORIZON_Y - 20} T 2300 ${HORIZON_Y + 5} T 2900 ${HORIZON_Y - 25} T 3500 ${HORIZON_Y} T 4000 ${HORIZON_Y - 15} L ${SCROLL_W} ${HORIZON_Y - 5} L ${SCROLL_W} ${SCROLL_H} L 0 ${SCROLL_H} Z`}
        fill="rgba(20,12,30,0.55)"
      />
      {/* Near hills */}
      <path
        d={`M 0 ${HORIZON_Y + 35} Q 250 ${HORIZON_Y + 5}, 500 ${HORIZON_Y + 30} T 1000 ${HORIZON_Y + 20} T 1500 ${HORIZON_Y + 40} T 2100 ${HORIZON_Y + 15} T 2700 ${HORIZON_Y + 35} T 3300 ${HORIZON_Y + 18} T 4000 ${HORIZON_Y + 30} L ${SCROLL_W} ${HORIZON_Y + 25} L ${SCROLL_W} ${SCROLL_H} L 0 ${SCROLL_H} Z`}
        fill="rgba(10,6,20,0.65)"
      />
    </svg>
  );
}

function CityAndWater() {
  // City at dawn zone with water reflection beneath
  const CITY_X = SCROLL_W - 1200;
  const CITY_W = 1100;
  const CITY_BASE = HORIZON_Y + 8;

  type B = {
    x: number;
    w: number;
    h: number;
    windows: { x: number; y: number }[];
  };
  const buildings: B[] = useMemo(() => {
    let seed = 9871;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const arr: B[] = [];
    let x = 30;
    while (x < CITY_W - 40) {
      const w = 32 + Math.floor(rand() * 70);
      const h = 50 + Math.floor(rand() * 130);
      const windows: { x: number; y: number }[] = [];
      const cols = Math.max(1, Math.floor(w / 12));
      const rows = Math.max(1, Math.floor(h / 14));
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          if (rand() < 0.45) {
            windows.push({ x: 6 + cx * 12, y: 8 + cy * 14 });
          }
        }
      }
      arr.push({ x, w, h, windows });
      x += w + 4 + Math.floor(rand() * 14);
    }
    return arr;
  }, []);

  return (
    <svg
      className="pointer-events-none absolute"
      style={{ left: CITY_X, top: 0 }}
      width={CITY_W}
      height={SCROLL_H}
      shapeRendering="crispEdges"
    >
      {/* Buildings */}
      <g>
        {buildings.map((b, i) => (
          <g key={i} transform={`translate(${b.x},${CITY_BASE - b.h})`}>
            <rect width={b.w} height={b.h} fill="#13091e" />
            <rect
              x="0"
              y="0"
              width={b.w}
              height="2"
              fill="rgba(244,162,107,0.4)"
            />
            {b.windows.map((w, j) => (
              <rect
                key={j}
                x={w.x}
                y={w.y}
                width="3"
                height="3"
                fill="#ffd56b"
                opacity={0.85}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Horizon line */}
      <line
        x1="0"
        y1={CITY_BASE}
        x2={CITY_W}
        y2={CITY_BASE}
        stroke="rgba(244,162,107,0.45)"
        strokeWidth="2"
      />

      {/* Water reflection: mirrored, faded, scan-lined */}
      <g
        opacity="0.32"
        transform={`matrix(1, 0, 0, -0.55, 0, ${CITY_BASE * 2 + (SCROLL_H - CITY_BASE) * 0.55})`}
      >
        {buildings.map((b, i) => (
          <g key={i} transform={`translate(${b.x},${CITY_BASE - b.h})`}>
            <rect width={b.w} height={b.h} fill="#3a1a40" />
            {b.windows.map((w, j) => (
              <rect
                key={j}
                x={w.x}
                y={w.y}
                width="3"
                height="3"
                fill="#ffd56b"
                opacity={0.45}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Water scan lines for lo-fi reflection */}
      {Array.from({ length: 8 }).map((_, i) => {
        const y = CITY_BASE + 14 + i * 16;
        if (y >= SCROLL_H - 6) return null;
        return (
          <line
            key={i}
            x1="0"
            y1={y}
            x2={CITY_W}
            y2={y}
            stroke="rgba(244,162,107,0.28)"
            strokeWidth="1"
            strokeDasharray="10 6"
            opacity={0.7 - i * 0.07}
          />
        );
      })}
    </svg>
  );
}

function Decorations() {
  const decos = useMemo(() => {
    let seed = 4242;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const arr: { type: "cloud" | "tree" | "rock"; x: number; y: number }[] =
      [];
    for (let i = 0; i < 36; i++) {
      const x = 80 + rand() * (SCROLL_W - 1500);
      const norm = x / SCROLL_W;
      const r = rand();
      let type: "cloud" | "tree" | "rock";
      if (r < 0.4) type = "cloud";
      else if (r < 0.75) type = "tree";
      else type = "rock";
      let y: number;
      if (type === "cloud") y = 30 + rand() * 100;
      else y = HORIZON_Y - 4 + rand() * 30;
      // Skip clouds in deep night (looks weird)
      if (type === "cloud" && norm > 0.55 && norm < 0.78) continue;
      arr.push({ type, x, y });
    }
    return arr;
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0">
      {decos.map((d, i) => {
        if (d.type === "cloud") return <PixelCloud key={i} x={d.x} y={d.y} />;
        if (d.type === "tree") return <PixelTree key={i} x={d.x} y={d.y} />;
        return <PixelRock key={i} x={d.x} y={d.y} />;
      })}
    </div>
  );
}

function PixelCloud({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute opacity-60" style={{ left: x, top: y }}>
      <svg width="48" height="22" shapeRendering="crispEdges">
        <rect x="6" y="6" width="6" height="6" fill="#fff" />
        <rect x="12" y="2" width="22" height="6" fill="#fff" />
        <rect x="34" y="6" width="6" height="6" fill="#fff" />
        <rect x="2" y="12" width="44" height="6" fill="#fff" />
      </svg>
    </div>
  );
}

function PixelTree({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute opacity-80" style={{ left: x, top: y }}>
      <svg width="28" height="36" shapeRendering="crispEdges">
        <rect x="10" y="0" width="8" height="4" fill="#1f5a2b" />
        <rect x="4" y="4" width="20" height="6" fill="#1f5a2b" />
        <rect x="0" y="10" width="28" height="10" fill="#1f5a2b" />
        <rect x="4" y="20" width="20" height="4" fill="#143a1c" />
        <rect x="12" y="24" width="4" height="12" fill="#4a2a14" />
      </svg>
    </div>
  );
}

function PixelRock({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute opacity-65" style={{ left: x, top: y }}>
      <svg width="20" height="14" shapeRendering="crispEdges">
        <rect x="4" y="0" width="12" height="4" fill="#8a8a8a" />
        <rect x="2" y="4" width="16" height="7" fill="#6a6a6a" />
        <rect x="0" y="11" width="20" height="3" fill="#4a4a4a" />
      </svg>
    </div>
  );
}

// ── Signs and bubbles ─────────────────────────────────────────────

function SignBoard({ sign }: { sign: Sign }) {
  // Adventure-style quest signpost: wood plank with grain stripes,
  // iron corner bolts, a year ribbon banner, and a thicker pole + base.
  return (
    <div className="relative flex flex-col items-center">
      {/* Year ribbon banner */}
      <div
        className="relative z-10 -mb-1 rounded-sm border px-2 py-0.5 font-pixel text-[10px] tracking-wider text-[#ffe6b3]"
        style={{
          backgroundColor: "#5a3416",
          borderColor: "#2a1408",
          boxShadow: "1px 1px 0 #1a1008",
        }}
      >
        {sign.year}
      </div>

      {/* Wooden plank panel */}
      <div
        className="relative px-3 pb-2 pt-3 text-center font-pixel"
        style={{
          minWidth: 144,
          backgroundColor: "#7a4a26",
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent 0 6px, rgba(0,0,0,0.18) 6px 8px)",
          border: "3px solid #3d2412",
          borderRadius: "3px 3px 0 0",
          boxShadow: "3px 3px 0 #1a1008, inset 0 0 0 2px #6a3e1c",
        }}
      >
        {/* Corner bolts */}
        <span
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ left: 4, top: 4, backgroundColor: "#2a1408" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ right: 4, top: 4, backgroundColor: "#2a1408" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ left: 4, bottom: 4, backgroundColor: "#2a1408" }}
        />
        <span
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{ right: 4, bottom: 4, backgroundColor: "#2a1408" }}
        />
        <div className="text-[13px] leading-tight text-white">
          {sign.title}
        </div>
      </div>

      {/* Thicker pole with a flared base */}
      <div
        className="h-7 w-2.5"
        style={{
          backgroundColor: "#3d2412",
          boxShadow: "inset -1px 0 0 #1a1008",
        }}
      />
      <div
        className="h-1.5 w-8 rounded-sm"
        style={{ backgroundColor: "#3d2412" }}
      />
    </div>
  );
}

function BossCastle() {
  // Pixel castle to replace sign 02 (専門学校・借金300万) — a boss encounter
  // visualisation. Same approx height/width as a sign so layout still works.
  return (
    <div className="relative flex flex-col items-center">
      <svg
        width="170"
        height="130"
        shapeRendering="crispEdges"
        style={{ filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.55))" }}
      >
        {/* Castle stone (dark) */}
        {/* Side towers */}
        <rect x="6" y="48" width="28" height="78" fill="#4a3a52" />
        <rect x="136" y="48" width="28" height="78" fill="#4a3a52" />
        {/* Crenellations on side towers */}
        <rect x="6" y="40" width="6" height="8" fill="#4a3a52" />
        <rect x="16" y="40" width="6" height="8" fill="#4a3a52" />
        <rect x="26" y="40" width="6" height="8" fill="#4a3a52" />
        <rect x="136" y="40" width="6" height="8" fill="#4a3a52" />
        <rect x="146" y="40" width="6" height="8" fill="#4a3a52" />
        <rect x="156" y="40" width="6" height="8" fill="#4a3a52" />
        {/* Main wall */}
        <rect x="30" y="70" width="110" height="56" fill="#5a4a62" />
        {/* Crenellations on main wall */}
        <rect x="30" y="62" width="8" height="8" fill="#5a4a62" />
        <rect x="44" y="62" width="8" height="8" fill="#5a4a62" />
        <rect x="58" y="62" width="8" height="8" fill="#5a4a62" />
        <rect x="104" y="62" width="8" height="8" fill="#5a4a62" />
        <rect x="118" y="62" width="8" height="8" fill="#5a4a62" />
        <rect x="132" y="62" width="8" height="8" fill="#5a4a62" />
        {/* Central tower */}
        <rect x="66" y="20" width="38" height="106" fill="#5a4a62" />
        {/* Pointed roof */}
        <polygon points="60,20 110,20 85,2" fill="#7a2a36" />
        <polygon points="60,20 110,20 85,2" fill="none" stroke="#3a1018" strokeWidth="1" />
        {/* Flag pole + flag */}
        <line x1="85" y1="2" x2="85" y2="-12" stroke="#888" strokeWidth="1" />
        <polygon points="85,-12 96,-9 85,-5" fill="#e94b8b" />
        {/* Tower window */}
        <rect x="78" y="36" width="10" height="14" fill="#1a0e22" />
        <rect x="80" y="38" width="6" height="4" fill="#ffd56b" opacity="0.9" />
        {/* Wall windows */}
        <rect x="42" y="84" width="8" height="12" fill="#1a0e22" />
        <rect x="120" y="84" width="8" height="12" fill="#1a0e22" />
        {/* Gate */}
        <rect x="74" y="92" width="22" height="34" fill="#1a0e1a" />
        <rect x="74" y="92" width="22" height="3" fill="#3a1018" />
        {/* Outline accents */}
        <rect x="6" y="48" width="28" height="2" fill="#3a2a44" />
        <rect x="136" y="48" width="28" height="2" fill="#3a2a44" />
        <rect x="30" y="70" width="110" height="2" fill="#3a2a44" />
      </svg>

      <BossNameplate />
    </div>
  );
}

function ArmoredWarriorBoss() {
  // Grim pixel warrior in horned armor, scythe in hand. Used for sign 05
  // (コロナ撃沈) — a different boss flavor than the castle.
  return (
    <div className="relative flex flex-col items-center">
      <svg
        width="130"
        height="148"
        shapeRendering="crispEdges"
        style={{ filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.65))" }}
      >
        {/* Cape behind */}
        <polygon
          points="22,42 108,42 122,144 8,144"
          fill="#3a0814"
        />
        <polygon
          points="22,42 108,42 122,144 8,144"
          fill="none"
          stroke="#1a0008"
          strokeWidth="1"
        />

        {/* Body torso */}
        <rect x="34" y="52" width="62" height="56" fill="#3a2a3a" />
        {/* Chest plate diamond */}
        <polygon points="42,54 88,54 78,82 52,82" fill="#5a4a5a" />
        <polygon
          points="42,54 88,54 78,82 52,82"
          fill="none"
          stroke="#1a0a1a"
          strokeWidth="1"
        />
        <rect x="61" y="64" width="8" height="8" fill="#e94b8b" />

        {/* Belt */}
        <rect x="34" y="104" width="62" height="6" fill="#5a3a1a" />
        <rect x="60" y="104" width="10" height="6" fill="#c8a040" />

        {/* Shoulder pauldrons */}
        <polygon points="18,52 36,46 36,72 16,72" fill="#2a1a2a" />
        <polygon points="112,52 94,46 94,72 114,72" fill="#2a1a2a" />
        <rect x="20" y="40" width="6" height="10" fill="#1a0a1a" />
        <rect x="104" y="40" width="6" height="10" fill="#1a0a1a" />

        {/* Arms */}
        <rect x="14" y="64" width="14" height="42" fill="#2a1a2a" />
        <rect x="102" y="64" width="14" height="42" fill="#2a1a2a" />
        {/* Gauntlets */}
        <rect x="12" y="100" width="18" height="12" fill="#3a2a3a" />
        <rect x="100" y="100" width="18" height="12" fill="#3a2a3a" />

        {/* Legs + boots */}
        <rect x="38" y="110" width="20" height="32" fill="#2a1a2a" />
        <rect x="62" y="110" width="20" height="32" fill="#2a1a2a" />
        <rect x="36" y="138" width="24" height="6" fill="#1a0a1a" />
        <rect x="60" y="138" width="24" height="6" fill="#1a0a1a" />

        {/* Helmet */}
        <rect x="36" y="6" width="48" height="38" fill="#2a1a2a" />
        {/* Helmet horns */}
        <polygon points="36,8 28,2 36,16" fill="#1a0a1a" />
        <polygon points="84,8 92,2 84,16" fill="#1a0a1a" />
        {/* Helmet visor slot */}
        <rect x="40" y="22" width="40" height="8" fill="#0a0006" />
        {/* Glowing red eyes */}
        <rect x="44" y="23" width="6" height="5" fill="#ff1d3a" />
        <rect x="70" y="23" width="6" height="5" fill="#ff1d3a" />
        <rect x="46" y="24" width="2" height="2" fill="#fff0d0" />
        <rect x="72" y="24" width="2" height="2" fill="#fff0d0" />
        {/* Skull grin teeth */}
        <rect x="46" y="34" width="28" height="5" fill="#0a0006" />
        <rect x="48" y="34" width="2" height="5" fill="#dadada" />
        <rect x="52" y="34" width="2" height="5" fill="#dadada" />
        <rect x="56" y="34" width="2" height="5" fill="#dadada" />
        <rect x="60" y="34" width="2" height="5" fill="#dadada" />
        <rect x="64" y="34" width="2" height="5" fill="#dadada" />
        <rect x="68" y="34" width="2" height="5" fill="#dadada" />
        <rect x="72" y="34" width="2" height="5" fill="#dadada" />
        {/* Helmet bottom edge */}
        <rect x="36" y="44" width="48" height="6" fill="#1a0a1a" />

        {/* Scythe (right hand) */}
        <rect x="116" y="20" width="3" height="100" fill="#5a3a1a" />
        <polygon
          points="119,20 134,32 130,52 120,42"
          fill="#dadada"
        />
        <polygon
          points="119,20 134,32 130,52 120,42"
          fill="none"
          stroke="#3a3a3a"
          strokeWidth="1"
        />
        <rect x="116" y="48" width="6" height="3" fill="#5a5a5a" />
      </svg>

      <BossNameplate />
    </div>
  );
}

function BossNameplate() {
  return (
    <div
      className="-mt-1 rounded-sm border px-2 py-0.5 font-pixel text-[10px] tracking-widest"
      style={{
        backgroundColor: "#2a1018",
        borderColor: "#e94b8b",
        color: "#ff8aac",
        boxShadow: "0 0 8px rgba(233,75,139,0.45)",
      }}
    >
      ★ BOSS ★
    </div>
  );
}

function ExplosionFX({ active }: { active: boolean }) {
  // Larger, more dramatic bursts cycling around the boss.
  const bursts = useMemo(
    () => [
      { x: -8, y: 14, size: 52, delay: 0.0, color: "#ffb84a" },
      { x: 134, y: 8, size: 46, delay: 0.2, color: "#ffd84a" },
      { x: 60, y: -18, size: 56, delay: 0.45, color: "#ff7a3a" },
      { x: -16, y: 66, size: 44, delay: 0.7, color: "#ffd84a" },
      { x: 138, y: 72, size: 50, delay: 0.95, color: "#ffb84a" },
      { x: 62, y: 102, size: 40, delay: 1.2, color: "#ff7a3a" },
      { x: 28, y: 28, size: 36, delay: 1.45, color: "#fff0a0" },
      { x: 108, y: 44, size: 38, delay: 1.7, color: "#fff0a0" },
    ],
    [],
  );

  if (!active) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
      {bursts.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.x, top: b.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.4, 1.05, 0], opacity: [0, 1, 0.9, 0] }}
          transition={{
            duration: 1.4,
            ease: "easeOut",
            delay: b.delay,
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
        >
          <PixelBurst size={b.size} color={b.color} />
        </motion.div>
      ))}
    </div>
  );
}

function PixelBurst({ size, color }: { size: number; color: string }) {
  // Eight-pointed pixel starburst, classic explosion sprite vibe.
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" shapeRendering="crispEdges">
      <rect x="11" y="0" width="2" height="6" fill={color} />
      <rect x="11" y="18" width="2" height="6" fill={color} />
      <rect x="0" y="11" width="6" height="2" fill={color} />
      <rect x="18" y="11" width="6" height="2" fill={color} />
      <rect x="4" y="4" width="3" height="3" fill={color} />
      <rect x="17" y="4" width="3" height="3" fill={color} />
      <rect x="4" y="17" width="3" height="3" fill={color} />
      <rect x="17" y="17" width="3" height="3" fill={color} />
      <rect x="8" y="8" width="8" height="8" fill={color} />
      <rect x="10" y="10" width="4" height="4" fill="#ffffff" />
    </svg>
  );
}

function MoneyFlyAway({ active }: { active: boolean }) {
  // Little winged ¥ coins flying upward and outward, depicting wealth
  // escaping during the boss fight.
  const coins = useMemo(
    () => [
      { x: 30, drift: -50, delay: 0.0 },
      { x: 70, drift: 60, delay: 0.35 },
      { x: 110, drift: -30, delay: 0.7 },
      { x: 50, drift: 40, delay: 1.05 },
      { x: 90, drift: -70, delay: 1.4 },
      { x: 20, drift: 30, delay: 1.75 },
      { x: 130, drift: -20, delay: 2.1 },
    ],
    [],
  );

  if (!active) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2" style={{ top: 60, width: 160, height: 160 }}>
      {coins.map((c, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: c.x, top: 80 }}
          initial={{ y: 0, x: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: [-2, -180],
            x: [0, c.drift],
            opacity: [0, 1, 1, 0],
            scale: [0.6, 1, 1, 0.5],
            rotate: [0, c.drift > 0 ? 18 : -18],
          }}
          transition={{
            duration: 2.4,
            ease: "easeOut",
            delay: c.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            times: [0, 0.15, 0.75, 1],
          }}
        >
          <WingedCoin />
        </motion.div>
      ))}
    </div>
  );
}

function WingedCoin() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" shapeRendering="crispEdges">
      {/* Left wing */}
      <polygon points="0,4 4,2 4,9" fill="#fff" opacity="0.95" />
      <polygon points="0,7 3,6 3,11" fill="#fff" opacity="0.7" />
      {/* Right wing */}
      <polygon points="22,4 18,2 18,9" fill="#fff" opacity="0.95" />
      <polygon points="22,7 19,6 19,11" fill="#fff" opacity="0.7" />
      {/* Coin body */}
      <rect x="6" y="2" width="10" height="12" fill="#ffd84a" />
      <rect x="6" y="2" width="10" height="2" fill="#fff0a0" />
      <rect x="6" y="12" width="10" height="2" fill="#c89218" />
      {/* ¥ glyph (chunky pixel) */}
      <rect x="8" y="5" width="2" height="2" fill="#7a5208" />
      <rect x="12" y="5" width="2" height="2" fill="#7a5208" />
      <rect x="10" y="7" width="2" height="2" fill="#7a5208" />
      <rect x="8" y="9" width="6" height="1" fill="#7a5208" />
      <rect x="10" y="10" width="2" height="2" fill="#7a5208" />
    </svg>
  );
}

function SignBoardWithBubble({
  sign,
  pos,
  isActive,
  boss,
}: {
  sign: Sign;
  pos: { x: number; y: number };
  isActive: boolean;
  boss?: "castle" | "warrior";
}) {
  const bubbleAbove = pos.y >= SCROLL_H / 2;
  const isBoss = !!boss;
  const width = boss === "warrior" ? 130 : isBoss ? 170 : 144;
  const topOffset = boss === "warrior" ? 110 : isBoss ? 96 : 4;
  return (
    <div
      className="absolute z-10"
      style={{
        left: pos.x - width / 2,
        top: pos.y - topOffset,
        width,
      }}
    >
      {boss === "castle" ? (
        <div className="relative">
          <BossCastle />
          <ExplosionFX active={isActive} />
          <MoneyFlyAway active={isActive} />
        </div>
      ) : boss === "warrior" ? (
        <div className="relative">
          <ArmoredWarriorBoss />
          <ExplosionFX active={isActive} />
          <MoneyFlyAway active={isActive} />
        </div>
      ) : (
        <SignBoard sign={sign} />
      )}
      <Bubble
        body={sign.body}
        year={sign.year}
        title={sign.title}
        active={isActive}
        side={bubbleAbove ? "above" : "below"}
      />
    </div>
  );
}

function Bubble({
  body,
  year,
  title,
  active,
  side,
}: {
  body: string;
  year: string;
  title: string;
  active: boolean;
  side: "above" | "below";
}) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (!active) {
      setRevealed(0);
      return;
    }
    if (revealed >= body.length) return;
    const t = window.setTimeout(() => setRevealed((r) => r + 1), 32);
    return () => window.clearTimeout(t);
  }, [active, revealed, body]);

  const done = revealed >= body.length;

  return (
    <motion.div
      initial={false}
      animate={
        active
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: side === "above" ? 8 : -8, scale: 0.94 }
      }
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="pointer-events-none absolute left-1/2 z-30 w-[300px] -translate-x-1/2"
      style={
        side === "above"
          ? { bottom: "100%", marginBottom: 50 }
          : { top: "100%", marginTop: 14 }
      }
    >
      <div
        className="relative rounded-md font-pixel leading-relaxed text-white"
        style={{
          backgroundColor: "#1e3a8a",
          boxShadow:
            "inset 0 0 0 2px #1e3a8a, inset 0 0 0 4px white, inset 0 0 0 6px #1e3a8a, 0 6px 0 rgba(0,0,0,0.45)",
          padding: "14px 14px 12px",
        }}
      >
        <div className="mb-1 flex items-center gap-2 text-[10px] text-[#9ecbff]">
          <span>{year}</span>
          <span className="opacity-50">|</span>
          <span>{title}</span>
        </div>
        <p className="text-[13px]" style={{ minHeight: "5em" }}>
          {body.slice(0, revealed)}
          {done && (
            <span className="ml-1 inline-block animate-pulse text-[#9ecbff]">
              ▼
            </span>
          )}
        </p>
      </div>
      <BubbleTail side={side} />
    </motion.div>
  );
}

function BubbleTail({ side }: { side: "above" | "below" }) {
  const common: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    width: 0,
    height: 0,
    transform: "translateX(-50%)",
    borderLeft: "9px solid transparent",
    borderRight: "9px solid transparent",
  };
  if (side === "above") {
    return (
      <span
        style={{
          ...common,
          bottom: -10,
          borderTop: "10px solid white",
        }}
      />
    );
  }
  return (
    <span
      style={{
        ...common,
        top: -10,
        borderBottom: "10px solid white",
      }}
    />
  );
}

// ── Endpoints ──────────────────────────────────────────────────────

function StartFlag() {
  return (
    <div className="absolute z-10" style={{ left: 50, top: SCROLL_H / 2 - 78 }}>
      <svg width="36" height="84">
        <line x1="3" y1="6" x2="3" y2="82" stroke="#8a8a8a" strokeWidth="3" />
        <polygon
          points="3,6 34,18 3,30"
          fill="#22c55e"
          stroke="#000"
          strokeWidth="1"
        />
      </svg>
      <div
        className="absolute left-9 top-2 font-pixel text-[10px] tracking-widest text-white"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        START
      </div>
    </div>
  );
}

function ContinuesAfterNow() {
  // After the last sign (NOW), the path continues with fading footprints
  // and a small つづく indicator, instead of a hard goal flag.
  const lastSign = getSignPos(SIGN_COUNT - 1);
  const startX = lastSign.x + 70;
  const endX = SCROLL_W - 40;
  const baseY = SCROLL_H / 2;

  const steps = Array.from({ length: 7 }).map((_, i) => {
    const t = (i + 1) / 8;
    const x = startX + (endX - startX) * t;
    const y = baseY + Math.sin(t * Math.PI * 1.4) * 18;
    const opacity = 0.55 * (1 - t);
    return { x, y, opacity };
  });

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      {/* Fading footprints */}
      {steps.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            width: 7,
            height: 4,
            backgroundColor: "rgba(244,162,107,1)",
            opacity: s.opacity,
            borderRadius: 1,
            transform: i % 2 === 0 ? "rotate(-12deg)" : "rotate(12deg)",
          }}
        />
      ))}
      {/* つづく label, anchored near the end */}
      <div
        className="absolute font-pixel text-xs tracking-widest"
        style={{
          left: endX - 80,
          top: baseY - 40,
          color: "rgba(244,162,107,0.85)",
          textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
        }}
      >
        → つづく…
      </div>
    </div>
  );
}
