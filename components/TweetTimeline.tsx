"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tweet } from "react-tweet";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { TWEET_IDS } from "@/lib/constants";

const AUTO_ADVANCE_MS = 5000;
const SWIPE_THRESHOLD = 50;

export function TweetTimeline() {
  const total = TWEET_IDS.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % total),
    [total],
  );
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <motion.section
      id="tweets"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-6 py-16 sm:py-20"
    >
      <div
        className="mx-auto max-w-3xl rounded-2xl px-6 py-10 sm:px-10 sm:py-12"
        style={{
          backgroundColor: "rgba(14, 10, 31, 0.5)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
        }}
      >
        <h2 className="text-2xl font-bold sm:text-3xl">
          Twitter/Xは、地味にずっと続けてきました
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

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div
            className="relative mx-auto w-full max-w-md overflow-hidden"
            style={{ height: 600 }}
          >
            <motion.div
              key={current}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, { offset }) => {
                if (offset.x < -SWIPE_THRESHOLD) {
                  setCurrent((prev) => Math.min(prev + 1, total - 1));
                } else if (offset.x > SWIPE_THRESHOLD) {
                  setCurrent((prev) => Math.max(prev - 1, 0));
                }
                setPaused(false);
              }}
              className="absolute inset-0 cursor-grab touch-pan-y overflow-y-auto px-2 active:cursor-grabbing"
            >
              <div data-theme="dark" className="tweet-container pointer-events-auto">
                <Tweet id={TWEET_IDS[current]} />
              </div>
            </motion.div>
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="前のツイート"
            className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border p-2 transition-transform hover:scale-105 sm:-left-4"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <IconChevronLeft size={20} stroke={2} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="次のツイート"
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border p-2 transition-transform hover:scale-105 sm:-right-4"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <IconChevronRight size={20} stroke={2} />
          </button>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {TWEET_IDS.map((id, i) => {
              const active = i === current;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`ツイート ${i + 1} へ`}
                  aria-current={active}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: active ? 24 : 8,
                    backgroundColor: active ? "#F4A26B" : "var(--border)",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
