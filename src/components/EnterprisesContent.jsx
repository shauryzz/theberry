"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import {
  ENTERPRISE_HERO,
  ENTERPRISE_HERO_IMAGE,
  ENTERPRISE_INTRO,
  MANAGED_OFFICE,
  SHAPED_AROUND,
  SPACE_GALLERY,
  PROCESS_HEADING,
  ENTERPRISE_CTA,
} from "../data/enterprises";
import { PROCESS } from "../data/solutions";
import { whatsappLink } from "../data/booking";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ONE heading scale for the whole page, identical to the Solutions page:
   text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw], uppercase,
   tracking-tighter, last word orange. No per-section overrides, no smaller
   variants. No eyebrows; that pattern is retired site-wide. */
const HEADING_CLS =
  "font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] overflow-hidden pb-[0.05em]";

function Heading({ lead, accent, dark = false }) {
  return (
    <h2 className={`${HEADING_CLS} ${dark ? "text-[#fafaf7]" : "text-[#0a0a0a]"}`}>
      <motion.span variants={lineUp} className="block">
        {lead} <span className="text-[#FF6700]">{accent}</span>
      </motion.span>
    </h2>
  );
}

/* Same scale, broken over two lines where the client's lockup is stacked
   (their "START TO / MOVE-IN."). */
function StackedHeading({ lead, accent }) {
  return (
    <h2 className={`${HEADING_CLS} text-[#0a0a0a] overflow-visible`}>
      <span className="block overflow-hidden pb-[0.05em]">
        <motion.span variants={lineUp} className="block">{lead}</motion.span>
      </span>
      <span className="block overflow-hidden pb-[0.05em]">
        <motion.span variants={lineUp} className="block text-[#FF6700]">{accent}</motion.span>
      </span>
    </h2>
  );
}

/* Pill CTA with the orange sweep from below, the site's standard button.
   This duplicates the same component in SolutionsContent.jsx. Lifting both
   into a shared ui file would be tidier; left duplicated so this page ships
   without touching an already installed file. */
function SweepCTA({ children, href, external = false, dark = false }) {
  const cls = `group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-6 py-3 transition-colors duration-300 ${
    dark ? "border-[#fafaf7]/25 hover:border-[#FF6700]" : "border-[#0a0a0a]/20 hover:border-[#FF6700]"
  }`;
  const inner = (
    <>
      <span aria-hidden="true" className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <span className={`relative font-['NeueMontreal'] text-[11px] sm:text-xs tracking-[0.18em] uppercase ${dark ? "text-[#fafaf7] group-hover/cta:text-[#0a0a0a]" : "text-[#0a0a0a]"}`}>
        {children}
      </span>
      <LuArrowUpRight className={`relative w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:rotate-45 ${dark ? "text-[#fafaf7] group-hover/cta:text-[#0a0a0a]" : "text-[#0a0a0a]"}`} />
    </>
  );
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}

/* Scroll-linked statement.

   The section it sits in is only a heading and a paragraph, and the sections
   below already carry the photography (hero band, dark showcase, gallery), so
   another image here would just repeat. Instead the paragraph becomes the
   feature: it is set large, its words lift from faint to solid as you scroll
   through them, and an orange rule fills down the left edge in step.

   No copy is added or altered; this is purely how the client's sentence is
   presented. Falls back to plain solid text when the visitor has asked for
   reduced motion. */
const STATEMENT_CLS =
  "font-['NeueMontreal'] text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] leading-[1.4] text-[#0a0a0a]";

function RevealWord({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.26em]">
      {children}
    </motion.span>
  );
}

function ScrollRevealStatement({ text }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });
  const ruleScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const words = text.split(" ");

  return (
    <div ref={ref} className="relative pl-6 sm:pl-8">
      {reduceMotion ? (
        <>
          <span aria-hidden="true" className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#FF6700]" />
          <p className={STATEMENT_CLS}>{text}</p>
        </>
      ) : (
        <>
          <motion.span
            aria-hidden="true"
            style={{ scaleY: ruleScale }}
            className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#FF6700] origin-top"
          />
          <p className={STATEMENT_CLS}>
            {words.map((w, i) => (
              <RevealWord
                key={`${w}-${i}`}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              >
                {w}
              </RevealWord>
            ))}
          </p>
        </>
      )}
    </div>
  );
}

export default function EnterprisesContent() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <Heading
            lead={ENTERPRISE_HERO.headline.lead}
            accent={ENTERPRISE_HERO.headline.accent}
          />

          {/* Client's two lines, kept as two lines. Nothing inserted between. */}
          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 font-['NeueMontreal'] text-lg sm:text-xl md:text-2xl text-[#0a0a0a]/80 leading-snug max-w-[46ch]"
          >
            {ENTERPRISE_HERO.introLead}{" "}
            <span className="font-medium text-[#0a0a0a]">{ENTERPRISE_HERO.introBrand}</span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/60 leading-relaxed max-w-[58ch]"
          >
            {ENTERPRISE_HERO.introBody}
          </motion.p>
        </motion.div>
      </section>

      {/* Full-bleed image band, same treatment as the Solutions page hero. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[34vh] sm:h-[42vh] md:h-[52vh] min-h-[260px] max-h-[560px] overflow-hidden bg-[#0a0a0a]/5"
      >
        <motion.img
          src={ENTERPRISE_HERO_IMAGE}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>

      {/* ── AN OFFICE, BUILT AND RUN FOR YOU ────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-20 sm:py-28 md:py-36">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <Heading
            lead={ENTERPRISE_INTRO.heading.lead}
            accent={ENTERPRISE_INTRO.heading.accent}
          />

          {/* Indented off the heading so the block reads as editorial rather
              than a wall of text starting at the same left edge. */}
          <div className="mt-12 sm:mt-16 lg:pl-[18%] max-w-[46ch] sm:max-w-[54ch] lg:max-w-none">
            <ScrollRevealStatement text={ENTERPRISE_INTRO.body} />
          </div>
        </motion.div>
      </section>

      {/* ── MANAGED OFFICES, dark showcase ───────────────────────────── */}
      <section className="w-full bg-[#0a0a0a]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid lg:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="relative min-h-[280px] sm:min-h-[380px] lg:min-h-[640px] overflow-hidden">
            <img decoding="async"
              src={MANAGED_OFFICE.image}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <div className="px-5 sm:px-10 md:px-14 py-14 sm:py-16 md:py-20 flex flex-col justify-center">
            <Heading
              lead={MANAGED_OFFICE.heading.lead}
              accent={MANAGED_OFFICE.heading.accent}
              dark
            />

            <motion.p
              variants={fadeUp}
              className="mt-6 font-['NeueMontreal'] text-base sm:text-lg text-[#fafaf7]/65 leading-relaxed max-w-[50ch]"
            >
              {MANAGED_OFFICE.body}
            </motion.p>

            <motion.ul variants={stagger} className="mt-10 flex flex-col">
              {MANAGED_OFFICE.points.map((p) => (
                <motion.li
                  key={p.title}
                  variants={fadeUp}
                  className="py-5 border-t border-[#fafaf7]/12 last:border-b last:border-[#fafaf7]/12"
                >
                  <div className="flex items-baseline gap-3">
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#FF6700] flex-shrink-0" />
                    <h3 className="font-['Founders_Grotesk'] font-bold text-lg sm:text-xl text-[#fafaf7]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-2 pl-[18px] font-['NeueMontreal'] text-sm sm:text-base text-[#fafaf7]/55 leading-relaxed max-w-[52ch]">
                    {p.desc}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </section>

      {/* ── SHAPED AROUND YOUR TEAM + expanding gallery ──────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <Heading lead={SHAPED_AROUND.heading.lead} accent={SHAPED_AROUND.heading.accent} />

          <motion.p
            variants={fadeUp}
            className="mt-8 font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/65 leading-relaxed max-w-[58ch]"
          >
            {SHAPED_AROUND.body}
          </motion.p>

          {/* Two behaviours, one block.
              Mobile: a swipeable, snapping carousel that bleeds to both screen
              edges, matching the slider pattern used elsewhere on the site.
              sm and up: hover a panel and it opens while the others give way.

              NOTE: mobile must NOT use flex-1. In a column flex container with
              auto height, flex-1 resolves flex-basis to 0 on the main axis,
              which beats any height class and collapses every panel to nothing.
              That is exactly what broke here. Mobile uses fixed w/h instead. */}
          <motion.div
            variants={fadeUp}
            className="
              mt-12 sm:mt-16 flex gap-3
              overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-2
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0
              sm:h-[380px] md:h-[460px]
            "
          >
            {SPACE_GALLERY.map((g) => (
              <div
                key={g.src}
                className="
                  group relative shrink-0 snap-center w-[78%] h-64
                  rounded-2xl overflow-hidden bg-[#0a0a0a]/5
                  sm:w-auto sm:h-auto sm:shrink sm:flex-1 sm:hover:flex-[2.6]
                  transition-[flex] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]
                "
              >
                <img decoding="async"
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dimming only applies where hover exists. On touch every
                    panel would otherwise sit permanently darkened. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 sm:bg-[#0a0a0a]/30 sm:group-hover:bg-[#0a0a0a]/0 transition-colors duration-700"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FF6700] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS, start to move-in ───────────────────────────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-12 sm:mb-16"
        >
          <StackedHeading lead={PROCESS_HEADING.lead} accent={PROCESS_HEADING.accent} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {PROCESS.map((s) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              className="group relative flex flex-col rounded-2xl bg-white border border-[#0a0a0a]/10 p-6 overflow-hidden hover:border-[#FF6700]/45 hover:shadow-[0_24px_60px_-28px_rgba(10,10,10,0.22)] transition-all duration-500"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[3px] bg-[#FF6700] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              />
              <span className="font-['Founders_Grotesk'] font-bold text-2xl tracking-tight text-[#FF6700] leading-none">
                {s.step}
              </span>
              <h3 className="mt-4 font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-lg text-[#0a0a0a]">
                {s.title}
              </h3>
              <p className="mt-2.5 font-['NeueMontreal'] text-sm text-[#0a0a0a]/60 leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────── */}
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
          className="relative max-w-4xl mx-auto text-center"
        >
          <Heading lead={ENTERPRISE_CTA.heading.lead} accent={ENTERPRISE_CTA.heading.accent} dark />

          <motion.p
            variants={fadeUp}
            className="mt-6 sm:mt-8 font-['NeueMontreal'] text-base sm:text-lg text-[#fafaf7]/65 leading-relaxed max-w-[52ch] mx-auto"
          >
            {ENTERPRISE_CTA.body}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <SweepCTA href={ENTERPRISE_CTA.primary.href} dark>
              {ENTERPRISE_CTA.primary.label}
            </SweepCTA>
            <SweepCTA href={whatsappLink()} external dark>
              {ENTERPRISE_CTA.secondary.label}
            </SweepCTA>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
