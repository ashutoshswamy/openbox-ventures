import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { services, company } from "@/lib/data";
import { Offices } from "./Offices";

const socials = [
  { network: "linkedin", url: "https://in.linkedin.com/company/open-box-ventures-llp" },
  { network: "instagram", url: "https://instagram.com/openboxventures" },
  { network: "x", url: "https://x.com/openboxventures" },
];

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/life", label: "Life at OBV" },
  { href: "/outcomes", label: "Outcomes" },
  { href: "/contact", label: "Contact" },
];

const labelClass = "font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/50";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <Image src="/logo_nobg.png" alt="Open Box Ventures LLP" width={40} height={40} className="h-10 w-10" />
            <p className="mt-4 max-w-xs text-body-sm text-paper/60">{company.tagline} {company.blurb}</p>
          </div>

          <div className="border-t border-line pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-8">
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

          <div className="border-t border-l border-line pt-8 pl-8 md:border-t-0 md:pt-0">
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

        <div className="mt-12 border-t border-line pt-8">
          <p className={labelClass}>Offices</p>
          <div className="mt-8">
            <Offices />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 text-body-sm text-paper/55 md:flex-row md:items-center md:justify-between">
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
