import Link from "next/link";
import { services, company, socials } from "@/lib/data";
import { Offices } from "./Offices";
import { FooterWordmark } from "./FooterWordmark";

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

const colTitle = "text-body-sm font-semibold text-paper";
const link = "transition-colors hover:text-accent";

/**
 * Closing footer on a flat ink surface: the email is a centred outlined pill (the hero's pill, reused as the one
 * address to write to), a four-column index sits under it, offices run as a clock band, and the wordmark assembles
 * itself at the very bottom.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-6 pt-20 md:px-10 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-body-sm font-medium text-accent">Have a brief?</p>
          <a
            href={`mailto:${company.email}`}
            className="mx-auto mt-6 block w-fit max-w-full rounded-full border-2 border-paper/80 px-[0.7em] py-[0.18em] font-display text-[clamp(20px,4.6vw,72px)] leading-[1.05] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-ink"
          >
            {company.email}
          </a>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-line pt-12 lg:grid-cols-[1.2fr_1.5fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              className="inline-block font-display text-[clamp(22px,2.2vw,30px)] transition-colors hover:text-accent"
            >
              {company.phone}
            </a>
            <p className="mt-3 max-w-xs text-body-sm text-paper/60">{company.tagline}</p>
          </div>

          <nav aria-label="Footer" className="contents">
            <div className="col-span-2 lg:col-span-1">
              <p className={colTitle}>Services</p>
              <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 text-body-sm text-paper/75 sm:grid-cols-2 lg:grid-cols-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className={link}>
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={colTitle}>Company</p>
              <ul className="mt-4 space-y-2.5 text-body-sm text-paper/75">
                {siteLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={colTitle}>Follow</p>
              <ul className="mt-4 space-y-2.5 text-body-sm text-paper/75">
                {socials.map((s) => (
                  <li key={s.network}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={`capitalize ${link}`}>
                      {s.network === "x" ? "X" : s.network}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <p className={colTitle}>Offices</p>
          <div className="mt-8">
            <Offices />
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <FooterWordmark text="Open Box Ventures" />
        </div>

        <div className="flex flex-col gap-4 border-t border-line pb-28 pt-8 text-body-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {company.legalName}. All rights reserved.</p>
          <a href="#top" className={link}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
