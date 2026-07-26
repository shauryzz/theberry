"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuX, LuArrowUpRight } from "react-icons/lu";
import { BOOKING } from "../data/booking";

// ──────────────────────────────────────────────────────────────────────────
// DayPassPickerModal
//
// Shows the day-pass options for every location that has them, side by side.
// Each row opens the booking platform in a new tab.
//
// ⚠️ NDA: the booking platform is never named anywhere in user-facing copy.
//    Say "a new tab" / "our booking platform" — never the vendor.
//
// ⚠️ Availability is by omission, site-wide. A location with no passes simply
//    doesn't appear. Never render "not available" or explain the absence.
//    Locations are derived from BOOKING.dayPassBundles, so this stays true on
//    its own if a location gains or loses passes later.
//
// Props:
//   isOpen  — boolean, controls visibility
//   onClose — () => void, called for X click / backdrop click / ESC key
//
// Accessibility:
//   - role="dialog", aria-modal, aria-labelledby wired
//   - ESC closes · backdrop click closes
//   - Body scroll locks while open
//   - Focus moves to the close button on open, restored on close
// ──────────────────────────────────────────────────────────────────────────

// Display labels for the locations that offer passes. Presence is decided by
// the data below, not by this list — an entry with no bundles is dropped.
const LOCATION_META = [
  { id: "jhandewalan", label: "Jhandewalan", area: "Central Delhi" },
  { id: "noida",       label: "Noida",       area: "Sector 142"    },
];

const panelIn = {
  hidden: { opacity: 0, scale: 0.97, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.045, delayChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 0.97, y: 16, transition: { duration: 0.2 } },
};

const rowIn = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function DayPassPickerModal({ isOpen, onClose }) {
  const closeBtnRef  = useRef(null);
  const prevFocusRef = useRef(null);

  // Only render locations that actually have passes.
  const locations = LOCATION_META
    .map((loc) => ({ ...loc, bundles: BOOKING.dayPassBundles[loc.id] || [] }))
    .filter((loc) => loc.bundles.length > 0);

  useEffect(() => {
    if (!isOpen) return;

    prevFocusRef.current = document.activeElement;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    setTimeout(() => closeBtnRef.current?.focus(), 0);

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="daypass-picker-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            variants={panelIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#fafaf7] rounded-[28px] shadow-[0_40px_100px_-30px_rgba(10,10,10,0.65)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* Hairline of brand colour along the very top of the panel */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#FF6700] rounded-t-[28px]" />

            {/* ── Header ─────────────────────────────────────────────── */}
            <div className="px-7 sm:px-10 pt-10 sm:pt-12 pb-8">
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close"
                className="absolute top-6 right-6 sm:top-8 sm:right-8 flex items-center justify-center w-10 h-10 rounded-full border border-[#0a0a0a]/15 text-[#0a0a0a] hover:bg-[#FF6700] hover:border-[#FF6700] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 focus:ring-offset-[#fafaf7]"
              >
                <LuX className="w-4 h-4" strokeWidth={2.25} />
              </button>

              <h2
                id="daypass-picker-title"
                className="font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-4xl sm:text-5xl md:text-6xl text-[#0a0a0a] pr-14"
              >
                Pick your <span className="text-[#FF6700]">pass.</span>
              </h2>

              <p className="mt-4 font-['Founders_Grotesk'] italic text-base sm:text-lg text-[#0a0a0a]/45 max-w-[46ch]">
                A single day, or a bundle to use across the month.
              </p>
            </div>

            {/* ── Locations ──────────────────────────────────────────── */}
            <div className="px-7 sm:px-10 pb-10 sm:pb-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
              {locations.map((loc, i) => (
                <div
                  key={loc.id}
                  className={i > 0 ? "md:pl-10 md:border-l md:border-[#0a0a0a]/10" : "md:pr-10"}
                >
                  {/* Column header — italic display line, never an eyebrow */}
                  <div className="flex items-baseline gap-2 pb-4 border-b border-[#0a0a0a]/15">
                    <span className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-xl sm:text-2xl text-[#0a0a0a]">
                      {loc.label}
                    </span>
                    <span className="font-['Founders_Grotesk'] italic text-sm text-[#0a0a0a]/40">
                      {loc.area}
                    </span>
                  </div>

                  {/* Rows — hairline list, orange wipe on hover */}
                  <div className="flex flex-col">
                    {loc.bundles.map((b) => (
                      <motion.a
                        key={b.id}
                        variants={rowIn}
                        href={b.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between gap-5 py-4 border-b border-[#0a0a0a]/10 last:border-b-0"
                      >
                        {/* underline wipe, matching the footer link idiom */}
                        <span
                          aria-hidden="true"
                          className="absolute bottom-[-1px] left-0 h-px w-0 bg-[#FF6700] group-hover:w-full transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        />

                        <span className="font-['Founders_Grotesk'] font-bold text-lg sm:text-xl leading-none text-[#0a0a0a] group-hover:text-[#FF6700] transition-colors duration-300">
                          {b.label}
                        </span>

                        <span className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-['Founders_Grotesk'] italic text-sm text-[#0a0a0a]/40">
                            {b.sub}
                          </span>
                          <LuArrowUpRight
                            className="w-4 h-4 text-[#0a0a0a]/30 group-hover:text-[#FF6700] transition-all duration-300 group-hover:rotate-45"
                            strokeWidth={2}
                          />
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
