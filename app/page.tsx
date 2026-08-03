import { PageIntro } from "@/components/PageIntro";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyUs } from "@/components/WhyUs";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <PageIntro>
        <Nav />
        <main>
          <Hero />
          <About />
          <ServicesSection />
          <WhyUs />
          <Process />
          <Testimonials />
          <ContactSection />
        </main>
      </PageIntro>
      <Footer />
    </>
  );
}
