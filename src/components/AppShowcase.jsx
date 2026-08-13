"use client";

import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import {
  LuCheck, LuMapPin, LuWifi, LuQrCode, LuChevronRight,
  LuCalendarDays, LuTicket, LuUsers, LuClock,
  LuHouse, LuUser, LuSettings,
} from "react-icons/lu";
import { BOOKING } from "../data/booking";
import { APP_FEATURES } from "../data/content";
import { MEDIA } from "../data/media";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
// Enters tilted to the right, then settles fully upright.
const phoneIn = {
  hidden: { opacity: 0, y: 60, rotate: 8 },
  show:   { opacity: 1, y: 0, rotate: 3, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

// In-app screen data
const QUICK = [
  { icon: LuCalendarDays, label: "Book Room" },
  { icon: LuTicket,       label: "Raise Ticket" },
  { icon: LuUsers,        label: "Visitors" },
];
const CAMPUS = [
  { icon: LuWifi,  label: "WiFi",  sub: "Networks & passwords" },
  { icon: LuClock, label: "Hours", sub: "Weekly schedule" },
];
const NAV = [
  { icon: LuHouse,    label: "Home",      active: true },
  { icon: LuUsers,    label: "Community" },
  { icon: LuUser,     label: "Profile" },
  { icon: LuSettings, label: "Settings" },
];
const BARCODE = [2, 1, 3, 1, 2, 1, 1, 3, 1, 2, 1, 2];

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
            <h2 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.95] tracking-tighter text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw]'>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">Right there on</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  your <span className="text-[#FF6700]">phone.</span>
                </motion.span>
              </span>
            </h2>

            <div className="mt-5 sm:mt-7 max-w-[52ch] space-y-4 sm:space-y-5">
              <motion.p
                variants={fadeUp}
                className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm sm:text-base leading-relaxed"
              >
                Turns out most of the day-to-day stuff is easier from your phone, so we built for that.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm sm:text-base leading-relaxed"
              >
                Check in. Print a doc. Raise a request. Pay an invoice. Everything you need to run your day at The Berry, on iOS and Android.
              </motion.p>
              <motion.p
                variants={fadeUp}
                className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm sm:text-base leading-relaxed"
              >
                Follow what&apos;s happening across the centres, and use the app to put your own business in front of the people in the building.
              </motion.p>
            </div>

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
              <div className="relative w-full h-full bg-[#f4f4f2] rounded-[32px] overflow-hidden flex flex-col">
                {/* Dynamic-island */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#0a0a0a] rounded-full z-20" />

                {/* Status bar */}
                <div className="relative z-10 flex items-center justify-between px-5 pt-2.5 pb-1 text-[9px] font-semibold text-[#0a0a0a]">
                  <span>9:11</span>
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-end gap-[1.5px] h-2.5">
                      <span className="w-[2px] h-1 bg-[#0a0a0a] rounded-sm" />
                      <span className="w-[2px] h-1.5 bg-[#0a0a0a] rounded-sm" />
                      <span className="w-[2px] h-2 bg-[#0a0a0a] rounded-sm" />
                      <span className="w-[2px] h-2.5 bg-[#0a0a0a] rounded-sm" />
                    </span>
                    <LuWifi className="w-3 h-3" strokeWidth={2.5} />
                    <span className="flex items-center">
                      <span className="w-4 h-2 rounded-[3px] border border-[#0a0a0a]/70 flex items-center p-[1px]">
                        <span className="h-full w-[70%] bg-[#0a0a0a] rounded-[1px]" />
                      </span>
                      <span className="w-[1.5px] h-1 bg-[#0a0a0a]/70 rounded-r-sm" />
                    </span>
                  </div>
                </div>

                {/* Scrollable content (clips like a real scroll view) */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  {/* HERO */}
                  <div className="relative h-[150px] sm:h-[165px] lg:h-[185px] shrink-0">
                    <img decoding="async" loading="lazy" src={MEDIA.appHero} alt="" className="absolute inset-0 w-full h-full object-cover" draggable="false" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/70" />
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-sm text-white text-[9px] font-medium">
                        <LuMapPin className="w-2.5 h-2.5" strokeWidth={2.5} /> Noida
                      </span>
                      <span className="w-7 h-7 rounded-full bg-[#FF6700] flex items-center justify-center text-[#0a0a0a] text-[11px] font-bold font-['Founders_Grotesk']">
                        P
                      </span>
                    </div>
                    <div className="absolute bottom-7 sm:bottom-8 left-4 right-4">
                      <p className="text-[8px] uppercase tracking-[0.18em] text-white/85 font-['NeueMontreal'] mb-1">
                        Good Morning · Noida
                      </p>
                      <p className="font-['Founders_Grotesk'] font-bold text-lg sm:text-xl leading-none text-white">
                        Parineeti
                      </p>
                    </div>
                    <div className="absolute bottom-8 sm:bottom-9 right-4 flex items-center gap-1">
                      <span className="w-3 h-1 rounded-full bg-white/90" />
                      <span className="w-1 h-1 rounded-full bg-white/50" />
                    </div>
                  </div>

                  {/* MEMBER PASS card — overlaps hero */}
                  <div className="relative -mt-4 mx-3 rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] p-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[8px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-['NeueMontreal']">
                        Member Pass
                      </p>
                      <span className="flex items-end gap-[1.5px] h-3 opacity-30">
                        {BARCODE.map((w, i) => (
                          <span key={i} className="h-full bg-[#0a0a0a]" style={{ width: w + "px" }} />
                        ))}
                      </span>
                    </div>
                    <p className="font-['Founders_Grotesk'] font-bold text-base leading-tight text-[#0a0a0a] mb-2.5">
                      Parineeti
                    </p>
                    <div className="border-t border-dashed border-[#0a0a0a]/15 pt-2.5 flex">
                      <div className="flex-1">
                        <p className="text-[7.5px] uppercase tracking-[0.14em] text-[#0a0a0a]/40 mb-0.5">Location</p>
                        <p className="text-[11px] font-bold text-[#0a0a0a]">Noida</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-[7.5px] uppercase tracking-[0.14em] text-[#0a0a0a]/40 mb-0.5">Status</p>
                        <p className="text-[11px] font-bold text-[#0a0a0a]">Not In</p>
                      </div>
                    </div>
                    <button className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FF6700] text-[#0a0a0a] text-[11px] font-bold">
                      <LuQrCode className="w-3.5 h-3.5" strokeWidth={2.5} /> Scan to Check In
                    </button>
                  </div>

                  {/* QUICK ACTIONS */}
                  <div className="px-3 mt-3.5 flex items-center justify-between">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-['NeueMontreal']">
                      Quick Actions
                    </p>
                    <span className="inline-flex items-center gap-0.5 text-[8px] text-[#FF6700] font-semibold">
                      All 5 <LuChevronRight className="w-2.5 h-2.5" strokeWidth={2.5} />
                    </span>
                  </div>
                  <div className="px-3 mt-1.5 flex gap-1.5">
                    {QUICK.map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-white border border-[#0a0a0a]/8 shrink-0"
                      >
                        <Icon className="w-3 h-3 text-[#FF6700]" strokeWidth={2.25} />
                        <span className="text-[9px] font-semibold text-[#0a0a0a] whitespace-nowrap">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* CAMPUS */}
                  <p className="px-3 mt-3 text-[8px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 font-['NeueMontreal']">
                    Campus
                  </p>
                  <div className="px-3 mt-1.5 grid grid-cols-2 gap-2">
                    {CAMPUS.map(({ icon: Icon, label, sub }) => (
                      <div key={label} className="rounded-xl bg-white border border-[#0a0a0a]/8 p-2.5">
                        <Icon className="w-4 h-4 text-[#FF6700] mb-1.5" strokeWidth={2} />
                        <p className="text-[10px] font-bold text-[#0a0a0a] leading-tight">{label}</p>
                        <p className="text-[8px] text-[#0a0a0a]/50 leading-tight mt-0.5">{sub}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex-1" />
                </div>

                {/* Bottom nav */}
                <div className="border-t border-[#0a0a0a]/10 bg-white px-2 py-2 flex items-center justify-around">
                  {NAV.map(({ icon: Icon, label, active }) => (
                    <div key={label} className="flex flex-col items-center gap-0.5">
                      <Icon
                        className={"w-4 h-4 " + (active ? "text-[#FF6700]" : "text-[#0a0a0a]/35")}
                        strokeWidth={active ? 2.5 : 2}
                      />
                      <span className={"text-[7px] font-semibold tracking-wide " + (active ? "text-[#FF6700]" : "text-[#0a0a0a]/40")}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
