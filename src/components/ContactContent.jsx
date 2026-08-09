"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LuArrowUpRight,
  LuMail,
  LuPhone,
  LuCopy,
  LuClock,
  LuCheck,
  LuLoader,
} from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";
import { SITE } from "../data/site";
import { LOCATIONS } from "../data/locations";
import { whatsappLink } from "../data/booking";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// ONE heading scale, identical to Solutions / For Enterprises. No eyebrows.
const HEADING_CLS =
  "font-['Founders_Grotesk'] font-bold uppercase tracking-tighter leading-[0.95] text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[4.6vw] overflow-hidden pb-[0.05em]";

// Hero image band (PLACEHOLDER). Swap for a real Berry photo when supplied.
const HERO_IMAGE =
  "/images/contact-hero.webp";

// Interests aligned to the products that actually route here as enquiries.
// Removed "Flexible Seat" (no longer a product) and renamed "Private Cabin" to
// "Private Office" per the client ruling that they are one product. Managed
// Office is valid again now that the For Enterprises page exists.
const INTERESTS = [
  "Private Office",
  "Dedicated Desk",
  "Managed Office",
  "Virtual Office",
  "Events",
  "Just exploring",
];

/* Single-line section heading, last word orange, dark option. */
function Heading({ lead, accent, dark = false }) {
  return (
    <h2 className={`${HEADING_CLS} ${dark ? "text-[#fafaf7]" : "text-[#0a0a0a]"}`}>
      <motion.span variants={lineUp} className="block">
        {lead} <span className="text-[#FF6700]">{accent}</span>
      </motion.span>
    </h2>
  );
}

/* Pill CTA with the orange sweep from below, the site's standard button. */
function SweepCTA({ children, href, external = false, dark = false }) {
  const cls = `group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border px-6 py-3 transition-colors duration-300 ${
    dark ? "border-[#fafaf7]/25 hover:border-[#FF6700]" : "border-[#0a0a0a]/20 hover:border-[#FF6700]"
  }`;
  const inner = (
    <>
      <span aria-hidden="true" className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <span className={`relative font-['NeueMontreal'] text-[11px] sm:text-xs tracking-[0.18em] uppercase ${dark ? "text-[#fafaf7] group-hover/cta:text-[#0a0a0a]" : "text-[#0a0a0a]"}`}>
        {children}
      </span>
      <LuArrowUpRight className={`relative w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:rotate-45 ${dark ? "text-[#fafaf7] group-hover/cta:text-[#0a0a0a]" : "text-[#0a0a0a]"}`} />
    </>
  );
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
    : <Link href={href} className={cls}>{inner}</Link>;
}

export default function ContactContent() {
  const locationOptions = ["Any", ...LOCATIONS.map((l) => l.label)];

  const [form, setForm] = useState({
    name: "", email: "", phone: "", interest: "", location: "", message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.email.trim()) next.email = "We'll need your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "That doesn't look like a valid email.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // TODO: replace this stub with a real /api/contact POST.
    // eslint-disable-next-line no-console
    console.log("[contact submission]", form);
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  return (
    <>
      {/* ── HERO - clean cream, same open as Solutions / For Enterprises ── */}
      <section className="px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-5xl">
          <Heading lead="Let's" accent="talk." />
          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 font-['NeueMontreal'] text-base sm:text-lg md:text-xl text-[#0a0a0a]/65 leading-relaxed max-w-[58ch]"
          >
            For tours and standard bookings, the app handles it in a minute. For managed offices, partnerships, press, or anything that needs a human, use the form below. We reply within 24 hours, every day except Sunday.
          </motion.p>
        </motion.div>
      </section>

      {/* Full-bleed image band, same treatment as the Solutions / For
          Enterprises heroes: wide and shallow, a scale-in on entry, sitting
          below the copy so text is never set over the photo. PLACEHOLDER
          image; swap for a real Berry photo when supplied. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[34vh] sm:h-[42vh] md:h-[52vh] min-h-[260px] max-h-[560px] overflow-hidden bg-[#0a0a0a]/5"
      >
        <motion.img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover object-[center_80%]"
        />
      </motion.div>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────────── */}
      <section id="contact-form" className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ─── LEFT: FORM ─── */}
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
              <motion.div variants={fadeUp} className="mb-10 sm:mb-14">
                <Heading lead="Tell us what you're" accent="after." />
              </motion.div>

              {/* Plain <form>, not motion.form - a re-mounted motion child would
                  stay stuck "hidden" after the parent's once:true fired. */}
              {status === "success" ? (
                <SuccessState onReset={() => { setForm({ name: "", email: "", phone: "", interest: "", location: "", message: "" }); setStatus("idle"); }} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-8" noValidate>
                  <Field
                    label="Name" required error={errors.name}
                    input={
                      <input
                        type="text" value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
                    <Field
                      label="Email" required error={errors.email}
                      input={
                        <input
                          type="email" value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors"
                          placeholder="you@company.com"
                        />
                      }
                    />
                    <Field
                      label="Phone" helper="Optional"
                      input={
                        <input
                          type="tel" value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      }
                    />
                  </div>

                  <PillField label="I'm interested in" options={INTERESTS} value={form.interest} onChange={(v) => updateField("interest", v)} />
                  <PillField label="Preferred location" options={locationOptions} value={form.location} onChange={(v) => updateField("location", v)} />

                  <Field
                    label="Message" helper="Optional, but the more we know the better we can help"
                    input={
                      <textarea
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        rows={5}
                        className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors resize-none"
                        placeholder="Team size, timeline, anything else worth knowing…"
                      />
                    }
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <><LuLoader className="w-4 h-4 animate-spin" strokeWidth={2} /> Sending…</>
                      ) : (
                        <>Send message <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2} /></>
                      )}
                    </button>
                    <p className="mt-4 text-xs text-[#0a0a0a]/40 font-['NeueMontreal']">
                      By sending, you agree to our{" "}
                      <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-[#0a0a0a]">privacy policy</Link>.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* ─── RIGHT: DIRECT CONTACT + HOURS ─── */}
          <aside className="lg:col-span-5 lg:pl-8 lg:border-l border-[#0a0a0a]/10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="space-y-10 sm:space-y-12">

              <motion.div variants={fadeUp}>
                <p className="font-['Founders_Grotesk'] text-lg text-[#0a0a0a]/45 mb-5">Reach us directly</p>
                <div className="space-y-3">
                  <ContactRow icon={LuMail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
                  <ContactPhoneRow />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="font-['Founders_Grotesk'] text-lg text-[#0a0a0a]/45 mb-5">Hours</p>
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#0a0a0a]/10 bg-white">
                  <div className="w-11 h-11 rounded-xl bg-[#0a0a0a]/[0.04] flex items-center justify-center flex-shrink-0">
                    <LuClock className="w-[18px] h-[18px] text-[#0a0a0a]/50" strokeWidth={2} />
                  </div>
                  <div className="font-['NeueMontreal'] text-sm sm:text-base leading-relaxed">
                    <p className="font-medium text-[#0a0a0a]">{SITE.hours}</p>
                    <p className="text-[#0a0a0a]/45 text-xs mt-1.5">Closed on Sundays for the team to reset.</p>
                  </div>
                </div>
              </motion.div>

              {/* Dark card - the sidebar's contrast pop, an alternative path.
                  Tours are handled through this form, not a booking app, so
                  this points at the things that ARE self-serve: day passes and
                  meeting rooms, booked over on the Solutions page. */}
              <motion.div variants={fadeUp} className="relative overflow-hidden p-6 sm:p-7 rounded-2xl bg-[#0a0a0a] text-[#fafaf7] shadow-[0_24px_60px_-28px_rgba(10,10,10,0.5)]">
                {/* Dot pattern. Client note (Aug 2026): reduce the transparency,
                    it looks out of place. At 0.16 the grid read as a washed-out
                    artifact rather than a designed texture, so it is now more
                    solid, not fainter. Original geometry kept (1.5px dots on a
                    24px grid) because finer, sparser dots undercut the same
                    thing the opacity lift is fixing.
                    TUNE THIS ONE VALUE: 0.24 is quieter, 0.38 is bolder. */}
                <div aria-hidden="true" className="absolute inset-0 opacity-[0.30] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fafaf7 1.5px,transparent 1.5px)", backgroundSize: "24px 24px" }} />
                <div className="relative">
                  <p className="font-['Founders_Grotesk'] text-base text-[#FF6700] mb-3">Skip the form</p>
                  <h3 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-xl sm:text-2xl leading-tight mb-3 text-[#fafaf7]">
                    Just need a desk or a room?
                  </h3>
                  <p className="font-['NeueMontreal'] text-[#fafaf7]/55 text-sm leading-relaxed mb-6">
                    Day passes and meeting rooms are self-serve. No enquiry, no waiting on us.
                  </p>
                  <SweepCTA href="/solutions" dark>See your options</SweepCTA>
                </div>
              </motion.div>

            </motion.div>
          </aside>
        </div>
      </section>

      {/* ── OR COME VISIT - lean address cards (no live map iframes) ────── */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-28 border-t border-[#0a0a0a]/10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-12 sm:mb-16 max-w-3xl">
            <Heading lead="Or come" accent="visit." />
            <motion.p variants={fadeUp} className="mt-6 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/60 leading-relaxed max-w-[56ch]">
              Three addresses across Delhi NCR, no appointment needed. Open a space to see the full tour, hours, and directions.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} loc={loc} />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CLOSING CTA - centered, matching Solutions / About ─────────── */}
      <section className="relative px-5 sm:px-10 md:px-20 py-20 sm:py-28 md:py-32 overflow-hidden border-t border-[#0a0a0a]/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#0a0a0a 1px,transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative max-w-4xl mx-auto text-center">
          <Heading lead="The best decisions are made" accent="in person." />

          <motion.p variants={fadeUp} className="mt-8 sm:mt-10 font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/60 leading-relaxed max-w-[44ch] mx-auto">
            {SITE.hours}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <SweepCTA href="/locations">See our spaces</SweepCTA>
            <SweepCTA href={whatsappLink()} external>WhatsApp us</SweepCTA>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function LocationCard({ loc }) {
  return (
    <Link
      href={`/locations/${loc.id}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#0a0a0a]/10 hover:border-[#FF6700]/40 hover:shadow-[0_28px_60px_-30px_rgba(10,10,10,0.28)] transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img decoding="async"
          src={loc.img}
          alt={`The Berry Coworks, ${loc.label}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#fafaf7] font-['Founders_Grotesk'] text-xs text-[#0a0a0a] shadow-[0_6px_18px_-8px_rgba(10,10,10,0.5)]">
          {loc.area}
        </span>
        {/* orange rule sweeps in along the image base on hover */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-[#FF6700] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="font-['Founders_Grotesk'] font-bold uppercase tracking-tight text-2xl sm:text-3xl text-[#0a0a0a]">
          {loc.label}
        </h3>
        <p className="mt-3 font-['NeueMontreal'] text-sm text-[#0a0a0a]/60 leading-relaxed">
          {loc.address.line1}, {loc.address.line2}
        </p>
        <div className="flex-1" />
        <span className="mt-6 inline-flex items-center gap-1.5 font-['NeueMontreal'] text-sm text-[#0a0a0a] group-hover:text-[#FF6700] transition-colors">
          <span className="underline underline-offset-4">See the space</span>
          <LuArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

function Field({ label, helper, required, error, input }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2.5">
        <label className="font-['Founders_Grotesk'] text-sm sm:text-base text-[#0a0a0a]/55">
          {label}
          {required && <span className="not-italic text-[#FF6700] ml-1">*</span>}
        </label>
        {helper && <span className="font-['NeueMontreal'] text-[11px] text-[#0a0a0a]/35">{helper}</span>}
      </div>
      {input}
      {error && <p className="mt-2 font-['NeueMontreal'] text-xs text-[#CC5200]">{error}</p>}
    </div>
  );
}

function PillField({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block font-['Founders_Grotesk'] text-sm sm:text-base text-[#0a0a0a]/55 mb-3.5">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(active ? "" : opt)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-['NeueMontreal'] tracking-wide border transition-all duration-200 ${
                active
                  ? "bg-[#0a0a0a] text-[#fafaf7] border-[#0a0a0a]"
                  : "bg-transparent text-[#0a0a0a]/70 border-[#0a0a0a]/20 hover:border-[#0a0a0a]/50 hover:text-[#0a0a0a]"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative flex items-center gap-4 p-4 rounded-2xl border border-[#0a0a0a]/10 bg-white overflow-hidden hover:border-[#FF6700]/45 hover:shadow-[0_18px_40px_-24px_rgba(10,10,10,0.22)] transition-all duration-400"
    >
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-[#FF6700] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <div className="w-11 h-11 rounded-xl bg-[#0a0a0a]/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6700]/12 transition-colors duration-300">
        <Icon className="w-[18px] h-[18px] text-[#0a0a0a]/55 group-hover:text-[#FF6700] transition-colors duration-300" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-['Founders_Grotesk'] text-sm text-[#0a0a0a]/45">{label}</p>
        <p className="font-['NeueMontreal'] text-[#0a0a0a] text-sm sm:text-[15px] font-medium truncate">{value}</p>
      </div>
      <LuArrowUpRight className="w-4 h-4 text-[#0a0a0a]/30 group-hover:text-[#FF6700] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" strokeWidth={2.5} />
    </a>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Calling and WhatsApp both land on the same number (IVR on the call side,
   MSG91 on the message side), so it is stated ONCE and the two channels
   become actions on it. Listing it twice under separate labels read as a
   mistake to anyone glancing at the column.

   This cannot reuse ContactRow: that makes the whole card a single <a>, and
   this card holds three targets. Nested anchors are invalid HTML, so the
   container is a plain <div> and each action carries its own link.

   The copy button is here for desktop, where tel: does nothing useful and
   the visitor is reading the number in order to type it into a phone. It
   copies SITE.phone (the spaced display form) rather than the raw digits,
   because that is what a person expects to see land in their clipboard.
   ────────────────────────────────────────────────────────────────────────── */
function ContactPhoneRow() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.phone);
    } catch {
      return;   // Clipboard blocked (insecure origin / permission). Fail quietly.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="group relative flex flex-wrap items-center gap-x-4 gap-y-3 p-4 rounded-2xl border border-[#0a0a0a]/10 bg-white overflow-hidden hover:border-[#FF6700]/45 hover:shadow-[0_18px_40px_-24px_rgba(10,10,10,0.22)] transition-all duration-400">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-[#FF6700] scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />

      <div className="w-11 h-11 rounded-xl bg-[#0a0a0a]/[0.04] flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6700]/12 transition-colors duration-300">
        <LuPhone className="w-[18px] h-[18px] text-[#0a0a0a]/55 group-hover:text-[#FF6700] transition-colors duration-300" strokeWidth={2} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-['Founders_Grotesk'] text-sm text-[#0a0a0a]/45">Call or WhatsApp</p>
        <a
          href={SITE.phoneHref}
          className="inline-block font-['NeueMontreal'] text-[#0a0a0a] text-sm sm:text-[15px] font-medium hover:text-[#FF6700] transition-colors duration-300"
        >
          {SITE.phone}
        </a>
      </div>

      <div className="flex items-center gap-2 ml-auto flex-shrink-0">
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Number copied" : "Copy number"}
          className="w-9 h-9 rounded-full border border-[#0a0a0a]/12 flex items-center justify-center text-[#0a0a0a]/45 hover:text-[#FF6700] hover:border-[#FF6700]/45 transition-colors duration-300"
        >
          {copied
            ? <LuCheck className="w-4 h-4" strokeWidth={2.5} />
            : <LuCopy  className="w-4 h-4" strokeWidth={2} />}
        </button>

        {/* Sweep pill, per the site CTA pattern. Scoped group/cta so it does
            not fire on the card's own group hover. Label text stays ink on
            both cream and orange, so no colour swap is needed mid-sweep. */}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#0a0a0a]/15 px-4 py-2 text-[#0a0a0a] hover:border-[#FF6700] transition-colors duration-300"
        >
          <span aria-hidden="true" className="absolute inset-0 bg-[#FF6700] translate-y-full group-hover/cta:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          <FaWhatsapp className="relative w-4 h-4" />
          <span className="relative font-['NeueMontreal'] text-[13px] font-medium whitespace-nowrap">WhatsApp</span>
        </a>
      </div>

      <span aria-live="polite" className="sr-only">{copied ? "Number copied to clipboard" : ""}</span>
    </div>
  );
}

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden p-8 sm:p-10 rounded-2xl border border-[#0a0a0a]/10 bg-white"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[#FF6700]" />
      <div className="w-12 h-12 rounded-full bg-[#FF6700] flex items-center justify-center mb-6">
        <LuCheck className="w-6 h-6 text-[#0a0a0a]" strokeWidth={2.5} />
      </div>
      <h3 className="font-['Founders_Grotesk'] font-bold uppercase text-3xl sm:text-4xl leading-[0.95] tracking-tight mb-4">
        Got it. Thank you.
      </h3>
      <p className="font-['NeueMontreal'] text-[#0a0a0a]/70 text-base sm:text-lg leading-relaxed mb-6 max-w-[44ch]">
        Your message landed safely. Someone from the team will be in touch within 24 hours.
      </p>
      <button
        onClick={onReset}
        className="text-sm font-['NeueMontreal'] text-[#0a0a0a]/60 hover:text-[#0a0a0a] underline underline-offset-4 transition-colors"
      >
        Send another message
      </button>
    </motion.div>
  );
}
