"use client";
import { motion } from "framer-motion";
import { FEATURED_QUOTE } from "../data/testimonials";

const FEATURED = FEATURED_QUOTE;

// Highlight the final word of the quote in orange — generic, works for any quote.
const QUOTE_WORDS = FEATURED.headline.trim().split(/\s+/);
const QUOTE_LAST = QUOTE_WORDS.pop();
const QUOTE_LEAD = QUOTE_WORDS.join(" ");

const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };

export default function PullQuote() {
  return (
    <section className="relative w-full bg-[#FF6700] overflow-hidden py-16 sm:py-20 md:py-28 px-5 sm:px-8 md:px-16">
      {/* Subtle dot texture on the orange frame */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#0a0a0a 1px,transparent 1px)", backgroundSize: "28px 28px" }}
      />

      <motion.figure
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={stagger}
        className="relative m-0 max-w-6xl mx-auto rounded-3xl md:rounded-[2.5rem] bg-[#0a0a0a] text-[#fafaf7] overflow-hidden p-8 sm:p-12 md:p-16 lg:p-20"
      >
        {/* Ambient orange glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FF6700]/25 blur-3xl" />

        {/* Oversized decorative quotation mark */}
        <motion.span
          variants={fadeUp}
          aria-hidden="true"
          className="relative block select-none font-['Founders_Grotesk'] font-bold leading-[0.6] text-[#FF6700] text-[90px] sm:text-[130px] md:text-[170px]"
        >
          &ldquo;
        </motion.span>

        <blockquote className="relative m-0 mt-1 sm:mt-2">
          <p className="font-['Founders_Grotesk'] font-bold uppercase leading-[0.95] tracking-tighter text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] max-w-[20ch] overflow-hidden">
            <motion.span variants={lineUp} className="block pb-[0.05em]">
              {QUOTE_LEAD}
              {QUOTE_LEAD && " "}
              <span className="text-[#FF6700]">{QUOTE_LAST}</span>
            </motion.span>
          </p>
        </blockquote>

        <motion.figcaption
          variants={fadeUp}
          className="relative mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#fafaf7]/15 flex items-center gap-4 sm:gap-5"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FF6700] text-[#0a0a0a] flex items-center justify-center font-['Founders_Grotesk'] font-bold text-lg sm:text-xl flex-shrink-0">
            {FEATURED.name.charAt(0)}
          </div>
          <div>
            <p className="font-['Founders_Grotesk'] font-bold text-lg sm:text-xl md:text-2xl leading-tight text-[#fafaf7]">
              {FEATURED.name}
            </p>
            <p className="font-['NeueMontreal'] text-sm text-[#fafaf7]/55 mt-1">
              {FEATURED.role}
            </p>
          </div>
        </motion.figcaption>
      </motion.figure>
    </section>
  );
}
