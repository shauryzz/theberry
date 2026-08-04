"use client";
import { motion } from "framer-motion";
import { MEDIA } from "../data/media";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * One scrolling logo row. Each logo sits in a uniform white "chip" so mixed
 * native backgrounds (transparent PNGs vs. solid-colour lockups) all read as
 * consistent, evenly-sized tiles. We render two copies of the list so the
 * -50% / +50% translate loops seamlessly.
 *   direction: "left"  → scrolls right-to-left
 *   direction: "right" → scrolls left-to-right
 */
function LogoRow({ logos, direction = "left", duration = 40 }) {
  const from = direction === "left" ? "0%" : "-50%";
  const to   = direction === "left" ? "-50%" : "0%";
  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: [from, to] }}
        transition={{ repeat: Infinity, ease: "linear", duration }}
      >
        {Array.from({ length: 2 }).map((_, copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {logos.map((logo, i) => (
              <div
                key={i}
                className="mx-3 sm:mx-4 flex items-center justify-center shrink-0 rounded-2xl bg-white border border-[#0a0a0a]/[0.06] shadow-[0_10px_30px_-18px_rgba(10,10,10,0.25)] h-24 sm:h-28 md:h-32 w-44 sm:w-52 md:w-60 px-6 sm:px-8"
              >
                <img decoding="async"
                  src={logo.src}
                  alt={logo.alt}
                  draggable="false"
                  loading="lazy"
                  className="max-h-14 sm:max-h-16 md:max-h-20 max-w-full w-auto object-contain select-none"
                />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function TrustedBy() {
  const logos = MEDIA.memberLogos;
  const mid = Math.ceil(logos.length / 2);
  const rowTop = logos.slice(0, mid);
  const rowBottom = logos.slice(mid);

  return (
    <section className="relative w-full bg-white border-t border-[#0a0a0a]/10 py-20 sm:py-28 md:py-32 overflow-hidden">
      {/* Orange dot texture — fills the whole section, showing through around
          and between the two logo rows so it reads as decorative padding.
          The rows fade into this background at their left/right edges. */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,103,0,0.20) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      {/* Heading + subheading — centered */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative z-10 px-5 sm:px-10 md:px-20 text-center mb-12 sm:mb-16 md:mb-20"
      >
        <h2 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="block">
              Trusted <span className="text-[#FF6700]">By.</span>
            </motion.span>
          </span>
        </h2>

      </motion.div>

      {/* Two logo rows — no card. Each fades at its left/right edges into the
          section's base colour, so the orange dots read as decorative padding
          around and between the rows. The rows scroll in opposite directions. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        className="relative z-10 space-y-4 sm:space-y-6 md:space-y-8"
      >
        {/* Row 1 — scrolls left */}
        <div className="relative overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-white to-transparent" />
          <LogoRow logos={rowTop} direction="left" duration={42} />
        </div>

        {/* Row 2 — scrolls right (opposite) */}
        <div className="relative overflow-hidden py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 md:w-40 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 md:w-40 bg-gradient-to-l from-white to-transparent" />
          <LogoRow logos={rowBottom} direction="right" duration={42} />
        </div>
      </motion.div>
    </section>
  );
}