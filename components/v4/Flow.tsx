"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

export function Flow() {
  return (
    <motion.section
      id="flow"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeading num="06" label="話す前に" />

      <div
        className="max-w-2xl space-y-4 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        <p>LINEに登録して、話したいタイミングで一言ください。</p>
        <p>
          オンラインで話したい人はLINEで、対面希望なら山手線の駅をひとつ教えてくれれば、近くのカフェをこちらで選びます。
        </p>
        <p>XのDMでも全然OKです。何でもいいので気軽にどうぞ。</p>
        <p style={{ color: "var(--accent)" }}>ラフでいきましょう。</p>
      </div>
    </motion.section>
  );
}
