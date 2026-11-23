import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StatCounter } from "./StatCounter";
import { bentoTitleStyle, serviceImages } from "./Bento";
import { LinkButton } from "./Button";
import { ScrollReveal } from "./ScrollReveal";
import { stats, services, offices } from "@/lib/data";

const timeZones = new Set(offices.map((o) => o.timezone)).size;

function StatCell({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col justify-center border-line px-5 py-8 not-last:border-r lg:px-8 lg:py-10">
      <div className="font-display text-[clamp(56px,7vw,112px)] leading-none">
        <StatCounter value={value} suffix={suffix} />
      </div>
      <p className="mt-3 text-body-base font-medium text-paper/70">{label}</p>
    </div>
  );
}

/** name/tagline pulled straight from lib/data.ts. `paper` flips one cell to the white surface. */
function ServiceCell({
  slug,
  name,
  tagline,
  className = "",
  paper = false,
}: {
  slug: string;
  name: string;
  tagline: string;
  className?: string;
  paper?: boolean;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className={`group flex flex-col justify-between gap-8 px-6 py-7 transition-colors hover:bg-paper hover:text-ink lg:px-7 lg:py-8 ${
        paper ? "on-paper border-ink/20" : "border-line"
      } ${className}`}
    >
      <span className={`relative block aspect-[4/3] w-full`}>
        <Image
          src={`/services/${serviceImages[slug]}.png`}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </span>
      <span className="min-w-0">
        <span className="flex items-start justify-between gap-2 text-display-md leading-[1.05]" style={bentoTitleStyle}>
          {name}
          <ArrowUpRight
            className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
        <span className={`mt-2 block text-body-sm group-hover:text-ink/80 ${paper ? "text-ink/65" : "text-paper/60"}`}>
          {tagline}
        </span>
      </span>
    </Link>
  );
}

export function ServicesBento() {
  return (
    <>
      <header className="border-b border-line px-6 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
          <ScrollReveal>
            <p className="mb-6 text-body-sm font-medium text-accent">Services</p>
            <h1 className="font-display text-[clamp(44px,7vw,104px)] leading-[0.94]">
              Eight services.
              <br />
              One team that owns&nbsp;the&nbsp;result.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="max-w-md text-body-lg text-paper/70">
              Logistics to content, events to e-commerce. Hire one discipline or hand us the whole brief; either way
              you talk to one team.
            </p>
            <LinkButton href="/contact" className="mt-8">
              Start a brief
            </LinkButton>
          </ScrollReveal>
        </div>
      </header>

      <div className="flex border-b border-line">
        <div className="mx-auto flex w-full max-w-7xl">
          <StatCell value={stats[0].value} suffix={stats[0].suffix} label="Offices worldwide" />
          <StatCell value={stats[1].value} suffix={stats[1].suffix} label="Countries" />
          <StatCell value={timeZones} suffix="" label="Time zones" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <ServiceCell
            key={s.slug}
            {...s}
            className={`border-t border-line ${i % 2 ? "sm:border-l" : ""} ${i % 4 ? "lg:border-l" : "lg:border-l-0"} ${
              i < 4 ? "lg:border-t-0" : ""
            } ${i < 2 ? "sm:border-t-0" : ""}`}
          />
        ))}
      </div>
    </>
  );
}
