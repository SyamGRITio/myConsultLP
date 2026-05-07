"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tweet } from "react-tweet";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { TWEET_IDS } from "@/lib/constants";

const AUTO_ADVANCE_MS = 5000;
const VIRTUALIZE_RANGE = 2;
const SWIPE_THRESHOLD = 50;

export function TweetTimeline() {
  const count = TWEET_IDS.length;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + count) % count),
    [count],
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
          backgroundColor: "rgba(14, 10, 31, 0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
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
              className="flex h-full cursor-grab touch-pan-y active:cursor-grabbing"
              style={{ width: `${count * 100}%` }}
              animate={{ x: `-${current * (100 / count)}%` }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) next();
                else if (info.offset.x > SWIPE_THRESHOLD) prev();
                setPaused(false);
              }}
            >
              {TWEET_IDS.map((id, i) => {
                const visible = Math.abs(i - current) <= VIRTUALIZE_RANGE;
                return (
                  <div
                    key={id}
                    className="h-full shrink-0 overflow-y-auto px-2"
                    style={{ width: `${100 / count}%` }}
                    aria-hidden={i !== current}
                  >
                    {visible ? (
                      <div data-theme="dark" className="tweet-container pointer-events-auto">
                        <Tweet id={id} />
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
                    backgroundColor: active
                      ? "#F4A26B"
                      : "var(--border)",
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
