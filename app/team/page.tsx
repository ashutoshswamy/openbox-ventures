import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { ScrollReveal, StaggerGroup, StaggerChild } from "@/components/ScrollReveal";
import { company, founders, members } from "@/lib/data";

export const metadata: Metadata = {
  title: "Team",
  description: `The founders and members of ${company.name}.`,
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

function Person({ name, role, photo, large }: { name: string; role: string; photo?: string; large?: boolean }) {
  return (
    <StaggerChild className="group">
      {/* ponytail: monogram until real portraits exist; swap for next/image */}
      <div
        aria-hidden={!photo}
        className={`relative flex items-end overflow-hidden border-t-2 border-accent bg-gradient-to-b from-paper/[0.04] to-paper/[0.1] p-6 font-display leading-[0.8] text-paper/90 transition-colors duration-500 group-hover:from-accent group-hover:to-accent group-hover:text-ink ${
          large ? "aspect-[4/5] text-[clamp(120px,18vw,260px)]" : "aspect-square text-[clamp(64px,8vw,112px)]"
        }`}
      >
        {photo ? (
          <>
            <Image src={photo} alt={`${name}, ${role}`} fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
          </>
        ) : (
          <span className="origin-bottom-left transition-transform duration-500 ease-out group-hover:scale-105">{initials(name)}</span>
        )}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <h2 className={`font-display leading-[1.02] ${large ? "text-[clamp(32px,4vw,56px)]" : "text-display-md"}`}>{name}</h2>
        <p className="rounded-full border border-paper/35 px-4 py-1.5 text-body-sm text-paper/80">{role}</p>
      </div>
    </StaggerChild>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHeader title="The people behind the LLP." intro={`${company.name} is run by its partners. Meet the founders.`} />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        {/* asymmetric: second founder drops down on desktop, one column under md */}
        <StaggerGroup className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
          {founders.map((f, i) => (
            <div key={f.name} className={i % 2 ? "md:mt-32" : ""}>
              <Person {...f} large />
            </div>
          ))}
        </StaggerGroup>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <h2 className="font-display text-display-lg leading-[0.98]">Members</h2>
          </ScrollReveal>
          {members.length ? (
            <StaggerGroup className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
              {members.map((m) => (
                <Person key={m.name} {...m} />
              ))}
            </StaggerGroup>
          ) : (
            <ScrollReveal delay={0.05}>
              <p className="mt-6 max-w-md text-body-lg text-paper/70">Members will be listed here as they join the LLP.</p>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
