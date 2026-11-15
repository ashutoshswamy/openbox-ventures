import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
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
      <PageHeader title={service.name} intro={service.tagline} />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <ScrollReveal>
            <p className="text-body-lg text-paper/80">{service.summary}</p>
            <p className="mt-8 border-l-2 border-accent pl-5 font-display text-display-md leading-[1.1]">
              {service.outcome}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            {/* swap the image in lib/data.ts; any 4:3 image fits the frame */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-ink">
              <Image
                src={service.image}
                alt={`${service.name} at Open Box Ventures LLP`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-4"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-24">
          <h2 className="font-display text-display-md">What&apos;s included</h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
            {service.offerings.map((o) => (
              <li key={o} className="flex items-start gap-3 text-body-lg text-paper/85">
                <Check className="mt-1.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
                {o}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-paper px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <ScrollHeadline className="font-display text-display-lg leading-[0.98]">Other services</ScrollHeadline>
          <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="flex items-start justify-between gap-3 border border-ink/30 p-5 text-body-base font-semibold transition-colors hover:bg-accent hover:border-accent"
              >
                {s.name}
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA headline={`Have a ${service.name.toLowerCase()} brief?`} />
    </>
  );
}
