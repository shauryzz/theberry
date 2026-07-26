"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import {
  SOLUTIONS_HERO,
  SECTION_LABELS,
  COWORKING_EXTRAS,
  ADDITIONAL_SOLUTIONS,
  SPACE_INCLUDES,
  PRICING_BREAK,
  SOLUTIONS_CLOSING,
} from "../data/solutions";
import { PLANS } from "../data/plans";
import { LOCATIONS } from "../data/locations";
import { BOOKING } from "../data/booking";
import DayPassPickerModal from "./DayPassPickerModal";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const labelOf = (id) => LOCATIONS.find((l) => l.id === id)?.label || id;
const inr = (n) => `₹${n.toLocaleString("en-IN")}`;

/* Section heading. No eyebrow — that pattern is retired site-wide.
   `sub` renders the client's section sub-label beneath, in italic (the site's
   accent device). It is a plain line, never a tracked-caps eyebrow. */
function Heading({ lead, accent, sub, className = "" }) {
  return (
    <>
      <h2 className={`font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] overflow-hidden pb-[0.05em] ${className}`}>
        <motion.span variants={lineUp} className="block">
          {lead} <span className="text-[#FF6700]">{accent}</span>
        </motion.span>
      </h2>
      {sub && (
        <motion.p
          variants={fadeUp}
          className="mt-4 font-['Founders_Grotesk'] italic text-lg sm:text-xl md:text-2xl text-[#0a0a0a]/45"
        >
          {sub}
        </motion.p>
      )}
    </>
  );
}

/* Pill CTA with the orange sweep from below — the site's standard button. */
function SweepCTA({ children, onClick, href, external = false, dark = false }) {
  const cls = `group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-6 py-3 transition-colors duration-300 ${
    dark ? "border-[#fafaf7]/25 hover:border-[#FF6700]" : "border-[#0a0a0a]/20 hover:border-[#FF6700]"
  }`;
  const inner = (
    <>
      <span aria-hidden="true" className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <span className={`relative font-['NeueMontreal'] text-[11px] sm:text-xs tracking-[0.18em] uppercase ${dark ? "text-[#fafaf7] group-hover/cta:text-[#0a0a0a]" : "text-[#0a0a0a]"}`}>
        {children}
      </span>
      <LuArrowUpRight className={`relative w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:rotate-45 ${dark ? "text-[#fafaf7] group-hover/cta:text-[#0a0a0a]" : "text-[#0a0a0a]"}`} />
    </>
  );
  if (onClick) return <button onClick={onClick} className={cls}>{inner}</button>;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}

/* Priced product: photo one side, copy + per-location price rows the other.
   Only locations where the product is actually offered are listed — nothing
   is ever shown as "not available". */
function PricedProduct({ plan, flip = false }) {
  // Cheapest first — matches the order in the client's document (Noida →
  // Jhandewalan → Barakhamba) and stays correct if prices ever change.
  // Locations with no price are dropped, never rendered as "not available".
  const rows = plan.availableAt
    .map((id) => ({ id, label: labelOf(id), price: plan.pricing[id] }))
    .filter((r) => r.price != null)
    .sort((a, b) => a.price - b.price);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <motion.div variants={fadeUp} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a]/5">
        <img src={plan.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      </motion.div>

      <div>
        <motion.h3 variants={fadeUp} className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-none text-4xl sm:text-5xl md:text-6xl text-[#0a0a0a]">
          {plan.name}
        </motion.h3>

        <motion.p variants={fadeUp} className="mt-3 font-['Founders_Grotesk'] italic text-base sm:text-lg text-[#0a0a0a]/45">
          {plan.alias}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-5 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/70 leading-relaxed max-w-[52ch]">
          {plan.description}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 border-t border-[#0a0a0a]/12">
          {rows.map((r) => (
            <div key={r.id} className="flex items-baseline justify-between gap-4 py-4 border-b border-[#0a0a0a]/12">
              <span className="font-['NeueMontreal'] text-sm sm:text-base text-[#0a0a0a]/70">{r.label}</span>
              <span className="flex items-baseline gap-2">
                <span className="font-['Founders_Grotesk'] font-bold text-2xl sm:text-3xl tracking-tight text-[#FF6700]">{inr(r.price)}</span>
                <span className="font-['Founders_Grotesk'] italic text-xs sm:text-sm text-[#0a0a0a]/45">{plan.priceUnit}</span>
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-7">
          <SweepCTA href="/contact">Enquire</SweepCTA>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Non-priced offering booked through DeskOS (day pass, meeting rooms). */
function BookableCard({ item, onPickerOpen }) {
  return (
    <motion.article variants={fadeUp} className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#0a0a0a]/10 hover:border-[#FF6700]/40 hover:shadow-[0_24px_60px_-24px_rgba(10,10,10,0.18)] transition-all duration-500">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={item.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
        <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#fafaf7]/95 backdrop-blur-sm font-['Founders_Grotesk'] italic text-xs text-[#0a0a0a] shadow-[0_6px_18px_-8px_rgba(10,10,10,0.5)]">
          {item.availableNote}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0a0a0a]">
          {item.name}
        </h3>
        <p className="mt-2 font-['Founders_Grotesk'] italic text-sm text-[#0a0a0a]/45">{item.alias}</p>
        <p className="mt-4 font-['NeueMontreal'] text-sm sm:text-base text-[#0a0a0a]/65 leading-relaxed">{item.desc}</p>

        <div className="flex-1" />

        <div className="mt-7">
          {item.action === "picker" ? (
            <SweepCTA onClick={onPickerOpen}>{item.ctaLabel}</SweepCTA>
          ) : (
            <SweepCTA href={BOOKING.meetingRoom.all} external>{item.ctaLabel}</SweepCTA>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function SolutionsContent() {
  const [isPickerOpen, setPickerOpen] = useState(false);
  const officeSpaces = PLANS.filter((p) => p.id === "private-office");
  const coworkingPlans = PLANS.filter((p) => p.id === "dedicated-desk");

  return (
    <>
      {/* ── HERO — copy first, then the photo as a full-width cinematic band.
             Tried a side-by-side split first: the photo ran to the top edge and
             collided with the fixed navbar, and the two halves read as separate
             columns rather than one hero. Giving the photo its own full-bleed
             band below the copy avoids both, and keeps text off the image so
             legibility is never traded away. ──────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16 md:pb-20">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <Heading
            lead={SOLUTIONS_HERO.headline.lead}
            accent={SOLUTIONS_HERO.headline.accent}
            className="text-[#0a0a0a]"
          />

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/65 leading-relaxed max-w-[58ch]"
          >
            {SOLUTIONS_HERO.subhead}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-10 sm:mt-12 font-['Founders_Grotesk'] italic text-lg sm:text-xl md:text-2xl leading-snug text-[#0a0a0a]/70 max-w-[52ch]"
          >
            {SOLUTIONS_HERO.intro}
          </motion.p>
        </motion.div>
      </section>

      {/* Full-bleed image band. Wide and shallow so it reads as a cinematic
          break rather than a second hero competing with the type above. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[34vh] sm:h-[42vh] md:h-[52vh] min-h-[260px] max-h-[560px] overflow-hidden bg-[#0a0a0a]/5"
      >
        <motion.img
          src={SOLUTIONS_HERO.image}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* ── OFFICE SPACES ────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-12 sm:mb-16">
          <Heading lead="Office" accent="spaces." sub={SECTION_LABELS.officeSpaces} className="text-[#0a0a0a]" />
        </motion.div>
        <div className="flex flex-col gap-20">
          {officeSpaces.map((p) => <PricedProduct key={p.id} plan={p} />)}
        </div>
      </section>

      {/* ── COWORKING SPACES ─────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-12 sm:mb-16">
          <Heading lead="Coworking" accent="spaces." sub={SECTION_LABELS.coworkingSpaces} className="text-[#0a0a0a]" />
        </motion.div>

        <div className="flex flex-col gap-20">
          {coworkingPlans.map((p) => <PricedProduct key={p.id} plan={p} flip />)}
        </div>

        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {COWORKING_EXTRAS.map((item) => (
            <BookableCard key={item.id} item={item} onPickerOpen={() => setPickerOpen(true)} />
          ))}
        </motion.div>
      </section>

      {/* ── ADDITIONAL SOLUTIONS ─────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-12 sm:mb-16 max-w-3xl">
          <Heading lead="Additional" accent="solutions." sub={SECTION_LABELS.additionalSolutions} className="text-[#0a0a0a]" />
          <motion.p variants={fadeUp} className="mt-5 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed max-w-[54ch]">
            Business essentials that live at our locations, from a registered address to event space and brand placements.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ADDITIONAL_SOLUTIONS.map((item) => (
            <motion.article key={item.id} variants={fadeUp} className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#0a0a0a]/10 hover:border-[#FF6700]/40 hover:shadow-[0_24px_60px_-24px_rgba(10,10,10,0.18)] transition-all duration-500">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={item.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
              </div>
              <div className="flex flex-col flex-1 p-6 sm:p-7">
                <h3 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-2xl text-[#0a0a0a]">{item.name}</h3>
                <p className="mt-4 font-['NeueMontreal'] text-sm text-[#0a0a0a]/65 leading-relaxed">{item.desc}</p>
                <div className="flex-1" />
                <div className="mt-7"><SweepCTA href={item.href}>{item.ctaLabel}</SweepCTA></div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ── TRANSPARENT PRICING BREAK — lead-in to what's included ────── */}
      <section className="relative w-full bg-[#FF6700] overflow-hidden px-5 sm:px-10 md:px-20 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: "radial-gradient(#0a0a0a 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative max-w-4xl">
          <h2 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-[9vw] sm:text-[6.5vw] md:text-[5vw] lg:text-[4vw] text-[#0a0a0a]">
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">{PRICING_BREAK.headline.lead}</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block text-[#fafaf7]">{PRICING_BREAK.headline.accent}</motion.span>
            </span>
          </h2>
          <motion.p variants={fadeUp} className="mt-6 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/75 leading-relaxed max-w-[54ch]">
            {PRICING_BREAK.body}
          </motion.p>
        </motion.div>
      </section>

      {/* ── EVERY SPACE INCLUDES ─────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mb-12 sm:mb-16">
          <Heading lead="Every space" accent="includes." sub={SECTION_LABELS.spaceIncludes} className="text-[#0a0a0a]" />
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {SPACE_INCLUDES.map((g) => (
            <motion.div key={g.group} variants={fadeUp} className="border-t border-[#0a0a0a]/15 pt-6">
              <p className="font-['Founders_Grotesk'] italic text-base md:text-lg text-[#0a0a0a]/45 mb-5">{g.group}</p>
              <ul className="flex flex-col gap-3">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5 font-['NeueMontreal'] text-sm text-[#0a0a0a]/75 leading-relaxed">
                    <LuCheck className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CLOSING ──────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-20 sm:py-28 md:py-32 border-t border-[#0a0a0a]/10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-4xl mx-auto text-center">
          <Heading lead={SOLUTIONS_CLOSING.headline.lead} accent={SOLUTIONS_CLOSING.headline.accent} className="text-[#0a0a0a]" />
          <motion.p variants={fadeUp} className="mt-6 sm:mt-8 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed max-w-[52ch] mx-auto">
            {SOLUTIONS_CLOSING.body}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
            <SweepCTA href="/contact">{SOLUTIONS_CLOSING.ctaLabel}</SweepCTA>
          </motion.div>
        </motion.div>
      </section>

      <DayPassPickerModal isOpen={isPickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}
