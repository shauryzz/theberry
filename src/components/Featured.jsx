"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { LOCATIONS, UPCOMING_LOCATION, getAllLocationsMapEmbedUrl } from "../data/locations";

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

function LocationCard({ loc }) {
  return (
    <motion.div variants={cardUp}>
      <Link href={`/locations/${loc.id}`} className="group relative block cursor-pointer">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:h-[440px] lg:h-[480px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_60px_-20px_rgba(10,10,10,0.3)]">
          <img decoding="async"
            src={loc.img}
            alt={loc.label}
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/45 to-transparent" />

          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-7 flex flex-col gap-2.5">
            <h3 className='font-["Founders_Grotesk"] font-bold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[0.95] uppercase'>
              {loc.label}
            </h3>

            {/* Area sits BELOW the bold name as a quiet locator (client
                request). Straight, not italic; cream, kept muted so it reads
                as a sub-label rather than competing with the description. */}
            {loc.area && (
              <span className="-mt-1 font-['Founders_Grotesk'] text-sm sm:text-base text-[#fafaf7]/65">
                {loc.area}
              </span>
            )}

            <p className="font-['NeueMontreal'] text-white/75 text-xs sm:text-sm leading-relaxed line-clamp-2">
              {loc.desc}
            </p>

            {/* Underline sits on the word only, not the arrow. Cream at rest,
                orange on hover so the card still signals it is a link. */}
            <div className="flex items-center gap-2 mt-1">
              <span className="font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase text-[#fafaf7] border-b border-[#fafaf7]/45 pb-0.5 group-hover:text-[#FF6700] group-hover:border-[#FF6700] transition-colors duration-300">
                Explore
              </span>
              <LuArrowUpRight className="w-4 h-4 text-[#fafaf7] group-hover:text-[#FF6700] transition-all duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* Announced-but-not-open location. Rendered as a plain <div>, not a <Link>,
   so it is genuinely not clickable — no href, no pointer cursor, and it stays
   out of the tab order. Image is desaturated and dimmed to read as pending. */
function ComingSoonCard({ loc }) {
  return (
    <motion.div variants={cardUp}>
      <div className="relative block cursor-default select-none">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:h-[440px] lg:h-[480px]">
          <img decoding="async"
            src={loc.img}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="w-full h-full object-cover grayscale opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/25" />

          {/* TAG CONVENTION: tags/badges site-wide are set in the display face,
              ITALIC, in natural case — not tracked uppercase. Uppercase plus
              letter-spacing fights an italic, so both are dropped here.
              Cream, not orange: orange signals "interactive" everywhere else
              (CTAs, Explore, links) and this card is deliberately not
              clickable, so it should not promise an action it cannot do. */}
          <span className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fafaf7] text-[#0a0a0a] font-['Founders_Grotesk'] text-xs sm:text-sm shadow-[0_6px_18px_-8px_rgba(10,10,10,0.6)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6700]" aria-hidden="true" />
            {loc.badge}
          </span>

          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-7 flex flex-col gap-2.5">
            <h3 className='font-["Founders_Grotesk"] font-bold text-white/85 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[0.95] uppercase'>
              {loc.label}
            </h3>

            {/* Area below the bold name, straight (not italic) — matches
                LocationCard for consistency across the grid. */}
            <span className="-mt-1 font-['Founders_Grotesk'] text-sm sm:text-base text-[#fafaf7]/55">
              {loc.area}
            </span>

            <p className="font-['NeueMontreal'] text-white/60 text-xs sm:text-sm leading-relaxed">
              {loc.desc}
            </p>
          </div>
        </div>
      </div>
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
          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] overflow-hidden pb-[0.05em] text-[#0a0a0a]'>
            <motion.span variants={lineUp} className="block">
              Find <span className="text-[#FF6700]">Us.</span>
            </motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 text-[#0a0a0a]/60 text-base font-['NeueMontreal'] max-w-[54ch] leading-relaxed"
          >
            Barakhamba, Jhandewalan and Noida, Sector 142, each a short walk from the metro.
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20 mt-8 sm:mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
      >
        {LOCATIONS.map((loc) => (
          <LocationCard key={loc.id} loc={loc} />
        ))}
        <ComingSoonCard loc={UPCOMING_LOCATION} />
      </motion.div>

      {/* ── One map, all three locations ────────────────────────────────
          Brand search embed, so each pin is the real Google Business Profile.
          No location list here on purpose: the cards above already name all
          three, and repeating them under the map read as duplication. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20 mt-10 sm:mt-14 md:mt-16"
      >
        <motion.div
          variants={fadeUp}
          className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#0a0a0a]/12 shadow-[0_40px_90px_-45px_rgba(10,10,10,0.4)]"
        >
          <iframe
            src={getAllLocationsMapEmbedUrl()}
            title="The Berry Coworks · Barakhamba, Jhandewalan and Noida"
            className="w-full h-[380px] sm:h-[480px] md:h-[560px] block"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
