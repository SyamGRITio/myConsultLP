"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

type Keyword = {
  word: string;
  desc: string;
  hint?: string;
};

const KEYWORDS: Keyword[] = [
  {
    word: "参考資料",
    desc: "4年前の自分に渡したかった3点セット",
    hint: "PDF・記事リンクをその場で送ります",
  },
  {
    word: "無料相談",
    desc: "30〜60分の無料相談（オンライン）",
    hint: "日程はLINEで調整しましょう",
  },
  {
    word: "ぼやき",
    desc: "気軽に愚痴・質問・雑談",
    hint: "対面での無料相談・飲み会もこちらでOK",
  },
];

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
        <p>
          LINEを友だち追加したら、下の3つから合うキーワードを返信してください。
        </p>
        <p>用途で受け取り方を分けてます。</p>
      </div>

      <ul className="mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
        {KEYWORDS.map(({ word, desc, hint }) => (
          <li
            key={word}
            className="flex flex-col rounded-lg border p-5"
            style={{
              borderColor: "var(--bg-tertiary)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <span
              className="inline-block self-start rounded border px-2 py-0.5 font-pixel text-xs tracking-widest"
              style={{
                borderColor: "var(--accent)",
                color: "var(--accent)",
                backgroundColor: "var(--accent-tint)",
              }}
            >
              「{word}」
            </span>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--text-headline)" }}
            >
              {desc}
            </p>
            {hint ? (
              <p
                className="mt-2 text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {hint}
              </p>
            ) : null}
          </li>
        ))}
      </ul>

      <div
        className="mt-10 max-w-2xl space-y-4 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        <p>
          オンラインで話したい人はLINEで、対面希望なら山手線の駅をひとつ教えてくれれば、近くのカフェをこちらで選びます。
        </p>
        <p>XのDMでも全然OKです。何でもいいので気軽にどうぞ。</p>
        <p style={{ color: "var(--accent)" }}>ラフでいきましょう。</p>
      </div>
    </motion.section>
  );
}
