import { ServiceIcon } from "./ServiceIcon";

/**
 * Placeholder "visual representation" for a service page. ponytail: swap for a
 * real render / photo / motion piece per service later — this is an in-palette
 * stand-in tinted by the service accent so pages don't ship empty.
 */
export function ServiceVisual({ accent, icon, label }: { accent: string; icon: string; label: string }) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-panel border border-line"
      style={{
        background: `radial-gradient(120% 120% at 15% 0%, ${accent}33, transparent 55%), radial-gradient(100% 100% at 100% 100%, ${accent}22, transparent 50%), var(--color-ink)`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 160 100" preserveAspectRatio="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={i * 20}
            y1="0"
            x2={i * 20 - 40}
            y2="100"
            stroke={accent}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            opacity={0.15 + (i % 3) * 0.1}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
        <div className="h-12 w-12" style={{ color: accent }}>
          <ServiceIcon name={icon} className="h-full w-full" />
        </div>
        <p className="font-mono text-utility-xs uppercase tracking-[0.2em] text-paper/50">{label}</p>
      </div>
    </div>
  );
}
