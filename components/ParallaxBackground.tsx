"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { PixelSky } from "./pixel/PixelSky";
import { PixelClouds } from "./pixel/PixelClouds";
import { PixelStars } from "./pixel/PixelStars";
import { PixelMountains } from "./pixel/PixelMountains";
import { PixelCity } from "./pixel/PixelCity";
import { PixelWater } from "./pixel/PixelWater";
import { PixelDesk } from "./pixel/PixelDesk";

export function ParallaxBackground() {
  const { scrollY } = useScroll();
  const yStars = useTransform(scrollY, [0, 3000], [0, -150]);
  const yClouds = useTransform(scrollY, [0, 3000], [0, -300]);
  const yMountains = useTransform(scrollY, [0, 3000], [0, -450]);
  const yCity = useTransform(scrollY, [0, 3000], [0, -600]);
  const yWater = useTransform(scrollY, [0, 3000], [0, -750]);
  const yDesk = useTransform(scrollY, [0, 3000], [0, -900]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <PixelSky />
      <motion.div style={{ y: yStars }} className="absolute inset-0">
        <PixelStars />
      </motion.div>
      <motion.div style={{ y: yClouds }} className="absolute inset-0">
        <PixelClouds />
      </motion.div>
      <motion.div style={{ y: yMountains }} className="absolute inset-0">
        <PixelMountains />
      </motion.div>
      <motion.div style={{ y: yCity }} className="absolute inset-0">
        <PixelCity />
      </motion.div>
      <motion.div style={{ y: yWater }} className="absolute inset-0">
        <PixelWater />
      </motion.div>
      <motion.div style={{ y: yDesk }} className="absolute inset-0">
        <PixelDesk />
      </motion.div>
      <div className="absolute inset-0 bg-[rgba(14,10,31,0.35)]" />
    </div>
  );
}
