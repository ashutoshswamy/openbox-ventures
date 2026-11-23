import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollHeadline } from "./ScrollHeadline";
import { ScrollReveal, StaggerChild, StaggerGroup } from "./ScrollReveal";
import { LinkButton } from "./Button";
import { serviceImages } from "./Bento";
import { services } from "@/lib/data";

/**
 * Asymmetric 6-column mosaic: four rows of two cells whose widths trade places (4+2, 2+4, 3+3, 4+2), so the
 * grid has rhythm instead of eight identical tiles. Eight services, eight cells, no empty slots. Wide cells lay
 * out text beside the cut-out, narrow ones stack it. Surfaces are flat and drawn from the ember / plum / indigo
 * family, with one solid ember cell and one paper cell for contrast. Under lg it collapses to one column.
 */
const cells = [
  { span: "lg:col-span-4", wide: true, bg: "#17101f", fg: "text-paper", muted: "text-paper/70" },
  { span: "lg:col-span-2", wide: false, bg: "var(--color-accent)", fg: "text-ink", muted: "text-ink/80" },
  { span: "lg:col-span-2", wide: false, bg: "#10122a", fg: "text-paper", muted: "text-paper/70" },
  { span: "lg:col-span-4", wide: true, bg: "#1f120d", fg: "text-paper", muted: "text-paper/70" },
  { span: "lg:col-span-3", wide: true, bg: "#17101f", fg: "text-paper", muted: "text-paper/70" },
  { span: "lg:col-span-3", wide: true, bg: "var(--color-paper)", fg: "text-ink", muted: "text-ink/75" },
  { span: "lg:col-span-4", wide: true, bg: "#10122a", fg: "text-paper", muted: "text-paper/70" },
  { span: "lg:col-span-2", wide: false, bg: "#1f120d", fg: "text-paper", muted: "text-paper/70" },
] as const;

export function ServicesIndex({
  title = "Eight services. One brief.",
  body = "Pick one discipline or hand us the whole thing. Either way a single team owns the result.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-line bg-ink px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-4xl font-display text-[clamp(40px,6.4vw,96px)] leading-[0.94]">
          {title}
        </ScrollHeadline>
        <ScrollReveal delay={0.1}>
          <p className="mt-6 max-w-md text-body-lg text-paper/75">{body}</p>
        </ScrollReveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:gap-4" stagger={0.07}>
          {services.map((s, i) => {
            const c = cells[i];
            return (
              <StaggerChild key={s.slug} className={`${c.span} sm:col-span-1`}>
                <Link
                  href={`/services/${s.slug}`}
                  style={{ background: c.bg }}
                  className={`group relative flex h-full min-h-72 overflow-hidden border border-line p-6 transition-[border-color] duration-300 hover:border-accent md:p-8 ${c.fg} ${
                    c.wide ? "flex-col justify-between gap-6 lg:flex-row" : "flex-col justify-between gap-6"
                  }`}
                >
                  <span className={`relative z-10 flex flex-col justify-between gap-6 ${c.wide ? "lg:max-w-[48%]" : ""}`}>
                    <span className="block font-display text-[clamp(26px,2.6vw,40px)] leading-[1.05]">{s.name}</span>
                    <span className={`block text-body-base ${c.muted}`}>{s.tagline}</span>
                  </span>

                  <span
                    className={`relative block shrink-0 ${
                      c.wide ? "aspect-[4/3] w-full lg:w-[52%] lg:self-center" : "aspect-[4/3] w-full"
                    }`}
                  >
                    <Image
                      src={`/services/${serviceImages[s.slug]}.png`}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>

                  <ArrowUpRight
                    className="absolute right-5 top-5 z-10 h-6 w-6 opacity-60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    strokeWidth={1.8}
                  />
                </Link>
              </StaggerChild>
            );
          })}
        </StaggerGroup>

        <ScrollReveal delay={0.05} className="mt-12">
          <LinkButton href="/services" variant="outline">
            All services
          </LinkButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
