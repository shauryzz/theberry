"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * Animates a number from 0 to a target value when it scrolls into view.
 *
 * The `value` prop accepts:
 *   - "500"   → animates 0 → 500
 *   - "500+"  → animates 0 → 500, then appends "+"
 *   - "24/7"  → animates 0 → 24, then appends "/7"
 *   - "2022"  → animates 0 → 2022
 *   - "—" or "Custom" → renders as-is, no animation
 *
 * Trigger uses `amount: 0.3` (30% of element visible) instead of `margin`
 * because the margin approach was unreliable on mobile with Lenis smooth
 * scroll, leaving small targets like "3" stuck at "0".
 *
 * `onComplete` ensures the final value lands even if the last onUpdate
 * tick gets dropped.
 */
export default function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const match  = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    if (!isInView || target === null) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate:   (v) => setDisplay(`${Math.round(v)}${suffix}`),
      onComplete: ()  => setDisplay(`${target}${suffix}`),
    });
    return () => controls.stop();
  }, [isInView, target, suffix, duration]);

  return <span ref={ref}>{display}</span>;
}
