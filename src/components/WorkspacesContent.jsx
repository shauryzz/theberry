"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuCheck, LuX, LuArrowUpRight } from "react-icons/lu";
import { PLANS } from "../data/plans";
import { LOCATIONS as ALL_LOCATIONS } from "../data/locations";
import { BOOKING, getPlanBookingUrl, isExternalBooking, whatsappLink } from "../data/booking";
import InteractiveStandards from "./InteractiveStandards";

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

// "Why Berry" rich cards (DRAFT COPY + PLACEHOLDER IMAGES).
// Rewritten Oct 2026: each card now says one specific thing.
// Repetition with the homepage pillars intentionally avoided.
const WHY_BERRY = [
  {
    title: "Zones for the work",
    desc: "Focus rooms, phone booths, casual lounges, and full meeting rooms on every floor. Move between them as the day changes.",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=85&fit=crop",
  },
  {
    title: "On-site facility team",
    desc: "From the front desk to the fibre, someone at each location keeps everything running. Your only job is the work you came to do.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1000&q=85&fit=crop",
  },
  {
    title: "Curated events",
    desc: "Workshops and socials worth your calendar. Skip the ones you don't need. The floor is full of founders, freelancers, and teams either way.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&q=85&fit=crop",
  },
  {
    title: "Support that answers",
    desc: "Raise a request in the app and get a real reply, usually within the hour. No tickets lost in a void.",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=85&fit=crop",
  },
];

function formatPrice(num) {
  if (num === null) return null;
  return `₹${num.toLocaleString("en-IN")}`;
}

function PlanCard({ plan, location }) {
  const price      = plan.pricing[location];
  const formatted  = formatPrice(price);
  const isPopular  = plan.badge === "Most Popular";
  const isPremium  = !formatted && plan.id === "managed-office"; // Ivory treatment

  const bookingUrl = getPlanBookingUrl(plan.id, location);
  const isExternal = isExternalBooking(bookingUrl);

  const ctaInner = (
    <>
      {formatted ? `Book ${plan.name}` : "Get a Quote"}
      <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/cta:rotate-45" strokeWidth={2} />
    </>
  );

  // ── Card frame variants ──
  //   default → warm off-white on cream page, 1px hairline in warm ink
  //   popular → same but 2px orange ring + orange-tinted shadow
  //   premium (managed office) → warm ivory tint, deeper hairline, gold-ish accent
  const frameClass = isPremium
    ? "bg-[#f8f2e8] ring-1 ring-[#0a0a0a]/12 shadow-[0_25px_60px_-25px_rgba(120,90,40,0.28)] hover:shadow-[0_35px_80px_-25px_rgba(120,90,40,0.38)]"
    : isPopular
    ? "bg-[#f4f1ea] ring-2 ring-[#FF6700] shadow-[0_25px_60px_-25px_rgba(255,103,0,0.32)] hover:shadow-[0_35px_80px_-25px_rgba(255,103,0,0.42)]"
    : "bg-[#f4f1ea] ring-1 ring-[#0a0a0a]/10 shadow-[0_20px_50px_-25px_rgba(10,10,10,0.18)] hover:shadow-[0_28px_65px_-25px_rgba(10,10,10,0.25)]";

  return (
    <motion.div
      variants={cardUp}
      className={`group relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${frameClass}`}
    >
      {/* ── IMAGE (contained inside frame, top corners rounded via clip) ── */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <img
          src={plan.image}
          alt={plan.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        {/* Bottom gradient — helps if we ever overlay text on the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/20 via-transparent to-transparent" />

        {/* Badge (top-left, integrated) */}
        {(plan.badge || isPremium) && (
          <div className="absolute top-4 left-4">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] tracking-[0.25em] uppercase font-['NeueMontreal'] font-bold ${
              isPremium
                ? "bg-[#0a0a0a] text-[#f8f2e8]"
                : "bg-[#FF6700] text-[#0a0a0a]"
            }`}>
              <span className={`w-1 h-1 rounded-full ${isPremium ? "bg-[#FF6700]" : "bg-[#0a0a0a]"}`} />
              {isPremium ? "Signature" : plan.badge}
            </div>
          </div>
        )}
      </div>

      {/* ── BODY — order: eyebrow / name / price / description / features / cta ──
             This order is deliberate: price sits immediately after name so it
             aligns horizontally across all cards in the row, regardless of
             description length. Description moves below where variable wrap
             length doesn't throw price alignment. */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 md:p-8">
        {/* Eyebrow */}
        <p className="text-[10px] tracking-[0.3em] uppercase font-['NeueMontreal'] text-[#FF6700] mb-3">
          {plan.tagline}
        </p>

        {/* Plan name — fixed min height so the row is even even if a name wraps */}
        <h3 className='font-["Founders_Grotesk"] font-bold text-[2rem] md:text-[2.25rem] tracking-tight leading-[1.05] text-[#0a0a0a] min-h-[2.5rem] md:min-h-[3rem] mb-5'>
          {plan.name}
        </h3>

        {/* Hairline divider */}
        <div className="h-px w-full bg-[#0a0a0a]/12 mb-5" />

        {/* PRICE — aligned across all cards in the row */}
        <div className="mb-6">
          {formatted ? (
            <div className="flex items-baseline gap-2">
              <span className='font-["Founders_Grotesk"] font-bold text-5xl md:text-[3.75rem] tracking-tighter leading-none text-[#0a0a0a]'>
                {formatted}
              </span>
              <span className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/40">
                /mo
              </span>
            </div>
          ) : (
            <span className='font-["Founders_Grotesk"] font-bold text-5xl md:text-[3.75rem] tracking-tighter leading-none text-[#0a0a0a]'>
              Custom
            </span>
          )}
          <p className="font-['NeueMontreal'] text-[11px] mt-2 tracking-wide text-[#0a0a0a]/40">
            + applicable taxes · per seat
          </p>
        </div>

        {/* Description — sits below price so variable wrap doesn't throw alignment */}
        <p className="font-['NeueMontreal'] text-sm leading-relaxed text-[#0a0a0a]/60 mb-6">
          {plan.description}
        </p>

        {/* Hairline divider before features */}
        <div className="h-px w-full bg-[#0a0a0a]/12 mb-5" />

        {/* Features */}
        <ul className="space-y-2.5 mb-7 flex-1">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-start gap-2.5 font-['NeueMontreal'] text-sm leading-relaxed text-[#0a0a0a]/72"
            >
              <span className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-full bg-[#FF6700]/12 mt-0.5">
                <LuCheck className="w-2.5 h-2.5 text-[#FF6700]" strokeWidth={3} />
              </span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA — full width, pronounced */}
        {isExternal ? (
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/cta flex items-center justify-center gap-2 w-full text-center py-4 rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300 ${
              isPopular
                ? "bg-[#FF6700] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FF6700]"
                : "bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a]"
            }`}
          >
            {ctaInner}
          </a>
        ) : (
          <Link
            href={bookingUrl}
            className={`group/cta flex items-center justify-center gap-2 w-full text-center py-4 rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-all duration-300 ${
              isPopular
                ? "bg-[#FF6700] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FF6700]"
                : "bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a]"
            }`}
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
      <section className="relative w-full pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-16 md:pb-24 px-5 sm:px-10 md:px-20 border-b border-[#0a0a0a]/10 overflow-hidden">
        {/* Background photo (PLACEHOLDER — swap for the client's real photo) */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=85&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Cream wash — solid over the text on the left, fading to reveal the photo on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafaf7] via-[#fafaf7]/85 to-[#fafaf7]/25" />
          {/* Bottom blend into the next section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf7] via-transparent to-[#fafaf7]/40" />
        </div>

        <motion.div initial="hidden" animate="show" variants={stagger} className="relative z-10 max-w-5xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Workspaces &amp; Pricing
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] tracking-tighter leading-[0.95] uppercase text-[#0a0a0a]'>
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
            From a single seat to a fully branded managed office. Pricing varies by location.
          </motion.p>
        </motion.div>
      </section>

      {/* ── LOCATION TOGGLE ───────────────────────────────────────────
          Centered picker with eyebrow above. */}
      <section className="w-full px-5 sm:px-10 md:px-20 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-14">
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Choose Your Location
            </p>
            <span className="w-8 h-px bg-[#FF6700]" />
          </div>

          <div className="inline-flex items-center p-1.5 rounded-full border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.04] shadow-[0_4px_20px_-6px_rgba(10,10,10,0.08)]">
            {LOCATIONS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLocation(l.id)}
                className={`px-5 sm:px-7 md:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-['NeueMontreal'] tracking-wide transition-all duration-300 ${
                  location === l.id
                    ? "bg-[#FF6700] text-[#0a0a0a] shadow-[0_4px_12px_-3px_rgba(255,103,0,0.35)]"
                    : "text-[#0a0a0a]/55 hover:text-[#0a0a0a]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN CARDS — key={location} re-mounts the grid on tab change
             so the stagger animation replays cleanly instead of leaving
             cards stuck in the hidden variant state. */}
      <section className="w-full px-5 sm:px-10 md:px-20 pb-14 sm:pb-20 md:pb-28">
        {(() => {
          const visible = PLANS.filter((plan) => plan.availableAt?.includes(location));
          const lgCols = visible.length === 2 ? "lg:grid-cols-2"
                       : visible.length === 3 ? "lg:grid-cols-3"
                       : "lg:grid-cols-4";
          const maxWidth = visible.length === 2 ? "max-w-4xl"
                         : visible.length === 3 ? "max-w-6xl"
                         : "max-w-7xl";
          return (
            <motion.div
              key={location}
              initial="hidden"
              animate="show"
              variants={stagger}
              className={`grid grid-cols-1 md:grid-cols-2 ${lgCols} gap-6 md:gap-7 mx-auto ${maxWidth}`}
            >
              {visible.map((plan) => (
                <PlanCard key={plan.id} plan={plan} location={location} />
              ))}
            </motion.div>
          );
        })()}
      </section>

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
          className="relative px-5 sm:px-10 md:px-20 py-16 sm:py-20 md:py-28 grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        >
          {/* Left — statement */}
          <div className="flex flex-col gap-7 md:gap-8">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#0a0a0a]/40" />
              <p className="text-[10px] uppercase tracking-[0.4em] font-['NeueMontreal']">
                No Surprises
              </p>
            </motion.div>

            <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tight text-[11vw] sm:text-[8vw] md:text-5xl lg:text-6xl'>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">One transparent price.</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">Everything <span className="text-[#0a0a0a]">included.</span></motion.span>
              </span>
            </h2>

            <motion.p
              variants={fadeUp}
              className="font-['NeueMontreal'] text-[#3D1B0A] text-base md:text-lg leading-relaxed max-w-[52ch]"
            >
              What you see is what you pay. No setup fees, no hidden charges, no surprise invoices. Every membership comes with the basics built in.
            </motion.p>
          </div>

          {/* Right — the guarantees, filling the band */}
          <motion.div variants={fadeUp} className="flex flex-col">
            {["No setup fees", "No hidden charges", "No surprise invoices", "No lock-in contracts"].map((g, i) => (
              <div
                key={g}
                className={`flex items-center gap-4 sm:gap-5 py-4 sm:py-5 border-b border-[#0a0a0a]/15 ${i === 0 ? "border-t" : ""}`}
              >
                <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0a0a0a] text-[#FF6700] flex items-center justify-center flex-shrink-0">
                  <LuX className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                </span>
                <span className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-2xl sm:text-3xl md:text-[1.75rem] lg:text-3xl text-[#0a0a0a]">
                  {g}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHY BERRY — interactive image + text cards ───────────────── */}
      <section className="w-full px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-10 sm:mb-12 md:mb-14 max-w-3xl"
        >
          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
            <motion.span variants={lineUp} className="block">More Than a <span className="text-[#FF6700]">Desk.</span></motion.span>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 font-['NeueMontreal'] text-[#0a0a0a]/55 text-base max-w-[54ch] leading-relaxed"
          >
            Every Berry Coworks membership comes with an ecosystem built to help you do your best work.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {WHY_BERRY.map((item) => (
            <motion.div
              variants={cardUp}
              key={item.title}
              className="group relative grid grid-cols-1 sm:grid-cols-[40%_60%] overflow-hidden rounded-2xl border border-[#0a0a0a]/10 bg-white hover:-translate-y-1.5 hover:shadow-[0_28px_60px_-22px_rgba(10,10,10,0.2)] transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-auto sm:min-h-[220px] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-[#FF6700]/0 group-hover:bg-[#FF6700]/10 transition-colors duration-500" />
              </div>

              {/* Text */}
              <div className="relative p-6 sm:p-7 md:p-8 flex flex-col justify-center">
                <h3 className="font-['Founders_Grotesk'] font-bold text-2xl md:text-3xl tracking-tight leading-tight text-[#0a0a0a] mb-2.5">
                  {item.title}
                </h3>
                <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/60 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
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
          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
            <motion.span variants={lineUp} className="block">Every Plan <span className="text-[#FF6700]">Includes.</span></motion.span>
          </h2>
          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#0a0a0a]/50 text-sm max-w-[36ch] md:text-right leading-relaxed"
          >
            The basics that should never be a question. Built into every Berry Coworks membership.
          </motion.p>
        </motion.div>

        <InteractiveStandards
          columns="four"
          items={[
            { label: "Gigabit WiFi",        icon: "wifi" },
            { label: "F&B Counter",         icon: "fnb" },
            { label: "Phone Booths",        icon: "phone" },
            { label: "Meeting Rooms",       icon: "meeting" },
            { label: "Printing & Scanning", icon: "printer" },
            { label: "Mail Handling",       icon: "mail" },
            { label: "Community Events",    icon: "community" },
            { label: "Metro Access",        icon: "metro" },
          ]}
        />
      </section>

      {/* ── FINAL CTA — full-width split band ────────────────────────── */}
      <section className="w-full py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative w-full overflow-hidden bg-[#0a0a0a] grid md:grid-cols-2"
        >
          {/* Image (PLACEHOLDER — swap for the client's real photo) */}
          <motion.div
            variants={fadeUp}
            className="relative h-56 sm:h-72 md:h-auto md:min-h-[500px] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85&fit=crop"
              alt="A guided tour of The Berry Coworks"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Seam — blend the image into the dark card (top edge on mobile, right edge on desktop) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:hidden" />
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]" />
            <div className="absolute inset-0 bg-[#FF6700]/10 mix-blend-overlay" />
          </motion.div>

          {/* Content */}
          <div className="relative p-8 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center text-[#fafaf7]">
            <div className="pointer-events-none absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#FF6700]/15 blur-3xl" />

            <motion.div variants={fadeUp} className="relative flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#FF6700]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                The Next Step
              </p>
            </motion.div>

            <h2 className='relative font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-3xl sm:text-4xl md:text-5xl text-[#fafaf7] overflow-hidden pb-[0.05em]'>
              <motion.span variants={lineUp} className="block">Not sure which</motion.span>
              <motion.span variants={lineUp} className="block">
                plan <span className="text-[#FF6700]">fits?</span>
              </motion.span>
            </h2>

            <motion.p
              variants={fadeUp}
              className="relative font-['NeueMontreal'] text-[#fafaf7]/60 text-sm md:text-base leading-relaxed mt-5 max-w-[46ch]"
            >
              Book a free 15-minute tour. We&apos;ll show you the spaces, answer questions, and help you pick the right plan. No pressure.
            </motion.p>

            <motion.div variants={fadeUp} className="relative mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href={BOOKING.tour}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#fafaf7] transition-colors duration-300 text-center"
              >
                Book a Free Tour
                <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#fafaf7]/25 rounded-full text-sm text-[#fafaf7]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#fafaf7] hover:text-[#0a0a0a] transition-all duration-300 text-center"
              >
                WhatsApp Us
                <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}