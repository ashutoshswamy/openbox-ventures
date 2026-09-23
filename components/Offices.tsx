"use client";

import { useEffect, useState } from "react";
import { offices } from "@/lib/data";

// Inline SVG flags keyed by country (emoji flags don't render on Windows Chrome).
const flags: Record<string, React.ReactNode> = {
  India: (
    <>
      <rect width="60" height="13.33" fill="#FF9933" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#138808" />
      <circle cx="30" cy="20" r="4.4" fill="none" stroke="#0a3161" strokeWidth="1" />
      <circle cx="30" cy="20" r="0.8" fill="#0a3161" />
    </>
  ),
  USA: (
    <>
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} y={(i * 40) / 13} width="60" height={40 / 13} fill={i % 2 ? "#fff" : "#B31942"} />
      ))}
      <rect width="24" height={(40 * 7) / 13} fill="#0A3161" />
      {Array.from({ length: 12 }).map((_, i) => (
        <circle key={i} cx={4 + (i % 4) * 5.5} cy={4 + Math.floor(i / 4) * 6} r="1" fill="#fff" />
      ))}
    </>
  ),
  Canada: (
    <>
      <rect width="60" height="40" fill="#fff" />
      <rect width="15" height="40" fill="#D80621" />
      <rect x="45" width="15" height="40" fill="#D80621" />
      <path
        d="M30 8l1.8 4.2 4.5-1-1.6 4.3 3.8 2.6-4.3 1 .5 4.4-4-2.2-4 2.2.5-4.4-4.3-1 3.8-2.6-1.6-4.3 4.5 1z"
        fill="#D80621"
      />
    </>
  ),
  UAE: (
    <>
      <rect y="0" width="60" height="13.33" fill="#00843D" />
      <rect y="13.33" width="60" height="13.34" fill="#fff" />
      <rect y="26.67" width="60" height="13.33" fill="#000" />
      <rect width="15" height="40" fill="#CE1126" />
    </>
  ),
};

/** Live local clock. */
function useLocalClock(timezone: string) {
  const [clock, setClock] = useState<{ time: string; period: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).formatToParts(new Date());
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const h = Number(get("hour")) % 24;
      setClock({
        time: `${String(h % 12 || 12).padStart(2, "0")}:${get("minute")}`,
        period: h >= 12 ? "PM" : "AM",
      });
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timezone]);
  return clock;
}

function OfficeColumn({ office, className }: { office: (typeof offices)[number]; className: string }) {
  const clock = useLocalClock(office.timezone);
  const hq = "role" in office;
  return (
    <div className={`group flex min-w-0 flex-col ${className}`}>
      <div className="flex h-7 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <svg viewBox="0 0 60 40" className="h-[18px] w-[27px] shrink-0 rounded-[2px] border border-line" aria-hidden>
            {flags[office.country]}
          </svg>
          <p className="truncate font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/55">{office.country}</p>
        </div>
        {hq && (
          <span className="rounded-full bg-paper px-2.5 py-1 font-mono text-utility-xs uppercase tracking-[0.12em] text-ink">
            HQ
          </span>
        )}
      </div>

      <p
        className="mt-6 font-display text-[clamp(28px,3.2vw,44px)] leading-none tabular-nums text-paper/40 transition-colors duration-300 group-hover:text-paper"
        suppressHydrationWarning
      >
        {clock ? clock.time : "--:--"}
        <span className="ml-1.5 text-utility-sm font-medium tracking-normal text-paper/40">{clock?.period}</span>
      </p>

      <p className="mt-6 truncate font-display text-[clamp(15px,1.25vw,18px)] leading-tight tracking-tight text-paper">{office.city}</p>
      <p className="mt-1.5 truncate text-body-sm text-paper/50">{office.region.replace(/, (India|USA|Canada)$/, "")}</p>
    </div>
  );
}

// hairline dividers only in the single-row (xl) layout; stacked layouts use a top rule on mobile
const dividerClass = (i: number) =>
  `border-t border-line pt-6 xl:border-t-0 xl:pt-0 ${i === 0 ? "" : "xl:border-l xl:border-line xl:pl-6"}`;

export function Offices() {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-3 xl:grid-cols-6">
      {offices.map((o, i) => (
        <OfficeColumn key={o.city} office={o} className={dividerClass(i)} />
      ))}
    </div>
  );
}
