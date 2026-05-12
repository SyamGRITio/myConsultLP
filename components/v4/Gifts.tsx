"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconFileText,
  IconWorld,
  IconBooks,
  IconBrandLine,
  IconBrandX,
} from "@tabler/icons-react";
import { LINKS, withUtm } from "@/lib/constants";
import { SectionHeading } from "./SectionHeading";

const GIFTS = [
  {
    Icon: IconFileText,
    title: "実務で効くAzure 7選（PDF）",
    desc: "現場で本当に使う7つを、図解とコマンド込みでまとめた配布資料。",
  },
  {
    Icon: IconWorld,
    title: "BtoB大企業のAzure / 業務AI構築ガイド",
    desc: "大企業向けにAzureを導入・運用してきた経験から、業務AIの組み立てまで。",
  },
  {
    Icon: IconBooks,
    title: "転職1年目に教えてほしかったキャッチアップサイト集",
    desc: "未経験からインフラ・クラウドに入った時、最短で立ち上がれる学習リンク集。",
  },
];

export function Gifts() {
  return (
    <motion.section
      id="gifts"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeading num="04" label="あの頃の自分に、渡したかったもの" />

      <div
        className="mb-10 max-w-2xl space-y-2 leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        <p>
          4年前の自分に渡したかった3つを、ここに置きます。無料プレゼントってやつです(笑)
        </p>
        <p>重ければスルーで、ピンと来たらだけ持っていってください。</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {GIFTS.map(({ Icon, title, desc }) => (
          <article
            key={title}
            className="rounded-md p-6 transition-all hover:-translate-y-2"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--bg-tertiary)",
            }}
          >
            <Icon
              size={32}
              stroke={1.5}
              style={{ color: "var(--accent)" }}
            />
            <h3
              className="mt-5 text-lg font-bold"
              style={{ color: "var(--text-headline)" }}
            >
              {title}
            </h3>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {desc}
            </p>
          </article>
        ))}
      </div>

      <div
        className="mt-12 rounded-md p-6"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--bg-tertiary)",
        }}
      >
        <p
          className="text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          持ち帰り方は、3ステップ
        </p>
        <ol className="mt-4 space-y-2 text-sm">
          {[
            "LINEを友だち追加",
            "「資料ください」と送信",
            "その場でPDF・記事リンクが届きます",
          ].map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: "var(--text-primary)" }}
            >
              <span
                className="font-mono"
                style={{ color: "var(--accent)" }}
              >
                {i + 1}.
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href={withUtm(LINKS.line, "gifts", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border px-6 py-3 font-mono text-sm transition-colors"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-tint)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <IconBrandLine size={18} stroke={2} />
            LINEを友だち追加して資料を受け取る
          </Link>
          <Link
            href={withUtm(LINKS.x, "gifts", "dm")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-sm transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--text-secondary)" }}
          >
            <IconBrandX size={16} stroke={1.5} />
            XのDMでも気軽に
          </Link>
        </div>

        <p
          className="mt-4 text-xs leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          LINEが嫌な方は、XのDMでも気軽にどうぞ。資料も相談も、なんでも受け付けてます。
        </p>
      </div>
    </motion.section>
  );
}
