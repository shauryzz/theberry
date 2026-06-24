"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { PLANS } from "../data/plans";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
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

function startingFromText(plan) {
  const prices = Object.values(plan.pricing).filter((p) => p !== null);
  if (prices.length === 0) return "Custom Quote";
  const min = Math.min(...prices);
  return `From ₹${min.toLocaleString("en-IN")}/mo`;
}

export default function WorkspaceTypes() {
  return (
    <section className="w-full bg-[#fafaf7] py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20"
      >
        {/* Header */}
        <div className="mb-10 sm:mb-14 md:mb-16 max-w-3xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Workspace Types
            </p>
          </motion.div>
          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] max-w-[20ch]'>
            <motion.span variants={lineUp} className="block">
              Choose Your Way of <span className="text-[#FF6700]">Working.</span>
            </motion.span>
          </h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 sm:mt-6 font-['NeueMontreal'] text-base text-[#0a0a0a]/60 max-w-[54ch] leading-relaxed"
          >
            From a single hot desk to a fully branded private suite — pick the plan that fits how you work today, and scale the moment your team outgrows it.
          </motion.p>
        </div>

        {/* 4 plan cards */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {PLANS.map((plan, i) => {
            const isPopular = plan.badge === "Most Popular";

            return (
              <motion.div variants={cardUp} key={plan.id}>
                <Link
                  href="/workspaces"
                  className={`group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2 ${
                    isPopular
                      ? "ring-1 ring-[#FF6700] shadow-[0_22px_55px_-18px_rgba(255,103,0,0.35)]"
                      : "border border-[#0a0a0a]/10 hover:border-[#FF6700]/40 hover:shadow-[0_24px_60px_-18px_rgba(10,10,10,0.18)]"
                  }`}
                >
                  {/* Image header */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/45 via-transparent to-transparent" />

                    {/* Number badge */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1 rounded-full bg-[#FF6700] text-[#0a0a0a] text-[10px] tracking-[0.25em] uppercase font-['NeueMontreal'] font-bold">
                      0{i + 1}
                    </div>

                    {/* Most Popular badge */}
                    {isPopular && (
                      <div className="absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1 rounded-full bg-[#0a0a0a] text-[#FF6700] text-[9px] tracking-[0.2em] uppercase font-['NeueMontreal'] font-bold">
                        Most Popular
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6 sm:p-7">
                    <div className="flex flex-col gap-2 mb-6">
                      <h4 className='font-["Founders_Grotesk"] font-bold text-2xl md:text-3xl tracking-tight leading-tight text-[#0a0a0a]'>
                        {plan.name}
                      </h4>
                      <p className="font-['NeueMontreal'] text-sm text-[#0a0a0a]/55 leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="flex-1" />

                    <div className="flex items-end justify-between pt-5 border-t border-[#0a0a0a]/10">
                      <div>
                        <p className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/40 font-['NeueMontreal']">
                          Starting
                        </p>
                        <p className='font-["Founders_Grotesk"] font-bold text-xl md:text-2xl text-[#FF6700] mt-1 leading-none'>
                          {startingFromText(plan)}
                        </p>
                      </div>
                      <span className="w-10 h-10 rounded-full border border-[#0a0a0a]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6700] group-hover:border-[#FF6700] transition-colors duration-300">
                        <LuArrowUpRight
                          className="w-4 h-4 text-[#0a0a0a]/70 group-hover:text-[#0a0a0a] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA below */}
        <motion.div
          variants={fadeUp}
          className="mt-10 md:mt-14 pt-8 border-t border-[#0a0a0a]/10 flex justify-center"
        >
          <Link
            href="/workspaces"
            className="group font-['NeueMontreal'] text-xs tracking-[0.25em] uppercase text-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 inline-flex items-center gap-2"
          >
            See Full Pricing
            <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
