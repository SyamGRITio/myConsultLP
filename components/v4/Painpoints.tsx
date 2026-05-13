"use client";

import { motion } from "framer-motion";

const QUESTIONS = [
  { num: "01", text: "運用保守・インフラ・オペレーターで、年収が止まっている" },
  { num: "02", text: "SES／SIerで、指示待ちの毎日が続いている" },
  { num: "03", text: "AIに乗りたいけど、何から触ればいいか分からない" },
  { num: "04", text: "フリーランスに興味はあるけど、勇気が出ない" },
  { num: "05", text: "{{ ペインポイント05 コピー未定 }}" },
  { num: "06", text: "{{ ペインポイント06 コピー未定 }}" },
];

export function Painpoints() {
  return (
    <motion.section
      id="painpoints"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div
        className="rounded-lg border-2 p-8 md:p-12"
        style={{ borderColor: "var(--accent)" }}
      >
        <h2
          className="mb-10 text-2xl font-bold md:text-3xl"
          style={{ color: "var(--text-headline)" }}
        >
          こんな問いを、抱えてませんか
        </h2>

        <ul className="grid gap-4 md:grid-cols-2">
          {QUESTIONS.map((q) => (
            <li
              key={q.num}
              className="rounded-lg border p-5 leading-relaxed"
              style={{
                borderColor: "var(--bg-tertiary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-headline)",
              }}
            >
              <span
                className="mr-2 font-mono text-sm"
                style={{ color: "var(--accent)" }}
              >
                {q.num}
              </span>
              {q.text}
            </li>
          ))}
        </ul>

        <p
          className="mt-8 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          全部、経験してきました。分かります。
        </p>
      </div>
    </motion.section>
  );
}
