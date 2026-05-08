"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const STATS = [
  { num: "+100万", label: "毎年" },
  { num: "300万", label: "借金完済" },
  { num: "30個", label: "取得した資格" },
];

export function About() {
  return (
    <motion.section
      id="about"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeading num="01" label="私について" />

      <div className="grid gap-12 md:grid-cols-3">
        <div
          className="space-y-4 leading-relaxed md:col-span-2"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            <span
              className="font-bold"
              style={{ color: "var(--text-headline)" }}
            >
              月給14万から、毎年100万ずつ上げてきて、今は月単価101万＋α。
            </span>
          </p>
          <p>
            Xには化け物みたいな人がいて、自分は最小限の努力でここまで来ました。たぶん、再現性あります。
          </p>
          <p>
            「時代が変わりつつあるから無理」という言い訳はあります。でも今、AIが使えるなら、むしろもっと早く、もっと楽にここまで来られます。
          </p>
        </div>

        <div className="md:col-span-1">
          <div className="group relative mx-auto aspect-square max-w-[300px]">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg border-2 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"
              style={{ borderColor: "var(--accent)" }}
            />
            <div
              className="relative h-full w-full overflow-hidden rounded-lg"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(244,162,107,0.25), rgba(233,75,139,0.25))",
              }}
            >
              <Image
                src="/avatar.png"
                alt="syam"
                fill
                sizes="(min-width: 768px) 300px, 80vw"
                className="object-contain transition-transform group-hover:scale-105"
                style={{ imageRendering: "pixelated" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="border-l-2 pl-4"
            style={{ borderColor: "var(--accent)" }}
          >
            <div
              className="font-pixel text-3xl"
              style={{ color: "var(--text-headline)" }}
            >
              {s.num}
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
