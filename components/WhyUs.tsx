import Image from "next/image";
import { ScrollReveal, StaggerChild, StaggerGroup } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { differentiators } from "@/lib/data";

// same order as `differentiators`
const images = ["roof", "multidisciplinary", "international", "goals"];

export function WhyUs() {
  return (
    <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Why us</p>
        </ScrollReveal>
        <ScrollHeadline className="mt-6 max-w-3xl font-display text-display-lg leading-[1.05]">
          Why Open Box Ventures
        </ScrollHeadline>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {differentiators.map((d, i) => (
            <StaggerChild
              key={d.title}
              className="group relative overflow-hidden rounded-panel border border-line bg-paper/[0.03] p-6 transition-colors hover:border-paper/30 md:p-8"
            >
              <span className="absolute right-6 top-6 font-mono text-utility-xs tracking-[0.15em] text-paper/35 md:right-8 md:top-8">
                0{i + 1}
              </span>
              <Image
                src={`/whyobv/${images[i]}.png`}
                alt=""
                width={480}
                height={480}
                className="mx-auto h-56 w-56 object-contain transition-transform duration-500 group-hover:scale-105 md:h-64 md:w-64"
              />
              <h3 className="mt-6 font-display text-display-md leading-tight">{d.title}</h3>
              <p className="mt-3 max-w-md text-body-base text-paper/60">{d.body}</p>
            </StaggerChild>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
