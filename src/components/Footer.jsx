import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { SITE, SOCIALS } from "../data/site";
import { LOCATIONS } from "../data/locations";
import { BOOKING } from "../data/booking";

// Each location now deep-links to its own /locations/[id] detail page
// instead of the old #locations anchor that only worked on the homepage.
const locs = LOCATIONS.map((l) => ({ name: l.label, href: `/locations/${l.id}` }));

export default function Footer() {
  return (
    <footer
      id="contact"
      className='relative w-full bg-[#fafaf7] text-[#0a0a0a] px-5 sm:px-10 md:px-20 pt-14 sm:pt-20 pb-8 sm:pb-10 font-["Founders_Grotesk"] overflow-hidden z-20'
    >
      <div className="w-full border-t border-[#0a0a0a]/12 mb-10 sm:mb-14 md:mb-16" />

      <div className="flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-8">
        {/* LEFT — Big headline */}
        <div className="w-full md:w-1/2">
          <h2 className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] font-bold uppercase leading-none tracking-tighter -ml-1">
            LET&apos;S
          </h2>
          <h2 className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] font-bold uppercase leading-none tracking-tighter -ml-1">
            CONNECT
          </h2>
          <h2 className="text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw] font-bold uppercase leading-none tracking-tighter -ml-1 text-[#FF6700]">
            WITH US.
          </h2>

          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-3 mt-8 sm:mt-10 px-6 sm:px-7 py-3 sm:py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/75 hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300 font-['NeueMontreal'] tracking-wide"
          >
            Send us a message →
          </a>
        </div>

        {/* RIGHT — Nav columns + app downloads */}
        <div className="w-full md:w-1/2 flex flex-col justify-between gap-10 sm:gap-12 md:gap-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 font-['NeueMontreal']">
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 mb-2">Follow</p>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-[#0a0a0a]/60 hover:text-[#0a0a0a] text-sm font-light transition-colors group w-fit"
                >
                  {s.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0a0a0a] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 mb-2">Locations</p>
              {locs.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="relative text-[#0a0a0a]/60 hover:text-[#0a0a0a] text-sm font-light transition-colors group w-fit"
                >
                  {l.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0a0a0a] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 mb-2">Contact</p>
              <a
                href={`mailto:${SITE.email}`}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] text-sm font-light transition-colors break-all"
              >
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="text-[#0a0a0a]/60 hover:text-[#0a0a0a] text-sm font-light transition-colors"
              >
                {SITE.phone}
              </a>
            </div>
          </div>

          {/* App downloads row */}
          <div className="mt-2 sm:mt-4 pt-8 border-t border-[#0a0a0a]/10 font-['NeueMontreal']">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0a0a]/40 mb-4">
              Get the App
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href={BOOKING.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#0a0a0a] text-[#fafaf7] rounded-xl hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaApple className="w-5 h-5" />
                <div className="text-left leading-tight">
                  <p className="text-[9px] opacity-75 leading-none">Download on the</p>
                  <p className="text-xs font-bold leading-tight mt-0.5">App Store</p>
                </div>
              </a>
              <a
                href={BOOKING.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#0a0a0a] text-[#fafaf7] rounded-xl hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaGooglePlay className="w-5 h-5" />
                <div className="text-left leading-tight">
                  <p className="text-[9px] opacity-75 leading-none">GET IT ON</p>
                  <p className="text-xs font-bold leading-tight mt-0.5">Google Play</p>
                </div>
              </a>
            </div>

            <p className="font-['NeueMontreal'] text-xs text-[#0a0a0a]/40 leading-relaxed max-w-[34ch] mt-8">
              A space where ambitious people build things that matter. Come work with us.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-[#0a0a0a]/12 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 font-['NeueMontreal']">
        <p className="text-[11px] text-[#0a0a0a]/40">
          © {SITE.copyrightYear} {SITE.name}. All rights reserved.
        </p>
        <p className="text-[11px] text-[#0a0a0a]/30">
          {LOCATIONS.map((l) => l.label).join(" · ")}
        </p>
      </div>
    </footer>
  );
}
