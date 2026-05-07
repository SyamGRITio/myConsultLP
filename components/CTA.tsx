"use client";

import Link from "next/link";
import { IconBrandLine } from "@tabler/icons-react";
import { Section } from "./Section";
import { LINKS, withUtm } from "@/lib/constants";

function DeskScene() {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative mx-auto mb-10 w-full max-w-md overflow-hidden rounded-lg"
      style={{ aspectRatio: "16 / 9" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #2B1B5E 0%, #4B2E83 35%, #B83A8A 60%, #F4A26B 80%, #3D2417 80.5%, #3D2417 100%)",
        }}
      />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 160 90"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="crispEdges"
      >
        <rect x="20" y="50" width="50" height="22" fill="#7A7580" />
        <rect x="22" y="52" width="46" height="18" fill="#0A0A0A" />
        <rect x="38" y="72" width="14" height="2" fill="#7A7580" />
        <rect x="34" y="74" width="22" height="2" fill="#5A5560" />

        <text
          x="24"
          y="58"
          fill="#5BFF5B"
          fontFamily="ui-monospace, SFMono-Regular, monospace"
          fontSize="3.4"
          fontWeight="700"
        >
          C:\&gt; consult --start
        </text>
        <rect
          x="24"
          y="61"
          width="2"
          height="3"
          fill="#5BFF5B"
          style={{ animation: "scene-blink 1s steps(1) infinite" }}
        />

        <rect x="118" y="56" width="14" height="16" fill="#9C9398" />
        <rect x="116" y="70" width="18" height="3" fill="#7A7580" />
        <rect x="132" y="60" width="3" height="6" fill="none" stroke="#9C9398" strokeWidth="1" />

        <g style={{ animation: "scene-steam 4s ease-out infinite" }}>
          <path
            d="M122 56 Q120 52 124 48 Q126 44 122 40"
            stroke="#F4F0E0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M128 56 Q130 52 126 48 Q124 44 128 40"
            stroke="#F4F0E0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.6"
          />
        </g>

        <rect x="78" y="66" width="20" height="3" fill="#3D5A47" />
        <rect x="80" y="63" width="18" height="3" fill="#5A8067" />
        <rect x="76" y="60" width="22" height="3" fill="#3D5A47" />

        <rect x="104" y="64" width="8" height="6" fill="#A0593E" />
        <path d="M104 64 L106 60 L108 58 L110 60 L112 64 Z" fill="#4A7C59" />
        <rect x="105" y="56" width="2" height="4" fill="#4A7C59" />
        <rect x="109" y="58" width="2" height="3" fill="#4A7C59" />
      </svg>
    </div>
  );
}

export function CTA() {
  return (
    <Section id="cta">
      <div className="flex flex-col items-center text-center">
        <DeskScene />

        <h2 className="text-2xl font-bold sm:text-3xl">
          話したい人は、こちらから
        </h2>

        <div className="mt-10">
          <Link
            href={withUtm(LINKS.line, "cta-final", "cta")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--accent-orange)",
              color: "var(--bg)",
              boxShadow: "0 8px 24px -8px rgba(244, 162, 107, 0.4)",
            }}
          >
            <IconBrandLine size={20} stroke={2} />
            LINEに登録する
          </Link>
        </div>

        <p
          className="mt-8 max-w-md text-sm leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          今は無料相談だけ。近いうちにAzureコーチング始めます。
        </p>
      </div>
    </Section>
  );
}
