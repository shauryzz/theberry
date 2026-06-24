"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useParallax(speed)
 * Replicates Locomotive Scroll's data-scroll-speed attribute.
 * speed > 0 → element moves faster than scroll (floats up quickly)
 * speed < 0 → element moves slower than scroll (lags behind = parallax depth)
 *
 * Returns { ref, style } — spread style onto the motion element.
 */
export function useParallax(speed = 0) {
  const ref = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffsetY(centerY * speed * -0.3);
    };

    // Use Lenis if available, else native scroll
    const lenis = window.__lenis;
    if (lenis) {
      lenis.on("scroll", handleScroll);
      handleScroll(); // initial
      return () => lenis.off("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [speed]);

  return {
    ref,
    style: {
      transform: `translateY(${offsetY}px)`,
      willChange: "transform",
    },
  };
}