"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { PERKS, STATS, FLEX_OPTIONS } from "../data/content";
import { BOOKING, isExternalBooking } from "../data/booking";
import { MEDIA } from "../data/media";
import CountUp from "./CountUp";
import DayPassPickerModal from "./DayPassPickerModal";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* Two treatments of the same three photos.

   `box` — lg and up: large-scale, asymmetric, and allowed to bleed off the
   panel edge (the panel wrapper is overflow-hidden, so anything pushed past
   left-0 / right-0 gets cropped by the frame on purpose — that crop IS the
   look). Shot 0 anchors top-left, shot 1 bleeds off the top-right corner,
   shot 2 is the small one and breaks below the paragraph instead of sitting
   inert in a margin. Percentage offsets keep the collage scaling with the
   container.

   `mobile` — below lg there's no margin to bleed into, so the collage drops
   into normal flow instead: one overlapping row under the paragraph, sized
   unevenly (biggest / smallest / mid) to echo the same asymmetry rather than
   three equal thumbnails in a row. */
const ABOUT_SHOTS = [
  {
    i: 0,
    box: "left-0 top-[6%] w-[17%] aspect-square rounded-full -rotate-6 z-20",
    mobile: "w-[34%] aspect-square rounded-full -rotate-6",
  },
  {
    i: 1,
    box: "-right-6 sm:-right-10 md:-right-14 top-0 w-[24%] aspect-[3/4] rounded-[2rem] rotate-[4deg] z-10",
    mobile: "w-[40%] aspect-[3/4] rounded-[1.5rem] rotate-[4deg] -mt-6",
  },
  {
    i: 2,
    box: "left-1/2 -translate-x-1/2 bottom-[-10%] sm:bottom-[-14%] w-[14%] aspect-[4/3] rounded-[1.75rem] -rotate-3 z-30",
    mobile: "w-[28%] aspect-[4/3] rounded-[1.25rem] -rotate-3 mt-4",
  },
];

export default function About() {

  // Perks slider — which card is centred (drives the counter + progress bar).
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

  // "However you like to work" list — the entry nearest the viewport centre
  // becomes active, which drives the sticky image on the right.
  const flexRefs = useRef([]);
  const [activeFlex, setActiveFlex] = useState(0);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = 0, bestDist = Infinity;
      flexRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveFlex(best);
    };

    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) {
      lenis.on("scroll", onScroll);
      onScroll();
      return () => lenis.off("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll ONLY the slider container. `scrollIntoView` was shifting the whole
  // page sideways on the last cards, because it scrolls every scrollable
  // ancestor to satisfy the request. Clamping to the container's own range
  // keeps the section anchored.
  const scrollToCard = (idx) => {
    const container = pillarsScrollRef.current;
    const card      = cardRefs.current[idx];
    if (!container || !card) return;
    const target = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
    const max    = container.scrollWidth - container.offsetWidth;
    container.scrollTo({ left: Math.max(0, Math.min(target, max)), behavior: "smooth" });
  };

  return (
    <div id="about"
      className="relative mt-[-2px] z-20 w-full bg-[#fafaf7] rounded-tl-3xl rounded-tr-3xl text-[#0a0a0a] overflow-clip">

      {/* ── 1. HERO — editorial statement panel (image-in-text) ────────── */}
      {/* White panel. The Marquee strip directly above is a shade darker
          (#EDEDE7) on purpose, so this panel's rounded top corners still
          read as a distinct edge. Changing one means rechecking the other. */}
      <div className="relative w-full bg-white overflow-hidden px-6 sm:px-10 md:px-16 py-20 sm:py-28 md:py-36">
        {/* Ambient warm glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[620px] h-[620px] rounded-full bg-[#FF6700]/[0.07] blur-3xl" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative max-w-7xl mx-auto text-center"
        >
          {/* Photo collage — lg and up, sits in the side margins.
              Mobile gets the same photos in flow, below the paragraph. */}
          <div className="hidden lg:block pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            {ABOUT_SHOTS.filter(({ i }) => i !== 2).map(({ i, box }) => (
              <span
                key={i}
                className={`absolute overflow-hidden shadow-[0_18px_45px_-18px_rgba(10,10,10,0.35)] ${box}`}
              >
                <img decoding="async"
                  src={MEDIA.aboutInlineShots[i]}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </span>
            ))}
          </div>

          {/* Uppercase display heading — matches the site-wide h-heading
              style (font-bold uppercase, tighter tracking, orange accent),
              e.g. the "However you like to work" h3 below. */}
          <motion.h2
            variants={fadeUp}
            className="relative z-10 font-['Founders_Grotesk'] font-bold uppercase text-[#0a0a0a] leading-[0.95] tracking-tighter text-[8.5vw] sm:text-[7vw] md:text-[6vw] lg:text-[4.8vw] max-w-[15ch] sm:max-w-none lg:max-w-4xl mx-auto"
          >
            A space that gets the balance{" "}
            <span className="text-[#FF6700]">right.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 mx-auto max-w-[62ch] font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed"
          >
            The Berry Coworks blends the comfort of working from home with the energy of a shared workplace, giving you room for focus and company in the same day, in a space you&apos;ll genuinely want to work from.
          </motion.p>

          {/* Third photo (the working-laptop shot) — desktop only, in normal
              flow below the paragraph. It used to be absolutely positioned
              with a negative `bottom` offset measured against the whole
              hero container's height, which put it mid-paragraph on some
              viewports since that height shifts with font-size across
              breakpoints. In-flow with a top margin, it can never overlap
              the text above it, and can be sized up freely. */}
          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="hidden lg:flex justify-center mt-14"
          >
            <span className="block w-[19%] max-w-[300px] aspect-[4/3] rounded-[1.75rem] overflow-hidden shadow-[0_18px_45px_-18px_rgba(10,10,10,0.35)] -rotate-3">
              <img decoding="async"
                src={MEDIA.aboutInlineShots[2]}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </span>
          </motion.div>

          {/* Same three photos, in flow — below lg only, where the absolute
              collage above is hidden. Slight negative gap lets the shapes
              overlap a touch so it stays a collage, not a filmstrip. */}
          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="lg:hidden mt-10 sm:mt-12 flex items-center justify-center gap-2 sm:gap-4"
          >
            {ABOUT_SHOTS.map(({ i, mobile }) => (
              <span
                key={i}
                className={`block flex-shrink-0 overflow-hidden shadow-[0_18px_45px_-18px_rgba(10,10,10,0.35)] ${mobile}`}
              >
                <img
                  decoding="async"
                  src={MEDIA.aboutInlineShots[i]}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── 2. STATS GRID ────────────────────────────────────────────── */}
      {/* Continues the white of the statement panel above, so the two read as
          one editorial block. The italic sub-line echoes the headline's
          italics rather than introducing a separate treatment. */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-3 bg-white border-t border-[#0a0a0a]/[0.08]"
      >
        {STATS.map((s, i) => (
          <motion.div
            variants={fadeUp}
            key={s.label}
            className={`text-center px-6 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20
              ${i < STATS.length - 1 ? "border-b sm:border-b-0" : ""}
              sm:border-r last:sm:border-r-0
              border-[#0a0a0a]/[0.08]`}
          >
            <p className='font-["Founders_Grotesk"] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.85] text-[#FF6700]'>
              <CountUp value={s.value} />
            </p>

            <p className="mt-5 sm:mt-6 text-[10px] uppercase tracking-[0.35em] text-[#0a0a0a]/45 font-['NeueMontreal']">
              {s.label}
            </p>

            {s.sub && (
              <p className="mt-3 font-['Founders_Grotesk'] text-base sm:text-lg text-[#0a0a0a]/60 leading-snug max-w-[24ch] mx-auto">
                {s.sub}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* ── 3. WHAT WORKING HERE GETS YOU — slider ───────────────────── */}
      <div
        id="approach"
        className="relative py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-3xl bg-[#FF6700]/[0.05] pointer-events-none -translate-y-1/3 translate-x-1/3" />

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative px-5 sm:px-8 md:px-16 mb-10 sm:mb-14 md:mb-16 max-w-5xl"
        >
          <h3 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] overflow-hidden pb-[0.05em]'>
            <motion.span variants={lineUp} className="block">
              Working from The Berry Coworks gets <span className="text-[#FF6700]">you:</span>
            </motion.span>
          </h3>
        </motion.div>

        {/* Slider — track + side arrows share this relative wrapper so the
            arrows sit on the vertical middle of the CARDS, not the section. */}
        <div className="relative">
          <div
            ref={pillarsScrollRef}
            className="relative flex overflow-x-auto snap-x snap-mandatory px-5 sm:px-8 md:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PERKS.map((perk, i) => {
              const isActive = activeIndex === i;
              return (
                <article
                  key={perk.title}
                  ref={(el) => (cardRefs.current[i] = el)}
                  onClick={() => scrollToCard(i)}
                  className={`snap-center flex-shrink-0 w-[74vw] sm:w-[46vw] md:w-[33vw] lg:w-[25vw]
                    border-l border-[#0a0a0a]/10 last:border-r
                    px-5 sm:px-6 md:px-7 pt-6 pb-7 flex flex-col cursor-pointer
                    transition-all duration-500
                    ${isActive
                      ? "bg-white shadow-[0_24px_60px_-24px_rgba(10,10,10,0.22)]"
                      : "bg-transparent hover:bg-white/60"}`}
                >
                  {/* Number */}
                  <p
                    className={`font-['Founders_Grotesk'] text-4xl sm:text-5xl leading-none tracking-tight transition-colors duration-500
                      ${isActive ? "text-[#FF6700]" : "text-[#0a0a0a]/30"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>

                  {/* Image — box ratio matches the photos (all landscape,
                      ~3:2) instead of the old portrait 4:5, which was either
                      cropping hard into the subject (cover) or leaving big
                      grey letterbox bars (contain). 3:2 + cover keeps a full
                      photo look with only a light edge trim. */}
                  <div className="mt-6 sm:mt-8 relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-[#0a0a0a]/5">
                    <img decoding="async"
                      src={perk.img}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05]"
                    />
                  </div>

                  {/* Label */}
                  <p
                    className={`mt-5 sm:mt-6 font-['NeueMontreal'] text-sm sm:text-base leading-snug transition-colors duration-500
                      ${isActive ? "text-[#0a0a0a]" : "text-[#0a0a0a]/70"}`}
                  >
                    {perk.title}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Arrows — vertically centred on the cards, hugging each edge */}
          <button
            onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Previous"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(10,10,10,0.35)] flex items-center justify-center text-[#0a0a0a] hover:bg-[#FF6700] disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
          >
            <LuArrowUpRight className="w-4 h-4 -rotate-[135deg]" strokeWidth={2} />
          </button>

          <button
            onClick={() => scrollToCard(Math.min(PERKS.length - 1, activeIndex + 1))}
            disabled={activeIndex === PERKS.length - 1}
            aria-label="Next"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white shadow-[0_10px_30px_-10px_rgba(10,10,10,0.35)] flex items-center justify-center text-[#0a0a0a] hover:bg-[#FF6700] disabled:opacity-0 disabled:pointer-events-none transition-all duration-300"
          >
            <LuArrowUpRight className="w-4 h-4 rotate-45" strokeWidth={2} />
          </button>
        </div>

        {/* Progress bar + counter */}
        <div className="relative px-5 sm:px-8 md:px-16 mt-8 sm:mt-10 flex items-center gap-5 sm:gap-6">
          <div className="flex-1 h-px bg-[#0a0a0a]/12 relative overflow-hidden">
            <span
              className="absolute inset-y-0 left-0 bg-[#FF6700] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${((activeIndex + 1) / PERKS.length) * 100}%` }}
            />
          </div>

          <p className="font-['NeueMontreal'] text-xs text-[#0a0a0a]/50 tabular-nums flex-shrink-0">
            {String(activeIndex + 1).padStart(2, "0")} / {String(PERKS.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* ── 4. HOWEVER YOU LIKE TO WORK — scroll-driven list ─────────── */}
      <div className="px-5 sm:px-8 md:px-16 py-14 sm:py-20 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-12 sm:mb-16 md:mb-20 max-w-3xl"
        >
          <h3 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] max-w-[16ch]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">However you</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                like to <span className="text-[#FF6700]">work.</span>
              </motion.span>
            </span>
          </h3>

          <motion.p variants={fadeUp}
            className="mt-5 sm:mt-6 text-base text-[#0a0a0a]/60 font-['NeueMontreal'] max-w-[56ch] leading-relaxed">
            Some teams work best in quiet. Others feed off the energy of a busy floor. A few just need a room to themselves, we&apos;ve built for all of it, because a workday rarely fits one template.
          </motion.p>
        </motion.div>

        {/* Scroll-driven list (left) + sticky image (right) */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* LEFT — the list. Nearest entry to the viewport centre is active. */}
          <div>
            {FLEX_OPTIONS.map(({ name, desc, img }, i) => {
              const isActive = activeFlex === i;
              return (
                <div
                  key={name}
                  ref={(el) => (flexRefs.current[i] = el)}
                  className={`border-t border-[#0a0a0a]/15 py-8 sm:py-10 md:py-12 transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <h4 className='font-["Founders_Grotesk"] font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight text-[#0a0a0a]'>
                      {name}
                    </h4>
                    {/* Pill CTA — the orange fill sweeps up from below on
                        hover and the arrow kicks to 45deg. Text and icon sit
                        on a relative layer so the sweep passes behind them. */}
                    {(() => {
                      const cls =
                        "group/cta relative flex-shrink-0 inline-flex items-center gap-2 mt-1.5 overflow-hidden rounded-full border border-[#0a0a0a]/20 px-5 py-2.5 hover:border-[#FF6700] transition-colors duration-300";
                      const inner = (
                        <>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          />
                          <span className="relative font-['NeueMontreal'] text-[11px] tracking-[0.18em] uppercase text-[#0a0a0a]">
                            Book Now
                          </span>
                          <LuArrowUpRight className="relative w-3.5 h-3.5 text-[#0a0a0a] transition-transform duration-300 group-hover/cta:rotate-45" />
                        </>
                      );
                      // Day Pass -> DeskOS bundle picker; Meeting Room -> DeskOS link; else -> /contact
                      if (name === "Day Pass") {
                        return (
                          <button type="button" onClick={() => setPickerOpen(true)} className={cls}>
                            {inner}
                          </button>
                        );
                      }
                      // Meeting Room -> DeskOS (external, new tab).
                      // Everything else -> BOOKING.tour, which is /contact, an
                      // INTERNAL route. It used to carry target="_blank" too,
                      // which opened a second tab of our own site. Routed
                      // through next/link now so it navigates in place.
                      const href = name === "Meeting Room" ? BOOKING.meetingRoom.all : BOOKING.tour;
                      if (isExternalBooking(href)) {
                        return (
                          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                            {inner}
                          </a>
                        );
                      }
                      return (
                        <Link href={href} className={cls}>
                          {inner}
                        </Link>
                      );
                    })()}
                  </div>

                  <p className="mt-3 sm:mt-4 font-['NeueMontreal'] text-sm sm:text-base text-[#0a0a0a]/65 leading-relaxed max-w-[46ch]">
                    {desc}
                  </p>

                  {/* Mobile: the image sits inline, since there is no sticky column */}
                  <div className="lg:hidden mt-6 relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a]/5">
                    <img decoding="async"
                      src={img}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
            <div className="border-t border-[#0a0a0a]/15" />
          </div>

          {/* RIGHT — sticky image, crossfades to match the active entry */}
          <div className="hidden lg:block">
            <div className="sticky top-28 relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a]/5">
              {FLEX_OPTIONS.map(({ name, img }, i) => (
                <img decoding="async"
                  key={name}
                  src={img}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    activeFlex === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <motion.div variants={fadeUp}>
            <Link href="/solutions"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#0a0a0a] hover:bg-[#FF6700] text-[#fafaf7] hover:text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-colors duration-300 w-full sm:w-fit">
              See Solutions
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link href="/for-enterprises"
              className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 border border-[#0a0a0a]/25 text-[#0a0a0a]/85 hover:bg-[#0a0a0a] hover:text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide transition-colors duration-300 w-full sm:w-fit">
              See Enterprise Solutions
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <DayPassPickerModal isOpen={pickerOpen} onClose={() => setPickerOpen(false)} />
    </div>
  );
}