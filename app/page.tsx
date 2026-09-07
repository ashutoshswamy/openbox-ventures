import { VideoHero } from "@/components/VideoHero";
import { About } from "@/components/About";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUs } from "@/components/WhyUs";
import { Process } from "@/components/Process";
import { LifeTeaser } from "@/components/LifeTeaser";
import { OutcomesTeaser } from "@/components/OutcomesTeaser";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <>
      <VideoHero />
      <About />
      <ServicesSection />
      <WhyUs />
      <Process />
      <LifeTeaser />
      <OutcomesTeaser />
      <Testimonials />
      <CTA />
    </>
  );
}
