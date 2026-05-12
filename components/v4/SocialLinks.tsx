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
    label: "X",
    Icon: IconBrandX,
    url: LINKS.x,
    desc: "アウトプット全般 / 告知",
  },
  {
    label: "GitHub",
    Icon: IconBrandGithub,
    url: LINKS.github,
    desc: "公開リポジトリ / ポートフォリオ",
  },
  {
    label: "Instagram",
    Icon: IconBrandInstagram,
    url: LINKS.instagram,
    desc: "作ってみただけ、未定",
  },
  {
    label: "note",
    Icon: IconBookmark,
    url: LINKS.note,
    desc: "キャリア / 生活",
  },
  { label: "Zenn", Icon: IconPencil, url: LINKS.zenn, desc: "技術発信" },
];

export function SocialLinks() {
  return (
    <ul className="flex list-none flex-col gap-3">
      {SOCIALS.map(({ Icon, url, label, desc }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-0.5 font-mono transition-all hover:-translate-y-0.5"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <span className="flex items-center gap-2 text-sm">
              <Icon size={16} stroke={1.5} />
              <span>{label}</span>
            </span>
            <span
              className="font-pixel text-[11px] leading-tight tracking-wider"
              style={{ color: "var(--accent)", opacity: 0.8 }}
            >
              【{desc}】
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
