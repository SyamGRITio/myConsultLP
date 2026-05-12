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
  { Icon: IconBrandX, url: LINKS.x, label: "X", handle: "@syam_nihick" },
  { Icon: IconBookmark, url: LINKS.note, label: "note", handle: "@syam_grit" },
  { Icon: IconPencil, url: LINKS.zenn, label: "Zenn", handle: "@syam_nihick" },
  {
    Icon: IconBrandInstagram,
    url: LINKS.instagram,
    label: "Instagram",
    handle: "@syam_gritio",
  },
  {
    Icon: IconBrandGithub,
    url: LINKS.github,
    label: "GitHub",
    handle: "SyamGRITio",
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

      <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 px-4 sm:grid-cols-3 md:grid-cols-5">
        {SOCIALS.map(({ Icon, url, label, handle }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} ${handle}`}
              className="group flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left transition-all hover:-translate-y-0.5"
              style={{
                borderColor: "var(--bg-tertiary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.backgroundColor = "var(--accent-tint)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--bg-tertiary)";
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }}
            >
              <Icon size={20} stroke={1.75} className="shrink-0" />
              <div className="flex flex-col leading-tight">
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text-headline)" }}
                >
                  {label}
                </span>
                <span className="text-xs opacity-80">{handle}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-xs">© 2026 syam</p>
    </footer>
  );
}
