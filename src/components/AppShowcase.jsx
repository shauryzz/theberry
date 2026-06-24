"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { LuCheck } from "react-icons/lu";
import { BOOKING } from "../data/booking";
import { APP_FEATURES, APP_QUICK_ACTIONS } from "../data/content";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const phoneIn = {
  hidden: { opacity: 0, y: 60, rotate: 8 },
  show:   { opacity: 1, y: 0, rotate: 3, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

export default function AppShowcase() {
  return (
    <section
      id="app"
      className="relative w-full bg-[#fafaf7] py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10 overflow-hidden"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="px-5 sm:px-10 md:px-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-20 items-center">
          {/* LEFT — Copy */}
          <div className="order-2 lg:order-1">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-px bg-[#FF6700]" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
                The Berry App
              </p>
            </motion.div>

            <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">Your workspace,</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  in your <span className="text-[#FF6700]">pocket.</span>
                </motion.span>
              </span>
            </h2>

            <motion.p
              variants={fadeUp}
              className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm sm:text-base leading-relaxed mt-5 sm:mt-7 max-w-[44ch]"
            >
              Book a meeting room. Check in. Print a doc. Raise a request. Pay an invoice. Everything you need to run your day at The Berry — on iOS and Android.
            </motion.p>

            {/* Features */}
            <motion.ul variants={stagger} className="mt-6 sm:mt-8 space-y-2.5">
              {APP_FEATURES.map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUp}
                  className="flex items-start gap-3 font-['NeueMontreal'] text-[#0a0a0a]/75 text-sm leading-relaxed"
                >
                  <LuCheck className="w-4 h-4 text-[#FF6700] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <span>{f}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Store buttons */}
            <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-wrap gap-3">
              <a
                href={BOOKING.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-[#0a0a0a] text-[#fafaf7] rounded-xl hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaApple className="w-7 h-7" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] opacity-75">Download on the</p>
                  <p className="text-sm font-bold">App Store</p>
                </div>
              </a>
              <a
                href={BOOKING.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-[#0a0a0a] text-[#fafaf7] rounded-xl hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaGooglePlay className="w-6 h-6" />
                <div className="text-left leading-tight">
                  <p className="text-[10px] opacity-75">GET IT ON</p>
                  <p className="text-sm font-bold">Google Play</p>
                </div>
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Phone mockup */}
          <div className="order-1 lg:order-2 flex items-center justify-center">
            <motion.div
              variants={phoneIn}
              className="relative w-60 sm:w-64 md:w-72 lg:w-[19rem] aspect-[9/19] bg-[#0a0a0a] rounded-[40px] p-[10px] shadow-[0_30px_80px_rgba(0,0,0,0.25)] hover:rotate-0 transition-transform duration-700"
              style={{ willChange: "transform" }}
            >
              {/* Screen */}
              <div className="relative w-full h-full bg-[#fafaf7] rounded-[32px] overflow-hidden flex flex-col">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0a0a0a] rounded-b-2xl z-10" />

                {/* Status bar */}
                <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[10px] text-[#0a0a0a]/70 font-medium">
                  <span>9:41</span>
                  <span className="text-[#0a0a0a]/40">•••</span>
                </div>

                {/* Header */}
                <div className="px-5 pt-3 pb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#0a0a0a]/55 font-['NeueMontreal']">Welcome back,</p>
                    <p className="font-['Founders_Grotesk'] font-bold text-lg leading-tight text-[#0a0a0a]">Parineeta</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#FF6700] flex items-center justify-center text-[#0a0a0a] text-sm font-bold font-['Founders_Grotesk']">
                    P
                  </div>
                </div>

                {/* Check-in card */}
                <div className="mx-4 mb-3 p-4 rounded-2xl bg-[#FF6700] text-[#0a0a0a]">
                  <p className="text-[11px] font-medium opacity-90">Connaught Place</p>
                  <p className="font-['Founders_Grotesk'] text-sm font-bold mt-1.5 leading-tight">
                    Ready to start your day?
                  </p>
                  <p className="text-[10px] mt-1 opacity-70 leading-snug">
                    Check in to start using the workspace
                  </p>
                  <button className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0a] text-[#FF6700] rounded-full text-[10px] font-bold tracking-wide">
                    Check In →
                  </button>
                </div>

                {/* Quick actions */}
                <p className="px-5 text-[9px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-['NeueMontreal'] mb-2">
                  Quick Actions
                </p>
                <div className="grid grid-cols-2 gap-2 mx-4">
                  {APP_QUICK_ACTIONS.map(({ icon: Icon, label, sub }) => (
                    <div
                      key={label}
                      className="rounded-xl bg-[#0a0a0a]/[0.05] border border-[#0a0a0a]/5 p-2.5 flex flex-col gap-1"
                    >
                      <Icon className="w-4 h-4 text-[#FF6700]" strokeWidth={2} />
                      <p className="text-[10px] font-bold text-[#0a0a0a] leading-tight">{label}</p>
                      <p className="text-[9px] text-[#0a0a0a]/50 leading-tight">{sub}</p>
                    </div>
                  ))}
                </div>

                <div className="flex-1" />

                {/* Bottom nav */}
                <div className="border-t border-[#0a0a0a]/10 px-4 py-3 flex items-center justify-around">
                  <span className="text-[9px] font-bold text-[#FF6700] tracking-wide">Home</span>
                  <span className="text-[9px] text-[#0a0a0a]/40 tracking-wide">Feed</span>
                  <span className="text-[9px] text-[#0a0a0a]/40 tracking-wide">Profile</span>
                  <span className="text-[9px] text-[#0a0a0a]/40 tracking-wide">Settings</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
