"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const SKY_BANDS =
  "linear-gradient(to bottom," +
  "#1B1240 0%, #1B1240 8%," +
  "#2B1B5E 8%, #2B1B5E 18%," +
  "#4B2E83 18%, #4B2E83 30%," +
  "#B83A8A 30%, #B83A8A 42%," +
  "#E94B8B 42%, #E94B8B 55%," +
  "#F4A26B 55%, #F4A26B 68%," +
  "#FBCA88 68%, #FBCA88 78%," +
  "#2B1B5E 78%, #2B1B5E 88%," +
  "#0E0A1F 88%)";

const STARS = [
  { left: "8%", top: "5%", delay: "0s", cross: false },
  { left: "23%", top: "12%", delay: "0.6s", cross: false },
  { left: "40%", top: "8%", delay: "1.2s", cross: true },
  { left: "55%", top: "16%", delay: "1.8s", cross: false },
  { left: "70%", top: "10%", delay: "2.4s", cross: false },
  { left: "86%", top: "6%", delay: "3.0s", cross: false },
  { left: "16%", top: "20%", delay: "3.6s", cross: true },
  { left: "78%", top: "22%", delay: "4.2s", cross: false },
];

const CLOUD_BLOCKS: Array<[number, number]> = [
  [16, 0], [24, 0],
  [8, 8], [16, 8], [24, 8], [32, 8],
  [0, 16], [8, 16], [16, 16], [24, 16], [32, 16], [40, 16],
  [8, 24], [16, 24], [24, 24], [32, 24],
];

const BACK_MOUNTAIN_POINTS =
  "0,200 0,180 30,180 30,160 60,160 60,140 90,140 90,120 " +
  "120,120 120,100 150,100 150,80 180,80 180,100 210,100 210,120 " +
  "240,120 240,140 270,140 270,160 300,160 300,200";

const FRONT_MOUNTAIN_POINTS =
  "0,200 0,190 30,190 30,170 60,170 60,150 90,150 90,170 " +
  "120,170 120,150 150,150 150,170 180,170 180,150 210,150 210,170 " +
  "240,170 240,180 270,180 270,200";

type Building = {
  x: number;
  w: number;
  h: number;
  windows: Array<[number, number]>;
};

const BACK_BUILDINGS: Array<Omit<Building, "windows">> = [
  { x: 0, w: 32, h: 40 },
  { x: 32, w: 24, h: 56 },
  { x: 56, w: 36, h: 36 },
  { x: 92, w: 28, h: 48 },
  { x: 120, w: 40, h: 32 },
  { x: 160, w: 36, h: 44 },
  { x: 196, w: 28, h: 36 },
  { x: 224, w: 44, h: 40 },
  { x: 268, w: 32, h: 36 },
];

const FRONT_BUILDINGS: Building[] = [
  {
    x: 0, w: 24, h: 60,
    windows: [[8, 12], [16, 12], [8, 24], [16, 24], [8, 40], [16, 40]],
  },
  {
    x: 28, w: 28, h: 80,
    windows: [
      [8, 16], [16, 16], [8, 32], [16, 32], [8, 48], [16, 48], [8, 64], [16, 64],
    ],
  },
  {
    x: 60, w: 32, h: 56,
    windows: [[8, 12], [16, 12], [24, 12], [8, 28], [16, 28], [24, 28], [8, 44], [16, 44]],
  },
  {
    x: 96, w: 24, h: 92,
    windows: [
      [8, 16], [16, 16], [8, 32], [16, 32], [8, 48], [16, 48], [8, 64], [16, 64], [8, 80], [16, 80],
    ],
  },
  {
    x: 124, w: 36, h: 64,
    windows: [
      [8, 16], [16, 16], [24, 16], [8, 32], [16, 32], [24, 32], [8, 48], [16, 48], [24, 48],
    ],
  },
  {
    x: 164, w: 28, h: 76,
    windows: [
      [8, 12], [16, 12], [8, 28], [16, 28], [8, 44], [16, 44], [8, 60], [16, 60],
    ],
  },
  {
    x: 196, w: 32, h: 52,
    windows: [[8, 12], [16, 12], [24, 12], [8, 28], [16, 28], [24, 28], [8, 44], [16, 44]],
  },
  {
    x: 232, w: 24, h: 88,
    windows: [
      [8, 16], [16, 16], [8, 32], [16, 32], [8, 48], [16, 48], [8, 64], [16, 64], [8, 76], [16, 76],
    ],
  },
  {
    x: 260, w: 40, h: 64,
    windows: [
      [8, 16], [16, 16], [24, 16], [32, 16], [8, 32], [16, 32], [24, 32], [32, 32], [8, 48], [16, 48], [24, 48], [32, 48],
    ],
  },
];

function Sky() {
  return (
    <div className="absolute inset-0" style={{ background: SKY_BANDS }} />
  );
}

function StarsLayer() {
  return (
    <>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            animation: `scene-twinkle ${s.cross ? 4.5 : 3.5}s steps(2) infinite`,
            animationDelay: s.delay,
          }}
        >
          {s.cross ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              shapeRendering="crispEdges"
            >
              <rect x="5" y="5" width="2" height="2" fill="#F4F0E0" />
              <rect x="5" y="1" width="2" height="2" fill="#F4F0E0" />
              <rect x="5" y="9" width="2" height="2" fill="#F4F0E0" />
              <rect x="1" y="5" width="2" height="2" fill="#F4F0E0" />
              <rect x="9" y="5" width="2" height="2" fill="#F4F0E0" />
            </svg>
          ) : (
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              shapeRendering="crispEdges"
            >
              <rect x="0" y="0" width="4" height="4" fill="#F4F0E0" />
            </svg>
          )}
        </span>
      ))}
    </>
  );
}

function PixelCloud({
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
  const w = 48 * scale;
  const h = 32 * scale;
  return (
    <div
      className="absolute"
      style={{
        top,
        left: 0,
        animation: `scene-drift ${duration} linear infinite`,
        animationDelay: delay,
      }}
    >
      <svg
        width={w}
        height={h}
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
    </div>
  );
}

function CloudsLayer() {
  return (
    <>
      <PixelCloud top="14%" scale={1} duration="120s" delay="0s" />
      <PixelCloud top="22%" scale={0.75} duration="150s" delay="-50s" />
      <PixelCloud top="30%" scale={1.25} duration="100s" delay="-90s" />
    </>
  );
}

function MountainsLayer() {
  return (
    <svg
      className="absolute inset-x-0"
      style={{ bottom: "26%" }}
      viewBox="0 0 300 200"
      preserveAspectRatio="none"
      width="100%"
      height="26%"
      shapeRendering="crispEdges"
    >
      <polygon points={BACK_MOUNTAIN_POINTS} fill="#2B1B5E" />
      <polygon points={FRONT_MOUNTAIN_POINTS} fill="#1A1233" />
    </svg>
  );
}

function CityLayer() {
  return (
    <>
      <svg
        className="absolute inset-x-0"
        style={{ bottom: "24%" }}
        viewBox="0 0 300 60"
        preserveAspectRatio="none"
        width="100%"
        height="11%"
        shapeRendering="crispEdges"
      >
        <g fill="#3D2D5F">
          {BACK_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={60 - b.h} width={b.w} height={b.h} />
          ))}
        </g>
      </svg>

      <svg
        className="absolute inset-x-0"
        style={{ bottom: "24%" }}
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        width="100%"
        height="18%"
        shapeRendering="crispEdges"
      >
        <g fill="#1D1133">
          {FRONT_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={100 - b.h} width={b.w} height={b.h} />
          ))}
        </g>
        <g fill="#FFD27D">
          {FRONT_BUILDINGS.flatMap((b, i) =>
            b.windows.map(([wx, wy], j) => (
              <rect
                key={`${i}-${j}`}
                x={b.x + wx}
                y={100 - b.h + wy}
                width="4"
                height="4"
                style={{
                  animation: `scene-window ${2 + ((i + j) % 3)}s ease-in-out infinite`,
                  animationDelay: `${((i * 0.7 + j * 0.3) % 4).toFixed(2)}s`,
                }}
              />
            )),
          )}
        </g>
      </svg>
    </>
  );
}

function WaterLayer() {
  const stripes: Array<{ y: number; left: number; width: number; alpha: number }> = [
    { y: 8, left: 6, width: 22, alpha: 0.45 },
    { y: 14, left: 35, width: 30, alpha: 0.55 },
    { y: 14, left: 70, width: 18, alpha: 0.35 },
    { y: 22, left: 12, width: 26, alpha: 0.4 },
    { y: 22, left: 50, width: 20, alpha: 0.3 },
    { y: 30, left: 28, width: 32, alpha: 0.5 },
    { y: 30, left: 78, width: 14, alpha: 0.4 },
    { y: 38, left: 4, width: 18, alpha: 0.3 },
    { y: 38, left: 60, width: 28, alpha: 0.45 },
    { y: 46, left: 18, width: 22, alpha: 0.35 },
    { y: 46, left: 70, width: 22, alpha: 0.5 },
    { y: 54, left: 8, width: 30, alpha: 0.3 },
    { y: 54, left: 60, width: 26, alpha: 0.4 },
  ];

  return (
    <div
      className="absolute inset-x-0 overflow-hidden"
      style={{ bottom: "6%", height: "20%" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom," +
            "#2B1B5E 0%, #2B1B5E 30%," +
            "#1A1233 30%, #1A1233 65%," +
            "#0E0A1F 65%, #0E0A1F 100%)",
          animation: "scene-shimmer 5s steps(2) infinite",
        }}
      />

      <svg
        className="absolute inset-x-0"
        style={{ top: 0, transform: "scaleY(-1)", opacity: 0.35 }}
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
        width="100%"
        height="55%"
        shapeRendering="crispEdges"
      >
        <g fill="#1D1133">
          {FRONT_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={100 - b.h} width={b.w} height={b.h} />
          ))}
        </g>
      </svg>

      <svg
        className="absolute inset-x-0 bottom-0"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        width="100%"
        height="55%"
        shapeRendering="crispEdges"
      >
        {stripes.map((s, i) => (
          <rect
            key={i}
            x={s.left}
            y={s.y}
            width={s.width}
            height={2}
            fill={`rgba(244,240,224,${s.alpha})`}
          />
        ))}
      </svg>
    </div>
  );
}

function DeskLayer() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0"
      viewBox="0 0 320 80"
      preserveAspectRatio="xMidYEnd meet"
      width="100%"
      height="22%"
      shapeRendering="crispEdges"
    >
      <rect x="0" y="48" width="320" height="32" fill="#3D2417" />
      <rect x="0" y="48" width="320" height="2" fill="#5A3520" />

      <g>
        <rect x="80" y="20" width="40" height="28" fill="#7A7580" />
        <rect x="84" y="24" width="32" height="20" fill="#0A0A0A" />
        <rect x="80" y="20" width="40" height="2" fill="#9C9398" />
        <rect x="80" y="46" width="40" height="2" fill="#5A5560" />
        <rect x="96" y="48" width="8" height="2" fill="#7A7580" />
        <rect x="88" y="50" width="24" height="3" fill="#5A5560" />

        <text
          x="86"
          y="32"
          fill="#5BFF5B"
          fontSize="6"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          C:\&gt; consult --start
        </text>
        <text
          x="86"
          y="40"
          fill="#5BFF5B"
          fontSize="6"
          style={{ fontFamily: "var(--font-pixel), monospace" }}
        >
          ready.
        </text>
        <rect
          x="106"
          y="34"
          width="3"
          height="6"
          fill="#5BFF5B"
          style={{ animation: "scene-blink 1s steps(1) infinite" }}
        />
      </g>

      <g>
        <rect x="200" y="32" width="20" height="16" fill="#9C9398" />
        <rect x="200" y="32" width="20" height="2" fill="#6B6470" />
        <rect x="220" y="36" width="4" height="8" fill="#9C9398" />
        <rect x="196" y="48" width="28" height="2" fill="#7A7580" />

        <rect
          x="204"
          y="24"
          width="4"
          height="4"
          fill="#F4F0E0"
          opacity="0.6"
          style={{
            animation: "scene-steam 4s ease-out infinite",
            animationDelay: "0s",
          }}
        />
        <rect
          x="210"
          y="24"
          width="4"
          height="4"
          fill="#F4F0E0"
          opacity="0.6"
          style={{
            animation: "scene-steam 4s ease-out infinite",
            animationDelay: "1.2s",
          }}
        />
        <rect
          x="216"
          y="24"
          width="4"
          height="4"
          fill="#F4F0E0"
          opacity="0.6"
          style={{
            animation: "scene-steam 4s ease-out infinite",
            animationDelay: "2.4s",
          }}
        />
      </g>

      <g>
        <rect x="140" y="44" width="32" height="4" fill="#3D5A47" />
        <rect x="144" y="40" width="28" height="4" fill="#5A8067" />
        <rect x="138" y="36" width="34" height="4" fill="#3D5A47" />
      </g>

      <g>
        <rect x="240" y="32" width="16" height="16" fill="#A0593E" />
        <rect x="240" y="32" width="16" height="2" fill="#7E4530" />
        <rect x="244" y="20" width="4" height="12" fill="#4A7C59" />
        <rect x="240" y="24" width="4" height="4" fill="#4A7C59" />
        <rect x="252" y="22" width="4" height="6" fill="#4A7C59" />
      </g>

      <g>
        <rect x="36" y="40" width="24" height="8" fill="#8B6F47" />
        <rect x="36" y="40" width="24" height="2" fill="#A88863" />
      </g>
    </svg>
  );
}

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const yStars = useTransform(scrollY, (v) => -v * 0.05);
  const yClouds = useTransform(scrollY, (v) => -v * 0.1);
  const yMountains = useTransform(scrollY, (v) => -v * 0.2);
  const yCity = useTransform(scrollY, (v) => -v * 0.3);
  const yWater = useTransform(scrollY, (v) => -v * 0.4);
  const yDesk = useTransform(scrollY, (v) => -v * 0.5);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <Sky />

      <motion.div className="absolute inset-0" style={{ y: yStars }}>
        <StarsLayer />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: yClouds }}>
        <CloudsLayer />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: yMountains }}>
        <MountainsLayer />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: yCity }}>
        <CityLayer />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: yWater }}>
        <WaterLayer />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ y: yDesk }}>
        <DeskLayer />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(14,10,31,0.35)" }}
      />
    </div>
  );
}
