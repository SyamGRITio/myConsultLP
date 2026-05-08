import {
  IconBrandX,
  IconBrandGithub,
  IconBrandInstagram,
  IconBookmark,
  IconPencil,
} from "@tabler/icons-react";
import { LINKS } from "@/lib/constants";

const SOCIALS = [
  { label: "X", Icon: IconBrandX, url: LINKS.x },
  { label: "GitHub", Icon: IconBrandGithub, url: LINKS.github },
  { label: "Instagram", Icon: IconBrandInstagram, url: LINKS.instagram },
  { label: "note", Icon: IconBookmark, url: LINKS.note },
  { label: "Zenn", Icon: IconPencil, url: LINKS.zenn },
];

export function SocialLinks() {
  return (
    <ul className="flex list-none flex-col gap-3">
      {SOCIALS.map(({ Icon, url, label }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 font-mono text-sm transition-all hover:-translate-y-1"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Icon size={16} stroke={1.5} />
            <span>{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
