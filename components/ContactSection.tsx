"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { DUR, EASE } from "@/lib/motion-tokens";
import { ScrollReveal } from "./ScrollReveal";
import { ScrollHeadline } from "./ScrollHeadline";
import { useFloatLabel } from "@/lib/useFloatLabel";
import { useFieldFocus } from "@/lib/useFieldFocus";
import { useMagnetic } from "@/lib/useMagnetic";
import { Check } from "lucide-react";
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
    <section id="contact" className="border-t border-line px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <ScrollReveal>
            <p className="font-mono text-utility-sm uppercase tracking-[0.25em] text-paper/60">Get In Touch</p>
          </ScrollReveal>
          <ScrollHeadline className="mt-6 font-display text-display-xl leading-tight">
            Bring us the brief.
          </ScrollHeadline>
          <ScrollReveal delay={0.05}>
            <p className="mt-6 max-w-md text-body-lg text-paper/70">
              Tell us what you&apos;re trying to do. We&apos;ll come back with how we&apos;d do it —
              and who&apos;d run it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <dl className="mt-8 space-y-4 break-words text-body-sm text-paper/60">
              <div>
                <dt className="text-paper/55">Email</dt>
                <dd>{company.email}</dd>
              </div>
              <div>
                <dt className="text-paper/55">Phone</dt>
                <dd>{company.phone}</dd>
              </div>
              <div>
                <dt className="text-paper/55">Headquarters</dt>
                <dd>Mohali, Punjab, India</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1}>
          {sent ? (
            <div className="flex h-full min-h-72 flex-col items-center justify-center border-t border-line pt-8 text-center lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
              <p className="font-display text-display-md">Thanks — we&apos;ll be in touch.</p>
              {/* form is not yet wired to a backend/CRM */}
              <p className="mt-2 text-body-sm text-paper/60">We&apos;ll follow up within one business day.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 border-t border-line pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16"
            >
              <p className="font-mono text-utility-xs uppercase tracking-[0.15em] text-paper/50">Project Brief</p>
              <FloatField label="Name" name="name" required />
              <FloatField label="Company" name="company" />
              <SelectField />
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
  );
}

function SelectField() {
  const { fieldRef, onFocus, onBlur } = useFieldFocus<HTMLSelectElement>();

  return (
    <div>
      <label htmlFor="service-area" className={`mb-2 block ${fieldLabelClass} text-paper/55`}>
        Area of interest
      </label>
      <select
        ref={fieldRef}
        id="service-area"
        name="service-area"
        required
        defaultValue=""
        onFocus={onFocus}
        onBlur={onBlur}
        className="w-full rounded-panel border border-line bg-transparent px-4 py-3 font-body text-body-sm text-paper outline-none"
      >
        <option value="" disabled hidden className="bg-ink">
          Select one
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
}: {
  label: string;
  name: string;
  required?: boolean;
  textarea?: boolean;
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
          type="text"
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
