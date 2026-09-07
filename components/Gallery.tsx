"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { lifeGallery } from "@/lib/data";

// ponytail: tiles are placeholder gradients. Drop real images into /public and
// map them here (src + alt); the modal already handles the enlarged view.
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {lifeGallery.map((item, i) => (
          <button
            key={item.caption}
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-panel border border-line text-left"
            style={{ background: `linear-gradient(140deg, ${item.accent}44, var(--color-ink))` }}
          >
            <span className="absolute inset-x-0 bottom-0 p-3 text-body-sm text-paper/80 opacity-0 transition-opacity group-hover:opacity-100">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6 backdrop-blur"
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-panel border border-line text-paper"
            >
              <X className="h-5 w-5" strokeWidth={1.4} />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-panel border border-line"
              style={{ background: `linear-gradient(140deg, ${lifeGallery[active].accent}55, var(--color-ink))` }}
            >
              <div className="flex aspect-[16/10] items-end p-6">
                <p className="font-display text-display-md">{lifeGallery[active].caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
