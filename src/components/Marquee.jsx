"use client";
import { motion } from "framer-motion";
import { USPS } from "../data/content";

/* ------------------------------------------------------------------ *
 * Marquee — warm beige feature strip with ink keywords.
 * Warm beige background, bold ink uppercase keywords, small orange
 * dot separators. Single row, seamless -50% loop (two identical copies).
 * No edge fades — the band runs full-bleed edge to edge.
 * Separators are rendered here; the data (USPS) holds plain phrases only.
 *
 * COLOUR RATIONALE: the hero above ends in a near-black gradient
 * (#0a0a0a/95) and the About panel below is WHITE with rounded top corners
 * that overlap this strip. The band therefore has to be clearly darker than
 * white, or the rounded corners stop reading as an edge.
 *
 * The previous #F0EBE3 was warm on paper but only ~4% off white, and sat
 * between a white panel and a warm cream (#fafaf7). At that lightness the
 * eye takes the surrounding warmth as the baseline and reads the strip as
 * a cool grey. Fixed by going ~8% darker and holding the warm bias: the
 * hue is unchanged, only the depth. Keep any replacement in this range —
 * R > G > B, roughly #E0–#EA lightness. Do NOT lighten it back toward
 * white, and do not tint it orange: the orange is reserved for the dot
 * separators and accents, and a filled orange band would fight the CTA.
 * ------------------------------------------------------------------ */
export default function Marquee() {
  return (
    <div className="relative w-full overflow-hidden bg-[#E7DDCC]">
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