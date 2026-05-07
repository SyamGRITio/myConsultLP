"use client";

import Link from "next/link";
import { IconFileText, IconWorld, IconBooks, IconBrandX } from "@tabler/icons-react";
import { Section } from "./Section";
import { LINKS, withUtm } from "@/lib/constants";

const gifts = [
  {
    icon: IconFileText,
    title: "実務で効くAzure 7選（PDF）",
    href: LINKS.azurePdf,
    label: "PDFをダウンロード",
  },
  {
    icon: IconWorld,
    title: "BtoB大企業のAzure / 業務AI構築ガイド",
    href: LINKS.azureGuide,
    label: "サイトを見る",
  },
  {
    icon: IconBooks,
    title: "転職1年目に教えてほしかったキャッチアップサイト集",
    href: LINKS.notionCatchup,
    label: "Notionを開く",
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
        {gifts.map(({ icon: Icon, title, href, label }) => (
          <Link
            key={title}
            href={withUtm(href, "gifts", "gift")}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 rounded-lg border p-5 transition-colors"
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
            <div className="flex-1">
              <p className="font-bold" style={{ color: "var(--text)" }}>
                {title}
              </p>
              <p
                className="mt-1 text-sm transition-colors group-hover:opacity-80"
                style={{ color: "var(--accent-orange)" }}
              >
                {label} →
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          読んだ代わりに、Xで繋がってくれたら嬉しいです。仲良くしましょう。
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
