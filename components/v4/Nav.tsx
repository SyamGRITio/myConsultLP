"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LINKS } from "@/lib/constants";

const NAV_ITEMS = [
  { num: "01", label: "私について", href: "#about" },
  { num: "02", label: "思想", href: "#philosophy" },
  { num: "03", label: "ツイート", href: "#tweets" },
  { num: "04", label: "プレゼント", href: "#gifts" },
  { num: "05", label: "連絡", href: "#contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > 100 && y > lastY);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 transition-all duration-300 sm:px-12 md:px-16 lg:px-24 ${
        scrolled
          ? "h-[70px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]"
          : "h-[100px]"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      style={{
        backgroundColor: scrolled ? "rgba(14,10,31,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <Link
        href="/"
        aria-label="Home"
        className="block transition-opacity hover:opacity-80"
      >
        <Image
          src="/avatar.png"
          alt="syam"
          width={32}
          height={32}
          className="rounded-full border"
          style={{
            imageRendering: "pixelated",
            borderColor: "var(--accent)",
          }}
        />
      </Link>

      <nav className="hidden items-center gap-8 md:flex">
        <ol className="flex list-none items-center gap-8 text-sm">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-headline)" }}
              >
                <span
                  className="mr-1 font-mono text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  {item.num}.
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href={LINKS.line}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border px-4 py-2 font-mono text-sm transition-colors"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-tint)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          LINE登録
        </Link>
      </nav>
    </header>
  );
}
