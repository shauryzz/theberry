"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight, LuMapPin } from "react-icons/lu";
import { LOCATIONS, UPCOMING_LOCATION, getMapsUrl } from "../data/locations";
import { BOOKING, whatsappLink } from "../data/booking";
import InteractiveStandards from "./InteractiveStandards";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// ONE heading scale, matching the Solutions and For Enterprises pages exactly.
// No per-section overrides; the hero and every section title share this.
const HEADING_CLS =
  "font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] overflow-hidden pb-[0.05em]";

// Defensive accessors — never let a missing field render empty.
const fmt = {
  addr: (a) => (typeof a === "string" ? a : a?.full) || "Address coming soon",
  desc: (s) => s || "A premium coworking space designed for ambitious people.",
};

// Hero image band, same treatment as Solutions / For Enterprises.
const LOCATIONS_HERO_IMAGE =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1800&q=85&fit=crop";

export default function LocationsContent() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────
          Matches the Solutions / For Enterprises hero: heading + intro on
          plain cream (NO photo behind the text), then a wide, shallow image
          band below. This is the "consistency" fix — the old hero overlaid
          the type on a dark photo, which no other page does. */}
      <section className="px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <h1 className={`${HEADING_CLS} text-[#0a0a0a]`}>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Where you</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                want to <span className="text-[#FF6700]">work.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 max-w-[58ch] font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/65 leading-relaxed"
          >
            Three coworking spaces across Delhi NCR, in Barakhamba, Jhandewalan and Noida, with a fourth on the way. Same standard at every address.
          </motion.p>
        </motion.div>
      </section>

      {/* Full-bleed image band. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[34vh] sm:h-[42vh] md:h-[52vh] min-h-[260px] max-h-[560px] overflow-hidden bg-[#0a0a0a]/5"
      >
        <motion.img
          src={LOCATIONS_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* ── LOCATIONS ────────────────────────────────────────────────────
          Framed editorial features on cream, the way the Solutions sections
          breathe: a section heading announces the block, then each location
          gets generous space around it (gap-24) so it reads as its own place,
          not one continuous slab. Contained rounded photo + big name, sides
          alternating. No boxes, no full-bleed dark wall. */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-16 sm:mb-20 md:mb-24 max-w-3xl"
        >
          <h2 className={`${HEADING_CLS} text-[#0a0a0a]`}>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Growing across</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                the <span className="text-[#FF6700]">city.</span>
              </motion.span>
            </span>
          </h2>
          <motion.p variants={fadeUp} className="mt-6 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/60 leading-relaxed max-w-[52ch]">
            Three addresses open across Delhi NCR, a fourth on the way, and more to come. Each with its own character, all held to the same standard.
          </motion.p>
        </motion.div>

        <div className="flex flex-col gap-24 sm:gap-28 md:gap-36">
          {LOCATIONS.map((loc, i) => {
            const mapsUrl = getMapsUrl(loc);
            const imageLeft = i % 2 === 0;
            return (
              <motion.article
                key={loc.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-120px" }}
                variants={stagger}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Photo — contained, rounded, with the index number floated
                    just outside the frame for an editorial touch */}
                <Link
                  href={`/locations/${loc.id}`}
                  className={`relative lg:col-span-7 ${imageLeft ? "lg:order-1" : "lg:order-2"}`}
                >
                  <span className={`hidden lg:block absolute -top-10 font-['Founders_Grotesk'] font-bold text-[7rem] leading-none text-[#0a0a0a]/[0.06] select-none ${imageLeft ? "-left-4" : "-right-4"}`}>
                    0{i + 1}
                  </span>
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/11] shadow-[0_30px_70px_-40px_rgba(10,10,10,0.35)]">
                    <img
                      src={loc.img}
                      alt={loc.label}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    {/* orange sweep line at the base on hover */}
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FF6700] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </div>
                </Link>

                {/* Content */}
                <div className={`lg:col-span-5 ${imageLeft ? "lg:order-2" : "lg:order-1"}`}>
                  <motion.p variants={fadeUp} className="font-['NeueMontreal'] text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 mb-4">
                    Delhi NCR
                  </motion.p>

                  <h3 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.9] text-[#0a0a0a] text-5xl sm:text-6xl md:text-7xl overflow-hidden pb-[0.05em]">
                    <motion.span variants={lineUp} className="block">{loc.label}</motion.span>
                  </h3>

                  <motion.p variants={fadeUp} className="mt-5 font-['NeueMontreal'] text-sm sm:text-base text-[#0a0a0a]/65 leading-relaxed max-w-[46ch] line-clamp-3">
                    {fmt.desc(loc.desc)}
                  </motion.p>

                  {loc.whoItsFor && (
                    <motion.div variants={fadeUp} className="mt-6 pl-4 border-l-2 border-[#FF6700]/60">
                      <p className="font-['Founders_Grotesk'] italic text-xs text-[#0a0a0a]/40 mb-1.5">Who it&apos;s for</p>
                      <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/80 leading-relaxed max-w-[44ch] line-clamp-2">
                        {loc.whoItsFor}
                      </p>
                    </motion.div>
                  )}

                  <motion.div variants={fadeUp} className="mt-7 flex items-start gap-3">
                    <LuMapPin className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/70 leading-snug">
                        {fmt.addr(loc.address)}
                      </p>
                      {mapsUrl && (
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                          className="group/dir mt-2 inline-flex items-center gap-1.5 text-[11px] font-['NeueMontreal'] tracking-[0.2em] uppercase text-[#0a0a0a]/55 hover:text-[#FF6700] transition-colors">
                          Get Directions
                          <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/dir:rotate-45" />
                        </a>
                      )}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link href={`/locations/${loc.id}`}
                      className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-colors duration-300">
                      Explore {loc.label}
                      <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-45" />
                    </Link>
                    <a href={BOOKING.tour} target="_blank" rel="noopener noreferrer"
                      className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border border-[#0a0a0a]/25 text-[#0a0a0a]/85 hover:bg-[#0a0a0a] hover:text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300">
                      Book a Tour
                      <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-45" />
                    </a>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── UPCOMING — the one dark moment, a slim full-width band ────────
          Sector 62 becomes the page's contrast beat: a compact dark strip
          rather than a full section, so it punctuates without drowning the
          locations above it. */}
      {UPCOMING_LOCATION && (
        <section className="relative w-full bg-[#0a0a0a] overflow-hidden">
          <img
            src={UPCOMING_LOCATION.img}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.18] grayscale"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(#fafaf7 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }}
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="relative px-5 sm:px-10 md:px-20 py-16 sm:py-20 md:py-24 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >
            <div>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-[#FF6700] text-[#0a0a0a] px-3.5 py-1.5 text-[10px] font-['NeueMontreal'] font-bold tracking-[0.2em] uppercase mb-5">
                {UPCOMING_LOCATION.badge || "Coming Soon"}
              </motion.span>
              <h2 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.9] text-[#fafaf7] text-5xl sm:text-6xl md:text-7xl overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  {UPCOMING_LOCATION.label} <span className="text-[#fafaf7]/40">/ {UPCOMING_LOCATION.area}</span>
                </motion.span>
              </h2>
            </div>
            <motion.p variants={fadeUp} className="font-['NeueMontreal'] text-sm sm:text-base text-[#fafaf7]/60 leading-relaxed max-w-[42ch] lg:text-right">
              {UPCOMING_LOCATION.desc}
            </motion.p>
          </motion.div>
        </section>
      )}

      {/* ── THE MUST HAVES (#7) — was "Same Standard" ───────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="mb-12 sm:mb-14">
            <h2 className={`${HEADING_CLS} text-[#0a0a0a]`}>
              <motion.span variants={lineUp} className="block">
                The Must <span className="text-[#FF6700]">Haves.</span>
              </motion.span>
            </h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 font-['NeueMontreal'] text-sm sm:text-base text-[#0a0a0a]/55 max-w-[46ch] leading-relaxed"
            >
              Every centre comes with the same list of essentials.
            </motion.p>
          </div>

          <InteractiveStandards
            columns="four"
            items={[
              { label: "Natural Light",       icon: "light" },
              { label: "Ergonomic Furniture", icon: "chair" },
              { label: "High-Speed WiFi",     icon: "wifi" },
              { label: "F&B Counter",         icon: "fnb" },
              { label: "Phone Booths",        icon: "phone" },
              { label: "Meeting Rooms",       icon: "meeting" },
              { label: "Print & Scan",        icon: "printer" },
            ]}
          />
        </motion.div>
      </section>

      {/* ── CTA (#8: subheading removed, buttons only) ──────────────────── */}
      <section className="relative w-full bg-[#fafaf7] py-16 sm:py-24 md:py-32 overflow-hidden border-t border-[#0a0a0a]/10">
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
          <h2 className={`${HEADING_CLS} text-[#0a0a0a] mx-auto`}>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Find your</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                <span className="text-[#FF6700]">favourite.</span>
              </motion.span>
            </span>
          </h2>

          <motion.div
            variants={fadeUp}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300"
            >
              Book a Free Tour
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
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
    </>
  );
}
