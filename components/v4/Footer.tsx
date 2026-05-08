import {
  IconBrandX,
  IconBrandGithub,
  IconBrandInstagram,
  IconNotebook,
} from "@tabler/icons-react";
import { LINKS } from "@/lib/constants";

const SOCIALS = [
  { Icon: IconBrandX, url: LINKS.x, label: "X" },
  { Icon: IconNotebook, url: LINKS.note, label: "note" },
  { Icon: IconNotebook, url: LINKS.zenn, label: "Zenn" },
  { Icon: IconBrandInstagram, url: LINKS.instagram, label: "Instagram" },
  { Icon: IconBrandGithub, url: LINKS.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer
      className="py-8 text-center font-mono text-xs"
      style={{ color: "var(--text-secondary)" }}
    >
      <p>最近、自分と同じ境遇だった人に情報を届けたい欲があふれてます。</p>
      <p>そこに届けるのが難しいけど、緩く、根気強く、これらで発信し続けます。</p>

      <ul className="mt-4 flex justify-center gap-4">
        {SOCIALS.map(({ Icon, url, label }) => (
          <li key={label}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-block transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--text-secondary)" }}
            >
              <Icon size={16} stroke={1.5} />
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-2">© 2026 syam</p>
    </footer>
  );
}
