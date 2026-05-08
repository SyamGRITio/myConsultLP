"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const STARS: Array<{ top: string; left: string; cls: string }> = [
  { top: "4%", left: "15%", cls: "animate-twinkle-1" },
  { top: "6%", left: "40%", cls: "animate-twinkle-2" },
  { top: "3%", left: "70%", cls: "animate-twinkle-3" },
  { top: "7%", left: "85%", cls: "animate-twinkle-4" },
  { top: "10%", left: "25%", cls: "animate-twinkle-5" },
  { top: "5%", left: "55%", cls: "animate-twinkle-6" },
];

const CLOUD_BLOCKS: Array<[number, number]> = [
  [16, 0], [24, 0],
  [8, 8], [16, 8], [24, 8], [32, 8],
  [0, 16], [8, 16], [16, 16], [24, 16], [32, 16], [40, 16],
  [8, 24], [16, 24], [24, 24], [32, 24],
];

function PixelCloud({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-8 w-24 ${className}`}
      viewBox="0 0 48 32"
      shapeRendering="crispEdges"
      style={{ opacity: 0.7 }}
    >
      <g fill="#C9B8E8">
        {CLOUD_BLOCKS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="8" height="8" />
        ))}
      </g>
    </svg>
  );
}

function Star({ className = "" }: { className?: string }) {
  return (
    <span
      className={className}
      style={{
        width: 4,
        height: 4,
        backgroundColor: "#F4F0E0",
        boxShadow: "0 0 6px rgba(244,240,224,0.8)",
        display: "block",
      }}
    />
  );
}

function PixelSteam({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-8 w-6 ${className}`}
      viewBox="0 0 24 32"
      style={{ opacity: 0.5 }}
    >
      <path
        d="M6 30 Q3 22 9 16 Q14 10 6 2"
        stroke="#F4F0E0"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16 30 Q19 22 13 16 Q8 10 16 2"
        stroke="#F4F0E0"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, (v) => -v * 0.3);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ backgroundColor: "#0E0A1F" }} />

      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src="/pixel-vertical.png"
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
      </motion.div>

      <PixelCloud className="absolute left-0 top-[8%] animate-cloud-1" />
      <PixelCloud className="absolute left-0 top-[12%] animate-cloud-2" />
      <PixelCloud className="absolute left-0 top-[18%] animate-cloud-3" />

      {STARS.map((s, i) => (
        <span
          key={i}
          className={`absolute ${s.cls}`}
          style={{ top: s.top, left: s.left }}
        >
          <Star />
        </span>
      ))}

      <span
        className="absolute animate-blink"
        style={{
          bottom: "15%",
          left: "20%",
          width: 6,
          height: 10,
          backgroundColor: "#5BFF5B",
          boxShadow: "0 0 4px rgba(91,255,91,0.6)",
        }}
      />

      <PixelSteam className="absolute bottom-[20%] left-[42%] animate-steam" />

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(14,10,31,0.3)" }}
      />
    </div>
  );
}
