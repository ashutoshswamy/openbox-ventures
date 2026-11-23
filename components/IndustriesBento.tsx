import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { bentoTitleStyle, serviceImages } from "./Bento";
import { services } from "@/lib/data";

/** Two-column zig-zag on a black/white checkerboard: text one side, illustration the other, flipping per
 * row. Shows outcome + what's included (Services shows tagline only). */
function DisciplineCell({ service, flip, paper }: { service: (typeof services)[number]; flip: boolean; paper: boolean }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={`group flex min-w-0 flex-1 flex-col items-start justify-between gap-6 px-7 py-9 transition-colors hover:bg-paper hover:text-ink sm:flex-row sm:items-center sm:gap-8 lg:px-10 lg:py-10 ${
        flip ? "sm:flex-row-reverse" : ""
      } ${paper ? "on-paper" : ""}`}
    >
      <div className="max-w-sm">
        <p className="flex items-start gap-2 text-display-md leading-[1.05]" style={bentoTitleStyle}>
          {service.name}
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
        </p>
        <p className={`mt-3 text-body-base group-hover:text-ink ${paper ? "text-ink/80" : "text-paper/80"}`}>{service.outcome}</p>
        <p className={`mt-4 text-body-sm group-hover:text-ink/75 ${paper ? "text-ink/55" : "text-paper/50"}`}>
          {service.offerings.slice(0, 3).join(", ")}
        </p>
      </div>
      <span className={`relative block aspect-[4/3] w-full shrink-0 sm:w-44 lg:w-64`}>
        <Image
          src={`/services/${serviceImages[service.slug]}.png`}
          alt=""
          fill
          sizes="256px"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </span>
    </Link>
  );
}

export function IndustriesBento() {
  const rows = [0, 2, 4, 6].map((i) => services.slice(i, i + 2));
  return (
    <div className="flex flex-1 flex-col">
      {rows.map((row, r) => (
        <div key={r} className="flex flex-col lg:flex-1 lg:flex-row">
          {row.map((s, c) => (
            <DisciplineCell key={s.slug} service={s} flip={(r + c) % 2 === 1} paper={(r + c) % 2 === 1} />
          ))}
        </div>
      ))}
    </div>
  );
}
