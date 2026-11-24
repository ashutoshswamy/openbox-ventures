"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, SplitText } from "@/lib/gsap";
import { services } from "@/lib/data";
import { ShaderBackground } from "@/components/ui/adisyon-shader";

/** Tune everything here. */
const CONFIG = {
  curtainCount: 5,
  leave: { curtain: 0.6, stagger: 0.06, ease: "power4.inOut", content: 0.4, contentStagger: 0.04, contentEase: "power2.in" },
  enter: { curtain: 0.6, stagger: 0.06, ease: "power4.inOut", content: 0.7, contentStagger: 0.06, contentEase: "power3.out", overlap: 0.3 },
  reduced: 0.2, // crossfade seconds under prefers-reduced-motion
};

/** Nav order decides direction: moving right rises the curtains from the bottom, moving left drops them from the top. */
const ORDER = ["/", "/about", "/team", "/services", "/industries", "/contact"];
const NAMES: Record<string, string> = { "/": "Home", "/about": "About", "/team": "Team", "/services": "Services", "/industries": "Industries", "/contact": "Contact" };

const slot = (path: string) => {
  const i = ORDER.findIndex((p) => (p === "/" ? path === "/" : path === p || path.startsWith(p + "/")));
  return i < 0 ? ORDER.length : i;
};
const labelFor = (path: string) => {
  const svc = services.find((s) => path === `/services/${s.slug}`);
  return svc ? svc.name : NAMES[path] ?? NAMES["/" + path.split("/")[1]] ?? "Open Box";
};

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Shared transition shell, mounted once in the layout (never remounts between routes).
 * Clicks on internal links are intercepted: LEAVE (curtains cover) -> router.push -> SWAP (new route
 * committed while covered) -> ENTER (curtains lift, new content resolves). Back/forward and the first
 * visit play ENTER only. Links stay real <a href>, so it degrades to normal navigation without JS.
 */
export function PageTransition() {
  const root = useRef<HTMLDivElement>(null);
  const live = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const s = useRef({ busy: false, pending: null as string | null, dir: 1, first: true, split: null as SplitText | null, fallback: 0 });

  const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel, root.current ?? undefined);
  const content = () => gsap.utils.toArray<HTMLElement>("main > *");
  // ScrollTrigger pin-spacers own their transform/layout: fade and blur those, never translate them
  const movers = () => content().filter((el) => !el.classList.contains("pin-spacer"));

  // The curtain is ONE shader "fog" layer revealed through N columns. Each column's height lives in a proxy
  // (so GSAP can stagger it) and is painted as a polygon clip-path.
  const cols = useRef(Array.from({ length: CONFIG.curtainCount }, () => ({ h: 0 })));
  const origin = useRef<"top" | "bottom">("bottom");
  const paint = () => {
    const fog = root.current?.querySelector<HTMLElement>(".pt-fog");
    if (!fog) return;
    const n = cols.current.length;
    const x = (i: number) => (i / n) * 100;
    const bottom = origin.current === "bottom";
    const top = (i: number) => (bottom ? 100 * (1 - cols.current[i].h) : 0);
    const bot = (i: number) => (bottom ? 100 : 100 * cols.current[i].h);
    const pts: string[] = [];
    for (let i = 0; i < n; i++) pts.push(`${x(i)}% ${top(i)}%`, `${x(i + 1)}% ${top(i)}%`);
    for (let i = n - 1; i >= 0; i--) pts.push(`${x(i + 1)}% ${bot(i)}%`, `${x(i)}% ${bot(i)}%`);
    fog.style.clipPath = `polygon(${pts.join(",")})`;
  };
  const fogDisplay = (on: boolean) => gsap.set(q(".pt-fog"), { display: on ? "block" : "none" });

  const setLabel = (text: string) => {
    const el = root.current!.querySelector<HTMLElement>(".pt-label-text")!;
    s.current.split?.revert();
    el.textContent = text;
    s.current.split = SplitText.create(el, { type: "chars", mask: "chars" });
    if (live.current) live.current.textContent = `${text} page`;
    return s.current.split;
  };

  /** LEAVE: freeze the page, content lifts and blurs out, curtains rise, destination label reveals. */
  const leave = (to: string, dir: number) => {
    const st = s.current;
    st.busy = true;
    window.dispatchEvent(new CustomEvent("pt:navigate", { detail: to }));
    document.body.style.pointerEvents = "none";
    if (reduced()) return gsap.to("main", { opacity: 0, duration: CONFIG.reduced }).then();
    const L = CONFIG.leave;
    const split = setLabel(labelFor(to));
    return gsap
      .timeline()
      .to(content(), { opacity: 0, filter: "blur(8px)", stagger: L.contentStagger, duration: L.content, ease: L.contentEase }, 0)
      .to(movers(), { y: -40, stagger: L.contentStagger, duration: L.content, ease: L.contentEase }, 0)
      .call(() => {
        origin.current = dir > 0 ? "bottom" : "top";
        cols.current.forEach((c) => (c.h = 0));
        paint();
        fogDisplay(true);
      }, [], 0)
      .to(cols.current, { h: 1, duration: L.curtain, stagger: { each: L.stagger, from: "center" }, ease: L.ease, onUpdate: paint }, 0.001)
      .fromTo(q(".pt-label"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.2)
      .fromTo(split.chars, { yPercent: 110 }, { yPercent: 0, duration: 0.4, stagger: 0.02, ease: "power3.out" }, 0.2)
      .fromTo(q(".pt-progress"), { scaleX: 0 }, { scaleX: 1, duration: L.curtain, ease: "power2.inOut" }, 0)
      .then();
  };

  /** ENTER: label leaves, curtains lift from the top, new content resolves, overlapping the lift. */
  const enter = () => {
    const st = s.current;
    const done = () => {
      st.busy = false;
      document.body.style.pointerEvents = "";
      st.split?.revert();
      st.split = null;
      const target = document.querySelector<HTMLElement>("main h1") ?? document.querySelector<HTMLElement>("main");
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    };
    if (reduced()) {
      gsap.fromTo("main", { opacity: 0 }, { opacity: 1, duration: CONFIG.reduced, clearProps: "opacity", onComplete: done });
      return;
    }
    const E = CONFIG.enter;
    gsap.set(content(), { opacity: 0, filter: "blur(8px)" });
    gsap.set(movers(), { y: 60 });
    gsap
      .timeline({ onComplete: done })
      .to(q(".pt-label"), { y: -30, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
      .call(() => {
        origin.current = "top";
        paint();
      }, [], 0)
      .to(cols.current, { h: 0, duration: E.curtain, stagger: { each: E.stagger, from: "edges" }, ease: E.ease, onUpdate: paint, onComplete: () => void fogDisplay(false) }, 0.1)
      .to(q(".pt-progress"), { opacity: 0, duration: 0.2 }, 0.1)
      .to(content(), { opacity: 1, filter: "blur(0px)", stagger: E.contentStagger, duration: E.content, ease: E.contentEase, clearProps: "filter,opacity" }, 0.1 + E.curtain - E.overlap)
      .to(movers(), { y: 0, stagger: E.contentStagger, duration: E.content, ease: E.contentEase, clearProps: "transform" }, 0.1 + E.curtain - E.overlap)
      .set(q(".pt-progress"), { scaleX: 0, opacity: 1 });
  };

  // SWAP + ENTER: runs once the new route is committed, before paint, so it is still covered
  useLayoutEffect(() => {
    const st = s.current;
    history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    window.clearTimeout(st.fallback);
    if (st.first || !st.pending) {
      // first visit, or back/forward: cover instantly, then play ENTER only
      st.busy = true;
      if (!reduced()) {
        origin.current = "top";
        cols.current.forEach((c) => (c.h = 1));
        paint();
        fogDisplay(true);
      } else fogDisplay(false);
      setLabel(labelFor(pathname));
      gsap.set(q(".pt-label"), { opacity: 0 });
    }
    st.first = false;
    st.pending = null;
    enter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const st = s.current;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.origin !== location.origin) return;
      const path = a.pathname;
      if (path === location.pathname) return; // same page or hash jump: normal behaviour
      e.preventDefault();
      e.stopPropagation(); // keeps next/link from also navigating
      if (st.busy) return; // ignore repeat clicks while animating
      st.pending = path + a.search + a.hash;
      st.dir = slot(path) >= slot(location.pathname) ? 1 : -1;
      leave(path, st.dir).then(() => {
        router.push(st.pending!);
        // safety: if the route never commits, lift the curtains anyway
        st.fallback = window.setTimeout(() => {
          st.pending = "";
          enter();
        }, 4000);
      });
    };

    // prefetch on hover so the swap is instant
    const onOver = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a");
      if (a && a.origin === location.origin && a.pathname !== location.pathname) router.prefetch(a.pathname);
    };

    // press T: replay the transition without navigating
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "t" || e.metaKey || e.ctrlKey || /input|textarea|select/i.test((e.target as Element).tagName)) return;
      if (st.busy) return;
      leave(location.pathname, 1).then(enter);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseover", onOver);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <noscript>
        <style>{`.pt-fog{display:none!important}`}</style>
      </noscript>
      <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[999]">
        <div className="pt-fog absolute inset-0">
          <ShaderBackground className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0620]/60 via-[#0a0620]/25 to-[#0a0620]/10" />
        </div>
        <div className="pt-label absolute inset-0 flex items-center justify-center opacity-0">
          <span className="rounded-full border-[1.5px] border-white/70 bg-white/5 px-[0.8em] py-[0.15em] font-display text-[clamp(28px,5vw,64px)] uppercase tracking-[0.06em] text-white backdrop-blur-sm">
            <span className="pt-label-text inline-block">Open Box</span>
          </span>
        </div>
        <div className="pt-progress absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white" style={{ transform: "scaleX(0)" }} />
      </div>
      <div ref={live} role="status" aria-live="polite" className="sr-only" />
    </>
  );
}
