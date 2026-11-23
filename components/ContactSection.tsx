"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { useMagnetic } from "@/lib/useMagnetic";
import { Button, ButtonLink } from "./Button";
import { ArrowDown, Check, Mail, MapPin, Phone } from "lucide-react";
import { company, services } from "@/lib/data";

const fieldLabelClass = "text-body-sm font-medium";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const magneticBtn = useMagnetic<HTMLButtonElement>(0.3);
  const btnDefaultRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSent(true);
      return;
    }

    gsap.to(btnDefaultRef.current, { opacity: 0, y: -8, duration: DUR.fast, ease: EASE.smoothIn, onComplete: () => setSent(true) });
  };

  return (
    <>
      <section id="contact" className="relative flex min-h-svh items-center overflow-hidden px-6 pb-16 pt-32 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10">
            <ScrollHeadline as="h1" className="font-display text-[clamp(44px,6vw,88px)] leading-[0.96]">
              Bring us the brief.
            </ScrollHeadline>
            <ScrollReveal delay={0.05}>
              <p className="mt-6 max-w-md text-body-lg text-paper/70">
                Tell us what you&apos;re trying to do. We&apos;ll come back with how we&apos;d do it - and who&apos;d run it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="#brief">
                  Send a brief
                  <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
                </ButtonLink>
                <ButtonLink href={`mailto:${company.email}`} variant="outline">
                  {company.email}
                </ButtonLink>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/contact.png"
                alt="A project brief form connected to offices in India, USA, Canada and the UAE"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="brief" className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <ScrollHeadline className="font-display text-display-lg leading-[1.05]">Project brief</ScrollHeadline>
            <ScrollReveal delay={0.05}>
              <p className="mt-4 max-w-sm text-body-base text-paper/60">
                Takes a minute. We reply within one business day.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <dl className="mt-12 divide-y divide-line border-y border-line">
                {[
                  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
                  { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
                  { icon: MapPin, label: "Headquarters", value: "Mohali, Punjab, India" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 py-5">
                    <Icon className="h-5 w-5 shrink-0 text-paper/60" strokeWidth={1.5} />
                    <div className="min-w-0">
                      <dt className={`${fieldLabelClass} text-paper/45`}>{label}</dt>
                      <dd className="mt-1 break-words text-body-base text-paper">
                        {href ? (
                          <a href={href} className="transition-colors hover:text-paper/70">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            {sent ? (
              <div className="flex min-h-96 flex-col items-center justify-center rounded-panel border border-line text-center">
                <Check className="h-8 w-8 text-accent-2" strokeWidth={1.4} />
                <p className="mt-6 font-display text-display-md">Thanks - we&apos;ll be in touch.</p>
                {/* form is not yet wired to a backend/CRM */}
                <p className="mt-2 text-body-sm text-paper/60">We&apos;ll follow up within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
                  <Field label="Name" name="name" autoComplete="name" required />
                  <Field label="Company" name="company" autoComplete="organization" hint="Optional" />
                </div>
                <Field label="Email" name="email" type="email" autoComplete="email" required />
                <fieldset>
                  <legend className="text-body-sm font-medium text-paper/70">What do you need? *</legend>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {[...services.map((s) => ({ value: s.slug, label: s.name })), { value: "multiple", label: "Not sure yet" }].map((o, i) => (
                      <label key={o.value} className="cursor-pointer">
                        <input type="radio" name="service-area" value={o.value} required={i === 0} className="peer sr-only" />
                        <span className="inline-flex h-11 items-center rounded-full border border-paper/35 px-5 text-body-sm transition-colors hover:border-paper peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                          {o.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field label="The brief" name="message" textarea required hint="Goals, timeline, anything we should know." />
                <Button ref={magneticBtn} type="submit" disabled={submitting} className="relative w-full overflow-hidden sm:w-auto sm:min-w-56">
                  <span ref={btnDefaultRef}>Send brief</span>
                </Button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  required,
  textarea = false,
  type = "text",
  hint,
  autoComplete,
}: {
  label: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
  hint?: string;
  autoComplete?: string;
}) {
  const cls =
    "mt-2 w-full border-0 border-b border-paper/35 bg-transparent py-3 text-body-lg text-paper outline-none transition-colors placeholder:text-paper/40 hover:border-paper/70 focus:border-accent";
  return (
    <div>
      <label htmlFor={name} className="text-body-sm font-medium text-paper/70">
        {label}
        {required && " *"}
      </label>
      {textarea ? (
        <textarea id={name} name={name} required={required} rows={4} placeholder={hint} className={`${cls} resize-none`} />
      ) : (
        <input id={name} name={name} type={type} required={required} autoComplete={autoComplete} placeholder={hint} className={cls} />
      )}
    </div>
  );
}
