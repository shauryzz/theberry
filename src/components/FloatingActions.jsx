"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { BOOKING, whatsappLink } from "../data/booking";

/**
 * Persistent right-side floating actions:
 *   - "Book a Tour" pill  → DeskOS tour booking (new tab)
 *   - WhatsApp circle     → pre-filled WhatsApp chat
 *
 * Behaviour:
 *   - Hidden during the first 200px of scroll (so the hero stays clean)
 *   - Stays visible everywhere else, on every page
 *   - Sits below the page-transition overlay (z-90 < z-200)
 *   - Mobile: stacked icons (label hidden on Book a Tour)
 *   - Desktop: pill with label + icon
 */
export default function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();

    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) {
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed z-[90] bottom-5 right-4 sm:bottom-6 sm:right-6 flex flex-col items-end gap-3 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {/* Book a Tour */}
      <a
        href={BOOKING.tour}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a tour"
        className="group flex items-center gap-2 h-12 sm:h-[52px] px-4 sm:px-5 rounded-full bg-[#FF6700] text-[#0a0a0a] font-['NeueMontreal'] text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(255,103,0,0.35)] hover:bg-[#0a0a0a] hover:text-[#FF6700] transition-colors duration-300 whitespace-nowrap"
      >
        <LuCalendarDays
          className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
          strokeWidth={2}
        />
        <span className="hidden sm:inline">Book a Tour</span>
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:scale-105 transition-transform duration-300"
      >
        <FaWhatsapp className="w-6 h-6 sm:w-[26px] sm:h-[26px]" />
      </a>
    </div>
  );
}
