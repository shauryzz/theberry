"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { whatsappLink } from "../data/booking";

/**
 * Persistent right-side floating action:
 *   - WhatsApp circle → pre-filled WhatsApp chat
 *
 * Behaviour:
 *   - Hidden during the first 200px of scroll (so the hero stays clean)
 *   - Stays visible everywhere else, on every page
 *   - Sits below the page-transition overlay (z-90 < z-200)
 *   - WhatsApp stays a circle: its glyph is universally recognised, so a
 *     label would be redundant.
 *
 * NOTE: The "Book a Free Tour" pill was removed for now — WhatsApp only.
 * To bring it back, re-add an <a href={BOOKING.tour}> pill above the
 * WhatsApp button (and re-import BOOKING + an icon like LuCalendarDays).
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
      {/* WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] md:w-[64px] md:h-[64px] rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] md:shadow-[0_14px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300"
      >
        <FaWhatsapp className="w-6 h-6 sm:w-[26px] sm:h-[26px] md:w-[32px] md:h-[32px]" />
      </a>
    </div>
  );
}
