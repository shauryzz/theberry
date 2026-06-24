"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowUpLong } from "react-icons/fa6";
import { BOOKING } from "../data/booking";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const lineUp = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function LandingPage() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-[#0a0a0a]">

      <img
        src="/images/landing-hero.jpeg"
        alt="The Berry Coworks workspace interior"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/45 to-[#0a0a0a]/10" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 sm:px-10 md:px-20 pb-16 sm:pb-20 md:pb-24">

        <motion.div initial="hidden" animate="show" variants={stagger}>

          <h1 className='text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] font-bold uppercase tracking-tighter leading-[0.95] font-["Founders_Grotesk"] text-white max-w-[18ch] mb-6 sm:mb-8'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Workspaces Built</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                For The <span className="text-[#FF6700]">Work.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="text-white/85 text-base sm:text-lg md:text-xl font-['NeueMontreal'] leading-relaxed max-w-[44ch] mb-8 sm:mb-10"
          >
            Premium coworking in Delhi NCR. Built around natural light, real community, and the way you actually work.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#FF6700] text-white hover:bg-[#0a0a0a] hover:text-[#FF6700] px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-['NeueMontreal'] transition-colors duration-300"
            >
              <span>Book a Tour</span>
              <FaArrowUpLong className="rotate-45 text-xs group-hover:rotate-90 transition-transform duration-300" />
            </a>
            <Link
              href="/locations"
              className="group inline-flex items-center gap-2 border border-white/40 text-white hover:bg-white hover:text-[#0a0a0a] hover:border-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-['NeueMontreal'] transition-colors duration-300"
            >
              <span>See Spaces</span>
              <FaArrowUpLong className="rotate-45 text-xs group-hover:rotate-90 transition-transform duration-300" />
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
