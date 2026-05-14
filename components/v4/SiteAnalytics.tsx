"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

const STORAGE_KEY = "analytics_disabled";

export function SiteAnalytics() {
  const [enabled, setEnabled] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const notrack = params.get("notrack");
    const track = params.get("track");

    if (notrack === "1") {
      localStorage.setItem(STORAGE_KEY, "true");
    } else if (track === "1") {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Strip the toggle params from the visible URL so they don't leak.
    if (notrack !== null || track !== null) {
      params.delete("notrack");
      params.delete("track");
      const search = params.toString();
      const next =
        window.location.pathname + (search ? `?${search}` : "") + window.location.hash;
      window.history.replaceState(null, "", next);
    }

    const disabled = localStorage.getItem(STORAGE_KEY) === "true";
    setEnabled(!disabled);
  }, []);

  if (!enabled) return null;

  return (
    <>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      {clarityId ? (
        <Script
          id="ms-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      ) : null}
      <VercelAnalytics />
    </>
  );
}
