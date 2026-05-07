"use client";

import { Section } from "./Section";

const beliefs = [
  {
    num: "01",
    title: "お金は、動いている方に流れる",
    body: [
      "技術だけ磨いても年収は上がらない。",
      "お金がどこに動いていて、自分の何を乗せれば届くのか。",
      "インフレが進む時代に、自分の付加価値に目を向けないのは、本当にもったいない。",
    ],
  },
  {
    num: "02",
    title: "楽して稼ぐための、努力をする",
    body: [
      "楽したいから努力しない、じゃない。楽したいから、努力する。",
      "最低限の努力で這い上がる方法を、ずっと探してきました。",
      "「才能でしょ？」で済ませない。再現できます。",
    ],
  },
  {
    num: "03",
    title: "駆け出しでも、理解すれば付加価値は上がる",
    body: [
      "AD、Azure、運用設計。誰もが避けるニッチを掴んだら、未経験でも単価は跳ねました。",
      "手を動かし続ければ、想像より早く来ます。",
    ],
  },
];

const outcomes = [
  "キャリアの霧が、ちょっと晴れる",
  "次の3年で何をすべきか、輪郭が見える",
  "自分の付加価値の置き場所が、仮説レベルで見える",
];

export function Philosophy() {
  return (
    <Section id="philosophy">
      <h2 className="text-2xl font-bold sm:text-3xl">3つだけ、信じていること</h2>

      <div className="mt-12 space-y-10">
        {beliefs.map((b) => (
          <div key={b.num} className="border-l-2 pl-6" style={{ borderColor: "var(--accent-orange)" }}>
            <div
              className="font-mono text-sm"
              style={{ color: "var(--accent-orange)" }}
            >
              {b.num}
            </div>
            <h3 className="mt-2 text-lg font-bold sm:text-xl" style={{ color: "var(--text)" }}>
              {b.title}
            </h3>
            <div
              className="mt-3 space-y-2 text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--text)" }}
            >
              {b.body.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          私と話すと、たぶんこうなります
        </p>
        <ul className="mt-4 space-y-2">
          {outcomes.map((o, i) => (
            <li
              key={i}
              className="text-sm sm:text-base"
              style={{ color: "var(--text)" }}
            >
              <span style={{ color: "var(--accent-orange)" }}>—</span> {o}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
