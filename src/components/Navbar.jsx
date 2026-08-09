"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LuArrowUpRight, LuPhone } from "react-icons/lu";
import { NAV_LINKS } from "../data/nav";
import { SITE, SOCIALS } from "../data/site";
import { BOOKING, whatsappLink } from "../data/booking";

// Auto-balance the two nav clusters around the centered logo.
// 4 items → 2|2  •  5 items → 3|2  •  6 items → 3|3
const SPLIT_IDX = Math.ceil(NAV_LINKS.length / 2);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced          = useReducedMotion();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else      document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Only the homepage still opens on a dark hero. The location detail pages
  // were changed to a light (cream) hero to match Solutions / For Enterprises,
  // so they must use the light navbar from the top — otherwise the white nav
  // text sits invisibly on cream until you scroll.
  const hasDarkHero = pathname === "/";
  const onLight = open || (hasDarkHero ? scrolled : true);

  // Logo file is the brand mark with its own colors (dark text + orange dot).
  // It's designed to work on both light and dark backgrounds — no filter needed.
  const logoSrc = "/images/final_logo_berry.png";

  const isActive = (href) => pathname === href;

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] flex justify-center pt-4 px-4 md:px-10">
        <nav className={`w-full max-w-6xl flex items-center justify-between px-4 md:px-6 py-2.5 rounded-full border transition-all duration-500 backdrop-blur-xl ${
          onLight
            ? "border-[#0a0a0a]/15 bg-[#fafaf7]/70 shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            : "border-white/20 bg-white/[0.06]"
        }`}>

          {/* ── Desktop: left links ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.slice(0, SPLIT_IDX).map((l) => (
              <DesktopNavLink key={l.title} link={l} active={isActive(l.href)} onLight={onLight} />
            ))}
          </div>

          {/* ── Desktop: centered logo ───────────────────────────────── */}
          <Link href="/" className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <Image
              src={logoSrc}
              alt={SITE.name}
              width={130}
              height={34}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* ── Desktop: right links + CTA ───────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.slice(SPLIT_IDX).map((l) => (
              <DesktopNavLink key={l.title} link={l} active={isActive(l.href)} onLight={onLight} />
            ))}
            <Link
              href="/contact"
              className={`ml-3 inline-flex items-center gap-2 px-5 py-2 text-[13px] rounded-full transition-all duration-300 font-['NeueMontreal'] ${
                onLight
                  ? "bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a]"
                  : "bg-white/95 text-[#0a0a0a] hover:bg-[#FF6700]"
              }`}>
              Get in Touch
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6700]" />
            </Link>
          </div>

          {/* ── Mobile bar ───────────────────────────────────────────── */}
          <div className="flex md:hidden items-center justify-between w-full">
            <Link href="/">
              <Image
                src={logoSrc}
                alt={SITE.name}
                width={100}
                height={26}
                className="h-6 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-2.5">
              <a
                href={SITE.phoneHref}
                aria-label={`Call ${SITE.phone}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#FF6700] text-[#0a0a0a] active:scale-95 transition-transform"
              >
                <LuPhone className="w-4 h-4" strokeWidth={2} />
              </a>
              <button onClick={() => setOpen(!open)} className="flex flex-col gap-[5px] p-1.5" aria-label="Toggle menu">
                <motion.span animate={open ? { rotate: 45, y: 6.5 }   : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
                  className={`block w-5 h-[1.5px] origin-center ${onLight ? "bg-[#0a0a0a]" : "bg-white"}`} />
                <motion.span animate={open ? { opacity: 0 }            : { opacity: 1 }}     transition={{ duration: 0.2 }}
                  className={`block w-5 h-[1.5px] ${onLight ? "bg-[#0a0a0a]" : "bg-white"}`} />
                <motion.span animate={open ? { rotate: -45, y: -6.5 }  : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
                  className={`block w-5 h-[1.5px] origin-center ${onLight ? "bg-[#0a0a0a]" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu — a frosted-glass panel that drops out of the pill.
             Same material as the desktop navbar (translucent cream, blur,
             hairline border, soft shadow), floating over a blurred page with
             margins so it reads as glass rather than a flat cover. ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] flex items-start px-4 pt-[4.9rem] pb-4"
          >
            {/* Backdrop — dims + blurs the page so the panel floats */}
            <div
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="absolute inset-0 bg-[#0a0a0a]/25 backdrop-blur-md"
            />

            {/* The glass panel */}
            <motion.div
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={prefersReduced ? { duration: 0.2 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top center" }}
              className="relative z-10 w-full max-h-full overflow-y-auto flex flex-col rounded-[28px] border border-white/50 bg-[#fafaf7]/80 backdrop-blur-2xl shadow-[0_30px_80px_-24px_rgba(10,10,10,0.45)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Links — soft glass tiles. The current page sits in a filled
                  tile with an orange dot ("you are here"); the rest light up a
                  tile on hover/focus. */}
              <div className="p-3 sm:p-4 flex flex-col gap-1.5">
                {NAV_LINKS.map((l, i) => {
                  const active = isActive(l.href);
                  return (
                    <motion.div
                      key={l.title}
                      initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={prefersReduced ? { duration: 0 } : { delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className={`group relative flex items-center justify-between gap-4 rounded-2xl px-4 py-4 outline-none transition-colors duration-300 ${
                          active
                            ? "bg-white/70 shadow-[0_8px_24px_-14px_rgba(10,10,10,0.4)]"
                            : "hover:bg-white/55 focus-visible:bg-white/55"
                        }`}
                      >
                        <span className="flex items-center gap-3 min-w-0">
                          <span
                            aria-hidden="true"
                            className={`w-2 h-2 rounded-full bg-[#FF6700] flex-shrink-0 transition-all duration-300 ${
                              active
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
                            }`}
                          />
                          <span
                            className={`font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-none truncate transition-colors duration-300 text-[1.6rem] sm:text-[1.8rem] ${
                              active
                                ? "text-[#FF6700]"
                                : "text-[#0a0a0a] group-hover:text-[#FF6700] group-focus-visible:text-[#FF6700]"
                            }`}
                          >
                            {l.title}
                          </span>
                        </span>
                        <LuArrowUpRight
                          className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                            active
                              ? "text-[#FF6700]"
                              : "text-[#0a0a0a]/30 group-hover:text-[#FF6700] group-hover:rotate-45 group-focus-visible:text-[#FF6700] group-focus-visible:rotate-45"
                          }`}
                          strokeWidth={2}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Footer, inside the glass */}
              <motion.div
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReduced ? { duration: 0 } : { delay: 0.36, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="p-3 sm:p-4 pt-0"
              >
                <div className="border-t border-[#0a0a0a]/10 pt-4 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href={BOOKING.tour}
                      onClick={() => setOpen(false)}
                      className="group/cta inline-flex items-center justify-center gap-2 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-2xl text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300"
                    >
                      Book a Tour
                      <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:rotate-45" strokeWidth={2} />
                    </Link>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group/cta inline-flex items-center justify-center gap-2 py-3.5 bg-white/50 border border-[#0a0a0a]/15 text-[#0a0a0a]/85 rounded-2xl text-sm font-['NeueMontreal'] tracking-wide hover:border-[#FF6700] hover:bg-white/80 transition-colors duration-300"
                    >
                      WhatsApp
                      <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:rotate-45" strokeWidth={2} />
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="min-w-0 truncate font-['NeueMontreal'] text-xs sm:text-sm text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors"
                    >
                      {SITE.email}
                    </a>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {SOCIALS.map((s) => (
                        <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-['NeueMontreal'] text-xs sm:text-sm text-[#0a0a0a]/50 hover:text-[#FF6700] transition-colors"
                        >
                          {s.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Desktop nav link with active-state dot ─────────────────────────────
function DesktopNavLink({ link, active, onLight }) {
  return (
    <Link
      href={link.href}
      className={`relative px-4 py-1.5 text-[13px] transition-colors font-['NeueMontreal'] tracking-wide rounded-full ${
        active
          ? "text-[#FF6700]"
          : onLight
            ? "text-[#0a0a0a]/65 hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
            : "text-white/60 hover:text-white hover:bg-white/5"
      }`}
    >
      {link.title}
      {active && (
        <span className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-[#FF6700]" />
      )}
    </Link>
  );
}