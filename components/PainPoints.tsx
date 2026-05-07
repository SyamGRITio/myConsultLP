"use client";

import { Section } from "./Section";

const points = [
  "運用保守・インフラ・オペレーターで、年収が止まっている",
  "SES／SIerで、指示待ちの毎日が続いている",
  "AIに乗りたいけど、何から触ればいいか分からない",
  "フリーランスに興味はあるけど、勇気が出ない",
];

export function PainPoints() {
  return (
    <Section id="pain-points">
      <h2 className="text-2xl font-bold sm:text-3xl">
        こんな問いを、抱えてませんか
      </h2>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {points.map((p, i) => (
          <li
            key={i}
            className="rounded-lg border p-5 text-sm leading-relaxed sm:text-base"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <span
              className="mr-2 font-mono text-xs"
              style={{ color: "var(--accent-orange)" }}
            >
              0{i + 1}
            </span>
            {p}
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm" style={{ color: "var(--text-secondary)" }}>
        全部、経験してきました。分かります。
      </p>
    </Section>
  );
}
