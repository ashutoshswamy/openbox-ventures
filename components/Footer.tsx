import Image from "next/image";
import Link from "next/link";
import { services, company, socials } from "@/lib/data";
import { Offices } from "./Offices";

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

const labelClass = "text-body-sm font-semibold text-paper";

export function Footer() {

  return (
    <footer className="border-t border-line px-6 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-7xl">
        {/* sign-off: one big address to write to */}
        <div className="flex flex-col gap-10 pb-16 md:flex-row md:items-end md:justify-between md:pb-24">
          <div>
            <p className="text-body-sm font-medium text-accent">Have a brief?</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-4 block break-all font-display text-[clamp(30px,6vw,88px)] leading-[0.98] transition-colors hover:text-accent"
            >
              {company.email}
            </a>
          </div>
          <a
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className="text-body-lg text-paper/70 transition-colors hover:text-accent"
          >
            {company.phone}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line py-14 md:grid-cols-[1.2fr_1.4fr_0.7fr_0.7fr]">
          <div className="col-span-2 md:col-span-1">
            <Image src="/logo_nobg.png" alt="Open Box Ventures LLP" width={64} height={64} className="h-16 w-16" />
            <p className="mt-5 max-w-xs text-body-sm text-paper/60">{company.tagline}</p>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className={labelClass}>Services</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 text-body-sm text-paper/70 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-accent">
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
                  <Link href={l.href} className="transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={labelClass}>Follow</p>
            <ul className="mt-4 space-y-2 text-body-sm text-paper/70">
              {socials.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize transition-colors hover:text-accent"
                  >
                    {s.network === "x" ? "X" : s.network}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line py-12">
          <p className={labelClass}>Offices</p>
          <div className="mt-8">
            <Offices />
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-body-sm text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 {company.legalName}. All rights reserved.
          </p>
          <a href="#top" className="transition-colors hover:text-accent">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
