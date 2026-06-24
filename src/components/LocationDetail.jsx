"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuArrowUpRight,
  LuMapPin,
  LuClock,
  LuCar,
  LuTrainFront,
} from "react-icons/lu";
import { PLANS } from "../data/plans";
import { LOCATIONS, getMapsUrl, getMapsEmbedUrl } from "../data/locations";
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
  tag:   (s) => s || "Premium Workspace",
  desc:  (s) => s || "A premium workspace, crafted with care.",
  metro: (s) => s || "Public transit within walking distance",
  hours: (s) => s || "Mon–Sat · 8 AM – 9 PM · 24/7 for members",
  park:  (s) => s || "Available on-site",
  neigh: (s) => s || "A neighbourhood worth showing up to.",
};
const galleryOf = (location) => {
  const g = location.gallery || [];
  if (g.length >= 8) return g.slice(0, 8);
  const out = [...g];
  while (out.length < 8) out.push(location.img);
  return out;
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
        "24/7 access for members",
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

export default function LocationDetail({ location }) {
  const others        = LOCATIONS.filter((l) => l.id !== location.id);
  const locationIndex = LOCATIONS.findIndex((l) => l.id === location.id);
  const gallery       = galleryOf(location);
  const highlights    = highlightsOf(location);
  const mapsUrl       = getMapsUrl(location);
  const mapsEmbed     = getMapsEmbedUrl(location);

  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────────── */}
      <section className="relative w-full h-[80vh] sm:h-[90vh] md:h-screen min-h-[600px] md:min-h-[700px] overflow-hidden">
        <img
          src={location.img}
          alt={location.label}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-[#0a0a0a]/15" />

        {/* Top eyebrow */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="absolute top-0 inset-x-0 px-6 sm:px-10 md:px-20 pt-24 sm:pt-28 md:pt-32 flex items-center justify-between gap-6"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Location · 0{locationIndex + 1}
            </p>
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="hidden md:block text-[10px] uppercase tracking-[0.4em] text-white/50 font-['NeueMontreal'] text-right"
          >
            The Berry / Locations / {location.label}
          </motion.p>
        </motion.div>

        {/* Bottom content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="absolute inset-x-0 bottom-0 px-6 sm:px-10 md:px-20 pb-10 sm:pb-14 md:pb-20"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
            <span className="text-[10px] tracking-[0.2em] uppercase font-['NeueMontreal'] text-white border border-white/35 rounded-full px-3 py-1 backdrop-blur-sm bg-black/10">
              {fmt.tag(location.tag)}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-['NeueMontreal'] text-white/60">
              Delhi NCR
            </span>
          </motion.div>

          {/* Title — clamp() prevents long names ("JHANDEWALAN") from clipping
              on narrow phones (~360-412px). break-words is a belt-and-braces
              safety net in case a single word ever exceeds the container.   */}
          <h1
            className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.9] text-white break-words md:text-[8vw] lg:text-[7vw]'
            style={{ fontSize: "clamp(2.5rem, 11vw, 7rem)" }}
          >
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">{location.label}</motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 sm:mt-6 max-w-[60ch] font-['NeueMontreal'] text-base sm:text-lg text-white/75 leading-relaxed"
          >
            {fmt.desc(location.desc)}
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. META STRIP ─────────────────────────────────────────────── */}
      <section className="border-b border-[#0a0a0a]/10 bg-[#fafaf7]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#0a0a0a]/10">
          <div className="bg-[#fafaf7] p-5 sm:p-7 md:p-10">
            <MetaItem icon={LuMapPin} label="Address" value={fmt.addr(location.address)} />
          </div>
          <div className="bg-[#fafaf7] p-5 sm:p-7 md:p-10">
            <MetaItem icon={LuTrainFront} label="Metro" value={fmt.metro(location.metro)} />
          </div>
          <div className="bg-[#fafaf7] p-5 sm:p-7 md:p-10">
            <MetaItem icon={LuClock} label="Hours" value={fmt.hours(location.hours)} />
          </div>
          <div className="bg-[#fafaf7] p-5 sm:p-7 md:p-10">
            <MetaItem icon={LuCar} label="Parking" value={fmt.park(location.parking)} />
          </div>
        </div>
      </section>

      {/* ── 3. GALLERY ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-12 md:mb-14">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-px bg-[#FF6700]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                  Inside the Space
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">Walk Through.</motion.span>
              </h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/55 max-w-[36ch] md:text-right leading-relaxed"
            >
              Every detail considered. Every corner designed for the way you actually work.
            </motion.p>
          </div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 md:auto-rows-[180px] lg:auto-rows-[220px]"
          >
            {gallery.map((src, i) => {
              let spanClass = "";
              if (i === 0)              spanClass = "md:col-span-2 md:row-span-2";
              else if (i === 5 || i === 6) spanClass = "md:col-span-2";
              else if (i === 7)         spanClass = "md:col-span-4";

              return (
                <motion.div
                  key={i}
                  variants={cardUp}
                  className={`group overflow-hidden rounded-xl aspect-[4/5] md:aspect-auto ${spanClass}`}
                >
                  <img
                    src={src}
                    alt={`${location.label} interior ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 4. HIGHLIGHTS ─────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-5">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-px bg-[#FF6700]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                  Highlights
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">Why This</motion.span>
                <motion.span variants={lineUp} className="block">
                  <span className="text-[#FF6700]">Space.</span>
                </motion.span>
              </h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="md:col-span-7 md:pt-4 font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed max-w-[60ch]"
            >
              What makes {location.label} different. The details that change how a workday feels.
            </motion.p>
          </div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h}
                variants={cardUp}
                className="group flex items-start gap-4 p-5 sm:p-6 md:p-7 rounded-xl border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.025] hover:bg-[#FF6700] hover:border-[#FF6700] transition-all duration-500 cursor-default"
              >
                <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700] group-hover:text-[#0a0a0a] transition-colors mt-1 flex-shrink-0">
                  0{i + 1}
                </span>
                <p className="font-['NeueMontreal'] text-sm sm:text-base text-[#0a0a0a]/80 group-hover:text-[#0a0a0a] transition-colors leading-relaxed">
                  {h}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

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
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-px bg-[#FF6700]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                  The Neighbourhood
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] max-w-[18ch]'>
                <motion.span variants={lineUp} className="block">What&apos;s</motion.span>
                <motion.span variants={lineUp} className="block">Around You.</motion.span>
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

      {/* ── 6. PLANS AT THIS LOCATION ─────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-12 md:mb-14">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-px bg-[#FF6700]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                  Plans at {location.label}
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">Book Here.</motion.span>
              </h2>
            </div>
            <Link
              href="/workspaces"
              className="font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase text-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 inline-flex items-center gap-2 self-start md:self-end"
            >
              See all plans
              <LuArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {PLANS.map((plan, i) => {
              const price       = plan.pricing?.[location.id];
              const bookingUrl  = getPlanBookingUrl(plan.id, location.id);
              const isExternal  = isExternalBooking(bookingUrl);
              const buttonLabel = price !== null && price !== undefined ? "Book Now" : "Get Quote";

              return (
                <motion.div
                  key={plan.id}
                  variants={cardUp}
                  className="flex flex-col rounded-2xl border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.04] hover:bg-[#0a0a0a]/[0.06] hover:border-[#0a0a0a]/20 transition-all duration-500 p-6 sm:p-7 min-h-[280px]"
                >
                  <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700] mb-5">
                    0{i + 1}
                  </span>

                  <h3 className='font-["Founders_Grotesk"] font-bold text-xl md:text-2xl tracking-tight leading-tight text-[#0a0a0a] mb-2'>
                    {plan.name}
                  </h3>
                  <p className="font-['NeueMontreal'] text-xs text-[#0a0a0a]/55 leading-relaxed mb-4">
                    {plan.tagline}
                  </p>

                  <div className="flex-1" />

                  <div className="pt-4 border-t border-[#0a0a0a]/10">
                    {price !== null && price !== undefined ? (
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className='font-["Founders_Grotesk"] font-bold text-2xl text-[#FF6700]'>
                          ₹{price.toLocaleString("en-IN")}
                        </span>
                        <span className="font-['NeueMontreal'] text-xs text-[#0a0a0a]/45">/ mo</span>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <span className='font-["Founders_Grotesk"] font-bold text-xl text-[#FF6700]'>
                          Custom Quote
                        </span>
                      </div>
                    )}

                    {isExternal ? (
                      <a
                        href={bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn flex items-center justify-between gap-2 w-full py-2.5 px-4 rounded-full bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 text-xs font-['NeueMontreal'] tracking-wide"
                      >
                        {buttonLabel}
                        <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    ) : (
                      <Link
                        href={bookingUrl}
                        className="group/btn flex items-center justify-between gap-2 w-full py-2.5 px-4 rounded-full bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 text-xs font-['NeueMontreal'] tracking-wide"
                      >
                        {buttonLabel}
                        <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 7. MAP ────────────────────────────────────────────────────── */}
      <section className="border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="px-5 sm:px-10 md:px-20 pt-14 sm:pt-20 md:pt-28 pb-10 sm:pb-12 md:pb-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="w-8 h-px bg-[#FF6700]" />
                  <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                    Find Us
                  </p>
                </motion.div>
                <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                  <motion.span variants={lineUp} className="block">Get Directions.</motion.span>
                </h2>
              </div>
              <motion.div variants={fadeUp} className="flex flex-col gap-2 md:items-end">
                <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/65 leading-relaxed max-w-[42ch] md:text-right">
                  {fmt.addr(location.address)}
                </p>
                {mapsUrl && (
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase text-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    Open in Google Maps
                    <LuArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            </div>
          </div>

          <motion.div variants={fadeUp} className="w-full aspect-[16/10] sm:aspect-[16/8] md:aspect-[2/1] bg-[#0a0a0a]/5">
            {mapsEmbed ? (
              <iframe
                src={mapsEmbed}
                className="w-full h-full border-0 grayscale-[0.15]"
                loading="lazy"
                title={`Map of ${location.label}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-['NeueMontreal'] text-sm text-[#0a0a0a]/40">
                Map unavailable
              </div>
            )}
          </motion.div>
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
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Also at The Berry
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] mb-8 sm:mb-10 md:mb-12'>
            <motion.span variants={lineUp} className="block">More to Explore.</motion.span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {others.map((other) => (
              <motion.div key={other.id} variants={cardUp}>
                <Link href={`/locations/${other.id}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/10]">
                    <img
                      src={other.img}
                      alt={other.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/30 to-transparent" />

                    <div className="absolute top-5 right-5">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-['NeueMontreal'] text-white/80 border border-white/30 rounded-full px-3 py-1 backdrop-blur-sm">
                        {fmt.tag(other.tag)}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-white/65 font-['NeueMontreal'] mb-2">
                          Delhi NCR
                        </p>
                        <h3 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none text-white uppercase break-words'>
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
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Come Visit
            </p>
            <span className="w-8 h-px bg-[#FF6700]" />
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] break-words'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">See {location.label}</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                in <span className="text-[#FF6700]">person.</span>
              </motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-[#0a0a0a]/60 font-['NeueMontreal'] leading-relaxed max-w-[48ch] mx-auto"
          >
            Book a free 15-minute tour. We&apos;ll walk you through the space, answer questions, and let you feel it for yourself.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300"
            >
              Book a Free Tour
              <LuArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              WhatsApp Us
              <LuArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
