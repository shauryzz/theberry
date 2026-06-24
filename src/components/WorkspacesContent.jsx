"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuCheck, LuArrowUpRight } from "react-icons/lu";
import { PLANS, ALL_PLANS_INCLUDE } from "../data/plans";
import { LOCATIONS as ALL_LOCATIONS } from "../data/locations";
import { BOOKING, getPlanBookingUrl, isExternalBooking, whatsappLink } from "../data/booking";

// Lean projection — toggle only needs id + label.
const LOCATIONS = ALL_LOCATIONS.map(({ id, label }) => ({ id, label }));

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const cardUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function formatPrice(num) {
  if (num === null) return null;
  return `₹${num.toLocaleString("en-IN")}`;
}

function PlanCard({ plan, location }) {
  const price = plan.pricing[location];
  const formatted = formatPrice(price);
  const isPopular = plan.badge === "Most Popular";

  // Resolve booking URL — DeskOS deep link for most plans,
  // /contact for custom suite (custom quote required).
  const bookingUrl = getPlanBookingUrl(plan.id, location);
  const isExternal = isExternalBooking(bookingUrl);

  // Shared CTA classes
  const ctaClass = isPopular
    ? "bg-[#FF6700] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FF6700]"
    : "border border-[#0a0a0a]/25 text-[#0a0a0a]/85 hover:bg-[#0a0a0a] hover:text-[#fafaf7]";

  const ctaInner = (
    <>
      {formatted ? `Book ${plan.name}` : "Get a Custom Quote"}
      <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );

  return (
    <motion.div
      variants={cardUp}
      className="relative flex flex-col rounded-2xl overflow-hidden border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.04] hover:bg-[#0a0a0a]/[0.06] hover:border-[#0a0a0a]/20 transition-all duration-500"
    >
      {plan.badge && (
        <div className="absolute top-5 right-5 z-10 px-3 py-1 rounded-full bg-[#FF6700] text-[#0a0a0a] text-[10px] tracking-[0.15em] uppercase font-['NeueMontreal'] font-medium">
          {plan.badge}
        </div>
      )}

      <div className="relative w-full h-52 sm:h-56 md:h-60 overflow-hidden">
        <img
          src={plan.image}
          alt={plan.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/75 font-['NeueMontreal']">
            {plan.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-6 sm:p-7 md:p-8">
        <h3 className='font-["Founders_Grotesk"] font-bold text-3xl md:text-4xl tracking-tight text-[#0a0a0a] mb-3'>
          {plan.name}
        </h3>
        <p className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm leading-relaxed mb-6 min-h-[3rem]">
          {plan.description}
        </p>

        <div className="mb-6 pb-6 border-b border-[#0a0a0a]/10">
          {formatted ? (
            <div className="flex items-baseline gap-2">
              <span className='font-["Founders_Grotesk"] font-bold text-4xl md:text-5xl tracking-tight text-[#FF6700]'>
                {formatted}
              </span>
              <span className="font-['NeueMontreal'] text-[#0a0a0a]/45 text-sm">/ month</span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className='font-["Founders_Grotesk"] font-bold text-3xl md:text-4xl tracking-tight text-[#FF6700]'>
                Custom Quote
              </span>
            </div>
          )}
          <p className="font-['NeueMontreal'] text-[#0a0a0a]/40 text-xs mt-2">
            + applicable taxes · per seat
          </p>
        </div>

        <ul className="space-y-2.5 mb-8 flex-1">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-3 font-['NeueMontreal'] text-[#0a0a0a]/70 text-sm leading-relaxed"
            >
              <LuCheck className="w-3.5 h-3.5 text-[#FF6700] mt-1 flex-shrink-0" strokeWidth={2.5} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {isExternal ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center gap-2 w-full text-center py-3.5 rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300 ${ctaClass}`}
          >
            {ctaInner}
          </a>
        ) : (
          <Link
            href={bookingUrl}
            className={`group flex items-center justify-center gap-2 w-full text-center py-3.5 rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300 ${ctaClass}`}
          >
            {ctaInner}
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function WorkspacesContent() {
  const [location, setLocation] = useState("connaught");

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-16 md:pb-24 px-5 sm:px-10 md:px-20 border-b border-[#0a0a0a]/10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Workspaces &amp; Pricing
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] tracking-tighter leading-[0.95] uppercase text-[#0a0a0a]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Find Your</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                <span className="text-[#FF6700]">Space.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-base md:text-lg leading-relaxed mt-6 sm:mt-8 max-w-[52ch]"
          >
            From a single seat to a fully branded suite — every plan is built around natural light, ergonomic design, and a community of ambitious people. Pricing varies by location.
          </motion.p>
        </motion.div>
      </section>

      {/* ── LOCATION TOGGLE ──────────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-10 md:px-20 py-8 sm:py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/45 font-['NeueMontreal']">
            Choose Your Location
          </p>
          <div className="inline-flex items-center p-1 rounded-full border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.04] w-full md:w-auto">
            {LOCATIONS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLocation(l.id)}
                className={`flex-1 md:flex-initial px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300 ${
                  location === l.id
                    ? "bg-[#FF6700] text-[#0a0a0a]"
                    : "text-[#0a0a0a]/55 hover:text-[#0a0a0a]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS ───────────────────────────────────────────────── */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="w-full px-5 sm:px-10 md:px-20 pb-14 sm:pb-20 md:pb-28"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} location={location} />
          ))}
        </div>
      </motion.section>

      {/* ── ORANGE PULL-QUOTE BREAK (intentionally stays orange in light theme) */}
      <section className="relative w-full bg-[#FF6700] text-[#0a0a0a] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0a0a0a 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative px-5 sm:px-10 md:px-20 py-16 sm:py-20 md:py-28 flex flex-col gap-8 md:gap-10"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#0a0a0a]/40" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-['NeueMontreal']">
              No Surprises
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tight text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] max-w-[22ch]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">One transparent price.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Everything included.</motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#3D1B0A] text-base md:text-lg leading-relaxed max-w-[52ch]"
          >
            What you see is what you pay. No setup fees, no hidden charges, no surprise invoices. Every membership comes with the basics built in.
          </motion.p>
        </motion.div>
      </section>

      {/* ── EVERY PLAN INCLUDES ──────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-12 md:mb-14 gap-4"
        >
          <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
            <motion.span variants={lineUp} className="block">Every Plan Includes.</motion.span>
          </h2>
          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#0a0a0a]/50 text-sm max-w-[36ch] md:text-right leading-relaxed"
          >
            The basics that should never be a question. Built into every Berry Coworks membership.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
        >
          {ALL_PLANS_INCLUDE.map((item) => (
            <motion.div
              variants={cardUp}
              key={item}
              className="group flex items-center gap-3 py-4 px-5 rounded-xl bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/10 hover:bg-[#FF6700] hover:border-[#FF6700] transition-all duration-500 cursor-default"
            >
              <LuCheck
                className="w-4 h-4 text-[#FF6700] group-hover:text-[#0a0a0a] transition-colors duration-300 flex-shrink-0"
                strokeWidth={2.5}
              />
              <span className="font-['NeueMontreal'] text-sm font-medium text-[#0a0a0a]/85 group-hover:text-[#0a0a0a] transition-colors duration-300">
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="w-full px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-10"
        >
          <div className="max-w-[40ch]">
            <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
              <motion.span variants={lineUp} className="block">Not sure which</motion.span>
              <motion.span variants={lineUp} className="block">
                plan <span className="text-[#FF6700]">fits?</span>
              </motion.span>
            </h2>
            <motion.p
              variants={fadeUp}
              className="font-['NeueMontreal'] text-[#0a0a0a]/55 text-sm md:text-base leading-relaxed mt-5 sm:mt-6"
            >
              Book a free 15-minute tour. We&apos;ll show you the spaces, answer questions, and help you pick the right plan — no pressure.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300 text-center"
            >
              Book a Free Tour
              <LuArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300 text-center"
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
