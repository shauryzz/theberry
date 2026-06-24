"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "../data/testimonials";

/* ------------------------------------------------------------------ *
 * Testimonials
 * - Cream + orange-dot background.
 * - Light cards only (white → faint warm), soft shadow, no dark tones.
 * - FIXED pixel widths (330px mobile / 400px desktop). No viewport units
 *   on the cards: a vw width collapses inside the max-content scroll track,
 *   which is what shrank the cards on mobile. Fixed px resolves cleanly.
 * - One auto-scrolling row, pause-on-hover, reduced-motion safe.
 * - All colour / clamp / truncation is plain CSS in <style>.
 * ------------------------------------------------------------------ */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

// Duplicate the list so the -50% translate loops seamlessly.
const CARDS = [...TESTIMONIALS, ...TESTIMONIALS];

function initial(name = "") {
  return name.trim().charAt(0).toUpperCase() || "·";
}

function Card({ t }) {
  return (
    <article
      className="
        berry-tcard
        flex flex-col
        w-[88vw]
        max-w-[360px]
        sm:w-[420px]
        lg:w-[500px]
        h-[330px]
        sm:h-[350px]
        lg:h-[360px]
        shrink-0
        mr-4
        sm:mr-6
        p-5
        sm:p-6
      "
    >
      <span
        aria-hidden="true"
        className="
          berry-tquotemark
          block
          select-none
          font-['Founders_Grotesk']
          font-bold
          text-5xl
        "
      >
        &ldquo;
      </span>

      <div className="flex-1 min-h-0 overflow-hidden">
        <p className="berry-tquote h-full font-['NeueMontreal']">{t.quote}</p>
      </div>

      <div className="berry-tdivider mt-4 pt-5 flex items-center gap-3.5 h-[78px] shrink-0">
        <div className="berry-tavatar w-10 h-10 rounded-full flex items-center justify-center shrink-0">
          <span className="font-['Founders_Grotesk'] font-bold text-base leading-none">
            {initial(t.name)}
          </span>
        </div>

        <div className="min-w-0 flex-1 h-full flex flex-col justify-center">
          <p className="berry-tname font-['Founders_Grotesk'] font-bold text-[15px] leading-tight">
            {t.name}
          </p>

          <p className="berry-trole font-['NeueMontreal'] text-[13px] leading-tight mt-1">
            {t.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section
      id="stories"
      className="relative w-full bg-[#fafaf7] py-20 sm:py-28 md:py-32 overflow-hidden"
    >
      <style>{`
        /* ===== Background: orange dot grid on cream ===== */
        .berry-tdots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(255,103,0,0.22) 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }

        /* ===== Headline ===== */
        .berry-theadline { color: rgba(10,10,10,0.92); }
        .berry-tsubline  { color: #6f6f6a; }

        /* ===== Card: light, soft, premium — no dark tones ===== */
        .berry-tcard {
          background: linear-gradient(165deg, #ffffff 0%, #f6f5f1 100%);
          border: 1px solid rgba(10,10,10,0.05);
          border-radius: 1.5rem;
          box-shadow:
            0 1px 2px rgba(10,10,10,0.04),
            0 18px 40px -18px rgba(10,10,10,0.18);
          transition: box-shadow .4s ease, transform .4s ease;
        }
        .berry-tcard:hover {
          transform: translateY(-4px);
          box-shadow:
            0 1px 2px rgba(10,10,10,0.05),
            0 26px 55px -18px rgba(255,103,0,0.22);
        }
        .berry-tquotemark { color: #FF6700; line-height: 0.8; }
      .berry-tquote {
  color: #33312e;
  font-size: 15px;
  line-height: 1.8;

  height: 100%;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 103, 0, 0.35) transparent;

  padding-right: 6px;
}

.berry-tquote::-webkit-scrollbar {
  width: 4px;
}

.berry-tquote::-webkit-scrollbar-track {
  background: transparent;
}

.berry-tquote::-webkit-scrollbar-thumb {
  background: rgba(255, 103, 0, 0.35);
  border-radius: 999px;
}
        .berry-tdivider { border-top: 1px solid rgba(10,10,10,0.08); }
   .berry-tname {
  color: #1a1a1a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.berry-trole {
  color: #FF6700;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  overflow: hidden;
  min-height: 32px;
  max-height: 32px;
}
        .berry-tavatar      { background: #FF6700; }
        .berry-tavatar span { color: #ffffff; }

        /* ===== Marquee ===== */
        @keyframes berry-tmarquee { to { transform: translate3d(-50%, 0, 0); } }
        .berry-tmarquee { animation: berry-tmarquee 75s linear infinite; will-change: transform; }
        .berry-tmarquee-group:hover .berry-tmarquee { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .berry-tmarquee { animation: none; } }
      `}</style>

      {/* Texture */}
      <div className="berry-tdots" aria-hidden="true" />

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative px-5 sm:px-10 md:px-20 mb-10 sm:mb-14 md:mb-16 max-w-3xl"
      >
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 mb-4 sm:mb-5"
        >
          <span className="w-8 h-px bg-[#FF6700]" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
            Member Stories
          </p>
        </motion.div>

        <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter max-w-[16ch]'>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="berry-theadline block">
              Built by the
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="block text-[#FF6700]">
              ambitious.
            </motion.span>
          </span>
        </h2>

        <motion.p
          variants={fadeUp}
          className="berry-tsubline mt-6 sm:mt-7 font-['NeueMontreal'] text-base max-w-[54ch] leading-relaxed"
        >
          Hear from the founders, freelancers, and teams who&apos;ve made The
          Berry Coworks their second home.
        </motion.p>
      </motion.div>

      {/* Auto-scrolling row */}
      <div className="berry-tmarquee-group relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-[#fafaf7] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-[#fafaf7] to-transparent" />

        <div className="overflow-hidden py-5">
          <div className="berry-tmarquee flex w-max items-start px-5 sm:px-10 md:px-20">
            {CARDS.map((t, idx) => (
              <Card key={`${t.id}-${idx}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
