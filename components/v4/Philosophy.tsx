"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

type Tab = {
  num: string;
  title: string;
  body: string[];
};

const TABS: Tab[] = [
  {
    num: "01",
    title: "お金は、動いている方に流れる",
    body: [
      "技術だけ磨いても年収は上がらない。お金がどこに動いていて、自分の何を乗せれば届くのか。",
      "インフレが進む時代に、自分の付加価値に目を向けないのは、本当にもったいない。",
    ],
  },
  {
    num: "02",
    title: "楽して稼ぐための、努力をする",
    body: [
      "楽したいから努力しない、じゃない。楽したいから、努力する。",
      "広く浅く全部追いかけるより、お金が動く方向に狭く深くベットした方が、結果的に最小の努力で大きく届く。",
      "「才能でしょ？」で済ませない。再現できます。",
    ],
  },
  {
    num: "03",
    title: "立ち回り方ひとつで、付加価値は上がる",
    body: [
      "立ち回り方を意識したら、やることが少ない現場でも重宝されたり、伝え方を少し変えれば、自分の触りたい技術領域を任されたりします。現場が回りやすい動き方をすれば、付加価値は自然に上がる。",
      "Excel も GitHub も PowerShell もコマンドも、何も分からなかった未経験の自分でも、単価は跳ねました。手を動かし続ければ、想像より早くその未来は来ます。",
    ],
  },
];

export function Philosophy() {
  const [active, setActive] = useState(0);

  return (
    <motion.section
      id="philosophy"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeading num="02" label="3つだけ、信じていること" />

      <div className="flex max-w-4xl flex-col gap-6 md:flex-row">
        <ul className="flex list-none overflow-x-auto md:flex-col md:overflow-visible">
          {TABS.map((tab, i) => {
            const isActive = i === active;
            return (
              <li key={tab.num}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="whitespace-nowrap px-5 py-3 text-left font-mono text-sm transition-colors"
                  style={{
                    borderBottomWidth: 2,
                    borderColor: isActive
                      ? "var(--accent)"
                      : "var(--bg-tertiary)",
                    color: isActive
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                    backgroundColor: isActive
                      ? "var(--accent-tint)"
                      : "transparent",
                  }}
                >
                  <span className="font-pixel text-base">{tab.num}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div
          className="flex-1 space-y-4 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--text-headline)" }}
          >
            {TABS[active].title}
          </h3>
          <div className="space-y-3">
            {TABS[active].body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
