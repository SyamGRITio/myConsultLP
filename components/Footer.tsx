"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 py-12"
    >
      <div className="card-pixel mx-auto max-w-3xl sm:p-10">
        <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          <p>最近、自分と同じ境遇だった人に情報を届けたい欲があふれてます。</p>
          <p>そこに届けるのが難しいけど、緩く、根気強く、これらで発信し続けます。</p>
        </div>

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
    </motion.footer>
  );
}
