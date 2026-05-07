"use client";

import { Section } from "./Section";

export function Flow() {
  return (
    <Section id="flow">
      <h2 className="text-2xl font-bold sm:text-3xl">話す前に、これだけ</h2>

      <div
        className="mt-8 space-y-4 text-base leading-relaxed"
        style={{ color: "var(--text)" }}
      >
        <p>LINEに登録して、話したいタイミングで一言ください。</p>
        <p>
          オンラインで話したい人はLINEで、対面希望なら山手線の駅をひとつ教えてくれれば、近くのカフェをこちらで選びます。
        </p>
        <p className="pt-4" style={{ color: "var(--accent-orange)" }}>
          ラフでいきましょう。
        </p>
      </div>
    </Section>
  );
}
