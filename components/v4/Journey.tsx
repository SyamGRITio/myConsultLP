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
    year: "2018",
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
    year: "2021.9",
    title: "SES入社・富山",
    body: "案件待機半年、富山へ単身赴任。引っ越し代は自腹、給料前借り、手取り12〜13万。",
  },
  {
    num: "09",
    year: "2022.4〜",
    title: "実務開始",
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
              />
            ))}

            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-20"
              style={{
                x: playerX,
                y: playerY,
                width: 56,
                height: 56,
                marginLeft: -28,
                marginTop: -38,
              }}
            >
              <Image
                src="/avatar.png"
                alt=""
                width={56}
                height={56}
                style={{ imageRendering: "pixelated" }}
                className="drop-shadow-[0_3px_0_rgba(0,0,0,0.6)]"
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

      <div className="mt-14 flex flex-col items-center gap-5 text-center">
        <p
          className="text-base leading-relaxed md:text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          ここまで、来た。次は、あなたの番かもしれません。
        </p>
        <Link
          href={withUtm(LINKS.line, "journey", "cta")}
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
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-sm px-3 py-2 text-center"
        style={{
          backgroundColor: "#7a4a26",
          border: "3px solid #3d2412",
          boxShadow: "3px 3px 0 #1a1008",
          minWidth: 130,
        }}
      >
        <div className="font-pixel text-[10px] leading-none text-[#ffd699]">
          {sign.year}
        </div>
        <div className="mt-0.5 font-pixel text-xs leading-tight text-white">
          {sign.title}
        </div>
      </div>
      <div className="h-6 w-2" style={{ backgroundColor: "#3d2412" }} />
    </div>
  );
}

function SignBoardWithBubble({
  sign,
  pos,
  isActive,
}: {
  sign: Sign;
  pos: { x: number; y: number };
  isActive: boolean;
}) {
  const bubbleAbove = pos.y >= SCROLL_H / 2;
  return (
    <div
      className="absolute z-10"
      style={{
        left: pos.x - 65,
        top: pos.y - 4,
        width: 130,
      }}
    >
      <SignBoard sign={sign} />
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
