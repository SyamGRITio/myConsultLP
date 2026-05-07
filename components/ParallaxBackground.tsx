"use client";

import { motion, useScroll, useTransform } from "framer-motion";

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
            animation: `scene-twinkle ${s.cross ? 4.5 : 3.5}s ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        >
          {s.cross ? (
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path
                d="M4 0 L4 8 M0 4 L8 4 M2 2 L6 6 M6 2 L2 6"
                stroke="#F4F0E0"
                strokeWidth="0.6"
              />
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
    </>
  );
}

function CloudsLayer() {
  return (
    <>
      {[
        { top: "13%", scale: 1, duration: "120s", delay: "0s" },
        { top: "22%", scale: 0.7, duration: "150s", delay: "-40s" },
        { top: "30%", scale: 1.2, duration: "100s", delay: "-80s" },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: c.top,
            left: 0,
            animation: `scene-drift ${c.duration} linear infinite`,
            animationDelay: c.delay,
          }}
        >
          <svg
            width={120 * c.scale}
            height={28 * c.scale}
            viewBox="0 0 120 28"
            style={{ opacity: 0.55 }}
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
      ))}
    </>
  );
}

function MountainsLayer() {
  return (
    <svg
      className="absolute inset-x-0"
      style={{ bottom: "26%" }}
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

function CityLayer() {
  return (
    <>
      <svg
        className="absolute inset-x-0"
        style={{ bottom: "24%" }}
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

      <svg
        className="absolute inset-x-0"
        style={{ bottom: "24%" }}
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        width="100%"
        height="16%"
      >
        <g fill="#1D1133" shapeRendering="crispEdges">
          {FRONT_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={32 - b.h} width={b.w} height={b.h} />
          ))}
        </g>
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
      </svg>
    </>
  );
}

function WaterLayer() {
  return (
    <div
      className="absolute inset-x-0 overflow-hidden"
      style={{ bottom: "6%", height: "20%" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(43,27,94,0.85) 0%, #2B1B5E 40%, #1A1233 100%)",
          animation: "scene-shimmer 5s ease-in-out infinite",
        }}
      />

      <svg
        className="absolute inset-x-0"
        style={{ top: 0, transform: "scaleY(-1)", opacity: 0.3 }}
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        width="100%"
        height="55%"
      >
        <g fill="#1D1133" shapeRendering="crispEdges">
          {FRONT_BUILDINGS.map((b, i) => (
            <rect key={i} x={b.x} y={32 - b.h} width={b.w} height={b.h} />
          ))}
        </g>
      </svg>

      <div className="absolute inset-x-0" style={{ top: "30%" }}>
        {[5, 28, 56, 80].map((left, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${i * 18}%`,
              width: "12%",
              height: 1,
              backgroundColor: `rgba(255,255,255,${0.2 + (i % 3) * 0.1})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DeskLayer() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0"
      viewBox="0 0 200 50"
      preserveAspectRatio="xMidYEnd meet"
      width="100%"
      height="22%"
      shapeRendering="crispEdges"
    >
      <rect x="0" y="32" width="200" height="18" fill="#3D2417" />
      <rect x="0" y="32" width="200" height="1.5" fill="#5A3520" />

      <rect x="58" y="14" width="32" height="18" fill="#7A7580" />
      <rect x="59.5" y="15.5" width="29" height="15" fill="#0A0A0A" />
      <rect x="71" y="32" width="6" height="1.5" fill="#7A7580" />
      <rect x="65" y="33.5" width="18" height="2" fill="#5A5560" />

      <text
        x="61"
        y="22"
        fill="#5BFF5B"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="2.6"
        fontWeight="700"
      >
        C:\&gt; consult --start
      </text>
      <text
        x="61"
        y="26"
        fill="#5BFF5B"
        fontFamily="ui-monospace, SFMono-Regular, monospace"
        fontSize="2.6"
        fontWeight="700"
      >
        ready.
      </text>
      <rect
        x="74"
        y="23.5"
        width="1.6"
        height="2.4"
        fill="#5BFF5B"
        style={{ animation: "scene-blink 1s steps(1) infinite" }}
      />

      <rect x="124" y="22" width="11" height="11" fill="#9C9398" />
      <rect x="122" y="33" width="15" height="2" fill="#7A7580" />
      <rect
        x="135"
        y="24"
        width="2"
        height="5"
        fill="none"
        stroke="#9C9398"
        strokeWidth="0.8"
      />
      <g style={{ animation: "scene-steam 4s ease-out infinite" }}>
        <path
          d="M127 22 Q125 18 128 14 Q130 10 127 6"
          stroke="#F4F0E0"
          strokeWidth="0.6"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M132 22 Q134 18 131 14 Q129 10 132 6"
          stroke="#F4F0E0"
          strokeWidth="0.6"
          fill="none"
          opacity="0.6"
        />
      </g>

      <rect x="96" y="28" width="20" height="2.5" fill="#3D5A47" />
      <rect x="98" y="25.5" width="18" height="2.5" fill="#5A8067" />
      <rect x="94" y="23" width="22" height="2.5" fill="#3D5A47" />

      <rect x="146" y="24" width="9" height="9" fill="#A0593E" />
      <rect x="146" y="24" width="9" height="1.5" fill="#7E4530" />
      <path
        d="M148 24 L150 18 L152 16 L153.5 18 L155 24 Z"
        fill="#4A7C59"
      />
      <rect x="149" y="13" width="1.4" height="4" fill="#4A7C59" />
      <rect x="152" y="14.5" width="1.4" height="3.5" fill="#4A7C59" />
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #1B1240 0%, #2B1B5E 15%, #4B2E83 35%, #B83A8A 55%, #E94B8B 65%, #F4A26B 75%, #2B1B5E 95%, #0E0A1F 100%)",
        }}
      />

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
