import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDownRight } from "lucide-react";
import { serviceIcons } from "@/components/Bento";
import { company, services } from "@/lib/data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    openGraph: { title: `${service.name} - ${company.name}`, description: service.summary, url: `/services/${slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const index = services.findIndex((x) => x.slug === service.slug);
  const Icon = serviceIcons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug);

  const url = `${company.url}/services/${slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.name,
      description: service.summary,
      url,
      serviceType: service.name,
      provider: { "@id": `${company.url}/#organization` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.name} offerings`,
        itemListElement: service.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: company.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${company.url}/services` },
        { "@type": "ListItem", position: 3, name: service.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      {/* hairline bento, same language as the Services index */}
      <div className="grid grid-cols-1 border-t border-line [&>*]:border-b [&>*]:border-r [&>*]:border-line sm:grid-cols-2 lg:grid-cols-[repeat(24,minmax(0,1fr))]">
        <div className="flex min-h-72 items-center justify-center bg-ink px-8 py-12 sm:col-span-2 lg:col-span-8 lg:min-h-[420px]">
          <Icon className="h-32 w-32 text-accent md:h-40 md:w-40" strokeWidth={1} aria-hidden />
        </div>
        <div className="flex min-h-72 flex-col justify-center bg-ink px-8 py-12 sm:col-span-2 lg:col-span-16 lg:min-h-[420px] lg:px-14">
          <p className="text-body-sm text-paper/70">Service {String(index + 1).padStart(2, "0")}</p>
          <h1 className="mt-3 font-display text-[clamp(34px,5vw,72px)] font-semibold leading-[1.05]">{service.name}</h1>
          <p className="mt-5 max-w-2xl text-body-lg text-paper/75">{service.tagline}</p>
        </div>

        <div className="bg-ink px-8 py-12 sm:col-span-2 lg:col-span-12 lg:px-14 lg:py-16">
          <p className="text-body-sm uppercase tracking-[0.14em] text-accent">What we do</p>
          <p className="mt-5 text-body-lg text-paper/85">{service.summary}</p>
        </div>
        <div className="bg-ink px-8 py-12 sm:col-span-2 lg:col-span-12 lg:px-14 lg:py-16">
          <p className="text-body-sm uppercase tracking-[0.14em] text-accent">The outcome</p>
          <p className="mt-5 font-display text-[clamp(24px,2.6vw,38px)] leading-[1.15]">{service.outcome}</p>
        </div>

        {service.offerings.map((o, i) => (
          <div key={o} className="flex min-h-48 flex-col justify-between gap-8 bg-ink px-8 py-8 lg:col-span-8">
            <span className="font-display text-body-sm tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span>
            <p className="font-display text-[clamp(20px,1.9vw,28px)] leading-[1.2]">{o}</p>
          </div>
        ))}

        {others.map((s) => {
          const OtherIcon = serviceIcons[s.icon];
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex min-h-40 items-center gap-4 bg-ink px-6 py-8 transition-colors hover:bg-[#140f2a] lg:col-span-6"
            >
              <OtherIcon className="h-10 w-10 shrink-0 text-accent" strokeWidth={1.25} aria-hidden />
              <span className="min-w-0 font-display text-body-lg font-semibold leading-tight">{s.name}</span>
              <ArrowDownRight className="ml-auto h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1 group-hover:translate-y-1" strokeWidth={2.5} />
            </Link>
          );
        })}
        <Link href="/contact" className="flex min-h-40 items-center justify-center bg-accent px-6 py-8 font-display text-body-lg font-semibold text-ink transition-colors hover:bg-accent-2 sm:col-span-2 lg:col-span-6">
          Start a brief
        </Link>
      </div>
    </>
  );
}
