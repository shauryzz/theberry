"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { PILLARS, STATS, FLEX_OPTIONS } from "../data/content";
import { BOOKING } from "../data/booking";
import { MEDIA } from "../data/media";
import { useParallax } from "./useParallax";
import CountUp from "./CountUp";

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

export default function About() {
  const heroImg = useParallax(-0.5);

  const pillarsScrollRef = useRef(null);
  const cardRefs         = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = pillarsScrollRef.current;
    if (!container) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = container.scrollLeft + container.offsetWidth / 2;
        let closestIdx = 0;
        let closestDistance = Infinity;
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const distance   = Math.abs(center - cardCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIdx = idx;
          }
        });
        setActiveIndex(closestIdx);
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToCard = (idx) => {
    const card = cardRefs.current[idx];
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div id="about"
      className="relative mt-[-2px] z-20 w-full bg-[#fafaf7] rounded-tl-3xl rounded-tr-3xl text-[#0a0a0a] overflow-hidden">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <div className="relative w-full h-[90vh] sm:h-[95vh] md:h-screen min-h-[600px] md:min-h-[700px] overflow-hidden">

        <div ref={heroImg.ref} className="absolute inset-0">
          <img
            style={heroImg.style}
            src={MEDIA.homeAboutHero}
            alt="The Berry Coworks interior"
            className="absolute inset-0 w-full h-[115%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf7] via-[#fafaf7]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fafaf7]/85 via-[#fafaf7]/30 to-transparent" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="absolute inset-x-0 bottom-0 px-6 sm:px-10 md:px-16 pb-10 sm:pb-14 md:pb-20"
        >
          <div className="max-w-4xl">

            <h2 className='font-["Founders_Grotesk"] font-bold leading-[0.9] tracking-tighter uppercase text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] text-[#0a0a0a]'>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">Work That</motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  Feels <span className="text-[#FF6700]">Good.</span>
                </motion.span>
              </span>
            </h2>

            <div className="mt-7 sm:mt-9 flex flex-col gap-6 sm:gap-7 max-w-[46ch]">
              <motion.p variants={fadeUp}
                className="font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/70 leading-relaxed">
                More than a desk — a space built around natural light, greenery, and the way ambitious people actually work.
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link href="/contact"
                  className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#0a0a0a] hover:bg-[#FF6700] transition-colors duration-300 rounded-full text-[#fafaf7] hover:text-[#0a0a0a] text-sm font-['NeueMontreal'] tracking-wide w-fit">
                  Book a Free Tour
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6700] group-hover:bg-[#0a0a0a] transition-colors duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 2. STATS GRID ────────────────────────────────────────────── */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="grid grid-cols-2 md:grid-cols-4 border-t border-[#0a0a0a]/10"
      >
        {STATS.map((s, i) => (
          <motion.div
            variants={fadeUp}
            key={s.label}
            className={`p-6 sm:p-8 md:p-14
              ${i < 2 ? "border-b md:border-b-0" : ""}
              ${i % 2 === 0 ? "border-r" : ""}
              md:border-r last:md:border-r-0
              border-[#0a0a0a]/10`}
          >
            <p className='font-["Founders_Grotesk"] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-[#FF6700]'>
              <CountUp value={s.value} />
            </p>
            <p className="mt-3 sm:mt-4 text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/50 font-['NeueMontreal']">
              {s.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── 3. OUR APPROACH ──────────────────────────────────────────── */}
      <div
        id="approach"
        className="relative px-5 sm:px-8 md:px-16 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-3xl bg-[#FF6700]/[0.05] pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl bg-[#0a0a0a]/[0.04] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative mb-10 sm:mb-14 md:mb-20 max-w-5xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Our Approach
            </p>
          </motion.div>

          <h3 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] overflow-hidden pb-[0.05em] mb-4 sm:mb-5 md:mb-6'>
            <motion.span variants={lineUp} className="block">
              Four <span className="text-[#FF6700]">Pillars.</span>
            </motion.span>
          </h3>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/55 tracking-tight leading-relaxed"
          >
            Light. Design. People. Place.
          </motion.p>
        </motion.div>

        <motion.div
          ref={pillarsScrollRef}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="
            relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0
            lg:grid-cols-4 lg:gap-5
          "
        >
          {PILLARS.map((p, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                ref={(el) => (cardRefs.current[i] = el)}
                variants={cardUp}
                key={p.title}
                className={`
                  group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-default
                  snap-center flex-shrink-0 min-w-[80%]
                  transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isActive ? "" : "scale-[0.94] opacity-75"}
                  sm:min-w-0 sm:flex-shrink sm:scale-100 sm:opacity-100
                `}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/15" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />

                <div
                  className="absolute top-4 left-5 sm:top-5 sm:left-6 font-['Founders_Grotesk'] font-bold leading-none tracking-tighter text-white/15 group-hover:text-white/25 transition-colors duration-500 pointer-events-none"
                  style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)" }}
                >
                  0{i + 1}
                </div>

                <div className="absolute top-1/2 left-0 w-0 h-px bg-[#FF6700] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-12" />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-7 flex flex-col gap-2.5">
                  <h4 className='font-["Founders_Grotesk"] font-bold text-2xl md:text-[28px] tracking-tight leading-[1.05] text-white'>
                    {p.title}
                  </h4>
                  <p className="font-['NeueMontreal'] text-sm leading-relaxed text-white/80">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="relative flex sm:hidden justify-center items-center gap-2 mt-6">
          {PILLARS.map((p, i) => (
            <button
              key={p.title}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to pillar ${i + 1}`}
              className="h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width:           activeIndex === i ? "28px" : "6px",
                backgroundColor: activeIndex === i ? "#FF6700" : "rgba(10,10,10,0.2)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── 4. MORE WAYS TO WORK — offer menu ────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-16 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-10 sm:mb-12 md:mb-16 max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Flexible Options
            </p>
          </motion.div>
          <h3 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em]'>
            <motion.span variants={lineUp} className="block">More Ways to <span className="text-[#FF6700]">Work.</span></motion.span>
          </h3>
          <motion.p variants={fadeUp}
            className="mt-5 sm:mt-6 text-base text-[#0a0a0a]/60 font-['NeueMontreal'] max-w-[52ch] leading-relaxed">
            Membership isn&apos;t the only way in. Drop by for a day, book a meeting room by the hour, or claim a prestige business address — no lock-in, no commitment.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {FLEX_OPTIONS.map(({ icon: Icon, name, desc, img }, i) => (
            <motion.div variants={cardUp} key={name}>
              <a
                href={BOOKING.tour}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[5/4] md:aspect-[16/10]">
                  <img
                    src={img}
                    alt={name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-[#0a0a0a]/20" />

                  <span className="absolute top-5 right-5 font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-white/40">
                    0{i + 1}
                  </span>

                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 md:p-8">
                    <span className="inline-flex w-11 h-11 rounded-full bg-[#FF6700] items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#0a0a0a]" strokeWidth={1.75} />
                    </span>
                    <h4 className='font-["Founders_Grotesk"] font-bold text-2xl md:text-3xl tracking-tight leading-tight text-white mb-2.5'>
                      {name}
                    </h4>
                    <p className="font-['NeueMontreal'] text-sm text-white/75 leading-relaxed max-w-[34ch]">
                      {desc}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[#FF6700] font-['NeueMontreal'] text-xs tracking-[0.2em] uppercase">
                      Book Now
                      <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
