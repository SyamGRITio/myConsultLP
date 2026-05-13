"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const TOPICS = [
  "仕事の立ち回り（先回りの動き方）",
  "今の時代の技術力のつけ方",
  "AIを活用して成り上がる方法",
  "単価の上げ方",
  "キャリアの棚卸し",
  "お金まわりの整え方（フリーランス前夜・副業・法人化・資産運用）",
];

export function TalkAbout() {
  return (
    <motion.section
      id="talk-about"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeading num="05" label="気軽に話せること" />

      <ul className="grid gap-3 sm:grid-cols-2">
        {TOPICS.map((topic) => (
          <li
            key={topic}
            className="flex items-start gap-3 leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            <span
              aria-hidden
              className="shrink-0 font-mono text-base leading-relaxed"
              style={{ color: "var(--accent)" }}
            >
              ▹
            </span>
            <span>{topic}</span>
          </li>
        ))}
      </ul>

      <p
        className="mt-10 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        とにかく、一緒に頑張りましょう。
      </p>
    </motion.section>
  );
}
