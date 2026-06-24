"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { SITE } from "../data/site";

// ─── Animation variants ──────────────────────────────────────────────────
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp  = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp  = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Placeholder copy ────────────────────────────────────────────────────
// IMPORTANT: This is generic boilerplate, not real legal text. Replace with
// counsel-reviewed copy before the site goes live. Both files share the
// same structural pattern (eyebrow → hero → numbered sections → contact).
const CONTENT = {
  privacy: {
    eyebrow:    "Privacy Policy",
    title:      ["How we handle", "your data."],
    accent:     "data.",
    lastUpdate: "Last updated · June 2026",
    intro:
      "This policy explains what information The Berry Coworks collects, how we use it, and the choices you have. We try to keep things plain — but if anything below is unclear, write to us and we'll explain.",
    sections: [
      {
        title: "What we collect",
        body:
          "When you book a tour, fill out a contact form, or become a member, we collect the details you give us — name, email, phone, company, and any context you share about your needs. We also collect basic technical information when you browse (browser type, referrer, anonymised analytics).",
      },
      {
        title: "How we use it",
        body:
          "To reply to enquiries, schedule tours, deliver member services, send occasional updates you've opted into, and improve the site. We don't sell your data, and we don't share it with third parties for marketing.",
      },
      {
        title: "Who sees it",
        body:
          "Our team, our booking platform (DeskOS), and any service provider strictly necessary to operate the website and our spaces. Each of these is bound to handle data with the same care we do.",
      },
      {
        title: "How long we keep it",
        body:
          "Enquiries are kept for up to 24 months. Member data is kept for as long as you're a member, and for a reasonable period after — for accounting, legal, and reference purposes. You can request deletion at any time.",
      },
      {
        title: "Your rights",
        body:
          "You can ask to see, correct, or delete the personal data we hold about you. Write to us at the email below and we'll respond within a reasonable timeframe.",
      },
      {
        title: "Cookies",
        body:
          "We use a small number of cookies — strictly for site functionality and basic analytics. We don't run advertising trackers. Your browser settings can block cookies if you prefer.",
      },
    ],
  },
  terms: {
    eyebrow:    "Terms of Service",
    title:      ["The fine print,", "in plain words."],
    accent:     "plain words.",
    lastUpdate: "Last updated · June 2026",
    intro:
      "These terms cover your use of the theberrycoworks.com website and any services booked through it. Membership and physical-space access are governed by a separate Member Agreement signed at the time of joining.",
    sections: [
      {
        title: "Using the website",
        body:
          "You're welcome to browse, share, and link to anything on this site. You can't copy our content, photography, or logo for commercial use without written permission. We do our best to keep the site accurate, but we don't guarantee uptime, freedom from errors, or fitness for any specific purpose.",
      },
      {
        title: "Bookings & enquiries",
        body:
          "Tours, day passes, and trial bookings made through the site are subject to availability and confirmation. Pricing shown on the site is a starting point and may vary by term, location, and team size. Final terms are confirmed in writing before any commitment.",
      },
      {
        title: "Membership",
        body:
          "All memberships are governed by a separate Member Agreement, which prevails over anything on this site. The Member Agreement covers payment terms, conduct, access, cancellation, and liability — all the things that actually matter once you're working with us.",
      },
      {
        title: "Third-party services",
        body:
          "Bookings happen through DeskOS, our booking-platform partner. Their terms apply to the booking transaction itself. We're not responsible for downtime or issues on third-party platforms beyond our reasonable control.",
      },
      {
        title: "Liability",
        body:
          "To the extent allowed by law, The Berry Coworks's liability for anything arising from your use of this site is limited to the amount you've paid us in the last twelve months. Nothing in these terms excludes liability that can't be excluded by law.",
      },
      {
        title: "Changes & jurisdiction",
        body:
          "We may update these terms occasionally. When we do, we'll note the date at the top. Material changes will be communicated to active members. These terms are governed by the laws of India, and any disputes fall under the exclusive jurisdiction of the courts of New Delhi.",
      },
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────
export default function LegalContent({ kind }) {
  const data = CONTENT[kind];
  if (!data) return null;

  return (
    <main className="relative w-full bg-[#fafaf7] text-[#0a0a0a] overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-20 md:pb-24 border-b border-[#0a0a0a]/10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-6xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              {data.eyebrow}
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] max-w-[22ch]'>
            {data.title.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  {line === data.accent || line.endsWith(data.accent) ? (
                    <>
                      {line.replace(data.accent, "")}
                      <span className="text-[#FF6700]">{data.accent}</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col gap-4 max-w-[60ch]">
            <p className="font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed">
              {data.intro}
            </p>
            <p className="font-['NeueMontreal'] text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40">
              {data.lastUpdate}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SECTIONS ─── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-[80ch]"
        >
          <div className="grid grid-cols-1 gap-10 sm:gap-12 md:gap-14">
            {data.sections.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="border-t border-[#0a0a0a]/15 pt-6 sm:pt-8"
              >
                <div className="flex items-baseline gap-4 mb-3 sm:mb-4">
                  <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700] flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className='font-["Founders_Grotesk"] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-[#0a0a0a]'>
                    {s.title}
                  </h2>
                </div>
                <p className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed pl-0 sm:pl-8">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CONTACT BLOCK ─── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Questions?
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] mb-6'>
            <motion.span variants={lineUp} className="block">Write to Us.</motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed mb-8"
          >
            For anything related to this policy — corrections, deletion requests, or genuine questions — reach the team at the email below or via the contact page.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
            >
              {SITE.email}
              <LuArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              Contact page
              <LuArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
