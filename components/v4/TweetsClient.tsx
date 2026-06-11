"use client";

import dynamic from "next/dynamic";

// react-tweet@3.2.1 has been crashing on React 19 during SSR with
// "TypeError: i is not iterable" inside its internal useMemo. Loading
// the section client-only via next/dynamic isolates the failure
// instead of taking the whole LP down. ErrorBoundary inside Tweets.tsx
// is the second line of defense once the bundle has loaded.
//
// (ssr: false is only allowed from a client component in Next.js 16,
// hence this thin wrapper.)
const Tweets = dynamic(
  () => import("./Tweets").then((m) => m.Tweets),
  { ssr: false },
);

export function TweetsClient() {
  return <Tweets />;
}
