"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
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

  const hasDarkHero = pathname === "/" || /^\/locations\/[^/]+$/.test(pathname);
  const onLight = open || (hasDarkHero ? scrolled : true);

  // Logo file is the brand mark with its own colors (dark text + orange dot).
  // It's designed to work on both light and dark backgrounds — no filter needed.
  const logoSrc = "/images/final_logo_berry.webp";

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
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-3 inline-flex items-center gap-2 px-5 py-2 text-[13px] rounded-full transition-all duration-300 font-['NeueMontreal'] ${
                onLight
                  ? "bg-[#0a0a0a] text-[#fafaf7] hover:bg-[#FF6700] hover:text-[#0a0a0a]"
                  : "bg-white/95 text-[#0a0a0a] hover:bg-[#FF6700]"
              }`}>
              Book a Tour
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6700]" />
            </a>
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
            <button onClick={() => setOpen(!open)} className="flex flex-col gap-[5px] p-1.5" aria-label="Toggle menu">
              <motion.span animate={open ? { rotate: 45, y: 6.5 }   : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
                className={`block w-5 h-[1.5px] origin-center ${onLight ? "bg-[#0a0a0a]" : "bg-white"}`} />
              <motion.span animate={open ? { opacity: 0 }            : { opacity: 1 }}     transition={{ duration: 0.2 }}
                className={`block w-5 h-[1.5px] ${onLight ? "bg-[#0a0a0a]" : "bg-white"}`} />
              <motion.span animate={open ? { rotate: -45, y: -6.5 }  : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }}
                className={`block w-5 h-[1.5px] origin-center ${onLight ? "bg-[#0a0a0a]" : "bg-white"}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile menu overlay ────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mob"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
            exit={{ opacity: 0, y: "-100%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[99] bg-[#fafaf7] flex flex-col overflow-y-auto"
          >
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#0a0a0a 1px,transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />

            <div className="h-20 flex-shrink-0" />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
              className="relative px-6 mt-2 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-[#FF6700]" />
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#FF6700] font-['NeueMontreal']">
                Navigate
              </p>
            </motion.div>

            <nav className="relative flex-1 px-6 mt-6 sm:mt-8 flex flex-col justify-center">
              {NAV_LINKS.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <motion.div
                    key={l.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{
                      opacity: 1, y: 0,
                      transition: { delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 sm:gap-5 py-3.5 sm:py-4 border-b border-[#0a0a0a]/10"
                    >
                      <span className={`font-['Founders_Grotesk'] text-[11px] tracking-[0.3em] transition-colors flex-shrink-0 ${
                        active ? "text-[#FF6700]" : "text-[#0a0a0a]/35 group-hover:text-[#FF6700]"
                      }`}>
                        0{i + 1}
                      </span>
                      <span
                        className={`flex-1 font-['Founders_Grotesk'] font-bold uppercase tracking-tight leading-[1] transition-colors ${
                          active ? "text-[#FF6700]" : "text-[#0a0a0a] group-hover:text-[#FF6700]"
                        }`}
                        style={{ fontSize: "clamp(1.875rem, 8.5vw, 3rem)" }}
                      >
                        {l.title}
                      </span>
                      <LuArrowUpRight
                        className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ${
                          active
                            ? "text-[#FF6700]"
                            : "text-[#0a0a0a]/30 group-hover:text-[#FF6700] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        }`}
                        strokeWidth={1.75}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.5 } }}
              className="relative px-6 pb-7 pt-6 border-t border-[#0a0a0a]/10 flex flex-col gap-5"
            >
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={BOOKING.tour}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 py-3.5 bg-[#FF6700] text-[#0a0a0a] rounded-full text-sm font-['NeueMontreal'] tracking-wide"
                >
                  Book a Tour
                  <LuArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 py-3.5 border border-[#0a0a0a]/25 text-[#0a0a0a]/85 rounded-full text-sm font-['NeueMontreal'] tracking-wide"
                >
                  WhatsApp
                  <LuArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                </a>
              </div>

              <a
                href={`mailto:${SITE.email}`}
                className="text-xs sm:text-sm font-['NeueMontreal'] text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors tracking-wide"
              >
                {SITE.email}
              </a>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.25em] uppercase text-[#0a0a0a]/45 hover:text-[#FF6700] transition-colors font-['NeueMontreal']"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
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
