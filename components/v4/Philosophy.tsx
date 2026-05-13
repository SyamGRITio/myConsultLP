"use client";

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

      <div className="grid max-w-5xl gap-6 md:grid-cols-3">
        {TABS.map((tab) => (
          <article
            key={tab.num}
            className="flex flex-col rounded-lg border p-6"
            style={{
              borderColor: "var(--bg-tertiary)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <span
              className="font-pixel text-2xl"
              style={{ color: "var(--accent)" }}
            >
              {tab.num}
            </span>
            <h3
              className="mb-4 mt-2 text-lg font-bold leading-snug"
              style={{ color: "var(--text-headline)" }}
            >
              {tab.title}
            </h3>
            <div
              className="space-y-3 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {tab.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
