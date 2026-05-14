"use client";

import Link from "next/link";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export type CtaLocation = "hero" | "journey" | "gifts" | "contact";
export type CtaDestination = "line" | "x_dm";

type Props = {
  href: string;
  cta_location: CtaLocation;
  destination: CtaDestination;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaLabel?: string;
  onMouseEnter?: (e: MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function CtaLink({
  href,
  cta_location,
  destination,
  children,
  className,
  style,
  ariaLabel,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        sendGAEvent("event", "cta_click", {
          cta_location,
          destination,
        });
      }}
    >
      {children}
    </Link>
  );
}
