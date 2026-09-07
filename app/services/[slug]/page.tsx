import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/CTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ScrollHeadline } from "@/components/ScrollHeadline";
import { services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHeader eyebrow="Service" title={service.name} intro={service.tagline} />

      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <ScrollReveal>
            <p className="text-body-lg text-paper/75">{service.summary}</p>
            <p className="mt-6 font-mono text-utility-sm uppercase tracking-[0.15em]" style={{ color: service.accent }}>
              {service.outcome}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="relative aspect-video w-full overflow-hidden rounded-panel border border-line">
              <Image
                src={service.image}
                alt={`${service.name} at Open Box Ventures`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-20 border-t border-line pt-12">
          <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">What&apos;s included</p>
          <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
            {service.offerings.map((o) => (
              <li key={o} className="flex gap-3 border-b border-line pb-4 text-body-base text-paper/80">
                <span style={{ color: service.accent }}>—</span>
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <ScrollHeadline className="font-display text-display-lg leading-tight">Other services</ScrollHeadline>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="border-t border-line pt-4 text-body-base text-paper/70 transition-colors hover:text-paper"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA headline={`Have a ${service.name.toLowerCase()} brief?`} />
    </>
  );
}
