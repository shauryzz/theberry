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
            onAnimationComplete={(def) => {
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
              className="flex flex-col items-center gap-3"
            >
              <p className='font-["Founders_Grotesk"] text-white text-3xl md:text-4xl font-bold tracking-tight uppercase'>
                The Berry<span className="text-[#FF6700]">.</span>
              </p>
              <p className="font-['NeueMontreal'] text-white/40 text-[10px] uppercase tracking-[0.4em]">
                Loading
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}