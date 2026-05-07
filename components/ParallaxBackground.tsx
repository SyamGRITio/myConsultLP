"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const yCity = useTransform(scrollY, (v) => -v * 0.3);
  const yDesk = useTransform(scrollY, (v) => -v * 0.5);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#0E0A1F" }}
      />

      <motion.div className="absolute inset-0" style={{ y: yCity }}>
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

      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: "30%", y: yDesk }}
      >
        <Image
          src="/pixel-desk.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(14,10,31,0.3)" }}
      />
    </div>
  );
}
