"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
// ⚠️ STACKING — this modal is PORTALLED into document.body (see the render at
//    the bottom). It has to be. When rendered inline it lands inside the
//    homepage's #about wrapper, which is position:relative z-20 overflow-clip
//    — that z-20 opens a stacking context that TRAPS the modal, so its
//    z-[130] only competes inside #about and the top-level navbar (z-100) and
//    floating WhatsApp button (z-90) paint OVER it (heading + close vanished
//    under the header on mobile). Portalling to <body> lifts it out of every
//    parent context so z-[130] finally wins and the backdrop covers the nav.
//    Do NOT move this back to an inline render.
//
// RESPONSIVE SHAPE:
//   • MOBILE  — bottom sheet, anchored to the BOTTOM (items-end) and capped at
//     85dvh (dynamic vh, so the mobile address bar can't clip it). Slides up
//     from the bottom. A STICKY header bar carries the title + close, so they
//     stay visible while the list scrolls.
//   • DESKTOP — centered dialog, rounded all corners, scales in.
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
  { id: "noida-sector-142", label: "Noida", area: "Sector 142" },
];

// Panel enters as a bottom sheet on mobile (y from 100%) — but framer can't
// read Tailwind breakpoints, so the slide-up is universal and reads well in
// both shapes. Desktop's centered position makes the same y feel like a gentle
// rise; mobile's bottom anchor makes it a true sheet.
const panelIn = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.045, delayChildren: 0.12 },
  },
  exit: { opacity: 0, y: 40, transition: { duration: 0.22 } },
};

const rowIn = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function DayPassPickerModal({ isOpen, onClose }) {
  const closeBtnRef  = useRef(null);
  const prevFocusRef = useRef(null);

  // document.body only exists on the client. Flip this true after mount so the
  // portal target is guaranteed, and render nothing during SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // z-[130] clears the navbar (z-100) and the WhatsApp FAB (z-90) —
          // but ONLY because this whole tree is portalled to <body> below.
          // Mobile: anchor to the BOTTOM (items-end). Desktop: centre it.
          className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center sm:px-6 sm:py-8"
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

          {/* Panel — bottom sheet on mobile, centered dialog on desktop.
              max-h leaves a clear gap at the top on mobile so the navbar is
              never in play. Rounded top-only on mobile, all corners on sm+. */}
          <motion.div
            variants={panelIn}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative z-10 w-full sm:max-w-3xl max-h-[85dvh] sm:max-h-[88dvh] overflow-y-auto bg-[#fafaf7] rounded-t-[28px] sm:rounded-[28px] shadow-[0_-20px_60px_-20px_rgba(10,10,10,0.55)] sm:shadow-[0_40px_100px_-30px_rgba(10,10,10,0.65)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* ── Sticky header bar ──────────────────────────────────────
                Holds the title + close, pinned to the top of the sheet's own
                scroll area. Solid cream + hairline so it reads as a bar and
                the close is ALWAYS visible while the list scrolls. The brand
                hairline sits on its top edge. */}
            <div className="sticky top-0 z-20 bg-[#fafaf7]/95 backdrop-blur-sm border-b border-[#0a0a0a]/10">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#FF6700] rounded-t-[28px]" />

              {/* Grab handle — a small cue that this is a sheet on mobile. */}
              <div className="sm:hidden flex justify-center pt-3">
                <span aria-hidden="true" className="w-10 h-1 rounded-full bg-[#0a0a0a]/15" />
              </div>

              <div className="flex items-center justify-between gap-4 px-6 sm:px-10 pt-4 sm:pt-8 pb-4 sm:pb-6">
                <h2
                  id="daypass-picker-title"
                  className="font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-3xl sm:text-5xl md:text-6xl text-[#0a0a0a]"
                >
                  Pick your <span className="text-[#FF6700]">pass.</span>
                </h2>

                <button
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close"
                  className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full bg-[#fafaf7] border border-[#0a0a0a]/15 text-[#0a0a0a] shadow-[0_8px_24px_-8px_rgba(10,10,10,0.3)] hover:bg-[#FF6700] hover:border-[#FF6700] hover:text-[#fafaf7] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF6700] focus:ring-offset-2 focus:ring-offset-[#fafaf7]"
                >
                  <LuX className="w-4 h-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>

            {/* Sub-line under the sticky bar */}
            <p className="px-6 sm:px-10 pt-5 sm:pt-6 font-['Founders_Grotesk'] text-base sm:text-lg text-[#0a0a0a]/45 max-w-[46ch]">
              A single day, or a bundle to use across the month.
            </p>

            {/* ── Locations ──────────────────────────────────────────── */}
            <div className="px-6 sm:px-10 pt-6 pb-10 sm:pb-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
              {locations.map((loc, i) => (
                <div
                  key={loc.id}
                  className={i > 0 ? "md:pl-10 md:border-l md:border-[#0a0a0a]/10" : "md:pr-10"}
                >
                  {/* Column header — bold uppercase name + italic area */}
                  <div className="flex items-baseline gap-2 pb-4 border-b border-[#0a0a0a]/15">
                    <span className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-xl sm:text-2xl text-[#0a0a0a]">
                      {loc.label}
                    </span>
                    <span className="font-['Founders_Grotesk'] text-sm text-[#0a0a0a]/40">
                      {loc.area}
                    </span>
                  </div>

                  {/* Rows — hairline list, orange wipe on hover. Labels are
                      medium weight (not bold) so they sit clearly BELOW the
                      bold location header in the hierarchy and never merge. */}
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

                        <span className="font-['Founders_Grotesk'] font-medium text-lg sm:text-xl leading-none text-[#0a0a0a] group-hover:text-[#FF6700] transition-colors duration-300">
                          {b.label}
                        </span>

                        <span className="flex items-center gap-3 flex-shrink-0">
                          <span className="font-['Founders_Grotesk'] text-sm text-[#0a0a0a]/40">
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

  // Portal out of every parent stacking context (see the STACKING note above).
  if (!mounted) return null;
  return createPortal(overlay, document.body);
}
