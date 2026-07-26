"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Transition({ children }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("idle");

  // When pathname changes, run the overlay sequence
  useEffect(() => {
     setTransitionStage("covering");
     // Scroll to top of new page silently while overlay is covering
     const lenis = window.__lenis;
     if (lenis) {
       setTimeout(() => lenis.scrollTo(0, { immediate: true }), 700);
     } else {
       setTimeout(() => window.scrollTo(0, 0), 700);
     }
   }, [pathname]);

  return (
    <>
      {/* The page content */}
      <div key={pathname}>{displayChildren}</div>

      {/* Overlay */}
      <AnimatePresence mode="wait">
        {transitionStage === "covering" && (
          <motion.div
            key="overlay"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              // When the slide-up finishes (y = "0%"), swap children and trigger exit
              if (transitionStage === "covering") {
                setDisplayChildren(children);
                // Brief pause so the swap isn't visible, then exit
                setTimeout(() => setTransitionStage("idle"), 100);
              }
            }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
          >
            {/* Brand mark while transitioning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Real white Berry logo (white wordmark + orange dot) — shows on black. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/the%20berry.webp"
                alt="The Berry"
                className="h-14 sm:h-16 md:h-20 w-auto"
              />

              {/* Indeterminate orange loading line — keeps the brand accent on screen */}
              <div className="relative h-[3px] w-40 sm:w-48 md:w-56 overflow-hidden rounded-full bg-white/15">
                <motion.span
                  className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[#FF6700]"
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}