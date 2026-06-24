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

export default function TrustedBy() {
  return (
    <section className="w-full bg-[#fafaf7] border-t border-[#0a0a0a]/10 py-20 sm:py-28 md:py-32 overflow-hidden">

      {/* Heading + subheading — centered */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20 text-center mb-12 sm:mb-16 md:mb-20"
      >
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 h-px bg-[#FF6700]" />
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
            Our Members
          </p>
          <span className="w-8 h-px bg-[#FF6700]" />
        </motion.div>

        <h2 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
          <span className="block overflow-hidden pb-[0.05em]">
            <motion.span variants={lineUp} className="block">
              Trusted <span className="text-[#FF6700]">By.</span>
            </motion.span>
          </span>
        </h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 sm:mt-8 mx-auto max-w-[54ch] font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/60 leading-relaxed"
        >
          From scrappy startups to established firms, 500+ members across Delhi NCR call The Berry home.
        </motion.p>
      </motion.div>

      {/* Scrolling brand-logo strip */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        className="relative border-y border-[#0a0a0a]/10 py-10 sm:py-12 md:py-14"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32 md:w-48 bg-gradient-to-r from-[#fafaf7] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32 md:w-48 bg-gradient-to-l from-[#fafaf7] to-transparent" />

        <div className="overflow-hidden">
          <motion.div
            className="flex w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
          >
            {Array.from({ length: 2 }).map((_, copy) => (
              <div key={copy} className="flex items-center shrink-0">
                {MEDIA.brandStrip.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    draggable="false"
                    className="h-12 sm:h-16 md:h-20 w-auto object-contain px-8 sm:px-12 md:px-16 shrink-0 select-none"
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
