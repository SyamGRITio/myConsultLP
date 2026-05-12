"use client";

import {
  IconBrandX,
  IconBrandGithub,
  IconBrandInstagram,
  IconBookmark,
  IconPencil,
} from "@tabler/icons-react";
import { LINKS } from "@/lib/constants";

const SOCIALS = [
  {
    Icon: IconBrandX,
    url: LINKS.x,
    label: "X",
    desc: "アウトプット全般 / 告知",
  },
  {
    Icon: IconBookmark,
    url: LINKS.note,
    label: "note",
    desc: "キャリア / 生活",
  },
  {
    Icon: IconPencil,
    url: LINKS.zenn,
    label: "Zenn",
    desc: "技術発信",
  },
  {
    Icon: IconBrandInstagram,
    url: LINKS.instagram,
    label: "Instagram",
    desc: "作ってみただけ、未定",
  },
  {
    Icon: IconBrandGithub,
    url: LINKS.github,
    label: "GitHub",
    desc: "公開リポジトリ / ポートフォリオ",
  },
];

export function Footer() {
  return (
    <footer
      className="pb-12 pt-24 text-center font-mono"
      style={{ color: "var(--text-secondary)" }}
    >
      <div className="mx-auto max-w-3xl space-y-2 text-sm leading-relaxed md:text-base">
        <p style={{ color: "var(--text-primary)" }}>
          最近、自分と同じ境遇だった人に情報を届けたい欲があふれてます。
        </p>
        <p style={{ color: "var(--text-primary)" }}>
          そこに届けるのが難しいけど、緩く、根気強く、これらで発信し続けます。
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {SOCIALS.map(({ Icon, url, label, desc }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} — ${desc}`}
              className="group flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "var(--bg-tertiary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--accent-tint)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--bg-tertiary)";
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }}
            >
              <Icon size={22} stroke={1.75} className="shrink-0" />
              <div className="flex min-w-0 flex-col leading-tight">
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text-headline)" }}
                >
                  {label}
                </span>
                <span
                  className="mt-0.5 font-pixel text-xs tracking-wider"
                  style={{ color: "var(--accent)" }}
                >
                  【{desc}】
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs">© 2026 syam</p>
    </footer>
  );
}
