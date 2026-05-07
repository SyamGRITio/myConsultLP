"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Tweet } from "react-tweet";
import { TWEET_IDS } from "@/lib/constants";

function TweetCard({
  id,
  index,
  total,
  progress,
}: {
  id: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const fade = 0.5 / total;

  const opacity = useTransform(
    progress,
    [start - fade, start, end, end + fade],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [start - fade, start, end, end + fade],
    [0.95, 1, 1, 0.95],
  );
  const y = useTransform(
    progress,
    [start - fade, start, end, end + fade],
    [20, 0, 0, -20],
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-x-0 mx-auto w-full max-w-md px-6"
    >
      <div data-theme="dark" className="tweet-container">
        <Tweet id={id} />
      </div>
    </motion.div>
  );
}

export function TweetTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="tweets"
      className="relative w-full px-6"
      style={{ minHeight: `${TWEET_IDS.length * 50}vh` }}
    >
      <div className="mx-auto max-w-3xl pt-20">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Twitterは、地味にずっと続けてきました
        </h2>
        <div
          className="mt-6 space-y-3 text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          <p>
            半年に1回しか書かない時もあったけど、やれる時にやる、を5年続けたら、見てくれる人が少しずつ増えてきました。それが、結構嬉しい。
          </p>
          <p>軌跡を、置いておきます。</p>
        </div>
      </div>

      <div className="sticky top-0 mt-12 flex h-screen items-center justify-center">
        <div className="relative w-full">
          {TWEET_IDS.map((id, i) => (
            <TweetCard
              key={id}
              id={id}
              index={i}
              total={TWEET_IDS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
