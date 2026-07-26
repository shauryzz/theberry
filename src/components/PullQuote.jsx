"use client";
import { motion } from "framer-motion";
import { MEDIA } from "../data/media";

/* ──────────────────────────────────────────────────────────────
   Full-bleed statement block: photo on one half, solid ink panel
   on the other, running edge to edge with no card, no padding
   frame and no background texture.

   COPY IS A DRAFT for client approval. It follows the reference's
   move of defining the space by what it is not, then landing on
   what it is. Every claim is already used elsewhere on the site:
   natural light (Pillars), "a short walk from the metro"
   (Locations), "people worth getting to know" (Perks). Nothing
   new is asserted. To reword, edit EYEBROW and STATEMENT only —
   `lead` renders cream, `accent` renders orange as the closer.
   ────────────────────────────────────────────────────────────── */
const EYEBROW = "From · The Berry Coworks";
const STATEMENT = {
  lead:
    "The Berry is not your home, though it should be as easy to settle into. It is not a conventional office either, though the work gets done. It sits somewhere between the two: good light, a short walk from the metro, and a floor full of people worth knowing. That last part is",
  accent: "the whole point.",
};

const imageIn = {
  hidden: { opacity: 0, scale: 1.06 },
  show:   { opacity: 1, scale: 1, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } };

export default function PullQuote() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      className="relative w-full grid md:grid-cols-2"
    >
      {/* ── LEFT (desktop) / TOP (mobile): photo ── */}
      <motion.div
        variants={imageIn}
        className="relative h-72 sm:h-96 md:h-auto md:min-h-[600px] overflow-hidden bg-[#0a0a0a]"
      >
        <img
          src={MEDIA.pullQuoteImage}
          alt="Inside a Berry Coworks workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* ── RIGHT (desktop) / BOTTOM (mobile): statement panel ── */}
      <div className="bg-[#0a0a0a] text-[#fafaf7] flex flex-col justify-center px-6 sm:px-10 md:px-12 lg:px-16 xl:px-20 py-14 sm:py-20 md:py-24">
        {/* Deliberately NOT orange. Prominence comes from full-strength cream,
            a heavier weight, a size bump and a hairline rule beneath it —
            `self-start` keeps that rule the width of the text, not the column. */}
        <motion.p
          variants={fadeUp}
          className="self-start font-['NeueMontreal'] font-medium uppercase tracking-[0.28em] text-[11px] sm:text-xs md:text-[13px] text-[#fafaf7] border-b border-[#fafaf7]/30 pb-2.5 mb-7 sm:mb-9"
        >
          {EYEBROW}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="font-['Founders_Grotesk'] font-medium leading-[1.2] tracking-tight text-[26px] sm:text-[32px] md:text-[34px] lg:text-[40px] max-w-[24ch]"
        >
          {STATEMENT.lead}{" "}
          <span className="text-[#FF6700]">{STATEMENT.accent}</span>
        </motion.p>
      </div>
    </motion.section>
  );
}
