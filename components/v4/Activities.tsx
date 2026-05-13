"use client";

import { motion } from "framer-motion";
import {
  IconMessageCircle,
  IconUsersGroup,
  IconPresentationAnalytics,
  IconCompass,
} from "@tabler/icons-react";
import { SectionHeading } from "./SectionHeading";

type Activity = {
  Icon: typeof IconMessageCircle;
  title: string;
  desc: string;
};

const ACTIVITIES: Activity[] = [
  {
    Icon: IconMessageCircle,
    title: "1on1相談",
    desc: "{{ 1on1相談コピー未定 — どんな相談を受けるか、頻度、費用感など }}",
  },
  {
    Icon: IconUsersGroup,
    title: "勉強会",
    desc: "{{ 勉強会コピー未定 — テーマ、頻度、参加方法など }}",
  },
  {
    Icon: IconPresentationAnalytics,
    title: "LT会",
    desc: "{{ LT会コピー未定 — どんな話を共有する場か、発表側/聴く側どちらでも参加OK等 }}",
  },
  {
    Icon: IconCompass,
    title: "作戦会議",
    desc: "{{ 作戦会議コピー未定 — キャリア戦略を一緒に練る場、参加形態など }}",
  },
];

export function Activities() {
  return (
    <motion.section
      id="activities"
      className="py-32"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <SectionHeading num="05" label="活動 / これからやりたいこと" />

      <p
        className="mb-10 max-w-2xl leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {"{{ セクション導入コピー未定 — 仲間募集の文脈、参加ハードルの低さ、無料/有料の方針など }}"}
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {ACTIVITIES.map(({ Icon, title, desc }) => (
          <article
            key={title}
            className="rounded-lg border p-6 transition-all hover:-translate-y-1"
            style={{
              borderColor: "var(--bg-tertiary)",
              backgroundColor: "var(--bg-secondary)",
            }}
          >
            <div className="flex items-center gap-3">
              <Icon
                size={28}
                stroke={1.5}
                style={{ color: "var(--accent)" }}
              />
              <h3
                className="text-lg font-bold"
                style={{ color: "var(--text-headline)" }}
              >
                {title}
              </h3>
            </div>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {desc}
            </p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
