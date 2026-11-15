"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { services } from "@/lib/data";
import { LinkButton } from "./Button";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services", services: true },
  { href: "/industries", label: "Industries" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // mobile menu
  const [servicesOpen, setServicesOpen] = useState(false); // desktop dropdown
  const [mobileServices, setMobileServices] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const closeMobile = () => {
    setOpen(false);
    setMobileServices(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-6 md:px-10">
          <Link href="/" aria-label="Open Box Ventures LLP - home" className="flex items-center gap-3">
            <Image src="/logo_nobg.png" alt="" width={40} height={40} priority className="h-10 w-10" />
            <span className="hidden font-display text-[17px] leading-none sm:block">Open Box Ventures</span>
          </Link>

          <ul className="hidden items-center gap-9 text-body-sm font-medium md:flex">
            {links.map((l) => (
              <li
                key={l.href}
                className="relative"
                onMouseEnter={l.services ? () => setServicesOpen(true) : undefined}
                onMouseLeave={l.services ? () => setServicesOpen(false) : undefined}
                onFocus={l.services ? () => setServicesOpen(true) : undefined}
                onBlur={
                  l.services
                    ? (e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
                      }
                    : undefined
                }
              >
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`inline-flex items-center gap-1 border-b-2 py-1 transition-colors hover:text-accent ${
                    isActive(l.href) ? "border-accent text-paper" : "border-transparent text-paper/75"
                  }`}
                >
                  {l.label}
                  {l.services && <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.8} />}
                </Link>

                {l.services && (
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-4"
                      >
                        <div className="border border-line bg-ink p-2">
                          {services.map((s) => (
                            <Link
                              key={s.slug}
                              href={`/services/${s.slug}`}
                              className="block px-3 py-2.5 text-body-sm text-paper/75 transition-colors hover:bg-accent hover:text-ink"
                            >
                              {s.name}
                            </Link>
                          ))}
                          <Link
                            href="/services"
                            className="mt-1 flex items-center justify-between border-t border-line px-3 pb-2 pt-3 text-body-sm font-semibold text-paper transition-colors hover:text-accent"
                          >
                            All services
                            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          <LinkButton href="/contact" className="hidden !h-11 !px-5 md:inline-flex">
            Start a project
          </LinkButton>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-0.5 w-6 bg-paper transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 w-6 bg-paper transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-paper transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-16 pt-24 md:hidden"
          >
            {links.map((l) =>
              l.services ? (
                <div key={l.href} className="border-b border-line py-4">
                  <button
                    onClick={() => setMobileServices((v) => !v)}
                    aria-expanded={mobileServices}
                    className="flex w-full items-center justify-between font-display text-[32px] leading-none"
                  >
                    Services
                    <ChevronDown
                      className={`h-6 w-6 transition-transform ${mobileServices ? "rotate-180" : ""}`}
                      strokeWidth={1.6}
                    />
                  </button>
                  {mobileServices && (
                    <div className="mt-4 flex flex-col gap-1">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          onClick={closeMobile}
                          className="py-2 text-body-base text-paper/75"
                        >
                          {s.name}
                        </Link>
                      ))}
                      <Link href="/services" onClick={closeMobile} className="py-2 text-body-base font-semibold text-accent">
                        All services
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMobile}
                  className="border-b border-line py-4 font-display text-[32px] leading-none"
                >
                  {l.label}
                </Link>
              ),
            )}
            <LinkButton href="/contact" onClick={closeMobile} className="mt-8">
              Start a project
            </LinkButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
