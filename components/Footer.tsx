import Image from "next/image";
import { SocialIcon } from "react-social-icons";

const socials = [
  { network: "linkedin", url: "https://linkedin.com/company/openbox-ventures" },
  { network: "instagram", url: "https://instagram.com/openboxventures" },
  { network: "x", url: "https://x.com/openboxventures" },
];

const siteLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

const footerLabelClass = "font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/50";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <Image src="/logo_nobg.png" alt="Open Box Ventures LLP" width={40} height={40} className="h-10 w-10" />
            <p className="mt-4 max-w-xs text-body-sm text-paper/60">
              Media, content, and strategy for shows that have to land, live, once.
            </p>
          </div>

          <div className="border-t border-line pt-8 md:border-t-0 md:pt-0 md:border-l md:pl-8">
            <p className={footerLabelClass}>Services</p>
            <ul className="mt-4 space-y-2 text-body-sm text-paper/70">
              <li>Media Management</li>
              <li>Content Creation & Execution</li>
              <li>Strategy & Consulting</li>
            </ul>
          </div>

          <div className="border-t border-l border-line pt-8 pl-8 md:border-t-0 md:pt-0">
            <p className={footerLabelClass}>Site</p>
            <ul className="mt-4 space-y-2 text-body-sm text-paper/70">
              {siteLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition-colors hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 text-body-sm text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Open Box Ventures LLP. All rights reserved.</p>
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
