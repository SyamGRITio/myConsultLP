"use client";

import { Section } from "./Section";

const stats = [
  { value: "+100万", label: "毎年" },
  { value: "300万", label: "借金完済" },
  { value: "30個", label: "取得した資格" },
];

export function About() {
  return (
    <Section id="about">
      <h2 className="text-2xl font-bold leading-snug sm:text-3xl">
        月給14万から、毎年100万ずつ上げてきて、今は月単価101万＋α
      </h2>

      <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border px-3 py-6 text-center"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="font-mono text-xl font-bold sm:text-3xl"
              style={{ color: "var(--accent-orange)" }}
            >
              {s.value}
            </div>
            <div
              className="mt-2 text-xs sm:text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-10 space-y-4 text-base leading-relaxed"
        style={{ color: "var(--text)" }}
      >
        <p>
          Xには化け物みたいな人がいて、自分は最小限の努力でここまで来ました。
        </p>
        <p>たぶん、再現性あります。</p>
      </div>

      <div
        className="mt-8 space-y-4 text-sm leading-relaxed sm:text-base"
        style={{ color: "var(--text-secondary)" }}
      >
        <p>「時代が変わりつつあるから無理」という言い訳はあります。</p>
        <p>
          でも今、AIが使えるなら、むしろもっと早く、もっと楽にここまで来られます。
        </p>
      </div>
    </Section>
  );
}
