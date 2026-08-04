"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Page transition — the loading overlay (black screen + Berry logo + loading
 * bar) has been disabled per request. This now just renders the page directly,
 * and still resets scroll to the top on route change (with Lenis if present),
 * which the overlay used to handle.
 */
export default function Transition({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
