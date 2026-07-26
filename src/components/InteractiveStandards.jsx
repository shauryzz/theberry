"use client";

import { motion } from "framer-motion";

/* ──────────────────────────────────────────────────────────────────────────
 * InteractiveStandards
 *
 * A grid of amenity tiles. Each tile shows a hand-drawn SVG icon with a
 * purpose-built hover animation (the printer ejects a sheet, the wifi arcs
 * pulse, the coffee steams, the train slides through, etc.) — the
 * 91Springboard-style "the icon illustrates itself" effect.
 *
 * PROP-DRIVEN: pass `items` = [{ label, icon }] where `icon` is a slug from
 * ICONS below. This one component powers the amenity rows on Solutions,
 * Workspaces, and Locations — each page passes its own list. If a slug is
 * missing, a neutral dot icon is shown so nothing ever breaks.
 *
 * All animation is pure CSS keyed off `.group:hover` on each tile — no
 * per-tile JS state, so it's fast and can't fall out of sync. Colours use
 * `currentColor`, which each tile drives to brand orange (#FF6700) on hover.
 * A prefers-reduced-motion guard disables all motion for accessibility.
 * ────────────────────────────────────────────────────────────────────────── */

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const SW = 1.6; // shared stroke width — thin, modern line icons

/* ── Icon library ──────────────────────────────────────────────────────────
   Each entry is a component returning a 48×48 <svg> whose animated parts
   carry a class the <style> block drives on `.group:hover`. */

const ICONS = {
  wifi: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round">
      <path className="ico-wifi-arc ico-wifi-a3" d="M10 20c8-7 20-7 28 0" />
      <path className="ico-wifi-arc ico-wifi-a2" d="M15 26c5.5-4.6 12.5-4.6 18 0" />
      <path className="ico-wifi-arc ico-wifi-a1" d="M20 32c2.5-2 5.5-2 8 0" />
      <circle className="ico-wifi-dot" cx="24" cy="37" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),

  power: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinejoin="round" strokeLinecap="round">
      <path className="ico-bolt" d="M26 6 12 27h9l-1 15 15-22h-9z" fill="currentColor" fillOpacity="0.08" />
    </svg>
  ),

  printer: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-print-sheet">
        <rect x="16" y="8" width="16" height="14" rx="1.5" fill="currentColor" fillOpacity="0.08" />
        <line x1="19" y1="13" x2="29" y2="13" strokeWidth="1.2" />
        <line x1="19" y1="16" x2="26" y2="16" strokeWidth="1.2" />
      </g>
      <path d="M14 22h20v11a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z" fill="var(--std-bg)" />
      <path d="M17 22v-4h14v4" />
      <circle cx="30.5" cy="26.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),

  broom: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-broom">
        <line x1="34" y1="10" x2="22" y2="24" />
        <path d="M22 24l6 6-9 8c-2 1.6-5 1.4-6.6-.2s-1.8-4.6-.2-6.6z" />
        <line x1="16" y1="30" x2="20" y2="34" />
        <line x1="13.5" y1="33" x2="17" y2="36.5" />
      </g>
    </svg>
  ),

  cctv: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-cctv">
        <rect x="10" y="16" width="20" height="10" rx="2" />
        <path d="M30 19l7-3v14l-7-3" />
        <circle className="ico-cctv-lens" cx="15.5" cy="21" r="2" fill="currentColor" stroke="none" />
      </g>
      <line className="ico-cctv-scan" x1="20" y1="30" x2="20" y2="40" strokeDasharray="2 3" />
    </svg>
  ),

  it: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 26v-3a11 11 0 0 1 22 0v3" />
      <rect x="9" y="26" width="6" height="9" rx="2" />
      <rect x="33" y="26" width="6" height="9" rx="2" />
      <path d="M36 35v2a4 4 0 0 1-4 4h-6" />
      <g stroke="none" fill="currentColor">
        <circle className="ico-it-dot ico-it-d1" cx="20" cy="38" r="1.4" />
        <circle className="ico-it-dot ico-it-d2" cx="24" cy="38" r="1.4" />
        <circle className="ico-it-dot ico-it-d3" cx="28" cy="38" r="1.4" />
      </g>
    </svg>
  ),

  mail: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="16" width="28" height="18" rx="2.5" />
      <path className="ico-mail-letter" d="M17 22h14v7H17z" fill="currentColor" fillOpacity="0.08" />
      <path className="ico-mail-flap" d="M10.5 17.5 24 27l13.5-9.5" />
    </svg>
  ),

  paw: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW}>
      <g className="ico-paw" fill="currentColor" stroke="none">
        <ellipse cx="24" cy="30" rx="6" ry="5" />
        <ellipse cx="15" cy="24" rx="2.6" ry="3.4" />
        <ellipse cx="20.5" cy="19.5" rx="2.6" ry="3.4" />
        <ellipse cx="27.5" cy="19.5" rx="2.6" ry="3.4" />
        <ellipse cx="33" cy="24" rx="2.6" ry="3.4" />
      </g>
    </svg>
  ),

  coffee: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-steam" stroke="currentColor" fill="none">
        <path className="ico-steam-1" d="M20 14c1.5-1.6 1.5-3.4 0-5" />
        <path className="ico-steam-2" d="M27 14c1.5-1.6 1.5-3.4 0-5" />
      </g>
      <path d="M13 20h20v8a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8z" />
      <path d="M33 22h3.5a3.5 3.5 0 0 1 0 7H33" />
    </svg>
  ),

  /* ── F&B counter: coffee cup + food plate; steam rises ── */
  fnb: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-steam" stroke="currentColor" fill="none">
        <path className="ico-steam-1" d="M15 15c1.3-1.4 1.3-3 0-4.4" />
      </g>
      <path d="M9 20h12v6a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" />
      <path d="M21 21h2.5a2.5 2.5 0 0 1 0 5H21" />
      <circle className="ico-fnb-plate" cx="33" cy="27" r="6.5" />
      <circle cx="33" cy="27" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  ),

  /* ── Phone booth: handset rings/shakes ── */
  phone: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="8" width="20" height="32" rx="3" />
      <line x1="14" y1="34" x2="34" y2="34" />
      <g className="ico-phone-handset">
        <path d="M21 16c0 5 2 7 7 7l1.5-2.5-3-1.5-1.5 1a6 6 0 0 1-2.5-2.5l1-1.5-1.5-3z" fill="currentColor" fillOpacity="0.1" />
      </g>
    </svg>
  ),

  /* ── Meeting room: presentation screen, bar-chart content slides up ── */
  meeting: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="12" width="30" height="20" rx="2" />
      <line x1="24" y1="32" x2="24" y2="37" />
      <line x1="18" y1="37" x2="30" y2="37" />
      <g className="ico-meet-bars">
        <line className="ico-meet-b1" x1="17" y1="27" x2="17" y2="22" />
        <line className="ico-meet-b2" x1="23" y1="27" x2="23" y2="19" />
        <line className="ico-meet-b3" x1="29" y1="27" x2="29" y2="24" />
      </g>
    </svg>
  ),

  /* ── Community events: people; confetti pops ── */
  community: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="20" r="4" />
      <circle cx="30" cy="20" r="4" />
      <path d="M11 35v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" />
      <path d="M25 35v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2" />
      <g className="ico-confetti" stroke="none" fill="currentColor">
        <rect className="ico-conf-1" x="14" y="10" width="2" height="2" rx="0.5" />
        <rect className="ico-conf-2" x="24" y="7" width="2" height="2" rx="0.5" />
        <rect className="ico-conf-3" x="33" y="10" width="2" height="2" rx="0.5" />
      </g>
    </svg>
  ),

  /* ── Metro: train slides through ── */
  metro: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-train">
        <rect x="14" y="10" width="20" height="24" rx="4" />
        <line x1="14" y1="20" x2="34" y2="20" />
        <circle cx="19" cy="15" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="29" cy="15" r="1.2" fill="currentColor" stroke="none" />
        <line x1="18" y1="38" x2="15" y2="42" />
        <line x1="30" y1="38" x2="33" y2="42" />
        <circle cx="19" cy="27" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="29" cy="27" r="1.4" fill="currentColor" stroke="none" />
      </g>
      <g className="ico-train-lines" stroke="currentColor" opacity="0">
        <line x1="6" y1="16" x2="10" y2="16" />
        <line x1="5" y1="24" x2="10" y2="24" />
        <line x1="6" y1="32" x2="10" y2="32" />
      </g>
    </svg>
  ),

  /* ── Natural light: sun with rotating rays ── */
  light: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="7" />
      <g className="ico-sun-rays">
        <line x1="24" y1="9" x2="24" y2="13" />
        <line x1="24" y1="35" x2="24" y2="39" />
        <line x1="9" y1="24" x2="13" y2="24" />
        <line x1="35" y1="24" x2="39" y2="24" />
        <line x1="13.5" y1="13.5" x2="16.3" y2="16.3" />
        <line x1="31.7" y1="31.7" x2="34.5" y2="34.5" />
        <line x1="34.5" y1="13.5" x2="31.7" y2="16.3" />
        <line x1="16.3" y1="31.7" x2="13.5" y2="34.5" />
      </g>
    </svg>
  ),

  /* ── Ergonomic chair: reclines slightly ── */
  chair: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <g className="ico-chair-back">
        <path d="M19 10h4a3 3 0 0 1 3 3v11h-10V13a3 3 0 0 1 3-3z" fill="currentColor" fillOpacity="0.07" />
      </g>
      <path d="M14 24h16v3a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2z" />
      <line x1="22" y1="29" x2="22" y2="36" />
      <path d="M17 40l5-4 5 4" />
    </svg>
  ),

  /* ── 24/7 access: clock hands spin ── */
  access: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="14" />
      <g className="ico-clock-hands">
        <line className="ico-clock-min" x1="24" y1="24" x2="24" y2="15" />
        <line className="ico-clock-hr" x1="24" y1="24" x2="30" y2="24" />
      </g>
      <circle cx="24" cy="24" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),

  /* ── Fallback: neutral dot ── */
  dot: () => (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={SW}>
      <circle cx="24" cy="24" r="8" className="ico-fallback" fill="currentColor" fillOpacity="0.1" />
    </svg>
  ),
};

export default function InteractiveStandards({ items = [], columns = "three" }) {
  // Column presets keep call sites clean.
  const colClass =
    columns === "four"
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
      : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3";

  return (
    <>
      <style>{`
        .std-tile {
          --std-bg: #fafaf7;
          color: rgba(10,10,10,0.55);
          transition: color .35s ease, transform .5s cubic-bezier(0.22,1,0.36,1),
                      box-shadow .5s ease, border-color .35s ease;
        }
        .std-tile:hover { color: #FF6700; }
        .std-tile svg { width: 100%; height: 100%; overflow: visible; }
        .std-label { transition: color .35s ease; }

        /* WiFi */
        .ico-wifi-arc { opacity: .35; transition: opacity .3s ease; }
        .std-tile:hover .ico-wifi-arc { opacity: 1; }
        .std-tile:hover .ico-wifi-a1 { animation: wifiPulse 1.2s ease-in-out infinite; }
        .std-tile:hover .ico-wifi-a2 { animation: wifiPulse 1.2s ease-in-out infinite .18s; }
        .std-tile:hover .ico-wifi-a3 { animation: wifiPulse 1.2s ease-in-out infinite .36s; }
        @keyframes wifiPulse { 0%,100%{opacity:.35} 40%{opacity:1} }

        /* Power */
        .ico-bolt { transition: fill-opacity .3s ease; }
        .std-tile:hover .ico-bolt { animation: boltFlash .7s ease-in-out infinite; }
        @keyframes boltFlash { 0%,100%{fill-opacity:.08} 45%{fill-opacity:.55} 55%{fill-opacity:.15} }

        /* Broom */
        .ico-broom { transform-origin: 30px 12px; }
        .std-tile:hover .ico-broom { animation: broomSweep 1.1s ease-in-out infinite; }
        @keyframes broomSweep { 0%,100%{transform:rotate(0deg)} 30%{transform:rotate(-9deg)} 70%{transform:rotate(9deg)} }

        /* CCTV */
        .ico-cctv { transform-origin: 30px 21px; }
        .std-tile:hover .ico-cctv { animation: cctvPan 2s ease-in-out infinite; }
        @keyframes cctvPan { 0%,100%{transform:rotate(0)} 50%{transform:rotate(-8deg)} }
        .ico-cctv-scan { opacity: 0; }
        .std-tile:hover .ico-cctv-scan { animation: cctvScan 1.6s ease-in-out infinite; }
        @keyframes cctvScan { 0%{opacity:0;transform:translateY(-4px)} 50%{opacity:1} 100%{opacity:0;transform:translateY(6px)} }

        /* IT */
        .std-tile:hover .ico-it-d1 { animation: itBounce .9s ease-in-out infinite; }
        .std-tile:hover .ico-it-d2 { animation: itBounce .9s ease-in-out infinite .15s; }
        .std-tile:hover .ico-it-d3 { animation: itBounce .9s ease-in-out infinite .3s; }
        @keyframes itBounce { 0%,100%{transform:translateY(0);opacity:.5} 50%{transform:translateY(-2.5px);opacity:1} }

        /* Mail */
        .ico-mail-flap { transition: transform .4s ease; transform-origin: 24px 17px; }
        .std-tile:hover .ico-mail-flap { transform: scaleY(-0.55); }
        .ico-mail-letter { transition: transform .45s cubic-bezier(0.22,1,0.36,1) .1s; }
        .std-tile:hover .ico-mail-letter { transform: translateY(-4px); }

        /* Paw */
        .std-tile:hover .ico-paw { animation: pawTap .9s ease-in-out infinite; transform-origin: 24px 30px; }
        @keyframes pawTap { 0%,100%{transform:translateY(0) scale(1)} 45%{transform:translateY(-3px) scale(1.04)} }

        /* Coffee + F&B steam */
        .ico-steam { opacity: 0; }
        .std-tile:hover .ico-steam-1 { animation: steamRise 1.5s ease-in-out infinite; }
        .std-tile:hover .ico-steam-2 { animation: steamRise 1.5s ease-in-out infinite .4s; }
        @keyframes steamRise { 0%{opacity:0;transform:translateY(3px)} 40%{opacity:1} 100%{opacity:0;transform:translateY(-4px)} }
        .ico-fnb-plate { transition: transform .4s ease; transform-origin: 33px 27px; }
        .std-tile:hover .ico-fnb-plate { transform: scale(1.08); }

        /* Printer */
        .ico-print-sheet { transform: translateY(9px); opacity: 0; transition: transform .5s cubic-bezier(0.22,1,0.36,1), opacity .4s ease; }
        .std-tile:hover .ico-print-sheet { transform: translateY(0); opacity: 1; }

        /* Phone: ring shake */
        .ico-phone-handset { transform-origin: 24px 20px; }
        .std-tile:hover .ico-phone-handset { animation: phoneRing .5s ease-in-out infinite; }
        @keyframes phoneRing { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-8deg)} 75%{transform:rotate(8deg)} }

        /* Meeting: bars grow up */
        .ico-meet-bars line { transform-origin: bottom; transition: transform .4s ease; transform: scaleY(0.2); }
        .std-tile:hover .ico-meet-b1 { animation: barGrow .5s ease forwards; }
        .std-tile:hover .ico-meet-b2 { animation: barGrow .5s ease .1s forwards; }
        .std-tile:hover .ico-meet-b3 { animation: barGrow .5s ease .2s forwards; }
        @keyframes barGrow { to { transform: scaleY(1); } }

        /* Community: confetti pops up */
        .ico-confetti rect { opacity: 0; }
        .std-tile:hover .ico-conf-1 { animation: confPop 1s ease-in-out infinite; }
        .std-tile:hover .ico-conf-2 { animation: confPop 1s ease-in-out infinite .15s; }
        .std-tile:hover .ico-conf-3 { animation: confPop 1s ease-in-out infinite .3s; }
        @keyframes confPop { 0%{opacity:0;transform:translateY(4px)} 40%{opacity:1} 100%{opacity:0;transform:translateY(-3px)} }

        /* Metro: train slides + speed lines */
        .std-tile:hover .ico-train { animation: trainMove 1.1s ease-in-out infinite; }
        @keyframes trainMove { 0%,100%{transform:translateX(0)} 50%{transform:translateX(2px)} }
        .std-tile:hover .ico-train-lines { animation: trainLines 1.1s ease-in-out infinite; }
        @keyframes trainLines { 0%,100%{opacity:0} 50%{opacity:.6} }

        /* Natural light: rays rotate */
        .ico-sun-rays { transform-origin: 24px 24px; }
        .std-tile:hover .ico-sun-rays { animation: sunSpin 8s linear infinite; }
        @keyframes sunSpin { to { transform: rotate(360deg); } }

        /* Chair: reclines */
        .ico-chair-back { transform-origin: 20px 24px; transition: transform .4s ease; }
        .std-tile:hover .ico-chair-back { transform: rotate(-9deg); }

        /* 24/7 clock: hands spin */
        .ico-clock-hands { transform-origin: 24px 24px; }
        .std-tile:hover .ico-clock-min { transform-origin: 24px 24px; animation: clockSpin 2s linear infinite; }
        .std-tile:hover .ico-clock-hr  { transform-origin: 24px 24px; animation: clockSpin 6s linear infinite; }
        @keyframes clockSpin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .std-tile * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <motion.div
        variants={stagger}
        className={`mt-12 sm:mt-16 grid ${colClass} gap-3 sm:gap-4`}
      >
        {items.map(({ label, icon }) => {
          const Icon = ICONS[icon] || ICONS.dot;
          return (
            <motion.div key={label} variants={fadeUp}>
              <div className="std-tile group flex flex-col items-center justify-center text-center gap-4 rounded-2xl border border-[#0a0a0a]/10 bg-[#fafaf7] px-4 py-8 sm:py-10 hover:border-[#FF6700]/40 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_-24px_rgba(255,103,0,0.4)] cursor-default">
                <div className="w-11 h-11 sm:w-12 sm:h-12">
                  <Icon />
                </div>
                <span className="std-label font-['NeueMontreal'] text-xs sm:text-sm font-medium text-[#0a0a0a]/80 group-hover:text-[#0a0a0a] leading-tight">
                  {label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}
