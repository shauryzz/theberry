"use client";

import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import {
  ABOUT_STORY,
  FOUNDER_QUOTES,
  JOURNEY,
  JOURNEY_OUTRO,
  JOURNEY_SHOTS,
  ABOUT_COLLAGE,
} from "../data/content";
import { BOOKING, whatsappLink } from "../data/booking";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
// A pinned item lands on the board: fades in, drifts up, and settles into its tilt.
const pinIn = {
  hidden: { opacity: 0, y: 34, rotate: 0 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

// One heading scale, shared with Solutions / For Enterprises.
const HEADING_CLS =
  "font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] overflow-hidden pb-[0.05em]";

// Placeholder founders photo. Swap for the real shot of Parul & Vishesh.
const FOUNDERS_PHOTO =
  "/images/founders.webp";

// ── Board furniture ──────────────────────────────────────────────────────
// Small presentational pieces that make the Story read as a hand-pinned board
// rather than a grid. Graphite (ink), never orange - orange stays interactive.

// A strip of masking tape. Warm translucent, softly shadowed, laid at an angle.
function Tape({ className = "", w = 72, rotate = -8 }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute z-20 block ${className}`}
      style={{
        width: w,
        height: 22,
        transform: `rotate(${rotate}deg)`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.62), rgba(250,250,247,0.42))",
        boxShadow: "0 1px 2px rgba(10,10,10,0.10)",
        backdropFilter: "blur(0.5px)",
      }}
    />
  );
}

// A small pressed-in pin for the note cards.
function Pin({ className = "" }) {
  return (
    <span aria-hidden="true" className={`absolute z-30 ${className}`}>
      <span className="block w-3.5 h-3.5 rounded-full bg-[#0a0a0a] shadow-[0_2px_4px_rgba(10,10,10,0.35)]">
        <span className="block w-1.5 h-1.5 rounded-full bg-white/70 translate-x-[3px] translate-y-[3px]" />
      </span>
    </span>
  );
}

// A taped print. White border + caption lip, image inside, gentle straighten on hover.
function Polaroid({ src, alt = "", caption, w, rotate = 0, tape = "tl", className = "", imgClass = "aspect-[4/5]" }) {
  return (
    <motion.figure
      variants={pinIn}
      whileHover={{ rotate: 0, y: -6, scale: 1.02, zIndex: 40 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: `${rotate}deg`, ...(w ? { width: w } : {}) }}
      className={`group relative bg-white p-2.5 pb-9 rounded-[2px] shadow-[0_18px_45px_-24px_rgba(10,10,10,0.55)] ${w ? "" : "w-full"} ${className}`}
    >
      {tape === "tl" && <Tape className="-top-2 left-3" rotate={-11} />}
      {tape === "tr" && <Tape className="-top-2 right-3" rotate={9} />}
      {tape === "cross" && (
        <>
          <Tape className="-top-2 left-1/2 -translate-x-1/2" rotate={-6} w={84} />
        </>
      )}
      <div className={`relative overflow-hidden bg-[#0a0a0a]/5 ${imgClass}`}>
        <img decoding="async"
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
      </div>
      {caption && (
        <figcaption className="absolute bottom-2 left-0 right-0 text-center font-['Founders_Grotesk'] text-[13px] leading-none text-[#0a0a0a]/55">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

// Graphite doodles - hand-drawn arrow + loose ring. Ink, low opacity, non-interactive.
function ArrowDoodle({ className = "", w = 128, rotate = 0 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 60"
      width={w}
      className={`absolute z-30 text-[#0a0a0a]/35 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 40 C 30 8, 66 6, 104 24" />
      <path d="M92 12 L106 24 L90 32" />
    </svg>
  );
}

function RingDoodle({ className = "", w = 150, rotate = -6 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 90"
      width={w}
      className={`absolute z-30 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="#0a0a0a"
      strokeOpacity="0.28"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <path d="M100 8 C 168 6, 196 30, 178 54 C 156 82, 60 86, 24 66 C -2 50, 8 18, 78 10" />
    </svg>
  );
}

// ── Journey timeline ─────────────────────────────────────────────────────
// Every year carries a taped print (from JOURNEY_SHOTS in data), so the whole
// timeline reads like the pinboard above. The year sits faint until the row
// reaches the middle of the viewport, then resolves to solid ink and its node
// fills in, so the timeline "develops" as you read down it. The last entry's
// node is orange, the single forward-looking beat. Prints alternate their tilt
// row to row so the column feels hand-arranged rather than stamped.
function JourneyRow({ item, index, isLast, reduce }) {
  const ref = useRef(null);
  // Reveal as the row scrolls up into view (reliable on mobile, where rows are
  // tall). The old "-35%/-35%" centre band only fired once a row was centred —
  // impossible for rows taller than 30% of a phone screen, so nothing animated.
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const active = inView || reduce;
  const shot = JOURNEY_SHOTS[item.year];
  const even = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : "hidden"}
      animate={active ? "show" : "hidden"}
      variants={stagger}
      className="relative grid grid-cols-[2.25rem_1fr] md:grid-cols-[3rem_1fr] gap-5 md:gap-10 pb-16 md:pb-24 last:pb-0"
    >
      {/* node on the spine */}
      <div className="relative">
        <span
          className={`absolute left-1/2 -translate-x-1/2 top-3 md:top-4 w-3.5 h-3.5 rounded-full ring-4 ring-[#fafaf7] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isLast
              ? active ? "bg-[#FF6700] scale-125" : "bg-[#FF6700]/25"
              : active ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]/15"
          }`}
        />
      </div>

      {/* the entry block: year + copy on the left, a large taped print on the right */}
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-14 items-start">
        <div className="min-w-0 md:pt-1">
          <p
            className={`font-['Founders_Grotesk'] font-bold tracking-tighter leading-[0.82] text-[15vw] sm:text-7xl md:text-8xl transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? "text-[#0a0a0a]" : "text-[#0a0a0a]/[0.14]"
            }`}
          >
            {item.year}
          </p>
          <motion.p
            variants={fadeUp}
            className="mt-5 md:mt-7 font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/70 leading-relaxed max-w-[42ch]"
          >
            {item.desc}
          </motion.p>
        </div>

        {shot && (
          <div className="justify-self-start md:justify-self-end w-[280px] sm:w-[360px] md:w-[380px] lg:w-[440px] shrink-0">
            <Polaroid
              src={shot.src}
              alt={`The Berry Coworks, ${shot.caption || item.year}`}
              caption={shot.caption}
              rotate={even ? -2.4 : 2.4}
              tape={even ? "tl" : "tr"}
              imgClass="aspect-[4/3]"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function AboutContent() {
  const [p0, pTurn, pFounders] = ABOUT_STORY.paragraphs;

  // Scroll-drawn spine for the journey timeline.
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 62%", "end 58%"],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────
          Cream, same open as Solutions / For Enterprises: heading + intro. */}
      <section className="px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <h1 className={`${HEADING_CLS} text-[#0a0a0a]`}>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">{ABOUT_STORY.eyebrowless_heading.lead}</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                <span className="text-[#FF6700]">{ABOUT_STORY.eyebrowless_heading.accent}</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 max-w-[58ch] font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/65 leading-relaxed"
          >
            {p0}
          </motion.p>
        </motion.div>
      </section>

      {/* ── THE STORY - the pinboard ─────────────────────────────────────
          The founding story, physically arranged. Overlapping taped prints at
          real angles, the turn on a big pinned card, a story note, graphite
          annotations, margin captions. Desktop is an art-directed absolute
          board; mobile falls back to a stacked, still-hand-arranged column. */}
      <section className="relative px-5 sm:px-10 md:px-20 pt-10 pb-16 sm:pb-24 md:pb-28 border-t border-[#0a0a0a]/10 overflow-hidden">
        {/* faint paper grain so the board reads as a surface, not empty cream */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#0a0a0a 0.6px, transparent 0.6px)", backgroundSize: "22px 22px", maskImage: "radial-gradient(ellipse at center, #000 55%, transparent 100%)" }}
        />

        {/* pinned section kicker */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative"
        >
          <motion.p
            variants={fadeUp}
            style={{ rotate: "-2deg" }}
            className="relative inline-block bg-white px-4 py-1.5 rounded-[2px] shadow-[0_10px_28px_-18px_rgba(10,10,10,0.6)] font-['Founders_Grotesk'] text-lg sm:text-xl text-[#0a0a0a]/70"
          >
            <Tape className="-top-2 left-1/2 -translate-x-1/2" rotate={-5} w={70} />
            How it started
          </motion.p>
        </motion.div>

        {/* ─ Desktop board (lg+) ─ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="relative mx-auto mt-8 hidden lg:block w-full max-w-[1180px] h-[1000px]"
        >
          {/* photos */}
          <div className="absolute" style={{ top: 20, left: "1%" }}>
            <Polaroid src={ABOUT_COLLAGE[0]} alt="Inside a Berry Coworks floor" caption="Barakhamba · 2020" w={330} rotate={-4} tape="tl" imgClass="aspect-[4/5]" />
          </div>
          <div className="absolute" style={{ top: 0, left: "63%" }}>
            <Polaroid src={ABOUT_COLLAGE[1]} alt="A quiet corner to work" caption="Jhandewalan" w={300} rotate={5} tape="tr" imgClass="aspect-[3/4]" />
          </div>
          <div className="absolute" style={{ top: 470, left: "40%" }}>
            <Polaroid src={ABOUT_COLLAGE[2]} alt="Members at their desks" w={250} rotate={3} tape="cross" imgClass="aspect-square" />
          </div>
          <div className="absolute" style={{ top: 560, left: "2%" }}>
            <Polaroid src={ABOUT_COLLAGE[3]} alt="Light through the studio" caption="Noida · Sector 142" w={300} rotate={-3} tape="tr" imgClass="aspect-[4/3]" />
          </div>
          <div className="absolute" style={{ top: 430, left: "72%" }}>
            <Polaroid src={ABOUT_COLLAGE[4]} alt="A shared table" w={260} rotate={-6} tape="tl" imgClass="aspect-[3/4]" />
          </div>

          {/* the turn - the emotional centre of the board */}
          <motion.div
            variants={pinIn}
            style={{ rotate: "-1.5deg", top: 250, left: "33%", width: 300 }}
            className="absolute z-30 bg-[#0a0a0a] text-[#fafaf7] p-7 rounded-[2px] shadow-[0_30px_60px_-30px_rgba(10,10,10,0.7)]"
          >
            <Pin className="-top-1.5 left-1/2 -translate-x-1/2" />
            <p className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-[1.02] text-2xl xl:text-[28px] max-w-[13ch]">
              {pTurn}
            </p>
          </motion.div>

          {/* story note - typed on paper, pinned */}
          <motion.div
            variants={pinIn}
            style={{ rotate: "1.5deg", top: 660, left: "37%", width: 340 }}
            className="absolute z-20 bg-white p-6 rounded-[2px] shadow-[0_22px_50px_-28px_rgba(10,10,10,0.55)]"
          >
            <Pin className="-top-1.5 right-6" />
            <p className="font-['NeueMontreal'] text-[15px] leading-relaxed text-[#0a0a0a]/75">
              {pFounders}
            </p>
          </motion.div>

          {/* annotations */}
          <RingDoodle className="left-[20%] top-[300px]" w={180} rotate={-8} />
          <ArrowDoodle className="left-[52%] top-[250px]" w={140} rotate={18} />
          <motion.span
            variants={fadeUp}
            className="absolute z-30 font-['Founders_Grotesk'] text-[#0a0a0a]/45 text-lg"
            style={{ top: 250, left: "12%", rotate: "-4deg" }}
          >
            two designers.
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="absolute z-30 font-['Founders_Grotesk'] text-[#0a0a0a]/40 text-base"
            style={{ top: 940, left: "70%", rotate: "3deg" }}
          >
            grown together.
          </motion.span>
        </motion.div>

        {/* ─ Mobile / tablet fallback (< lg) - stacked but hand-arranged ─ */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="relative mt-10 lg:hidden flex flex-col items-center gap-8"
        >
          <Polaroid src={ABOUT_COLLAGE[0]} alt="Inside a Berry Coworks floor" caption="Barakhamba · 2020" w={260} rotate={-3} tape="tl" imgClass="aspect-[4/5]" className="self-start" />

          <motion.div
            variants={pinIn}
            style={{ rotate: "-1.5deg" }}
            className="relative z-10 bg-[#0a0a0a] text-[#fafaf7] p-6 rounded-[2px] shadow-[0_26px_50px_-28px_rgba(10,10,10,0.65)] self-center max-w-[15ch]"
          >
            <Pin className="-top-1.5 left-1/2 -translate-x-1/2" />
            <p className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-[1.03] text-2xl">
              {pTurn}
            </p>
          </motion.div>

          <div className="flex items-start gap-4 self-stretch justify-center">
            <Polaroid src={ABOUT_COLLAGE[1]} alt="A quiet corner to work" caption="Jhandewalan" w={150} rotate={4} tape="tr" imgClass="aspect-[3/4]" />
            <Polaroid src={ABOUT_COLLAGE[2]} alt="Members at their desks" w={150} rotate={-4} tape="tl" imgClass="aspect-square" className="mt-8" />
          </div>

          <motion.div
            variants={pinIn}
            style={{ rotate: "1.2deg" }}
            className="relative z-10 bg-white p-6 rounded-[2px] shadow-[0_22px_45px_-26px_rgba(10,10,10,0.5)] self-end max-w-[42ch]"
          >
            <Pin className="-top-1.5 right-6" />
            <p className="font-['NeueMontreal'] text-[15px] leading-relaxed text-[#0a0a0a]/75">
              {pFounders}
            </p>
          </motion.div>

          <Polaroid src={ABOUT_COLLAGE[3]} alt="Light through the studio" caption="Noida · Sector 142" w={240} rotate={-2} tape="tr" imgClass="aspect-[4/3]" className="self-start" />
        </motion.div>
      </section>

      {/* ── FOUNDER QUOTES (dark - contrast moment) ──────────────────────
          The two founders' quotes on a dark ground, the page's first drama. */}
      <section className="relative w-full bg-[#0a0a0a] overflow-hidden px-5 sm:px-10 md:px-20 py-20 sm:py-28 md:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.16] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#fafaf7 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-6xl mx-auto"
        >
          {FOUNDER_QUOTES.map((q) => (
            <motion.blockquote key={q.name} variants={fadeUp} className="flex flex-col">
              <span aria-hidden="true" className="font-['Founders_Grotesk'] text-[#FF6700] text-6xl leading-none mb-4">&ldquo;</span>
              <p className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-[1.1] text-[#fafaf7] text-2xl sm:text-3xl md:text-4xl flex-1">
                {q.quote}
              </p>
              <footer className="mt-8">
                <p className="font-['NeueMontreal'] text-base text-[#fafaf7]">{q.name}</p>
                <p className="font-['NeueMontreal'] text-sm text-[#fafaf7]/45 mt-0.5">{q.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </section>

      {/* ── THE NAME / METAPHOR + founders print ─────────────────────────
          The berry metaphor, paired with the founders photo given the same
          taped-print treatment so it echoes the board. Warm, cream. */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center"
        >
          <motion.div variants={fadeUp} className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <figure
              className="relative bg-white p-3 pb-12 rounded-[2px] shadow-[0_30px_70px_-40px_rgba(10,10,10,0.5)] w-[300px] sm:w-[360px]"
              style={{ transform: "rotate(-3deg)" }}
            >
              <Tape className="-top-2.5 left-1/2 -translate-x-1/2" rotate={-5} w={96} />
              <div className="relative overflow-hidden aspect-[4/5] bg-[#0a0a0a]/5">
                <img decoding="async" loading="lazy"
                  src={FOUNDERS_PHOTO}
                  alt="Parul Jain and Vishesh Kalkhandey, founders of The Berry Coworks"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <figcaption className="absolute bottom-3 left-0 right-0 text-center font-['Founders_Grotesk'] text-[15px] text-[#0a0a0a]/55">
                {ABOUT_STORY.signoff}
              </figcaption>
            </figure>
          </motion.div>

          <div className="lg:col-span-7">
            <h2 className={`${HEADING_CLS} text-[#0a0a0a] mb-8`}>
              <motion.span variants={lineUp} className="block">
                Why a <span className="text-[#FF6700]">berry.</span>
              </motion.span>
            </h2>
            <motion.p variants={fadeUp} className="font-['NeueMontreal'] text-lg sm:text-xl text-[#0a0a0a]/75 leading-relaxed mb-6">
              {ABOUT_STORY.metaphor}
            </motion.p>
            {/* Closing beat — deliberately set apart from the metaphor above.
                Orange left rule + italic display face is the site's "pulled
                out statement" idiom, so on mobile (where the photo no longer
                anchors the block) this reads as an intentional coda, not a
                second section bleeding in. */}
            <motion.p
              variants={fadeUp}
              className="mt-8 sm:mt-10 pl-5 sm:pl-6 border-l-2 border-[#FF6700] font-['Founders_Grotesk'] text-lg sm:text-xl md:text-2xl text-[#0a0a0a]/70 leading-relaxed"
            >
              {ABOUT_STORY.closing}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── THE JOURNEY - scroll-drawn editorial timeline ────────────────
          A slim ink spine draws itself as you scroll. Oversized years sit
          faint until each entry reaches centre, then resolve to solid; the
          three launch years carry a taped print. Ends open-ended on an
          orange forward node. */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-14 sm:mb-20 max-w-3xl"
        >
          <h2 className={`${HEADING_CLS} text-[#0a0a0a]`}>
            <motion.span variants={lineUp} className="block">
              The journey <span className="text-[#FF6700]">so far.</span>
            </motion.span>
          </h2>
        </motion.div>

        <div className="relative max-w-6xl">
          {/* the track - spine is drawn across exactly this range */}
          <div ref={trackRef} className="relative">
            {/* faint full spine */}
            <span
              aria-hidden="true"
              className="absolute left-[1.125rem] md:left-[1.5rem] -translate-x-1/2 top-4 md:top-5 bottom-8 w-px bg-[#0a0a0a]/12"
            />
            {/* ink fill, drawn on scroll */}
            <motion.span
              aria-hidden="true"
              style={{ scaleY: reduce ? 1 : fillScale }}
              className="absolute left-[1.125rem] md:left-[1.5rem] -translate-x-1/2 top-4 md:top-5 bottom-8 w-px bg-[#0a0a0a]/45 origin-top"
            />
            {JOURNEY.map((t, i) => (
              <JourneyRow key={t.year} item={t} index={i} isLast={i === JOURNEY.length - 1} reduce={reduce} />
            ))}
          </div>

          {/* open-ended continuation.
              The negative top margin tightens the gap under the last row on
              DESKTOP, where the last polaroid sits off to the right and this
              line slides up into empty space beside it. On MOBILE the polaroid
              is stacked full-width directly above, so a negative margin drags
              this line up into the photo's caption lip — hence mt-0 there. */}
          <div className="relative grid grid-cols-[2.25rem_1fr] md:grid-cols-[3rem_1fr] gap-5 md:gap-10 mt-2 md:-mt-6">
            <div className="relative">
              <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-0 h-12 border-l border-dashed border-[#0a0a0a]/25" />
              <span aria-hidden="true" className="absolute left-1/2 -translate-x-1/2 top-12 w-2.5 h-2.5 rounded-full bg-[#FF6700]" />
            </div>
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="pt-8 font-['Founders_Grotesk'] text-xl sm:text-2xl md:text-3xl text-[#0a0a0a]/45"
            >
              {JOURNEY_OUTRO}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────
          Buttons only, matching the location-page CTA the client approved. */}
      <section className="relative w-full bg-[#fafaf7] py-16 sm:py-24 md:py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#0a0a0a 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative px-5 sm:px-10 md:px-20 max-w-5xl mx-auto text-center"
        >
          <h2 className={`${HEADING_CLS} text-[#0a0a0a] mx-auto`}>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Come see what</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">
                we&apos;ve <span className="text-[#FF6700]">built.</span>
              </motion.span>
            </span>
          </h2>

          <motion.div
            variants={fadeUp}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          >
            <Link
              href={BOOKING.tour}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300"
            >
              Book a Free Tour
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              WhatsApp Us
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
