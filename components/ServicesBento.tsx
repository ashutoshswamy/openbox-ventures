import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { StatCounter } from "./StatCounter";
import { PromptCell, bentoTitleStyle, serviceImages } from "./Bento";
import { stats, services } from "@/lib/data";

function StatCell({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-1 flex-col justify-center border-line px-5 py-6 lg:border-r lg:px-7 lg:py-10">
      <div className="font-display text-display-lg text-paper">
        <StatCounter value={value} suffix={suffix} />
      </div>
      <p className="mt-1 text-body-base text-paper/70">{label}</p>
    </div>
  );
}

/** name/tagline pulled straight from lib/data.ts — no invented copy. */
function ServiceCell({
  slug,
  name,
  tagline,
  className = "",
}: {
  slug: string;
  name: string;
  tagline: string;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${slug}`}
      className={`group flex flex-1 flex-row items-center gap-4 border-line px-5 py-5 transition-colors hover:bg-paper/[0.03] lg:flex-col lg:items-stretch lg:justify-center lg:border-r lg:px-7 lg:py-8 ${className}`}
    >
      <Image src={`/services/${serviceImages[slug]}.png`} alt="" width={160} height={160} className="-ml-2 h-20 w-20 shrink-0 object-contain lg:-ml-4 lg:h-28 lg:w-28" />
      <div>
        <p className="flex items-start gap-1.5 text-display-md leading-[1.05] text-paper" style={bentoTitleStyle}>
          {name}
          <ArrowDownRight className="mt-1 h-5 w-5 shrink-0 text-paper transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" strokeWidth={1.8} />
        </p>
        <p className="mt-2 text-body-sm text-paper/55">{tagline}</p>
      </div>
    </Link>
  );
}

const [logistics, marketing, events, itDigital, ecommerce, content, photoVideo, advertising] = services;

export function ServicesBento() {
  return (
    <div className="flex flex-1 flex-col border-t border-line">
      <div className="flex flex-col border-line lg:flex-1 lg:flex-row lg:border-b">
        <div className="flex flex-1 flex-row lg:flex-[2] lg:border-r">
          <StatCell value={stats[0].value} suffix={stats[0].suffix} label="Offices worldwide" />
          <StatCell value={stats[1].value} suffix={stats[1].suffix} label="Countries" />
        </div>
        <ServiceCell {...logistics} className="flex-[2] border-t lg:border-t-0" />
      </div>

      <div className="flex flex-col border-line lg:flex-1 lg:flex-row lg:border-b">
        <PromptCell className="flex-[3] border-t border-line lg:border-t-0 lg:border-r" />
        <ServiceCell {...marketing} className="flex-[2] border-t lg:border-t-0" />
        <ServiceCell {...events} className="flex-[2] border-t lg:border-t-0 lg:border-r-0" />
      </div>

      <div className="flex flex-col border-line lg:flex-1 lg:flex-row lg:border-b">
        <ServiceCell {...itDigital} className="flex-1 border-t lg:border-t-0" />
        <ServiceCell {...ecommerce} className="flex-1 border-t lg:border-t-0" />
        <ServiceCell {...content} className="flex-1 border-t lg:border-t-0 lg:border-r-0" />
      </div>

      <div className="flex flex-col border-line lg:flex-1 lg:flex-row">
        <ServiceCell {...photoVideo} className="flex-1 border-t lg:border-t-0" />
        <ServiceCell {...advertising} className="flex-1 border-t lg:border-t-0 lg:border-r-0" />
      </div>
    </div>
  );
}
