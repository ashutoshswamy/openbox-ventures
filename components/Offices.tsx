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

function useLocalTime(timezone: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 30_000);
    return () => clearInterval(id);
  }, [timezone]);
  return time;
}

function OfficeColumn({ office, className }: { office: (typeof offices)[number]; className: string }) {
  const time = useLocalTime(office.timezone);
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-display-md leading-none text-paper">{office.country}</p>
          <p className="mt-2 font-mono text-utility-sm tabular-nums text-paper/55" suppressHydrationWarning>
            {time || "—"}
          </p>
        </div>
        <svg
          viewBox="0 0 60 40"
          className="h-7 w-[42px] shrink-0 rounded-[2px] border border-line"
          aria-hidden
        >
          {flags[office.country]}
        </svg>
      </div>
      <p className="mt-6 text-body-sm text-paper/70">{office.city}</p>
      <p className="mt-1 text-body-sm text-paper/50">{office.region}</p>
      {"role" in office && (
        <p className="mt-3 font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/40">{office.role}</p>
      )}
    </div>
  );
}

// index -> hairline divider classes (mobile top divider; md adds left divider)
const dividerClass = (i: number) =>
  i === 0
    ? "border-t border-line pt-8 md:border-t-0 md:pt-0"
    : "border-t border-line pt-8 md:border-t-0 md:pt-0 md:border-l md:border-line md:pl-8";

export function Offices() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {offices.map((o, i) => (
        <OfficeColumn key={o.city} office={o} className={dividerClass(i)} />
      ))}
    </div>
  );
}
