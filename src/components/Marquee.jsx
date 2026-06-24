"use client";
import { motion } from "framer-motion";
import { USPS } from "../data/content";

export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] border-t-2 border-[#FF6700]">

      {/* Edge fades — keywords emerge and dissolve at the band's edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 md:w-40 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 md:w-40 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

      <div className="overflow-hidden whitespace-nowrap">
        <motion.div
          className="inline-flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* Two identical copies → seamless -50% loop */}
          {Array.from({ length: 2 }).map((_, copy) => (
            <span key={copy} className="inline-flex items-center">
              {USPS.map((word, i) => (
                <span key={i} className="inline-flex items-center">
                  <span className="px-6 md:px-9 py-4 sm:py-5 md:py-6 font-['Founders_Grotesk'] font-bold uppercase text-base sm:text-lg md:text-xl tracking-tight text-[#fafaf7]">
                    {word}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6700] shrink-0" aria-hidden="true" />
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
