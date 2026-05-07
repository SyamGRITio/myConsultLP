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
        良かったら、持って帰ってください
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

      <p
        className="mt-10 text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        LINEに登録して「資料ください」と一言もらえたら、その場で送ります。押し付けはしません。
      </p>

      <div className="mt-6">
        <Link
          href={withUtm(LINKS.line, "gifts", "cta")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-bold transition-transform hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--accent-orange)",
            color: "var(--bg)",
            boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.4)",
          }}
        >
          <IconBrandLine size={20} stroke={2} />
          LINEに登録する
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
