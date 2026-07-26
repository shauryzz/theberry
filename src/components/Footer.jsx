import Link from "next/link";
import Image from "next/image";
import { FaApple, FaGooglePlay } from "react-icons/fa6";
import { SITE, SOCIALS } from "../data/site";
import { FOOTER_LINKS } from "../data/nav";
import { LOCATIONS } from "../data/locations";
import { BOOKING, whatsappLink } from "../data/booking";

// Location names: append the area only when it does not already repeat the
// label. Barakhamba Road / Jhandewalan Extension would read as a stutter, so
// those stay short, while Noida picks up "Sector 142" as the client asked.
const locs = LOCATIONS.map((l) => ({
  name:
    l.area && !l.area.toLowerCase().includes(l.label.toLowerCase())
      ? `${l.label}, ${l.area}`
      : l.label,
  href: `/locations/${l.id}`,
}));

/* Column heading. Uses the italic display face rather than the old tracked
   caps, matching the tag convention now used across the site. */
function ColHeading({ children }) {
  return (
    <p className="font-['Founders_Grotesk'] italic text-sm md:text-base text-[#0a0a0a]/45 mb-4 md:mb-5">
      {children}
    </p>
  );
}

/* Footer link with an underline that wipes in from the left on hover. */
function FooterLink({ href, children, external = false }) {
  const cls =
    "group/l relative inline-block w-fit max-w-full break-words font-['NeueMontreal'] text-sm md:text-[15px] text-[#0a0a0a]/70 hover:text-[#0a0a0a] transition-colors duration-300";
  const inner = (
    <>
      {children}
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#0a0a0a] transition-all duration-300 group-hover/l:w-full" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full bg-[#fafaf7] text-[#0a0a0a] px-5 sm:px-10 md:px-20 pt-16 sm:pt-24 md:pt-28 pb-8 sm:pb-12 overflow-hidden z-20"
    >
      <div className="w-full border-t border-[#0a0a0a]/12 mb-10 sm:mb-14" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* ── Brand: logo, belief, app buttons ── */}
        <div className="lg:col-span-4 flex flex-col">
          <Link href="/" className="w-fit">
            <Image
              src="/images/final_logo_berry.png"
              alt={SITE.name}
              width={170}
              height={44}
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          <p className="mt-6 font-['Founders_Grotesk'] italic text-2xl md:text-3xl leading-snug text-[#0a0a0a]/75 max-w-[22ch]">
            {SITE.belief}
          </p>

          <div className="mt-8 sm:mt-10">
            <ColHeading>Get the app</ColHeading>
            <div className="flex gap-3 flex-wrap">
              <a
                href={BOOKING.appStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#0a0a0a] text-[#fafaf7] rounded-xl hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaApple className="w-5 h-5" />
                <span className="text-left leading-tight">
                  <span className="block text-[9px] opacity-75 leading-none">Download on the</span>
                  <span className="block text-xs font-bold leading-tight mt-0.5">App Store</span>
                </span>
              </a>
              <a
                href={BOOKING.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-[#0a0a0a] text-[#fafaf7] rounded-xl hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaGooglePlay className="w-5 h-5" />
                <span className="text-left leading-tight">
                  <span className="block text-[9px] opacity-75 leading-none">GET IT ON</span>
                  <span className="block text-xs font-bold leading-tight mt-0.5">Google Play</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Link columns ── */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          <div className="flex flex-col">
            <ColHeading>Explore</ColHeading>
            <div className="flex flex-col gap-2.5">
              {FOOTER_LINKS.map((l) => (
                <FooterLink key={l.title} href={l.href}>{l.title}</FooterLink>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <ColHeading>Locations</ColHeading>
            <div className="flex flex-col gap-2.5">
              {locs.map((l) => (
                <FooterLink key={l.href} href={l.href}>{l.name}</FooterLink>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <ColHeading>Get in touch</ColHeading>
            <div className="flex flex-col gap-2.5">
              <FooterLink href={SITE.emailHref} external>{SITE.email}</FooterLink>
              {/* This number is the WhatsApp line, so it opens a pre-filled
                  chat rather than dialling. Same helper the floating button
                  uses, so both stay in sync from one place. */}
              <FooterLink href={whatsappLink()} external>
                {SITE.whatsapp}
                <span className="ml-2 font-['Founders_Grotesk'] italic text-[#0a0a0a]/40">WhatsApp</span>
              </FooterLink>
              <FooterLink href={SITE.phoneHref} external>{SITE.phone}</FooterLink>
            </div>
          </div>

          <div className="flex flex-col">
            <ColHeading>Follow us</ColHeading>
            <div className="flex flex-col gap-2.5">
              {SOCIALS.map((s) => (
                <FooterLink key={s.name} href={s.href} external>{s.name}</FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-[#0a0a0a]/12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-['NeueMontreal']">
        <p className="text-[11px] text-[#0a0a0a]/40">
          © {SITE.copyrightYear} {SITE.name}. All rights reserved.
        </p>
        <Link
          href="/legal/privacy"
          className="text-[11px] text-[#0a0a0a]/50 hover:text-[#FF6700] transition-colors duration-300"
        >
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
