"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import { BOOKING } from "../data/booking";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function FinalCTA() {
  return (
    <section className="relative w-full bg-[#fafaf7] py-20 sm:py-28 md:py-36 overflow-hidden border-t border-[#0a0a0a]/10">
      {/* Subtle dot pattern */}
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
        <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="block">Reserve a</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="block">
              <span className="text-[#FF6700]">walkthrough.</span>
            </motion.span>
          </span>
        </h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 sm:mt-8 text-base sm:text-lg text-[#0a0a0a]/60 font-['NeueMontreal'] leading-relaxed max-w-[52ch] mx-auto"
        >
          Book a free 15-minute tour. We&apos;ll show you around, answer questions, and help you pick the right plan and the right space.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            href={BOOKING.tour}
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300"
          >
            Book a Visit
            <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
          >
            Get in Touch
            <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
