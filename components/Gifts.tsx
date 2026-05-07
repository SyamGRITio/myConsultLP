"use client";

import Link from "next/link";
import {
  IconFileText,
  IconWorld,
  IconBooks,
  IconBrandX,
  IconBrandLine,
} from "@tabler/icons-react";
import { Section } from "./Section";
import { LINKS, withUtm } from "@/lib/constants";

const gifts = [
  {
    icon: IconFileText,
    title: "実務で効くAzure 7選（PDF）",
  },
  {
    icon: IconWorld,
    title: "BtoB大企業のAzure / 業務AI構築ガイド",
  },
  {
    icon: IconBooks,
    title: "転職1年目に教えてほしかったキャッチアップサイト集",
  },
];

export function Gifts() {
  return (
    <Section id="gifts">
      <h2 className="text-2xl font-bold sm:text-3xl">
        ここまで読んでくれて、ありがとうございます
      </h2>
      <h3
        className="mt-4 text-lg sm:text-xl"
        style={{ color: "var(--text-secondary)" }}
      >
        持ち帰り方は、3ステップ
      </h3>

      <div className="mt-10 space-y-4">
        {gifts.map(({ icon: Icon, title }) => (
          <div
            key={title}
            className="flex items-start gap-4 rounded-lg border p-5"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <Icon
              size={28}
              stroke={1.5}
              className="mt-1 shrink-0"
              style={{ color: "var(--accent-orange)" }}
            />
            <p className="font-bold" style={{ color: "var(--text)" }}>
              {title}
            </p>
          </div>
        ))}
      </div>

      <ol className="mt-10 space-y-3">
        {[
          "LINEを友だち追加",
          "「資料ください」と送信",
          "その場でPDF・記事リンクが届きます",
        ].map((step, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm sm:text-base"
            style={{ color: "var(--text)" }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
              style={{
                backgroundColor: "var(--accent-orange)",
                color: "var(--bg)",
              }}
            >
              {i + 1}
            </span>
            <span className="pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <Link
          href={withUtm(LINKS.line, "gifts", "cta")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: "#F4A26B",
            color: "#0E0A1F",
            boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.5)",
          }}
        >
          <IconBrandLine size={20} stroke={2} />
          LINEを友だち追加して資料を受け取る
        </Link>
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Xで繋がってくれたら嬉しいです。仲良くしましょう。
        </p>
        <Link
          href={withUtm(LINKS.x, "gifts", "social")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-transform hover:scale-[1.02]"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          <IconBrandX size={16} stroke={1.5} />
          @syam_nihick
        </Link>
      </div>
    </Section>
  );
}
