import { Hero } from "@/components/v4/Hero";
import { Painpoints } from "@/components/v4/Painpoints";
import { Journey } from "@/components/v4/Journey";
import { Philosophy } from "@/components/v4/Philosophy";
import { Gifts } from "@/components/v4/Gifts";
import { TalkAbout } from "@/components/v4/TalkAbout";
import { Flow } from "@/components/v4/Flow";
import { Contact } from "@/components/v4/Contact";
import { Tweets } from "@/components/v4/Tweets";
import { Footer } from "@/components/v4/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Painpoints />
      <Journey />
      <Philosophy />
      <Gifts />
      <TalkAbout />
      <Flow />
      <Contact />
      <Tweets />
      <Footer />
    </>
  );
}
