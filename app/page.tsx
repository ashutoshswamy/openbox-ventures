import { VideoHero } from "@/components/VideoHero";
import { ServicesIndex } from "@/components/ServicesIndex";
import { WhyUs } from "@/components/WhyUs";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <VideoHero />
      <ServicesIndex />
      <WhyUs />
      <Process />
      <CTA />
    </>
  );
}
