"use client";

import { motion } from "framer-motion";
import { LuArrowUpRight, LuLinkedin } from "react-icons/lu";
import { FOUNDERS, BELIEFS } from "../data/site";
import { STATS, JOURNEY } from "../data/content";
import { BOOKING, whatsappLink } from "../data/booking";
import { MEDIA } from "../data/media";
import CountUp from "./CountUp";

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

export default function AboutContent() {
  return (
    <>
      {/* ── 1. EDITORIAL HERO ──────────────────────────────────────────── */}
      <section className="relative px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-20 md:pb-24 border-b border-[#0a0a0a]/10 overflow-hidden">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-6xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              About · The Berry Coworks
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] max-w-[18ch]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">We built the</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">space we wished</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                <span className="text-[#FF6700]">existed.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 max-w-[60ch] font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed"
          >
            A workspace founded in 2020 by two friends who couldn&apos;t find one they actually wanted to spend their days in. Built around natural light, real community, and the kind of details most coworking spaces forget.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 2. ORIGIN STORY ────────────────────────────────────────────── */}
      <section className="py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { duration: 1.2 } }}
          viewport={{ once: true, margin: "-80px" }}
          className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
        >
          <img
            src={MEDIA.aboutOriginStory}
            alt="Inside The Berry Coworks"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#fafaf7] to-transparent" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="px-5 sm:px-10 md:px-20 mt-14 sm:mt-20 md:mt-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16">
            <div className="md:col-span-4">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="w-8 h-px bg-[#FF6700]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                  The Origin
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">How It</motion.span>
                <motion.span variants={lineUp} className="block">Started.</motion.span>
              </h2>
            </div>

            <div className="md:col-span-8 max-w-[68ch]">
              <motion.p
                variants={fadeUp}
                className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed mb-5 md:mb-6"
              >
                The Berry Coworks started in 2020, when the world was quiet and the offices were empty. <span className="text-[#0a0a0a] font-medium">Parul Jain and Vishesh Kalkhandey</span> — two friends, both running their own businesses — found themselves trying to work from kitchen tables, half-finished bedrooms, and noisy cafés.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed mb-5 md:mb-6"
              >
                The coworking spaces they tried were either too corporate, too cramped, or too noisy. None felt designed for actual work. So instead of complaining about it, they did the only sensible thing — they built their own.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed"
              >
                Today, The Berry runs premium spaces in some of Delhi NCR&apos;s most-wanted neighbourhoods — Connaught Place, Jhandewalan, Noida — with over five hundred members and counting. One belief hasn&apos;t changed since day one: the right space changes how you work.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. FOUNDERS ────────────────────────────────────────────────── */}
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
              The Founders
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] mb-10 sm:mb-14 md:mb-16 max-w-[20ch]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Two Friends.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                One <span className="text-[#FF6700]">Workspace.</span>
              </motion.span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {FOUNDERS.map((f, i) => (
              <motion.div key={f.name} variants={cardUp} className="group">
                <div className="relative rounded-2xl bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/10 h-48 sm:h-56 md:h-64">
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-[#fafaf7] border border-[#0a0a0a]/15 flex items-center justify-center text-[#0a0a0a] hover:bg-[#FF6700] hover:border-[#FF6700] transition-colors duration-300"
                    aria-label={`${f.name} on LinkedIn`}
                  >
                    <LuLinkedin className="w-4 h-4" strokeWidth={1.75} />
                  </a>
                </div>

                <div className="mt-4 sm:mt-5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#0a0a0a]/40 font-['NeueMontreal'] mb-1.5">
                    0{i + 1} / Co-Founder
                  </p>
                  <p className='font-["Founders_Grotesk"] font-bold text-3xl sm:text-4xl text-[#0a0a0a] leading-none tracking-tight'>
                    {f.name}
                  </p>
                  <p className="font-['Founders_Grotesk'] font-bold text-[11px] text-[#FF6700] tracking-[0.25em] uppercase mt-3">
                    {f.role}
                  </p>
                  <p className="font-['NeueMontreal'] text-sm md:text-base text-[#0a0a0a]/65 leading-relaxed mt-2.5 sm:mt-3 max-w-[44ch]">
                    {f.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 4. WHAT WE BELIEVE ─────────────────────────────────────────── */}
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
              What We Believe
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] max-w-[22ch] mb-12 sm:mb-16 md:mb-20'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Four things we</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                won&apos;t <span className="text-[#FF6700]">compromise.</span>
              </motion.span>
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.title}
                variants={fadeUp}
                className="border-t border-[#0a0a0a]/15 pt-6 sm:pt-8"
              >
                <div className="flex items-baseline gap-4 mb-3 sm:mb-4">
                  <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700]">
                    0{i + 1}
                  </span>
                  <h3 className='font-["Founders_Grotesk"] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-[#0a0a0a]'>
                    {b.title}
                  </h3>
                </div>
                <p className="font-['NeueMontreal'] text-base text-[#0a0a0a]/65 leading-relaxed max-w-[44ch] pl-0 sm:pl-8">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 5. NUMBERS ─────────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 border-b border-[#0a0a0a]/10"
      >
        {STATS.map((s, i) => (
          <motion.div
            variants={fadeUp}
            key={s.label}
            className={`p-6 sm:p-8 md:p-14
              ${i < 2 ? "border-b md:border-b-0" : ""}
              ${i % 2 === 0 ? "border-r" : ""}
              md:border-r last:md:border-r-0
              border-[#0a0a0a]/10`}
          >
            <p className='font-["Founders_Grotesk"] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-[#FF6700]'>
              <CountUp value={s.value} />
            </p>
            <p className="mt-3 sm:mt-4 text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/50 font-['NeueMontreal']">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── 6. TIMELINE ────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 sm:mb-12 md:mb-16">
            <div>
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-8 h-px bg-[#FF6700]" />
                <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                  The Journey
                </p>
              </motion.div>
              <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
                <motion.span variants={lineUp} className="block">Six Years In.</motion.span>
              </h2>
            </div>
            <motion.p
              variants={fadeUp}
              className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/55 max-w-[36ch] md:text-right leading-relaxed"
            >
              From two friends and one borrowed corner to a real network across Delhi NCR.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {JOURNEY.map((t, i) => (
              <motion.div
                key={t.year}
                variants={cardUp}
                className="relative border-t border-[#0a0a0a]/15 pt-6 sm:pt-8"
              >
                <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700] block mb-3">
                  0{i + 1}
                </span>
                <p className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter leading-none text-[#0a0a0a] mb-3 sm:mb-4'>
                  {t.year}
                </p>
                <h3 className='font-["Founders_Grotesk"] font-bold text-lg sm:text-xl tracking-tight text-[#0a0a0a] mb-2'>
                  {t.title}
                </h3>
                <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/60 leading-relaxed">
                  {t.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── 7. CTA ─────────────────────────────────────────────────────── */}
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

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Come see what</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                we&apos;ve <span className="text-[#FF6700]">built.</span>
              </motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-[#0a0a0a]/60 font-['NeueMontreal'] leading-relaxed max-w-[48ch] mx-auto"
          >
            Book a free 15-minute tour. We&apos;ll show you around the space closest to you.
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
