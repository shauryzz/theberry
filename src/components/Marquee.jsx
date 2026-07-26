"use client";
import { motion } from "framer-motion";
import { USPS } from "../data/content";

/* ------------------------------------------------------------------ *
 * Marquee — light grey feature strip with ink keywords.
 * Warm light-grey background, bold ink uppercase keywords, small orange
 * dot separators. Single row, seamless -50% loop (two identical copies).
 * No edge fades — the band runs full-bleed edge to edge.
 * Separators are rendered here; the data (USPS) holds plain phrases only.
 *
 * COLOUR RATIONALE: the hero above ends in a near-black gradient
 * (#0a0a0a/95) and the About panel below is now WHITE with rounded top
 * corners that overlap this strip. The grey is deliberately a shade
 * darker than that white so the strip stays a distinct band and the
 * rounded corners still read. Keep these two values different.
 * ------------------------------------------------------------------ */
export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#EDEDE7]">
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
                  <span className="px-6 md:px-9 py-4 sm:py-5 md:py-6 font-['Founders_Grotesk'] font-bold uppercase text-lg sm:text-xl md:text-2xl tracking-tight text-[#0a0a0a]">
                    {word}
                  </span>
                  {/* Orange dot separator — same idiom as the navbar CTA */}
                  <span
                    className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF6700]"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
