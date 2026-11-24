"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Camera, CalendarDays, Megaphone, MonitorSmartphone, PenLine, Radio, ShoppingCart, Truck, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, withReducedMotion } from "@/lib/gsap";
import { StatCounter } from "./StatCounter";
import { bentoTitleStyle } from "./Bento";
import { stats } from "@/lib/data";

// ponytail: mirrors the eight service tiles one-to-one (same icons, same order); names are the industries they serve
const industries: { name: string; icon: LucideIcon }[] = [
  { name: "Transportation & Mobility", icon: Truck },
  { name: "Consumer Brands & Retail", icon: Megaphone },
  { name: "Hospitality & Events", icon: CalendarDays },
  { name: "Technology & Startups", icon: MonitorSmartphone },
  { name: "Direct-to-Consumer", icon: ShoppingCart },
  { name: "Media & Publishing", icon: PenLine },
  { name: "Fashion & Lifestyle", icon: Camera },
  { name: "Entertainment & Sports", icon: Radio },
];

// lg column spans (of 24) per cell, in reading order: stat, stat, svc | prompt, svc, svc | svc, svc | svc, svc, svc
const spans = ["lg:col-span-12", "lg:col-span-7", "lg:col-span-7", "lg:col-span-12", "lg:col-span-12", "lg:col-span-8", "lg:col-span-8", "lg:col-span-8"];

function StatCell({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="ind-cell flex min-h-56 flex-col justify-center bg-ink px-8 py-10 lg:col-span-6 lg:min-h-[300px] lg:px-[4.5%]">
      <div className="font-display text-[clamp(56px,7vw,104px)] font-semibold leading-none text-accent">
        <StatCounter value={value} suffix={suffix} />+
      </div>
      <p className="mt-3 font-display text-body-lg font-semibold">{label}</p>
    </div>
  );
}

/** Industries: same bento as Services, but display-only (no links); cells rise in as they scroll into view. */
export function IndustriesBento() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      withReducedMotion(
        () => {
          gsap.set(".ind-cell", { opacity: 0, y: 40 });
          ScrollTrigger.batch(".ind-cell", {
            start: "top bottom",
            once: true,
            onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true }),
          });
        },
        () => {
          gsap.set(".ind-cell", { opacity: 1 });
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
        {industries.map(({ name, icon: Icon }, i) => {
          const cell = (
            <div
              key={name}
              className={`ind-cell group flex min-h-56 items-center justify-center gap-5 bg-ink px-8 py-10 lg:min-h-[300px] ${spans[i]}`}
            >
              <Icon className="h-16 w-16 shrink-0 text-accent" strokeWidth={1.25} />
              <span className="min-w-0">
                <span className="block text-body-sm text-paper/70">Industry 0{i + 1}</span>
                <span className="block font-display text-[clamp(26px,2.6vw,40px)] leading-[1.08]" style={bentoTitleStyle}>
                  {name}
                </span>
              </span>
            </div>
          );
          // prompt sits before the 2nd tile, filling out row 2
          return i === 1 ? [<div key="prompt" className="ind-cell flex flex-col justify-between gap-10 bg-ink px-7 py-10 sm:col-span-2 lg:col-span-10 lg:min-h-[300px]">
            <p className="max-w-sm font-display text-[clamp(26px,3vw,40px)] leading-[1.02]" style={bentoTitleStyle}>Every industry, one accountable team.</p>
          </div>, cell] : cell;
        })}
      </div>
    </div>
  );
}
