import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { company } from "@/lib/data";

export function About() {
  return (
    <section className="overflow-hidden border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <ScrollReveal>
              <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Who We Are</p>
            </ScrollReveal>
            <ScrollHeadline className="mt-6 font-display text-display-lg leading-[1.05]">
              Businesses shouldn&apos;t need a dozen providers to bring one idea to life.
            </ScrollHeadline>
          </div>

          <div className="lg:pt-10">
            <ScrollReveal delay={0.1}>
              <p className="text-body-lg text-paper/80">{company.about[0]}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-5 text-body-base text-paper/60">{company.about[1]}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link
                href="/about"
                className="mt-8 inline-flex h-12 items-center justify-center rounded-panel border border-paper/30 px-6 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                More about Open Box Ventures →
              </Link>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal delay={0.1} className="mt-16 md:mt-20">
          <Image
            src="/whoweare.png"
            alt="Open Box Ventures offices across India, USA, Canada and UAE: 6 offices across 4 countries"
            width={1536}
            height={1024}
            className="h-auto w-full mix-blend-screen [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_55%,transparent_100%)]"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
