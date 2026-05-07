"use client";

import { Section } from "./Section";

const topics = [
  "キャリアの棚卸し",
  "Azure × 単価アップ",
  "運用保守からの抜け道",
  "フリーランス前夜の準備",
  "お金に強いエンジニアになる方法",
  "副業・法人化・資産運用",
];

export function TalkAbout() {
  return (
    <Section id="talk-about">
      <h2 className="text-2xl font-bold sm:text-3xl">話せそうなこと</h2>

      <div className="mt-8 flex flex-wrap gap-3">
        {topics.map((t) => (
          <span
            key={t}
            className="rounded-full border px-4 py-2 text-sm"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--card)",
              color: "var(--text)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </Section>
  );
}
