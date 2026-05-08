"use client";

import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Side } from "./Side";
import { SocialLinks } from "./SocialLinks";
import { EmailLink } from "./EmailLink";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)",
      }}
    >
      <Nav />
      <Side orientation="left">
        <SocialLinks />
      </Side>
      <Side orientation="right">
        <EmailLink />
      </Side>
      <main
        id="content"
        className="mx-auto min-h-screen max-w-[1600px] px-6 sm:px-12 md:px-24 lg:px-36"
      >
        {children}
      </main>
    </div>
  );
}
