"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { ArrowUpRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";
import type { Service } from "@/lib/data";

export function ServiceCard({ service }: { service: Service }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!faceRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      hoverTl.current = gsap
        .timeline({ paused: true })
        .fromTo(faceRef.current, { yPercent: 100 }, { yPercent: 0, duration: DUR.base, ease: EASE.smooth });
    },
    { scope: cardRef },
  );

  const handleEnter = contextSafe(() => hoverTl.current?.play());
  const handleLeave = contextSafe(() => hoverTl.current?.reverse());

  return (
    <Link
      ref={cardRef}
      href={`/services/${service.slug}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-paper/5 p-7 text-left transition-colors hover:border-paper/40"
    >
      <div ref={faceRef} className="pointer-events-none absolute inset-0 bg-paper/8" style={{ transform: "translateY(100%)" }} />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="h-9 w-9 text-paper" style={{ color: service.accent }}>
            <ServiceIcon name={service.icon} className="h-full w-full" />
          </div>
          <ArrowUpRight className="h-5 w-5 text-paper/40 transition-colors group-hover:text-paper" strokeWidth={1.4} />
        </div>
        <h3 className="mt-5 font-display text-display-md">{service.name}</h3>
        <p className="mt-2 text-body-sm text-paper/60">{service.tagline}</p>

        <ul className="mt-4 space-y-2 border-t border-line pt-4 text-body-sm text-paper/70">
          {service.offerings.slice(0, 3).map((d) => (
            <li key={d} className="flex gap-2">
              <span className="text-paper/50">—</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
