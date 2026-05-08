import {
  IconBrandX,
  IconBrandGithub,
  IconBrandInstagram,
  IconNotebook,
} from "@tabler/icons-react";
import { LINKS } from "@/lib/constants";

const SOCIALS = [
  { Icon: IconBrandX, url: LINKS.x, label: "X" },
  { Icon: IconBrandGithub, url: LINKS.github, label: "GitHub" },
  { Icon: IconBrandInstagram, url: LINKS.instagram, label: "Instagram" },
  { Icon: IconNotebook, url: LINKS.note, label: "note" },
];

export function SocialLinks() {
  return (
    <ul className="flex list-none flex-col gap-5">
      {SOCIALS.map(({ Icon, url, label }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-block transition-all hover:-translate-y-1"
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Icon size={20} stroke={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}
