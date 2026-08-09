"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  LuArrowUpRight,
  LuMapPin,
  LuClock,
  LuX,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import { PLANS } from "../data/plans";
import { LOCATIONS, getMapsUrl } from "../data/locations";
import { BOOKING, getPlanBookingUrl, isExternalBooking, whatsappLink } from "../data/booking";

// ── Animation variants ─────────────────────────────────────────────────────
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const cardUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// Defensive accessors — handle missing or malformed fields gracefully.
const fmt = {
  addr:  (a) => (typeof a === "string" ? a : a?.full) || "Address coming soon",
  desc:  (s) => s || "A premium workspace, crafted with care.",
  metro: (s) => s || "Public transit within walking distance",
  hours: (s) => s || "Mon to Sat, 8 AM to 8 PM.",
  park:  (s) => s || "Available on-site",
  neigh: (s) => s || "A neighbourhood worth showing up to.",
};

const galleryOf = (location) => {
  const g = location.gallery || [];
  return g.length ? g.slice(0, 15) : [location.img];
};
const highlightsOf = (location) =>
  location.highlights?.length
    ? location.highlights
    : [
        "Natural light at every desk",
        "Ergonomic seating throughout",
        "Soundproof phone booths",
        "Bookable meeting rooms",
        "Daily housekeeping",
        "Power backup + UPS",
        "On-site IT support",
      ];

function MetaItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2} />
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/45 font-['NeueMontreal']">
          {label}
        </p>
        <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/85 mt-1 leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
}

/* Why This Space — client mock (Switchyards style, #14): one large image
   feature with a heading + body overlaid, and a row of tabs beneath. Clicking
   a tab swaps the featured point and its photo. No blueprint floor-plan.
   Each highlight becomes a tab; photos come from the gallery, cycling if there
   are fewer photos than points, falling back to the hero. */
/* Why This Space — built to match the Switchyards reference exactly:
   ONE centered stacked-photo card (the other category photos peek out behind
   the top one, offset up-and-right), the point's text set over the lower part
   of the top photo, and a row of PILL TABS centered beneath. Clicking a pill
   swaps the top photo and text. No subhead, no side list, no floor-plan.

   Performance: ALL photos are rendered up front and crossfaded via opacity, so
   there is no fetch-on-click lag (the old version used loading="lazy" on a
   swapped src, which fetched each image only when its tab was clicked).

   Tab labels: short names derived from each highlight (or location.highlightTabs
   if the data supplies them), never bare numbers. */
function shortLabel(text, i) {
  // First 2-3 meaningful words, uppercased, for a pill label.
  const cleaned = text.replace(/[,.]/g, "");
  const words = cleaned.split(/\s+/).filter(Boolean);
  const stop = new Set(["on", "the", "a", "an", "to", "of", "and", "with", "at", "in", "every", "from"]);
  const picked = words.filter((w) => !stop.has(w.toLowerCase())).slice(0, 2);
  const label = (picked.length ? picked : words.slice(0, 2)).join(" ");
  return label || `0${i + 1}`;
}

function WhyThisSpace({ location, highlights, gallery }) {
  const [active, setActive] = useState(0);
  const items = highlights.slice(0, 5);
  const tabLabels = location.highlightTabs || items.map((h, i) => shortLabel(h, i));
  const photoFor = (i) => gallery[i % gallery.length] || location.img;
  const next = () => setActive((a) => (a + 1) % items.length);

  return (
    <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28">
      {/* dotted texture, same device as the Enterprises dark sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#fafaf7 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative"
      >
        {/* Heading, top-left — light on dark */}
        <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] tracking-tighter leading-[0.95] text-[#fafaf7] overflow-hidden pb-[0.05em] mb-12 sm:mb-16'>
          <motion.span variants={lineUp} className="block">
            Why This <span className="text-[#FF6700]">Space.</span>
          </motion.span>
        </h2>

        {/* Full-width horizontal card. Click it to advance to the next point. */}
        <motion.div variants={fadeUp} className="relative">
          {/* stack layers peeking out behind, offset up-and-right (light on dark) */}
          <div aria-hidden="true" className="absolute -top-4 right-[-14px] w-full h-full rounded-2xl bg-[#fafaf7]/[0.07]" />
          <div aria-hidden="true" className="absolute -top-2 right-[-7px] w-full h-full rounded-2xl bg-[#fafaf7]/[0.11]" />

          <button
            type="button"
            onClick={next}
            aria-label="Next highlight"
            className="group relative block w-full text-left rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] cursor-pointer"
          >
            {/* All images stacked and preloaded; only the active one is opaque.
                No network request happens on tab change. */}
            {items.map((_, i) => (
              <img decoding="async"
                key={i}
                src={photoFor(i)}
                alt={i === active ? `${location.label}: ${items[i]}` : ""}
                aria-hidden={i !== active}
                onError={(e) => { if (e.currentTarget.src !== location.img) e.currentTarget.src = location.img; }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* darken lower-left so the text reads */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/92 via-[#0a0a0a]/30 to-transparent" />

            {/* subtle zoom hint on hover */}
            <span aria-hidden="true" className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/[0.06] transition-colors duration-500" />

            {/* text on the lower-left */}
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 md:p-14">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-[1.05] text-white text-2xl sm:text-4xl md:text-5xl max-w-[24ch]"
                >
                  {items[active]}
                </motion.p>
              </AnimatePresence>
            </div>
          </button>
        </motion.div>

        {/* Name pills below — light on dark */}
        <motion.div variants={fadeUp} className="mt-6 sm:mt-8 flex flex-wrap gap-2.5">
          {items.map((h, i) => (
            <button
              key={h}
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={`font-['NeueMontreal'] text-[11px] sm:text-xs tracking-[0.18em] uppercase rounded-full border px-4 sm:px-5 py-2.5 transition-colors duration-300 ${
                i === active
                  ? "bg-[#FF6700] border-[#FF6700] text-[#0a0a0a]"
                  : "border-[#fafaf7]/25 text-[#fafaf7]/60 hover:border-[#fafaf7]/50 hover:text-[#fafaf7]"
              }`}
            >
              {tabLabels[i]}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* Full-size photo viewer for the Walk Through gallery. Click a tile to open;
   arrows/keys to move between shots; Esc or backdrop-click to close. */
function Lightbox({ images, index, label, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onNav((index + 1) % images.length);
      else if (e.key === "ArrowLeft") onNav((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [index, images.length, onClose, onNav]);

  const go = (dir) => (e) => { e.stopPropagation(); onNav((index + dir + images.length) % images.length); };
  const btn = "z-10 w-11 h-11 flex items-center justify-center rounded-full bg-[#fafaf7]/10 text-[#fafaf7] hover:bg-[#fafaf7]/20 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} gallery`}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0a0a0a]/92 backdrop-blur-sm p-4 sm:p-10"
    >
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close" className={`absolute top-4 right-4 sm:top-6 sm:right-6 ${btn}`}>
        <LuX className="w-5 h-5" />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={go(-1)} aria-label="Previous" className={`absolute left-3 sm:left-6 ${btn}`}><LuChevronLeft className="w-6 h-6" /></button>
          <button onClick={go(1)} aria-label="Next" className={`absolute right-3 sm:right-6 ${btn}`}><LuChevronRight className="w-6 h-6" /></button>
        </>
      )}

      <motion.img
        key={index}
        src={images[index]}
        alt={`${label} photo ${index + 1}`}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        draggable="false"
        className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
      />

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[#fafaf7]/70 text-xs font-['NeueMontreal'] tracking-wide">
          {index + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
}

export default function LocationDetail({ location }) {
  const others        = LOCATIONS.filter((l) => l.id !== location.id);
  const locationIndex = LOCATIONS.findIndex((l) => l.id === location.id);
  const gallery       = galleryOf(location);
  const highlights    = highlightsOf(location);
  const mapsUrl       = getMapsUrl(location);

  // Click-to-enlarge for the Walk Through gallery. lightbox = index or null.
  const walk = gallery.slice(5, 15);
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      {/* Consistency: same structure as Solutions / For Enterprises — heading
          and intro on plain cream (no type over a photo), then a wide, shallow
          image band. Replaces the old full-screen photo-overlay hero. */}
      <section className="px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <h1 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
            <motion.span variants={lineUp} className="block break-words">{location.label}</motion.span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 max-w-[58ch] font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/65 leading-relaxed"
          >
            {fmt.desc(location.desc)}
          </motion.p>
        </motion.div>
      </section>

      {/* Full-bleed image band. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[38vh] sm:h-[46vh] md:h-[58vh] min-h-[280px] max-h-[620px] overflow-hidden bg-[#0a0a0a]/5"
      >
        <motion.img
          src={location.img}
          alt={location.label}
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute inset-0 w-full h-full object-cover ${
            location.heroDim
              ? "brightness-[0.72] contrast-[1.28] saturate-[1.08]"
              : "brightness-[0.97] contrast-[1.03]"
          }`}
        />
        {/* Knock down the blown-out centre of overexposed hero photos so the
            signage reads. Radial scrim: darkest where the highlight clips. */}
        {location.heroDim && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 55% 60% at 52% 45%, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.16) 45%, transparent 78%)" }}
          />
        )}
      </motion.div>

      {/* ── 2. META STRIP ─────────────────────────────────────────────── */}
      {/* Client (Oct 2026): drop Metro, Parking and Capacity as headline stats.
          Capacity "not to be shared", metro "not required in such a main spot",
          parking "we don't want to mention". Address + Hours remain. Metro etc.
          still live in the copy (desc / highlights / neighbourhood) where they
          read as prose rather than a broadcast stat. */}
      <section className="border-b border-[#0a0a0a]/10 bg-[#fafaf7]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#0a0a0a]/10">
          <div className="bg-[#fafaf7] p-5 sm:p-7 md:p-10">
            <MetaItem icon={LuMapPin} label="Address" value={fmt.addr(location.address)} />
          </div>
          <div className="bg-[#fafaf7] p-5 sm:p-7 md:p-10">
            <MetaItem icon={LuClock} label="Hours" value={fmt.hours(location.hours)} />
          </div>
        </div>
      </section>

      {/* ── 2b. WHAT'S INSIDE / WHO IT'S FOR ──────────────────────────── */}
      {/* Client copy (Oct 2026). Rendered only when the fields exist, so a
          future location without them simply skips this block. */}
      {(location.whatsInside || location.whoItsFor) && (
        <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
          >
            {location.whatsInside && (
              <div className="lg:col-span-7">
                <motion.h2
                  variants={fadeUp}
                  className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-[0.95] text-3xl sm:text-4xl md:text-5xl text-[#0a0a0a]"
                >
                  What&apos;s <span className="text-[#FF6700]">inside.</span>
                </motion.h2>
                <motion.p
                  variants={fadeUp}
                  className="mt-6 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/70 leading-relaxed max-w-[62ch]"
                >
                  {location.whatsInside}
                </motion.p>
              </div>
            )}

            {location.whoItsFor && (
              <motion.div
                variants={fadeUp}
                className="lg:col-span-5 lg:border-l lg:border-[#0a0a0a]/10 lg:pl-16"
              >
                <p className="font-['Founders_Grotesk'] text-lg sm:text-xl text-[#0a0a0a]/45 mb-4">
                  Who it&apos;s for
                </p>
                <p className="font-['NeueMontreal'] text-lg sm:text-xl text-[#0a0a0a]/85 leading-relaxed">
                  {location.whoItsFor}
                </p>
              </motion.div>
            )}
          </motion.div>
        </section>
      )}

      {/* ── 4. WHY THIS SPACE (#14) ───────────────────────────────────── */}
      <WhyThisSpace location={location} highlights={highlights} gallery={gallery} />

      {/* ── 5. NEIGHBOURHOOD ──────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            <div className="md:col-span-4">
              <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] max-w-[18ch]'>
                <motion.span variants={lineUp} className="block">What&apos;s</motion.span>
                <motion.span variants={lineUp} className="block">Around <span className="text-[#FF6700]">You.</span></motion.span>
              </h2>
            </div>
            <motion.div variants={fadeUp} className="md:col-span-8 max-w-[68ch]">
              <p className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed whitespace-pre-line">
                {fmt.neigh(location.neighbourhood)}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 5b. WALK THROUGH ─────────────────────────────────────────────
          The expanding-panel gallery from the For Enterprises page — the
          treatment that works: photos sit as panels side by side; hover one and
          it opens while the others yield, with an orange line drawing along the
          bottom. Calm, alive, one gesture. Mobile: a swipeable snapping carousel
          that bleeds to both edges. (Mobile must NOT use flex-1 — in a flex row
          with auto height it collapses panels to zero; fixed w/h instead.) */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="mb-10 sm:mb-14">
            <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
              <motion.span variants={lineUp} className="block">Walk <span className="text-[#FF6700]">Through.</span></motion.span>
            </h2>
          </div>

          {/* Distinct from "Why this space" above (which uses the first 5) —
              this pulls the REST of the gallery, so no photo repeats on the
              page. Grid + transform-only hover (no flex/layout animation), so
              it stays smooth. */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
          >
            {walk.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${location.label} photo ${i + 1} full size`}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setLightbox(i); } }}
                className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a]/5 aspect-[4/3] cursor-zoom-in [content-visibility:auto] [contain-intrinsic-size:auto_320px]"
              >
                <img
                  decoding="async"
                  loading="lazy"
                  src={src}
                  alt={`${location.label} interior ${i + 1}`}
                  onError={(e) => { if (e.currentTarget.src !== location.img) e.currentTarget.src = location.img; }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FF6700] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 6. PLANS AT THIS LOCATION (dark — 2nd contrast moment) ──────── */}
      <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#fafaf7 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative"
        >
          <div className="mb-10 sm:mb-12 md:mb-14">
            <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] tracking-tighter leading-[0.95] text-[#fafaf7] overflow-hidden pb-[0.05em]'>
              <motion.span variants={lineUp} className="block">Book <span className="text-[#FF6700]">Here.</span></motion.span>
            </h2>
          </div>

          {(() => {
            const visible = PLANS.filter((plan) => plan.availableAt?.includes(location.id));

            // Card renderer, shared between the grid and single-plan layouts.
            const renderCard = (plan, i) => {
              const price       = plan.pricing?.[location.id];
              const bookingUrl  = getPlanBookingUrl(plan.id, location.id);
              const isExternal  = isExternalBooking(bookingUrl);
              const buttonLabel = price !== null && price !== undefined ? "Book Now" : "Get Quote";
              return (
                <motion.div
                  key={plan.id}
                  variants={cardUp}
                  className="group relative flex flex-col rounded-3xl border border-[#0a0a0a]/10 bg-white overflow-hidden hover:border-[#FF6700]/40 hover:shadow-[0_40px_90px_-45px_rgba(10,10,10,0.35)] transition-all duration-500 p-7 sm:p-9 min-h-[300px]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-[#FF6700] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-['Founders_Grotesk'] font-bold text-sm tracking-[0.3em] text-[#FF6700]">
                      0{i + 1}
                    </span>
                    <span className="w-9 h-9 rounded-full border border-[#0a0a0a]/15 flex items-center justify-center text-[#0a0a0a]/40 group-hover:bg-[#FF6700] group-hover:border-[#FF6700] group-hover:text-[#0a0a0a] transition-all duration-300">
                      <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
                  <h3 className='font-["Founders_Grotesk"] font-bold uppercase text-2xl md:text-3xl tracking-tight leading-[0.95] text-[#0a0a0a] mb-3'>
                    {plan.name}
                  </h3>
                  <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/55 leading-relaxed max-w-[34ch]">
                    {plan.tagline}
                  </p>
                  <div className="flex-1" />
                  <div className="mt-8 pt-6 border-t border-[#0a0a0a]/10">
                    {price !== null && price !== undefined ? (
                      <div className="mb-5">
                        {plan.pricePrefix && (
                          <span className="block font-['Founders_Grotesk'] text-sm text-[#0a0a0a]/45 mb-0.5">
                            {plan.pricePrefix}
                          </span>
                        )}
                        <div className="flex items-baseline gap-1.5">
                          <span className='font-["Founders_Grotesk"] font-bold text-4xl md:text-5xl tracking-tighter text-[#0a0a0a]'>
                            ₹{price.toLocaleString("en-IN")}
                          </span>
                          <span className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/45">{plan.priceUnit}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-5">
                        <span className='font-["Founders_Grotesk"] font-bold text-3xl tracking-tighter text-[#0a0a0a]'>
                          Custom quote
                        </span>
                      </div>
                    )}
                    {isExternal ? (
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                        className="group/btn relative flex items-center justify-center gap-2 w-full py-3.5 rounded-full overflow-hidden border border-[#0a0a0a] text-sm font-['NeueMontreal'] tracking-wide">
                        <span aria-hidden="true" className="absolute inset-0 bg-[#0a0a0a] group-hover/btn:bg-[#FF6700] transition-colors duration-300" />
                        <span className="relative text-[#fafaf7] group-hover/btn:text-[#0a0a0a] transition-colors duration-300">{buttonLabel}</span>
                        <LuArrowUpRight className="relative w-4 h-4 text-[#fafaf7] group-hover/btn:text-[#0a0a0a] transition-all duration-300 group-hover/btn:rotate-45" />
                      </a>
                    ) : (
                      <Link href={bookingUrl}
                        className="group/btn relative flex items-center justify-center gap-2 w-full py-3.5 rounded-full overflow-hidden border border-[#0a0a0a] text-sm font-['NeueMontreal'] tracking-wide">
                        <span aria-hidden="true" className="absolute inset-0 bg-[#0a0a0a] group-hover/btn:bg-[#FF6700] transition-colors duration-300" />
                        <span className="relative text-[#fafaf7] group-hover/btn:text-[#0a0a0a] transition-colors duration-300">{buttonLabel}</span>
                        <LuArrowUpRight className="relative w-4 h-4 text-[#fafaf7] group-hover/btn:text-[#0a0a0a] transition-all duration-300 group-hover/btn:rotate-45" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            };

            // SINGLE PLAN (e.g. Barakhamba): a lone card in a 4-col grid strands
            // three empty columns. Instead, pair the card with a copy panel so
            // the row is balanced and the space does real work.
            if (visible.length === 1) {
              return (
                <motion.div
                  variants={stagger}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                >
                  {renderCard(visible[0], 0)}
                  <motion.div variants={fadeUp} className="lg:pl-6">
                    <p className="font-['Founders_Grotesk'] text-lg sm:text-xl text-[#fafaf7]/45 mb-4">
                      One home for your team here
                    </p>
                    <p className="font-['NeueMontreal'] text-base sm:text-lg text-[#fafaf7]/70 leading-relaxed max-w-[46ch] mb-8">
                      This address is a private-office space, built for teams who want a room of their own at {location.label}. Coworking, day passes and meeting rooms live at our other centres.
                    </p>
                    <Link
                      href="/solutions"
                      className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#fafaf7]/25 px-7 py-3.5 hover:border-[#FF6700] transition-colors duration-300"
                    >
                      <span aria-hidden="true" className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      <span className="relative font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase text-[#fafaf7] group-hover/cta:text-[#0a0a0a] transition-colors duration-300">Compare all plans</span>
                      <LuArrowUpRight className="relative w-4 h-4 text-[#fafaf7] group-hover/cta:text-[#0a0a0a] transition-all duration-300 group-hover/cta:rotate-45" />
                    </Link>
                  </motion.div>
                </motion.div>
              );
            }

            const lgCols = visible.length === 2 ? "lg:grid-cols-2"
                         : visible.length === 3 ? "lg:grid-cols-3"
                         : "lg:grid-cols-4";
            return (
          <>
            <motion.div
              variants={stagger}
              className={`grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-4 md:gap-5`}
            >
              {visible.map((plan, i) => renderCard(plan, i))}
            </motion.div>

            {/* Secondary link sits BELOW the cards, centered — the site never
                floats a link to the right of a heading. */}
            <motion.div variants={fadeUp} className="mt-10 sm:mt-12 flex justify-center">
              <Link
                href="/solutions"
                className="group font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase text-[#fafaf7]/55 hover:text-[#FF6700] transition-colors duration-300 inline-flex items-center gap-2"
              >
                See all plans and pricing
                <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </motion.div>
          </>
            );
          })()}
        </motion.div>
      </section>

      {/* ── 7. FIND US (#12: no embedded map) ───────────────────────────
          Client: don't show the map on the page. Present the address as a
          designed block with a GET DIRECTIONS button that opens Google Maps
          in a new tab — the Switchyards pattern. */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="rounded-3xl border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.02] overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: the words */}
            <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
              <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">Find <span className="text-[#FF6700]">us.</span></motion.span>
              </h2>

              <motion.div variants={fadeUp} className="mt-8 flex items-start gap-4">
                <span className="mt-1 inline-flex w-10 h-10 rounded-full bg-[#FF6700] items-center justify-center flex-shrink-0">
                  <LuMapPin className="w-4 h-4 text-white" strokeWidth={2.25} />
                </span>
                <div>
                  <p className="font-['Founders_Grotesk'] font-bold text-base text-[#0a0a0a] leading-tight mb-1">
                    The Berry Coworks · {location.label}
                  </p>
                  <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/65 leading-relaxed max-w-[40ch]">
                    {fmt.addr(location.address)}
                  </p>
                </div>
              </motion.div>

              {mapsUrl && (
                <motion.div variants={fadeUp} className="mt-8">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#0a0a0a]/25 px-7 py-3.5 hover:border-[#FF6700] transition-colors duration-300"
                  >
                    <span aria-hidden="true" className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    <span className="relative font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase text-[#0a0a0a]">
                      Get Directions
                    </span>
                    <LuArrowUpRight className="relative w-4 h-4 text-[#0a0a0a] transition-transform duration-300 group-hover/cta:rotate-45" />
                  </a>
                </motion.div>
              )}
            </div>

            {/* Right: a location photo standing in for the map visual —
                deliberately NOT an interactive embed. */}
            <motion.div variants={fadeUp} className="relative min-h-[280px] lg:min-h-full overflow-hidden order-first lg:order-last">
              <img decoding="async"
                src={gallery[0] || location.img}
                alt={`${location.label} location`}
                loading="lazy"
                onError={(e) => { e.currentTarget.src = location.img; }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 8. OTHER LOCATIONS ────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] mb-8 sm:mb-10 md:mb-12'>
            <motion.span variants={lineUp} className="block">More to <span className="text-[#FF6700]">Explore.</span></motion.span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {others.map((other) => (
              <motion.div key={other.id} variants={cardUp}>
                <Link href={`/locations/${other.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                    <img decoding="async"
                      src={other.img}
                      alt={other.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/30 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/65 font-['NeueMontreal'] mb-2">
                          Delhi NCR
                        </p>
                        <h3 className='font-["Founders_Grotesk"] font-bold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-white break-words'>
                          {other.label}
                        </h3>
                      </div>
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF6700] flex items-center justify-center text-[#0a0a0a] flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                        <LuArrowUpRight className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 9. CTA ────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#fafaf7] py-16 sm:py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0a0a0a 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative px-5 sm:px-10 md:px-20 max-w-5xl mx-auto text-center"
        >

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] break-words'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">See {location.label}</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                in <span className="text-[#FF6700]">person.</span>
              </motion.span>
            </span>
          </h2>

          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link
              href={BOOKING.tour}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300"
            >
              Book a Free Tour
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              WhatsApp Us
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-size gallery viewer */}
      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={walk}
            index={lightbox}
            label={location.label}
            onClose={() => setLightbox(null)}
            onNav={setLightbox}
          />
        )}
      </AnimatePresence>
    </>
  );
}
