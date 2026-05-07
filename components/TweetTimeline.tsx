"use client";

import { motion } from "framer-motion";
import { Tweet } from "react-tweet";
import { Section } from "./Section";
import { TWEET_IDS } from "@/lib/constants";

export function TweetTimeline() {
  return (
    <Section id="tweets">
      <h2 className="text-2xl font-bold sm:text-3xl">
        3年分のツイートを、置いておきます
      </h2>

      <div className="mt-10 flex flex-col items-center gap-6">
        {TWEET_IDS.map((id, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.3), ease: "easeOut" }}
            className="w-full"
          >
            <div data-theme="dark" className="tweet-container">
              <Tweet id={id} />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
