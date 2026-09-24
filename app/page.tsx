import { VideoHero } from "@/components/VideoHero";
import { About } from "@/components/About";
import { WhyUs } from "@/components/WhyUs";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <VideoHero />
      <About />
      <WhyUs />
      <Process />
      <CTA />
    </>
  );
}
