"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
} from "framer-motion";
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
const SCROLL_H = 600;
const START_PAD = 220;
const END_PAD = 240;
const SIGN_X_RANGE = SCROLL_W - START_PAD - END_PAD;
const SIGN_COUNT = SIGNS.length;

function getSignPos(i: number) {
  const x = START_PAD + (i / (SIGN_COUNT - 1)) * SIGN_X_RANGE;
  const baseY = SCROLL_H / 2;
  const amplitude = 130;
  const y = baseY + amplitude * Math.sin((i / (SIGN_COUNT - 1)) * Math.PI * 3.4);
  return { x, y };
}

function buildPath() {
  const points: { x: number; y: number }[] = [];
  points.push({ x: 70, y: SCROLL_H / 2 });
  for (let i = 0; i < SIGN_COUNT; i++) points.push(getSignPos(i));
  points.push({ x: SCROLL_W - 70, y: SCROLL_H / 2 });

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
  const { scrollXProgress } = useScroll({ container: scrollRef });

  const playerX = useMotionValue(70);
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
          className="relative overflow-x-auto overflow-y-hidden rounded-lg scroll-smooth snap-x snap-mandatory"
          style={{ height: SCROLL_H, border: "3px solid #444" }}
        >
          <div
            className="relative"
            style={{ width: SCROLL_W, height: SCROLL_H }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right,
                  #2a1217 0%,
                  #2a1217 22%,
                  #2d1d12 28%,
                  #2d1d12 50%,
                  #112a1c 56%,
                  #112a1c 72%,
                  #1a1238 78%,
                  #1a1238 100%)`,
              }}
            />

            <StarsBg />
            <Decorations />

            <svg
              className="absolute inset-0 pointer-events-none"
              width={SCROLL_W}
              height={SCROLL_H}
            >
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="rgba(244,162,107,0.55)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="14 8"
              />
            </svg>

            <Flag x={50} y={SCROLL_H / 2 - 64} label="START" color="#22c55e" />
            <Flag
              x={SCROLL_W - 86}
              y={SCROLL_H / 2 - 64}
              label="NOW"
              color="#e94b8b"
            />

            {SIGNS.map((sign, i) => (
              <SignWithBubble
                key={sign.num}
                sign={sign}
                pos={getSignPos(i)}
                scrollRef={scrollRef}
              />
            ))}

            <motion.div
              className="pointer-events-none absolute top-0 left-0 z-10"
              style={{
                x: playerX,
                y: playerY,
                width: 56,
                height: 56,
                marginLeft: -28,
                marginTop: -36,
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

function SignBoard({ sign }: { sign: Sign }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="rounded-sm px-3 py-2 text-center"
        style={{
          backgroundColor: "#7a4a26",
          border: "3px solid #3d2412",
          boxShadow: "3px 3px 0 #1a1008",
          minWidth: 120,
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

function SignWithBubble({
  sign,
  pos,
  scrollRef,
}: {
  sign: Sign;
  pos: { x: number; y: number };
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const signRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(signRef, {
    root: scrollRef,
    margin: "0px -38% 0px -38%",
    amount: 0.5,
  });

  const [debounced, setDebounced] = useState(false);
  useEffect(() => {
    const delay = isInView ? 0 : 300;
    const t = window.setTimeout(() => setDebounced(isInView), delay);
    return () => window.clearTimeout(t);
  }, [isInView]);

  const bubbleAbove = pos.y >= SCROLL_H / 2;
  const bubbleSide: "above" | "below" = bubbleAbove ? "above" : "below";

  return (
    <div
      ref={signRef}
      className="absolute snap-center"
      style={{
        left: pos.x - 60,
        top: pos.y - 4,
        width: 120,
      }}
    >
      <SignBoard sign={sign} />

      <Bubble
        body={sign.body}
        year={sign.year}
        title={sign.title}
        active={debounced}
        side={bubbleSide}
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
        className="relative rounded-md p-3 font-pixel leading-relaxed text-white"
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

function Flag({
  x,
  y,
  label,
  color,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
}) {
  return (
    <div className="absolute z-10" style={{ left: x, top: y }}>
      <svg width="36" height="72">
        <line x1="3" y1="6" x2="3" y2="70" stroke="#8a8a8a" strokeWidth="3" />
        <polygon points="3,6 32,16 3,26" fill={color} stroke="#000" strokeWidth="1" />
      </svg>
      <div
        className="absolute left-9 top-2 font-pixel text-[10px] tracking-widest text-white"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        {label}
      </div>
    </div>
  );
}

function StarsBg() {
  const stars = useMemo(() => {
    const arr: { x: number; y: number; size: number; opacity: number }[] = [];
    let seed = 1234;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 80; i++) {
      arr.push({
        x: rand() * SCROLL_W,
        y: rand() * SCROLL_H,
        size: rand() < 0.7 ? 2 : 3,
        opacity: 0.25 + rand() * 0.4,
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

function Decorations() {
  const decos = useMemo(() => {
    const arr: { type: "cloud" | "tree" | "rock"; x: number; y: number }[] =
      [];
    let seed = 4242;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const types = ["cloud", "tree", "rock"] as const;
    for (let i = 0; i < 28; i++) {
      const t = types[Math.floor(rand() * 3)];
      const x = 80 + rand() * (SCROLL_W - 160);
      let y: number;
      if (t === "cloud") y = 30 + rand() * 80;
      else y = SCROLL_H - 80 - rand() * 40;
      arr.push({ type: t, x, y });
    }
    return arr;
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0">
      {decos.map((d, i) => {
        if (d.type === "cloud") {
          return <PixelCloud key={i} x={d.x} y={d.y} />;
        }
        if (d.type === "tree") {
          return <PixelTree key={i} x={d.x} y={d.y} />;
        }
        return <PixelRock key={i} x={d.x} y={d.y} />;
      })}
    </div>
  );
}

function PixelCloud({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute opacity-50" style={{ left: x, top: y }}>
      <svg width="42" height="20" shapeRendering="crispEdges">
        <rect x="6" y="6" width="6" height="6" fill="#fff" />
        <rect x="12" y="2" width="18" height="6" fill="#fff" />
        <rect x="30" y="6" width="6" height="6" fill="#fff" />
        <rect x="2" y="12" width="38" height="6" fill="#fff" />
      </svg>
    </div>
  );
}

function PixelTree({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute opacity-70" style={{ left: x, top: y }}>
      <svg width="24" height="32" shapeRendering="crispEdges">
        <rect x="8" y="0" width="8" height="4" fill="#1e7a3a" />
        <rect x="4" y="4" width="16" height="6" fill="#1e7a3a" />
        <rect x="0" y="10" width="24" height="8" fill="#1e7a3a" />
        <rect x="4" y="18" width="16" height="4" fill="#155228" />
        <rect x="10" y="22" width="4" height="10" fill="#5a3a18" />
      </svg>
    </div>
  );
}

function PixelRock({ x, y }: { x: number; y: number }) {
  return (
    <div className="absolute opacity-65" style={{ left: x, top: y }}>
      <svg width="18" height="12" shapeRendering="crispEdges">
        <rect x="4" y="0" width="10" height="3" fill="#9a9a9a" />
        <rect x="2" y="3" width="14" height="6" fill="#7a7a7a" />
        <rect x="0" y="9" width="18" height="3" fill="#5a5a5a" />
      </svg>
    </div>
  );
}
