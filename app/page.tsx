import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { About } from "@/components/About";
import { TweetTimeline } from "@/components/TweetTimeline";
import { Philosophy } from "@/components/Philosophy";
import { Gifts } from "@/components/Gifts";
import { TalkAbout } from "@/components/TalkAbout";
import { Flow } from "@/components/Flow";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PainPoints />
      <About />
      <TweetTimeline />
      <Philosophy />
      <Gifts />
      <TalkAbout />
      <Flow />
      <CTA />
      <Footer />
    </main>
  );
}
