import Image from "next/image";
import { StaggerChild, StaggerGroup } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { differentiators } from "@/lib/data";

// same order as `differentiators`
const images = ["roof", "multidisciplinary", "international", "goals"];

/** Four cells, two rows (4+2, 2+4 columns). Each cell is a different surface: black, black, white, black. */
const cells = [
  { span: "lg:col-span-4", surface: "border border-line", muted: "text-paper/65", layout: "lg:flex-row" },
  { span: "lg:col-span-2", surface: "border border-line", muted: "text-paper/65", layout: "" },
  { span: "lg:col-span-2", surface: "on-paper", muted: "text-ink/70", layout: "" },
  { span: "lg:col-span-4", surface: "border border-line", muted: "text-paper/65", layout: "lg:flex-row" },
] as const;

export function WhyUs() {
  return (
    <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <ScrollHeadline className="max-w-3xl font-display text-display-lg leading-[0.98]">
          Why Open Box Ventures
        </ScrollHeadline>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-6">
          {differentiators.map((d, i) => {
            const c = cells[i];
            return (
              <StaggerChild
                key={d.title}
                className={`group flex flex-col justify-between gap-8 p-6 md:p-9 ${c.span} ${c.surface} ${c.layout}`}
              >
                <div className="flex max-w-md flex-col justify-end">
                  <h3 className="font-display text-display-md leading-[1.05]">{d.title}</h3>
                  <p className={`mt-3 text-body-base ${c.muted}`}>{d.body}</p>
                </div>
                <span className={`relative block aspect-[4/3] w-full shrink-0 self-end sm:w-64 lg:w-72 ${c.surface === "on-paper" ? "bg-ink" : ""}`}>
                  <Image
                    src={`/whyobv/${images[i]}.png`}
                    alt=""
                    fill
                    sizes="288px"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </span>
              </StaggerChild>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
