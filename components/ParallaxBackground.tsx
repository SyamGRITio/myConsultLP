"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const STARS = [
  { top: "3%", left: "10%", cls: "animate-twinkle-1" },
  { top: "5%", left: "32%", cls: "animate-twinkle-2" },
  { top: "8%", left: "55%", cls: "animate-twinkle-3" },
  { top: "11%", left: "78%", cls: "animate-twinkle-4" },
  { top: "16%", left: "20%", cls: "animate-twinkle-5" },
  { top: "18%", left: "48%", cls: "animate-twinkle-6" },
  { top: "20%", left: "70%", cls: "animate-twinkle-7" },
  { top: "22%", left: "90%", cls: "animate-twinkle-8" },
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
      className={`absolute h-8 w-24 ${className}`}
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

function PixelStar({
  className = "",
  top,
  left,
}: {
  className?: string;
  top: string;
  left: string;
}) {
  return (
    <span
      className={`absolute ${className}`}
      style={{
        top,
        left,
        width: 4,
        height: 4,
        backgroundColor: "#F4F0E0",
        boxShadow: "0 0 6px rgba(244,240,224,0.8)",
      }}
    />
  );
}

function PixelSteam({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute h-8 w-6 ${className}`}
      viewBox="0 0 24 32"
      style={{ opacity: 0.5 }}
    >
      <path
        d="M6 30 Q3 22 9 16 Q14 10 6 2"
        stroke="#F4F0E0"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M16 30 Q19 22 13 16 Q8 10 16 2"
        stroke="#F4F0E0"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const cityY = useTransform(scrollY, (v) => -v * 0.3);
  const deskY = useTransform(scrollY, (v) => -v * 0.5);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0" style={{ backgroundColor: "#0E0A1F" }} />

      {/* L1: city sunset image (mid-ground) */}
      <motion.div className="absolute inset-0" style={{ y: cityY }}>
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
      </motion.div>

      {/* L2: drifting pixel clouds */}
      <div className="absolute left-0 top-[12%] h-[15%] w-full">
        <PixelCloud className="left-0 top-0 animate-cloud-1" />
        <PixelCloud className="left-0 top-[40%] animate-cloud-2" />
        <PixelCloud className="left-0 top-[70%] animate-cloud-3" />
      </div>

      {/* L3: twinkling pixel stars */}
      {STARS.map((s, i) => (
        <PixelStar key={i} top={s.top} left={s.left} className={s.cls} />
      ))}

      {/* L4: water surface shimmer */}
      <div
        className="absolute left-0 w-full animate-water-wave"
        style={{
          bottom: "36%",
          height: "8px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(43,27,94,0.3) 100%)",
        }}
      />

      {/* L5: desk image (foreground) */}
      <motion.div
        className="absolute bottom-0 left-0 h-[35%] w-full"
        style={{ y: deskY }}
      >
        <Image
          src="/pixel-desk.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{
            imageRendering: "pixelated",
            objectPosition: "bottom",
          }}
        />
      </motion.div>

      {/* L6: coffee steam SVG */}
      <PixelSteam className="bottom-[18%] left-[55%] animate-steam" />

      {/* L7: terminal cursor blink overlay */}
      <span
        className="absolute animate-blink"
        style={{
          bottom: "25%",
          left: "18%",
          width: 8,
          height: 12,
          backgroundColor: "#5BFF5B",
          boxShadow: "0 0 4px rgba(91,255,91,0.6)",
        }}
      />

      {/* tint scrim */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(14,10,31,0.3)" }}
      />
    </div>
  );
}
