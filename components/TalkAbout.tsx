"use client";

import { Section } from "./Section";

const topics = [
  "仕事の立ち回り（先回りの動き方）",
  "今の時代の技術力のつけ方",
  "AIを活用して成り上がる方法",
  "単価の上げ方",
  "キャリアの棚卸し",
  "お金まわりの整え方（フリーランス前夜・副業・法人化・資産運用）",
];

export function TalkAbout() {
  return (
    <Section id="talk-about">
      <h2 className="text-2xl font-bold sm:text-3xl">気軽に話せること</h2>

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

      <p
        className="mt-8 text-base leading-relaxed"
        style={{ color: "var(--text)" }}
      >
        とにかく、一緒に頑張りましょう。
      </p>
    </Section>
  );
}
