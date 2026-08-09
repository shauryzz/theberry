import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ──────────────────────────────────────────────────────────────────────────
// 404. Next ships a default, but it is an unstyled white page with no navbar
// and no way back — and this page IS reachable: LocationDetail calls
// notFound() for any /locations/<id> that is not a real location.
//
// Server component on purpose (no "use client"). It renders Navbar and Footer,
// both of which are client components themselves, so a visitor who lands here
// still gets the full nav rather than a dead end.
//
// No animation variants here: the page must paint instantly even if something
// upstream failed, so nothing is gated behind framer-motion.
// ──────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "Page Not Found · The Berry Coworks",
};

export default function NotFound() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden flex flex-col">
      <Navbar />

      <section className="flex-1 flex items-center px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          <p className="font-['Founders_Grotesk'] font-bold text-[#FF6700] text-6xl sm:text-7xl md:text-8xl leading-none tracking-tighter mb-6">
            404
          </p>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.5vw] pb-[0.05em]'>
            This page isn&apos;t <span className="text-[#FF6700]">here.</span>
          </h1>

          <p className="mt-6 sm:mt-8 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed max-w-[52ch]">
            The link may be old, or the address mistyped. Everything else is
            still where you left it.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Back to home
            </Link>
            <Link
              href="/locations"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              See our locations
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
