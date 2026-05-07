"use client";

import Link from "next/link";
import { IconBrandLine, IconBrandX } from "@tabler/icons-react";
import { LINKS, withUtm } from "@/lib/constants";

const FAINT_BUILDINGS: Array<{ x: number; w: number; h: number }> = [
  { x: 0, w: 9, h: 8 },
  { x: 9, w: 7, h: 12 },
  { x: 16, w: 11, h: 9 },
  { x: 27, w: 8, h: 14 },
  { x: 35, w: 10, h: 7 },
  { x: 45, w: 7, h: 11 },
  { x: 52, w: 12, h: 9 },
  { x: 64, w: 8, h: 13 },
  { x: 72, w: 9, h: 8 },
  { x: 81, w: 11, h: 11 },
  { x: 92, w: 8, h: 9 },
];

function Cloud({
  top,
  scale,
  duration,
  delay,
}: {
  top: string;
  scale: number;
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
        width={140 * scale}
        height={32 * scale}
        viewBox="0 0 120 28"
        style={{ opacity: 0.5 }}
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

function FaintCity() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-x-0"
      style={{ bottom: "26%", opacity: 0.4 }}
      viewBox="0 0 100 16"
      preserveAspectRatio="none"
      width="100%"
      height="10%"
    >
      <g fill="#2B1B5E" shapeRendering="crispEdges">
        {FAINT_BUILDINGS.map((b, i) => (
          <rect key={i} x={b.x} y={16 - b.h} width={b.w} height={b.h} />
        ))}
      </g>
    </svg>
  );
}

function WaterStrip() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0"
      style={{
        bottom: "14%",
        height: "10%",
        background:
          "linear-gradient(to bottom, rgba(43,27,94,0.6) 0%, rgba(26,18,51,0.85) 100%)",
        animation: "scene-shimmer 6s ease-in-out infinite",
      }}
    >
      {[10, 35, 60, 82].map((left, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${left}%`,
            top: `${20 + i * 18}%`,
            width: "10%",
            height: 1,
            backgroundColor: `rgba(255,255,255,${0.18 + (i % 3) * 0.07})`,
          }}
        />
      ))}
    </div>
  );
}

function DeskScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mx-auto w-full max-w-2xl"
      style={{ aspectRatio: "16 / 7" }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 160 70"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="crispEdges"
      >
        <rect x="0" y="46" width="160" height="24" fill="#3D2417" />
        <rect x="0" y="46" width="160" height="2" fill="#5A3520" />

        <rect x="22" y="22" width="58" height="30" fill="#7A7580" />
        <rect x="24" y="24" width="54" height="26" fill="#0A0A0A" />
        <rect x="46" y="52" width="10" height="2" fill="#7A7580" />
        <rect x="38" y="54" width="26" height="3" fill="#5A5560" />

        <text
          x="27"
          y="32"
          fill="#5BFF5B"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="4.4"
          fontWeight="700"
        >
          C:\&gt; consult --start
        </text>
        <text
          x="27"
          y="40"
          fill="#5BFF5B"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="4.4"
          fontWeight="700"
        >
          ready.
        </text>
        <rect
          x="48"
          y="36"
          width="3"
          height="4.5"
          fill="#5BFF5B"
          style={{ animation: "scene-blink 1s steps(1) infinite" }}
        />

        <rect x="124" y="32" width="20" height="22" fill="#9C9398" />
        <rect x="121" y="52" width="26" height="3" fill="#7A7580" />
        <rect x="144" y="36" width="4" height="9" fill="none" stroke="#9C9398" strokeWidth="1.2" />

        <g style={{ animation: "scene-steam 4s ease-out infinite" }}>
          <path
            d="M129 32 Q126 26 131 20 Q134 14 129 8"
            stroke="#F4F0E0"
            strokeWidth="1"
            fill="none"
            opacity="0.65"
          />
          <path
            d="M138 32 Q141 26 136 20 Q133 14 138 8"
            stroke="#F4F0E0"
            strokeWidth="1"
            fill="none"
            opacity="0.65"
          />
        </g>

        <rect x="86" y="40" width="28" height="4" fill="#3D5A47" />
        <rect x="89" y="36" width="25" height="4" fill="#5A8067" />
        <rect x="84" y="32" width="30" height="4" fill="#3D5A47" />

        <rect x="6" y="38" width="14" height="14" fill="#A0593E" />
        <rect x="6" y="38" width="14" height="2" fill="#7E4530" />
        <path d="M9 38 L11 28 L13 26 L15 28 L17 38 Z" fill="#4A7C59" />
        <rect x="10" y="22" width="2" height="6" fill="#4A7C59" />
        <rect x="14" y="24" width="2" height="5" fill="#4A7C59" />
      </svg>
    </div>
  );
}

export function CTA() {
  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-30"
        style={{
          background:
            "linear-gradient(to bottom, #1B1240 0%, #2B1B5E 12%, #4B2E83 30%, #B83A8A 50%, #E94B8B 62%, #F4A26B 78%, #2B1B5E 92%, #0E0A1F 100%)",
        }}
      />

      <div aria-hidden className="absolute inset-0 -z-20">
        <Cloud top="10%" scale={1} duration="100s" delay="0s" />
        <Cloud top="20%" scale={0.75} duration="130s" delay="-50s" />
        <FaintCity />
        <WaterStrip />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,10,31,0.45) 0%, rgba(14,10,31,0.35) 50%, rgba(14,10,31,0.7) 100%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text)" }}>
          話したい人は、こちらから
        </h2>

        <div className="mt-10 w-full">
          <DeskScene />
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={withUtm(LINKS.line, "cta-final", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--accent-orange)",
              color: "var(--bg)",
              boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.5)",
            }}
          >
            <IconBrandLine size={20} stroke={2} />
            LINEに登録する
          </Link>
          <Link
            href={withUtm(LINKS.xDm, "cta-final", "dm")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              borderColor: "var(--text)",
              color: "var(--text)",
              backgroundColor: "rgba(14,10,31,0.4)",
            }}
          >
            <IconBrandX size={20} stroke={2} />
            XのDMでも気軽に
          </Link>
        </div>

        <p
          className="mt-8 max-w-md text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          今は無料相談だけ。近いうちに、有料のAzureコーチングを始めようと思っています。
        </p>
      </div>
    </section>
  );
}
