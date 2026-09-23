"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { useFloatLabel } from "@/lib/useFloatLabel";
import { useFieldFocus } from "@/lib/useFieldFocus";
import { useMagnetic } from "@/lib/useMagnetic";
import { ArrowDown, Check, Mail, MapPin, Phone } from "lucide-react";
import { company, services } from "@/lib/data";

const fieldLabelClass = "font-mono text-utility-xs uppercase tracking-[0.15em]";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const magneticBtn = useMagnetic<HTMLButtonElement>(0.3);
  const btnDefaultRef = useRef<HTMLSpanElement>(null);
  const btnSentRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSent(true);
      return;
    }

    gsap
      .timeline({ onComplete: () => setSent(true) })
      .to(btnDefaultRef.current, { yPercent: -100, opacity: 0, duration: DUR.fast, ease: EASE.smoothIn })
      .fromTo(
        btnSentRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: DUR.fast, ease: EASE.smooth },
        "-=0.15",
      )
      .to({}, { duration: 0.5 });
  };

  return (
    <>
      <section id="contact" className="relative flex min-h-svh items-center overflow-hidden px-6 pb-16 pt-32 md:px-10">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10">
            <ScrollReveal>
              <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Get In Touch</p>
            </ScrollReveal>
            <ScrollHeadline className="mt-6 font-display text-[clamp(44px,6vw,88px)] leading-[0.96]">
              Bring us the brief.
            </ScrollHeadline>
            <ScrollReveal delay={0.05}>
              <p className="mt-6 max-w-md text-body-lg text-paper/70">
                Tell us what you&apos;re trying to do. We&apos;ll come back with how we&apos;d do it — and who&apos;d run it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#brief"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-panel bg-paper px-7 text-body-sm font-medium text-ink"
                >
                  Send a brief
                  <ArrowDown className="h-4 w-4" strokeWidth={1.6} />
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex h-14 items-center justify-center rounded-panel border border-paper/30 px-7 text-body-sm font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                >
                  {company.email}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1}>
            <Image
              src="/contact.png"
              alt="A project brief form connected to offices in India, USA, Canada and the UAE"
              width={1536}
              height={1024}
              priority
              className="h-auto w-full scale-110 mix-blend-screen [mask-image:radial-gradient(ellipse_68%_68%_at_50%_50%,#000_55%,transparent_100%)] lg:scale-125"
            />
          </ScrollReveal>
        </div>
      </section>

      <section id="brief" className="border-t border-line px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
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
                <Check className="h-8 w-8 text-paper" strokeWidth={1.4} />
                <p className="mt-6 font-display text-display-md">Thanks — we&apos;ll be in touch.</p>
                {/* form is not yet wired to a backend/CRM */}
                <p className="mt-2 text-body-sm text-paper/60">We&apos;ll follow up within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatField label="Name" name="name" required />
                  <FloatField label="Company" name="company" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatField label="Email" name="email" type="email" required />
                  <SelectField />
                </div>
                <FloatField label="Message" name="message" textarea required />
                <button
                  ref={magneticBtn}
                  type="submit"
                  disabled={submitting}
                  className="relative block h-14 w-full overflow-hidden rounded-panel bg-paper font-body text-body-sm font-medium text-ink"
                >
                  <span ref={btnDefaultRef} className="absolute inset-0 flex items-center justify-center">
                    Send Brief
                  </span>
                  <span ref={btnSentRef} className="absolute inset-0 flex items-center justify-center gap-2 opacity-0">
                    <Check className="h-4 w-4" strokeWidth={1.4} />
                    Sent
                  </span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

function SelectField() {
  const { fieldRef, onFocus, onBlur } = useFieldFocus<HTMLSelectElement>();

  return (
    <div>
      <select
        ref={fieldRef}
        id="service-area"
        name="service-area"
        aria-label="Area of interest"
        required
        defaultValue=""
        onFocus={onFocus}
        onBlur={onBlur}
        className="h-14 w-full rounded-panel border border-line bg-transparent px-4 font-body text-body-sm text-paper outline-none"
      >
        <option value="" disabled hidden className="bg-ink">
          Area of interest
        </option>
        {services.map((s) => (
          <option key={s.slug} value={s.slug} className="bg-ink">
            {s.name}
          </option>
        ))}
        <option value="multiple" className="bg-ink">Multiple / not sure yet</option>
      </select>
    </div>
  );
}

function FloatField({
  label,
  name,
  required,
  textarea = false,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
  type?: string;
}) {
  const { labelRef, fieldRef, onFocus, onBlur } = useFloatLabel<HTMLInputElement | HTMLTextAreaElement>();
  const baseClass = "w-full rounded-panel border border-line bg-transparent px-4 font-body text-body-sm text-paper outline-none";

  return (
    <div className="relative">
      <label
        ref={labelRef}
        htmlFor={name}
        className={`pointer-events-none absolute left-4 ${textarea ? "top-4" : "top-1/2 -translate-y-1/2"} ${fieldLabelClass} text-paper/55`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={fieldRef as React.Ref<HTMLTextAreaElement>}
          id={name}
          name={name}
          required={required}
          rows={4}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`${baseClass} resize-none pb-2.5 pt-6`}
        />
      ) : (
        <input
          type={type}
          ref={fieldRef as React.Ref<HTMLInputElement>}
          id={name}
          name={name}
          required={required}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`${baseClass} h-14 pt-4`}
        />
      )}
    </div>
  );
}
