import Image from "next/image";
import Link from "next/link";
import { bentoTitleStyle, serviceImages } from "./Bento";
import { services } from "@/lib/data";

/** Two-column zig-zag: text one side, illustration the other, flipping per
 * row. Shows outcome + offerings (Services shows tagline only). */
function DisciplineCell({ service, flip }: { service: (typeof services)[number]; flip: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex flex-1 flex-col items-start justify-between gap-4 border-line px-7 py-8 transition-colors hover:bg-paper/[0.03] sm:flex-row sm:items-center sm:gap-6 lg:border-r lg:last:border-r-0 ${
        flip ? "sm:flex-row-reverse" : ""
      }`}
    >
      <div className="max-w-sm">
        <p className="text-display-md leading-[1.05] text-paper" style={bentoTitleStyle}>
          {service.name}
        </p>
        <p className="mt-2 text-body-sm text-paper/70">{service.outcome}</p>
        <p className="mt-4 font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/45">
          {service.offerings.slice(0, 3).join(" · ")}
        </p>
      </div>
      <Image
        src={`/services/${serviceImages[service.slug]}.png`}
        alt=""
        width={240}
        height={240}
        className="h-28 w-28 shrink-0 object-contain sm:h-32 sm:w-32 transition-transform duration-500 group-hover:scale-105 lg:h-40 lg:w-40"
      />
    </Link>
  );
}

export function IndustriesBento() {
  const rows = [0, 2, 4, 6].map((i) => services.slice(i, i + 2));
  return (
    <div className="flex flex-1 flex-col border-t border-line">
      {rows.map((row, r) => (
        <div key={r} className="flex flex-col border-line lg:flex-1 lg:flex-row lg:border-b last:lg:border-b-0">
          {row.map((s, c) => (
            <DisciplineCell key={s.slug} service={s} flip={(r + c) % 2 === 1} />
          ))}
        </div>
      ))}
    </div>
  );
}
