import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { services, company, offices } from "@/lib/data";
import { Offices } from "./Offices";

const socials = [
  { network: "linkedin", url: "https://in.linkedin.com/company/open-box-ventures-llp" },
  { network: "instagram", url: "https://instagram.com/openboxventures" },
  { network: "x", url: "https://x.com/openboxventures" },
];

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/contact", label: "Contact" },
];

const labelClass = "font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/50";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 pb-10 pt-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 border-b border-line pb-16 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl font-display text-display-lg leading-[1.05]">Have a brief? Let&apos;s talk.</p>
          <Link
            href="/contact"
            className="inline-flex h-14 shrink-0 items-center justify-center rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
          >
            Start a Project
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-[1.4fr_1fr_0.7fr]">
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo_nobg.png" alt="Open Box Ventures LLP" width={64} height={64} className="h-16 w-16" />
            <p className="mt-5 max-w-xs text-body-sm text-paper/60">{company.tagline}</p>
            <ul className="mt-5 space-y-1 text-body-sm text-paper/70">
              <li>
                <a href={`mailto:${company.email}`} className="transition-colors hover:text-paper">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-paper">
                  {company.phone}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={labelClass}>Services</p>
            <ul className="mt-4 space-y-2 text-body-sm text-paper/70">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-paper">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={labelClass}>Company</p>
            <ul className="mt-4 space-y-2 text-body-sm text-paper/70">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-line py-12">
          <p className={labelClass}>Offices</p>
          <p className="mt-4 max-w-3xl font-display text-display-lg leading-[1.05]">
            {offices.length} offices. {new Set(offices.map((o) => o.country)).size} countries. {new Set(offices.map((o) => o.timezone)).size} time zones.
          </p>
          <div className="mt-12">
            <Offices />
          </div>
        </div>

        <div className="flex flex-col gap-6 border-t border-line pt-8 text-body-sm text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {company.founded}–{year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            {socials.map((s) => (
              <SocialIcon
                key={s.network}
                network={s.network}
                url={s.url}
                target="_blank"
                rel="noopener noreferrer"
                bgColor="transparent"
                fgColor="var(--color-paper)"
                style={{ height: 44, width: 44 }}
                className="opacity-60 transition-opacity hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
