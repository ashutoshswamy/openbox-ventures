"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollHeadline } from "./ScrollHeadline";
import { ScrollReveal } from "./ScrollReveal";
import { LinkButton } from "./Button";
import { serviceImages } from "./Bento";
import { services } from "@/lib/data";

/**
 * The white band. Left: the eight services as one big index (hover or focus
 * one). Right: a sticky black stage that shows that service's cut-out, with an
 * orange offset block behind it. Under lg there is no stage; each row carries
 * its own thumbnail instead, so touch never depends on hover.
 */
export function ServicesIndex({
  title = "Eight services. One brief.",
  body = "Pick one discipline or hand us the whole thing. Either way a single team owns the result.",
}: {
  title?: string;
  body?: string;
}) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section className="on-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-4xl font-display text-[clamp(40px,6.4vw,96px)] leading-[0.94]">
          {title}
        </ScrollHeadline>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 max-w-md text-body-lg text-ink/70">{body}</p>
        </ScrollReveal>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <ul onMouseLeave={() => setActive(0)}>
            {services.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.slug} className="border-t border-ink/20 last:border-b">
                  <Link
                    href={`/services/${s.slug}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex items-center justify-between gap-5 py-4 pr-1 sm:py-5"
                  >
                    <span className="min-w-0">
                      <span
                        className={`block font-display text-[clamp(26px,3vw,44px)] leading-[1.08] underline decoration-[6px] underline-offset-[8px] transition-[color,text-decoration-color] duration-300 ${
                          on ? "text-ink decoration-accent" : "text-ink decoration-transparent lg:text-ink/30"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className="mt-1.5 block text-body-sm text-ink/65 lg:hidden">{s.tagline}</span>
                    </span>

                    {/* touch layout: a thumbnail per row */}
                    <span className="relative block aspect-[4/3] w-24 shrink-0 bg-ink sm:w-32 lg:hidden">
                      <Image
                        src={`/services/${serviceImages[s.slug]}.png`}
                        alt=""
                        fill
                        sizes="128px"
                        className="object-contain p-1"
                      />
                    </span>

                    <ArrowUpRight
                      className={`hidden h-7 w-7 shrink-0 transition-all duration-300 lg:block ${
                        on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                      }`}
                      strokeWidth={1.8}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <div className="sticky top-28">
              {/* orange block sits behind and offset; the stage is the black panel in front */}
              <div className="relative">
                <span className="absolute inset-0 translate-x-4 translate-y-4 bg-accent" aria-hidden />
                <div className="relative aspect-[4/3] w-full bg-ink">
                  {services.map((s, i) => (
                    <Image
                      key={s.slug}
                      src={`/services/${serviceImages[s.slug]}.png`}
                      alt={i === active ? s.name : ""}
                      aria-hidden={i !== active}
                      fill
                      sizes="40vw"
                      className={`object-contain p-6 transition-[opacity,transform] duration-500 ease-out ${
                        i === active ? "scale-100 opacity-100" : "scale-95 opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-12 flex items-end justify-between gap-6" aria-live="polite">
                <p className="max-w-xs text-body-base text-ink/75">{current.tagline}</p>
                <LinkButton href={`/services/${current.slug}`} variant="inkSolid" className="shrink-0">
                  View service
                </LinkButton>
              </div>
            </div>
          </div>
        </div>

        <ScrollReveal delay={0.05} className="mt-14">
          <LinkButton href="/services" variant="outlineInk">
            All services
          </LinkButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
