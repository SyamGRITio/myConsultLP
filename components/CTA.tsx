"use client";

import Link from "next/link";
import Image from "next/image";
import { IconCalendar, IconBrandLine } from "@tabler/icons-react";
import { Section } from "./Section";
import { LINKS, withUtm } from "@/lib/constants";

export function CTA() {
  return (
    <Section id="cta">
      <div className="flex flex-col items-center text-center">
        <Image
          src="/syama-pixel-character.png"
          alt="syam"
          width={120}
          height={120}
          className="mb-6"
          style={{ imageRendering: "pixelated" }}
        />

        <h2 className="text-2xl font-bold sm:text-3xl">
          話したい人は、こちらから
        </h2>

        <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href={withUtm(LINKS.timerex, "cta-final", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--accent-orange)",
              color: "var(--bg)",
              boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.4)",
            }}
          >
            <IconCalendar size={20} stroke={2} />
            予約フォームへ
          </Link>
          <Link
            href={withUtm(LINKS.line, "cta-final", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              borderColor: "var(--accent-pink)",
              color: "var(--text)",
              backgroundColor: "transparent",
            }}
          >
            <IconBrandLine size={20} stroke={2} />
            LINEで連絡する
          </Link>
        </div>

        <p
          className="mt-8 max-w-md text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          今は無料相談だけ。近いうちに、画面を見ながら一緒に手を動かす個人向けAzureコーチングも始めます。
        </p>
      </div>
    </Section>
  );
}
