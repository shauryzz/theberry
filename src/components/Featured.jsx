"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { LOCATIONS } from "../data/locations";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
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

function StackedCard({ loc }) {
  return (
    <motion.div variants={cardUp}>
      <Link href={`/locations/${loc.id}`} className="group relative block cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:h-[380px] lg:h-[420px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_60px_-20px_rgba(10,10,10,0.3)]">
          <img
            src={loc.img}
            alt={loc.label}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-8 flex flex-col gap-3">
            <h3 className='font-["Founders_Grotesk"] font-bold text-white text-3xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] uppercase'>
              {loc.label}
            </h3>
            <p className="font-['NeueMontreal'] text-white/75 text-xs sm:text-sm leading-relaxed max-w-[40ch] line-clamp-2">
              {loc.desc}
            </p>
            <div className="flex items-center gap-2 mt-1 sm:mt-2 text-[#FF6700] font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase">
              <span>Explore</span>
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function FeatureCard({ loc }) {
  return (
    <motion.div variants={cardUp}>
      <Link href={`/locations/${loc.id}`} className="group block cursor-pointer">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-[#0a0a0a]/10 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#FF6700]/40 hover:shadow-[0_26px_60px_-20px_rgba(10,10,10,0.2)]">

          <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:min-h-[400px]">
            <img
              src={loc.img}
              alt={loc.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
          </div>

          <div className="p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-8 md:gap-10">
            <span className="text-[10px] tracking-[0.3em] uppercase font-['NeueMontreal'] text-[#0a0a0a]/50">
              Featured Location
            </span>

            <div>
              <h3 className='font-["Founders_Grotesk"] font-bold text-[#0a0a0a] text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.9] uppercase'>
                {loc.label}
              </h3>
              <p className="font-['NeueMontreal'] text-[#0a0a0a]/65 text-base leading-relaxed mt-5 sm:mt-6 max-w-[44ch]">
                {loc.desc}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 pt-5 sm:pt-6 border-t border-[#0a0a0a]/12">
              <span className="text-[#FF6700] font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase">
                Visit {loc.label}
              </span>
              <span className="w-10 h-10 rounded-full border border-[#0a0a0a]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6700] group-hover:border-[#FF6700] transition-colors duration-300">
                <LuArrowUpRight
                  className="w-4 h-4 text-[#0a0a0a]/70 group-hover:text-[#0a0a0a] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </span>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
}

export default function Featured() {
  return (
    <div id="locations" className="w-full bg-[#fafaf7] py-14 sm:py-20 md:py-28">

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20 border-b border-[#0a0a0a]/10 pb-8 sm:pb-10 md:pb-14"
      >
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Our Locations
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] overflow-hidden pb-[0.05em] text-[#0a0a0a]'>
            <motion.span variants={lineUp} className="block">
              Our Prime <span className="text-[#FF6700]">Locations.</span>
            </motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 text-[#0a0a0a]/60 text-base font-['NeueMontreal'] max-w-[54ch] leading-relaxed"
          >
            Three addresses in Delhi NCR&apos;s most-wanted neighbourhoods — each one metro-connected and built around the way you actually work.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20 mt-8 sm:mt-10 md:mt-14 flex flex-col gap-5 md:gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <StackedCard loc={LOCATIONS[0]} />
          <StackedCard loc={LOCATIONS[1]} />
        </div>

        <FeatureCard loc={LOCATIONS[2]} />
      </motion.div>
    </div>
  );
}
