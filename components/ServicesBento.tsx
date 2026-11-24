"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowDownRight, Camera, CalendarDays, Megaphone, MonitorSmartphone, PenLine, Radio, ShoppingCart, Truck, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, withReducedMotion } from "@/lib/gsap";
import { StatCounter } from "./StatCounter";
import { PromptCell, bentoTitleStyle } from "./Bento";
import { stats, services } from "@/lib/data";

const icons: Record<string, LucideIcon> = { Truck, Megaphone, CalendarDays, MonitorSmartphone, ShoppingCart, PenLine, Camera, Radio };

// lg column spans (of 24) per cell, in reading order: stat, stat, svc | prompt, svc, svc | svc, svc | svc, svc, svc
const spans = ["lg:col-span-12", "lg:col-span-7", "lg:col-span-7", "lg:col-span-12", "lg:col-span-12", "lg:col-span-8", "lg:col-span-8", "lg:col-span-8"];

function StatCell({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="svc-cell flex min-h-56 flex-col justify-center bg-ink px-8 py-10 lg:col-span-6 lg:min-h-[300px] lg:px-[4.5%]">
      <div className="font-display text-[clamp(56px,7vw,104px)] font-semibold leading-none text-accent">
        <StatCounter value={value} suffix={suffix} />+
      </div>
      <p className="mt-3 font-display text-body-lg font-semibold">{label}</p>
    </div>
  );
}

/** Services: edge-to-edge hairline bento (stats, prompt, one tile per service); cells rise in as they scroll into view. */
export function ServicesBento() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      withReducedMotion(
        () => {
          gsap.set(".svc-cell", { opacity: 0, y: 40 });
          ScrollTrigger.batch(".svc-cell", {
            start: "top bottom",
            once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
          });
        },
        () => {
          gsap.set(".svc-cell", { opacity: 1 });
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} >
      <div className="grid grid-cols-1 border-t border-line [&>*]:border-b [&>*]:border-r [&>*]:border-line sm:grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))]">
        <StatCell value={stats[0].value} suffix={stats[0].suffix} label="Offices worldwide" />
        <StatCell value={stats[1].value} suffix={stats[1].suffix} label="Countries" />
        {services.map((s, i) => {
          const Icon = icons[s.icon];
          const cell = (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className={`svc-cell group flex min-h-56 items-center justify-center gap-5 bg-ink px-8 py-10 transition-colors hover:bg-[#140f2a] lg:min-h-[300px] ${spans[i]}`}
            >
              <Icon className="h-16 w-16 shrink-0 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105" strokeWidth={1.25} />
              <span className="min-w-0">
                <span className="block text-body-sm text-paper/70">Service 0{i + 1}</span>
                <span className="block font-display text-[clamp(26px,2.6vw,40px)] leading-[1.08]" style={bentoTitleStyle}>
                  {s.name}
                  <ArrowDownRight className="ml-2 inline h-6 w-6 text-accent transition-transform group-hover:translate-x-1 group-hover:translate-y-1" strokeWidth={2.5} />
                </span>
              </span>
            </Link>
          );
          // prompt cell sits before the 2nd service, filling out row 2
          return i === 1 ? [<PromptCell key="prompt" className="svc-cell bg-ink sm:col-span-2 lg:col-span-10 lg:min-h-[300px]" />, cell] : cell;
        })}
      </div>
    </div>
  );
}
