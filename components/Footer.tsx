import Link from "next/link";
import {
  IconBrandX,
  IconNotebook,
  IconBrandInstagram,
  IconBrandGithub,
} from "@tabler/icons-react";
import { LINKS } from "@/lib/constants";

const socials = [
  { icon: IconBrandX, label: "X", href: LINKS.x },
  { icon: IconNotebook, label: "note", href: LINKS.note },
  { icon: IconNotebook, label: "Zenn", href: LINKS.zenn },
  { icon: IconBrandInstagram, label: "Instagram", href: LINKS.instagram },
  { icon: IconBrandGithub, label: "GitHub", href: LINKS.github },
];

export function Footer() {
  return (
    <footer
      className="w-full border-t px-6 py-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          ここで発信し続けてます。LP閉じても、また会いましょう。
        </p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {socials.map(({ icon: Icon, label, href }) => (
            <li key={label}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
                style={{ color: "var(--text-secondary)" }}
              >
                <Icon size={16} stroke={1.5} />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <p
          className="mt-10 text-xs"
          style={{ color: "var(--text-secondary)" }}
        >
          © 2026 syam
        </p>
      </div>
    </footer>
  );
}
