"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { LuArrowUpRight, LuCheck } from "react-icons/lu";
import { AMENITY_GROUPS, STANDARDS } from "../data/amenities";
import { BOOKING } from "../data/booking";
import { MEDIA } from "../data/media";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp  = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp  = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const cardUp  = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AmenitiesContent() {
  return (
    <main className="relative w-full bg-[#fafaf7] text-[#0a0a0a] overflow-hidden">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-16 sm:pb-20 md:pb-28 px-5 sm:px-10 md:px-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Amenities
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.9] tracking-tighter text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Every detail,</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                <span className="text-[#FF6700]">considered.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#0a0a0a]/65 text-base sm:text-lg leading-relaxed mt-8 sm:mt-10 max-w-[58ch]"
          >
            What makes a workspace premium isn&apos;t what&apos;s in the brochure — it&apos;s what&apos;s already handled before you ask. Here&apos;s the long list.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════ INTRO PROSE ═══════════════════════ */}
      <section className="px-5 sm:px-10 md:px-20 pb-16 sm:pb-24 md:pb-32 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
        >
          <motion.div variants={fadeUp} className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-['NeueMontreal']">
              Philosophy
            </p>
            <h2 className="mt-4 font-['Founders_Grotesk'] font-bold uppercase text-3xl sm:text-4xl leading-[1] tracking-tight">
              We handle the boring stuff.
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-7 md:col-start-6 space-y-5 font-['NeueMontreal'] text-[#0a0a0a]/70 text-base sm:text-lg leading-relaxed">
            <p>
              Premium isn&apos;t a category — it&apos;s a standard. We don&apos;t just have WiFi; we have two ISPs and a UPS. We don&apos;t just serve coffee; we hire baristas and source single-origin beans. The unglamorous infrastructure of a great workday — that&apos;s the actual product.
            </p>
            <p>
              Everything below is included with every plan. No tiers. No add-ons. No &quot;premium support&quot; upsells. If it&apos;s on the list, it&apos;s yours from day one.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════ CATEGORIES 1 & 2 ═══════════════════════ */}
      {AMENITY_GROUPS.slice(0, 2).map((group, gi) => (
        <CategorySection key={group.title} group={group} gi={gi} />
      ))}

      {/* ═══════════════════════ IMAGE MOMENT ═══════════════════════ */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <Image
          src={MEDIA.amenitiesShowcase}
          alt="A Berry workspace, considered."
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#FF6700]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                The Standard
              </p>
              <span className="w-10 h-px bg-[#FF6700]" />
            </motion.div>
            <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-white text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter'>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">Morning light.</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">Evening calm.</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block text-[#FF6700]">All-day quiet.</motion.span>
              </span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════ CATEGORIES 3 & 4 ═══════════════════════ */}
      {AMENITY_GROUPS.slice(2).map((group, gi) => (
        <CategorySection key={group.title} group={group} gi={gi + 2} />
      ))}

      {/* ═══════════════════════ STANDARDS STRIP ═══════════════════════ */}
      <section className="relative px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-32 border-t border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.02]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Every Location
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter max-w-[20ch]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Same standard.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Every floor.</motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm sm:text-base leading-relaxed mt-6 sm:mt-8 max-w-[52ch]"
          >
            What you get in Connaught Place is exactly what you get in Jhandewalan and Noida. No A-tier and B-tier. No flagship and afterthought.
          </motion.p>

          <motion.ul
            variants={stagger}
            className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4"
          >
            {STANDARDS.map((s) => (
              <motion.li
                key={s}
                variants={fadeUp}
                className="flex items-start gap-3 font-['NeueMontreal'] text-[#0a0a0a]/80 text-sm sm:text-base leading-relaxed py-1"
              >
                <LuCheck className="w-4 h-4 text-[#FF6700] mt-1 flex-shrink-0" strokeWidth={2.5} />
                <span>{s}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* ═══════════════════════ CLOSING CTA ═══════════════════════ */}
      <section className="relative px-5 sm:px-10 md:px-20 py-20 sm:py-28 md:py-36 border-t border-[#0a0a0a]/10 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#0a0a0a 1px,transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              See It for Yourself
            </p>
            <span className="w-10 h-px bg-[#FF6700]" />
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter max-w-[18ch] mx-auto'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">The list is long.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">The walk-through is short.</motion.span>
            </span>
          </h2>

          <motion.div variants={fadeUp} className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Book a Tour
              <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
            <Link
              href="/locations"
              className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 border border-[#0a0a0a]/25 text-[#0a0a0a]/85 rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] hover:border-[#0a0a0a] transition-all duration-300"
            >
              See Locations
              <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

// ─── Category section ───────────────────────────────────────────────────────
function CategorySection({ group, gi }) {
  return (
    <section className={`px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-32 ${gi !== 0 ? "border-t border-[#0a0a0a]/10" : ""}`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.p
          variants={fadeUp}
          className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']"
        >
          {group.eyebrow}
        </motion.p>

        <h2 className='mt-5 font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter max-w-[18ch]'>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="block">{group.title}</motion.span>
          </span>
        </h2>

        <motion.p
          variants={fadeUp}
          className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm sm:text-base leading-relaxed mt-5 sm:mt-7 max-w-[58ch]"
        >
          {group.desc}
        </motion.p>

        <motion.div
          variants={stagger}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12"
        >
          {group.items.map(({ icon: Icon, name, desc }) => (
            <motion.div key={name} variants={cardUp} className="group">
              <div className="w-11 h-11 rounded-full bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/10 flex items-center justify-center mb-5 group-hover:bg-[#FF6700] group-hover:border-[#FF6700] transition-colors duration-300">
                <Icon className="w-5 h-5 text-[#0a0a0a]/75 group-hover:text-[#0a0a0a] transition-colors" strokeWidth={1.75} />
              </div>
              <h3 className="font-['Founders_Grotesk'] font-bold text-xl leading-tight text-[#0a0a0a]">
                {name}
              </h3>
              <p className="mt-2 font-['NeueMontreal'] text-[#0a0a0a]/55 text-sm leading-relaxed max-w-[34ch]">
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
