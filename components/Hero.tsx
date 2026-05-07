"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LINKS, withUtm } from "@/lib/constants";

const STARS = [
  { top: "5%", left: "8%", delay: "0s", cross: false },
  { top: "12%", left: "23%", delay: "0.6s", cross: false },
  { top: "8%", left: "40%", delay: "1.2s", cross: true },
  { top: "16%", left: "55%", delay: "1.8s", cross: false },
  { top: "10%", left: "70%", delay: "2.4s", cross: false },
  { top: "6%", left: "86%", delay: "3.0s", cross: false },
  { top: "20%", left: "16%", delay: "3.6s", cross: true },
  { top: "22%", left: "78%", delay: "4.2s", cross: false },
];

const FRONT_BUILDINGS: Array<{ x: number; w: number; h: number; windows: number[] }> = [
  { x: 0, w: 8, h: 14, windows: [4, 9] },
  { x: 8, w: 6, h: 18, windows: [6, 12] },
  { x: 14, w: 10, h: 22, windows: [4, 10, 16] },
  { x: 24, w: 7, h: 16, windows: [6, 12] },
  { x: 31, w: 9, h: 26, windows: [5, 11, 18] },
  { x: 40, w: 6, h: 18, windows: [7, 13] },
  { x: 46, w: 11, h: 30, windows: [4, 11, 18, 24] },
  { x: 57, w: 7, h: 14, windows: [5, 9] },
  { x: 64, w: 9, h: 22, windows: [6, 13, 18] },
  { x: 73, w: 8, h: 18, windows: [5, 11] },
  { x: 81, w: 10, h: 26, windows: [4, 11, 18] },
  { x: 91, w: 9, h: 16, windows: [6, 11] },
];

const BACK_BUILDINGS: Array<{ x: number; w: number; h: number }> = [
  { x: 0, w: 14, h: 10 },
  { x: 14, w: 10, h: 14 },
  { x: 24, w: 16, h: 9 },
  { x: 40, w: 12, h: 12 },
  { x: 52, w: 18, h: 8 },
  { x: 70, w: 14, h: 11 },
  { x: 84, w: 16, h: 9 },
];

function Stars() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            animation: `scene-twinkle ${s.cross ? 4.5 : 3.5}s ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        >
          {s.cross ? (
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M4 0 L4 8 M0 4 L8 4 M2 2 L6 6 M6 2 L2 6" stroke="#F4F0E0" strokeWidth="0.6" />
            </svg>
          ) : (
            <span
              className="block"
              style={{
                width: 2,
                height: 2,
                backgroundColor: "#F4F0E0",
                boxShadow: "0 0 4px #F4F0E0",
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

function Cloud({ top, scale, opacity, duration, delay }: {
  top: string;
  scale: number;
  opacity: number;
  duration: string;
  delay: string;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top,
        left: 0,
        animation: `scene-drift ${duration} linear infinite`,
        animationDelay: delay,
      }}
    >
      <svg
        width={120 * scale}
        height={28 * scale}
        viewBox="0 0 120 28"
        style={{ opacity }}
      >
        <g fill="#C9B8E8" shapeRendering="crispEdges">
          <rect x="14" y="14" width="92" height="6" />
          <rect x="20" y="10" width="80" height="4" />
          <rect x="30" y="6" width="50" height="4" />
          <rect x="38" y="2" width="28" height="4" />
          <rect x="8" y="16" width="6" height="6" />
          <rect x="106" y="16" width="6" height="6" />
        </g>
      </svg>
    </div>
  );
}

function Mountains() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0"
      style={{ bottom: "20%" }}
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      width="100%"
      height="22%"
    >
      <polygon
        fill="#2B1B5E"
        points="0,30 0,18 10,10 18,15 28,6 38,14 48,8 58,16 70,9 80,14 92,7 100,12 100,30"
      />
      <polygon
        fill="#1A1233"
        points="0,30 0,22 8,18 18,22 28,16 36,21 46,17 56,22 66,18 76,22 88,16 100,20 100,30"
      />
    </svg>
  );
}

function CityBack() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0"
      style={{ bottom: "18%" }}
      viewBox="0 0 100 16"
      preserveAspectRatio="none"
      width="100%"
      height="9%"
    >
      <g fill="#3D2D5F" shapeRendering="crispEdges">
        {BACK_BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={16 - b.h} width={b.w} height={b.h} />
        ))}
      </g>
    </svg>
  );
}

function CityFront({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0"
      style={{
        bottom: flip ? undefined : "18%",
        top: flip ? "82%" : undefined,
        transform: flip ? "scaleY(-1)" : undefined,
        opacity: flip ? 0.3 : 1,
      }}
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      width="100%"
      height={flip ? "12%" : "16%"}
    >
      <g fill="#1D1133" shapeRendering="crispEdges">
        {FRONT_BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={32 - b.h} width={b.w} height={b.h} />
        ))}
      </g>
      {!flip && (
        <g fill="#FFD27D">
          {FRONT_BUILDINGS.flatMap((b, i) =>
            b.windows.map((wy, j) => (
              <rect
                key={`${i}-${j}`}
                x={b.x + b.w / 2 - 0.6}
                y={32 - b.h + wy}
                width="1.2"
                height="1.2"
                style={{
                  animation: `scene-window ${2 + ((i + j) % 3)}s ease-in-out infinite`,
                  animationDelay: `${((i * 0.7 + j * 0.3) % 3).toFixed(2)}s`,
                }}
              />
            )),
          )}
        </g>
      )}
    </svg>
  );
}

function Water() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      style={{ height: "18%" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43,27,94,0.85) 0%, #2B1B5E 40%, #1A1233 100%)",
          animation: "scene-shimmer 5s ease-in-out infinite",
        }}
      />
      <CityFront flip />
      <div className="absolute inset-x-0" style={{ top: "10%" }}>
        {[0, 25, 55, 80].map((left, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              width: "12%",
              height: 1,
              backgroundColor: `rgba(255,255,255,${0.2 + (i % 3) * 0.1})`,
              top: `${i * 18}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, #1B1240 0%, #2B1B5E 15%, #4B2E83 35%, #B83A8A 55%, #E94B8B 65%, #F4A26B 75%, #2B1B5E 95%, #0E0A1F 100%)",
        }}
      />

      <div className="absolute inset-0 -z-10">
        <Stars />
        <Cloud top="14%" scale={1} opacity={0.6} duration="120s" delay="0s" />
        <Cloud top="22%" scale={0.7} opacity={0.5} duration="150s" delay="-40s" />
        <Cloud top="30%" scale={1.2} opacity={0.55} duration="100s" delay="-80s" />
        <Mountains />
        <CityBack />
        <CityFront />
        <Water />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "rgba(14,10,31,0.5)" }}
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
      </div>
    </section>
  );
}
