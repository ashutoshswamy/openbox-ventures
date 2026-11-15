import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { StatCounter } from "./StatCounter";
import { LinkButton } from "./Button";
import { company, offices, stats } from "@/lib/data";

const timeZones = new Set(offices.map((o) => o.timezone)).size;
const figures = [...stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label })), { value: timeZones, suffix: "", label: "Time zones" }];

export function About() {
  return (
    <section className="overflow-hidden px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-5xl font-display text-[clamp(34px,5.6vw,84px)] leading-[0.98]">
          Businesses shouldn&apos;t need a dozen providers to bring one idea to life.
        </ScrollHeadline>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-2 lg:items-center lg:gap-20">
          <ScrollReveal>
            {/* transparent PNG; any 4:3 cut-out or photo works */}
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/whoweare.png"
                alt="Open Box Ventures LLP offices across India, USA, Canada and UAE: 6 offices across 4 countries"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain"
              />
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="max-w-xl text-body-lg text-paper/80">{company.about[0]}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <p className="mt-5 max-w-xl text-body-base text-paper/60">{company.about[1]}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <dl className="mt-10 grid grid-cols-3 gap-4">
                {figures.map((f) => (
                  <div key={f.label} className="border-t-2 border-accent pt-4">
                    <dd className="font-display text-[clamp(40px,5vw,72px)] leading-none text-paper">
                      <StatCounter value={f.value} suffix={f.suffix} />
                    </dd>
                    <dt className="mt-3 text-body-sm text-paper/60">{f.label}</dt>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <LinkButton href="/about" variant="outline" className="mt-10">
                About us
              </LinkButton>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
