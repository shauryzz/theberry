"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight, LuMapPin, LuTrainFront, LuUsers } from "react-icons/lu";
import { LOCATIONS } from "../data/locations";
import { BOOKING, whatsappLink } from "../data/booking";
import { SHARED_STANDARDS } from "../data/content";

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

// Defensive accessors — never let a missing field render empty
const fmt = {
  addr:  (a) => (typeof a === "string" ? a : a?.full) || "Address coming soon",
  tag:   (s) => s || "Premium Workspace",
  desc:  (s) => s || "A premium coworking space designed for ambitious people.",
  metro: (s) => s || "Nearest metro · short walk",
  cap:   (s) => s || "Premium seating available",
};

export default function LocationsContent() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-20 md:pb-24 border-b border-[#0a0a0a]/10 overflow-hidden">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-6xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Locations · The Berry Coworks
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] max-w-[18ch]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Where you</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                want to <span className="text-[#FF6700]">work.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp}
            className="mt-6 sm:mt-8 max-w-[60ch] font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed">
            Premium workspaces in Delhi NCR&apos;s most-wanted neighbourhoods. Each one curated for the kind of work you actually do, with the same uncompromising standard at every address.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. LOCATION CARDS — alternating orientation per card ──────── */}
      <section>
        {LOCATIONS.map((loc, i) => {
          const isReverse = i % 2 === 1;
          const isLast = i === LOCATIONS.length - 1;
          return (
            <motion.div
              key={loc.id}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className={`grid grid-cols-1 lg:grid-cols-2 ${isLast ? "" : "border-b border-[#0a0a0a]/10"}`}
            >
              {/* IMAGE */}
              <div className={`relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] overflow-hidden ${isReverse ? "lg:order-2" : ""}`}>
                <Link href={`/locations/${loc.id}`} className="absolute inset-0 group">
                  <img
                    src={loc.img}
                    alt={loc.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/30 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 sm:top-7 sm:left-7">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-['NeueMontreal'] text-white border border-white/40 rounded-full px-3 py-1 backdrop-blur-sm bg-black/15">
                      {fmt.tag(loc.tag)}
                    </span>
                  </div>
                </Link>
              </div>

              {/* CONTENT */}
              <div className={`p-8 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-between gap-10 md:gap-14 bg-[#fafaf7] ${isReverse ? "lg:order-1" : ""}`}>
                <div>
                  <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 sm:mb-5">
                    <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700]">
                      0{i + 1}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/45 font-['NeueMontreal']">
                      Delhi NCR
                    </span>
                  </motion.div>

                  <Link href={`/locations/${loc.id}`} className="group inline-block">
                    <h3 className='font-["Founders_Grotesk"] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[6vw] tracking-tighter leading-[0.9] text-[#0a0a0a] uppercase mb-5 sm:mb-6 group-hover:text-[#FF6700] transition-colors duration-300 overflow-hidden pb-[0.05em]'>
                      <motion.span variants={lineUp} className="block">{loc.label}</motion.span>
                    </h3>
                  </Link>

                  <motion.p variants={fadeUp} className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed max-w-[48ch]">
                    {fmt.desc(loc.desc)}
                  </motion.p>
                </div>

                {/* Meta info */}
                <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:gap-4 py-5 sm:py-6 border-y border-[#0a0a0a]/10">
                  <div className="flex items-start gap-3">
                    <LuMapPin className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/75 leading-relaxed">
                      {fmt.addr(loc.address)}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <LuTrainFront className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/75">
                      {fmt.metro(loc.metro)}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <LuUsers className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/75">
                      {fmt.cap(loc.capacity)}
                    </p>
                  </div>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                  <Link href={`/locations/${loc.id}`}
                    className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-colors duration-300">
                    Visit {loc.label}
                    <LuArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <a href={BOOKING.tour} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 border border-[#0a0a0a]/25 text-[#0a0a0a]/85 hover:bg-[#0a0a0a] hover:text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300">
                    Book a Tour
                    <LuArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ── 3. SHARED STANDARDS ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
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
                  Every Space, Always
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">Same Standard.</motion.span>
              </h2>
            </div>
            <motion.p variants={fadeUp}
              className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/55 max-w-[36ch] md:text-right leading-relaxed">
              Different neighbourhoods, identical commitment to how a workspace should feel.
            </motion.p>
          </div>

          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {SHARED_STANDARDS.map((item, i) => (
              <motion.div variants={cardUp} key={item}
                className="group flex items-center gap-3 py-4 px-5 rounded-xl bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/10 hover:bg-[#FF6700] hover:border-[#FF6700] transition-all duration-500 cursor-default">
                <span className="font-['Founders_Grotesk'] text-[10px] tracking-[0.25em] text-[#FF6700] group-hover:text-[#0a0a0a] transition-colors duration-300 flex-shrink-0">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="font-['NeueMontreal'] text-sm font-medium text-[#0a0a0a]/85 group-hover:text-[#0a0a0a] transition-colors duration-300">
                  {item}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── 4. CTA ─────────────────────────────────────────────────────── */}
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
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Come Visit
            </p>
            <span className="w-8 h-px bg-[#FF6700]" />
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Find your</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                <span className="text-[#FF6700]">favourite.</span>
              </motion.span>
            </span>
          </h2>

          <motion.p variants={fadeUp}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-[#0a0a0a]/60 font-['NeueMontreal'] leading-relaxed max-w-[48ch] mx-auto">
            Book a free 15-minute tour at any of our addresses. We&apos;ll show you around the space closest to you.
          </motion.p>

          <motion.div variants={fadeUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href={BOOKING.tour} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300">
              Book a Free Tour
              <LuArrowUpRight className="w-4 h-4" />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300">
              WhatsApp Us
              <LuArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
