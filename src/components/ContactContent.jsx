"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuArrowUpRight,
  LuMail,
  LuPhone,
  LuMessageCircle,
  LuClock,
  LuMapPin,
  LuCheck,
  LuLoader,
} from "react-icons/lu";
import { SITE } from "../data/site";
import { LOCATIONS, getMapsUrl } from "../data/locations";
import { BOOKING, whatsappLink } from "../data/booking";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp  = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp  = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const INTERESTS = [
  "Hot Desk",
  "Dedicated Desk",
  "Private Cabin",
  "Custom Suite",
  "Just exploring",
];

export default function ContactContent() {
  const locationOptions = ["Any", ...LOCATIONS.map((l) => l.label)];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    location: "",
    message: "",
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

    // TODO (Batch 6): Replace this stub with a real /api/contact POST to Resend.
    // For now: simulate latency, log payload, show success state.
    // eslint-disable-next-line no-console
    console.log("[contact submission]", form);
    await new Promise((r) => setTimeout(r, 1200));

    setStatus("success");
  };

  return (
    <main className="relative w-full bg-[#fafaf7] text-[#0a0a0a] overflow-hidden">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-12 sm:pb-16 md:pb-20 px-5 sm:px-10 md:px-20">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Contact
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase leading-[0.9] tracking-tighter text-[13vw] sm:text-[10vw] md:text-[8vw] lg:text-[6.5vw]'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Let&apos;s</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block text-[#FF6700]">talk.</motion.span>
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-[#0a0a0a]/65 text-base sm:text-lg leading-relaxed mt-8 sm:mt-10 max-w-[58ch]"
          >
            For tours and standard bookings, the app handles it in a minute. For custom suites, partnerships, press, or anything that needs a human — use the form below. We reply within 24 hours, every day except Sunday.
          </motion.p>
        </motion.div>
      </section>

      {/* ═══════════════════════ FORM + SIDEBAR ═══════════════════════ */}
      <section className="px-5 sm:px-10 md:px-20 pb-20 sm:pb-28 md:pb-32 border-b border-[#0a0a0a]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* ─── LEFT: FORM ─── */}
          <div className="lg:col-span-7">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-['NeueMontreal'] mb-3">
                Drop us a line
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-['Founders_Grotesk'] font-bold uppercase text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight mb-10 sm:mb-14">
                Tell us what you&apos;re after.
              </motion.h2>

              {/* Note: form is a plain <form>, NOT motion.form.
                  The parent motion.div above handles section entry animation.
                  Using motion.form here previously broke "Send another message"
                  reset because the parent's whileInView={once:true} had already
                  fired, so a re-mounted child stayed stuck in "hidden" state. */}
              {status === "success" ? (
                <SuccessState onReset={() => { setForm({ name: "", email: "", phone: "", interest: "", location: "", message: "" }); setStatus("idle"); }} />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7 sm:space-y-8" noValidate>

                  <Field
                    label="Name"
                    required
                    error={errors.name}
                    input={
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors"
                        placeholder="Your full name"
                      />
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
                    <Field
                      label="Email"
                      required
                      error={errors.email}
                      input={
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors"
                          placeholder="you@company.com"
                        />
                      }
                    />
                    <Field
                      label="Phone"
                      helper="Optional"
                      input={
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="w-full bg-transparent border-b border-[#0a0a0a]/20 focus:border-[#FF6700] py-3 text-base sm:text-lg font-['NeueMontreal'] text-[#0a0a0a] placeholder:text-[#0a0a0a]/30 outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      }
                    />
                  </div>

                  <PillField
                    label="I'm interested in"
                    options={INTERESTS}
                    value={form.interest}
                    onChange={(v) => updateField("interest", v)}
                  />

                  <PillField
                    label="Preferred location"
                    options={locationOptions}
                    value={form.location}
                    onChange={(v) => updateField("location", v)}
                  />

                  <Field
                    label="Message"
                    helper="Optional, but the more we know the better we can help"
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

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <LuLoader className="w-4 h-4 animate-spin" strokeWidth={2} />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                        </>
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
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="space-y-10 sm:space-y-12"
            >
              <motion.div variants={fadeUp}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-['NeueMontreal'] mb-5">
                  Reach Us Directly
                </p>
                <div className="space-y-1">
                  <ContactLink icon={LuMail}          label="Email"    value={SITE.email}    href={`mailto:${SITE.email}`} />
                  <ContactLink icon={LuPhone}         label="Call"     value={SITE.phone}    href={SITE.phoneHref} />
                  <ContactLink icon={LuMessageCircle} label="WhatsApp" value={SITE.whatsapp} href={whatsappLink()} external />
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-['NeueMontreal'] mb-5">
                  Hours
                </p>
                <div className="flex items-start gap-3 font-['NeueMontreal'] text-[#0a0a0a]/75 text-sm sm:text-base leading-relaxed">
                  <LuClock className="w-4 h-4 text-[#FF6700] mt-1 flex-shrink-0" strokeWidth={2} />
                  <div>
                    <p>{SITE.hours}</p>
                    <p className="text-[#0a0a0a]/45 text-xs mt-1.5">Closed on Sundays for the team to reset.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="p-6 sm:p-7 rounded-2xl border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.02]">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#FF6700] font-['NeueMontreal'] mb-3">
                  Want to Skip the Form?
                </p>
                <h3 className="font-['Founders_Grotesk'] font-bold text-xl sm:text-2xl leading-tight mb-3">
                  Book a Tour in 60 Seconds.
                </h3>
                <p className="font-['NeueMontreal'] text-[#0a0a0a]/60 text-sm leading-relaxed mb-5">
                  Pick a location, pick a time. We&apos;ll have coffee ready.
                </p>
                <a
                  href={BOOKING.tour}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-['NeueMontreal'] text-[#0a0a0a] hover:text-[#FF6700] transition-colors"
                >
                  <span className="underline underline-offset-4">Open the booking app</span>
                  <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                </a>
              </motion.div>
            </motion.div>
          </aside>
        </div>
      </section>

      {/* ═══════════════════════ LOCATIONS STRIP ═══════════════════════ */}
      <section className="px-5 sm:px-10 md:px-20 py-16 sm:py-24 md:py-32 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Or Come Visit
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter max-w-[20ch] mb-12 sm:mb-16'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">Three doors.</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">All open.</motion.span>
            </span>
          </h2>

          <motion.div
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {LOCATIONS.map((loc) => {
              const mapsUrl = getMapsUrl(loc);
              return (
                <motion.div
                  key={loc.id}
                  variants={fadeUp}
                  className="group flex flex-col p-6 sm:p-7 rounded-2xl border border-[#0a0a0a]/10 bg-[#0a0a0a]/[0.02] hover:border-[#FF6700]/40 hover:bg-[#0a0a0a]/[0.04] transition-colors duration-300"
                >
                  <div className="flex items-start gap-2 mb-4">
                    <LuMapPin className="w-4 h-4 text-[#FF6700] mt-1 flex-shrink-0" strokeWidth={2} />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-['NeueMontreal']">
                        {loc.tag || "Workspace"}
                      </p>
                      <h3 className="mt-1 font-['Founders_Grotesk'] font-bold text-2xl leading-tight break-words">
                        {loc.label}
                      </h3>
                    </div>
                  </div>

                  <p className="font-['NeueMontreal'] text-[#0a0a0a]/65 text-sm leading-relaxed flex-1">
                    {typeof loc.address === "string" ? loc.address : loc.address?.full}
                  </p>

                  <div className="mt-6 pt-5 border-t border-[#0a0a0a]/10 flex flex-col gap-3 font-['NeueMontreal'] text-sm">
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 text-[#0a0a0a] hover:text-[#FF6700] transition-colors"
                      >
                        <span className="underline underline-offset-4">Open in Google Maps</span>
                        <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" strokeWidth={2} />
                      </a>
                    )}
                    <Link
                      href={`/locations/${loc.id}`}
                      className="group/link inline-flex items-center gap-1.5 text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors"
                    >
                      <span className="underline underline-offset-4">See the space</span>
                      <LuArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" strokeWidth={2} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════ CLOSING CTA ═══════════════════════ */}
      <section className="relative px-5 sm:px-10 md:px-20 py-20 sm:py-28 md:py-36 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#0a0a0a 1px,transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Open for Visits
            </p>
            <span className="w-10 h-px bg-[#FF6700]" />
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] leading-[0.95] tracking-tighter max-w-[20ch] mx-auto'>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">The best decisions</motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.05em]">
              <motion.span variants={lineUp} className="block">are made <span className="text-[#FF6700]">in person.</span></motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 sm:mt-10 font-['NeueMontreal'] text-[#0a0a0a]/55 text-sm sm:text-base leading-relaxed max-w-[44ch] mx-auto"
          >
            {SITE.hours}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href={BOOKING.tour}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
            >
              Book your visit
              <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 border border-[#0a0a0a]/25 text-[#0a0a0a]/85 rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] hover:border-[#0a0a0a] transition-all duration-300"
            >
              WhatsApp Us
              <LuArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
            </a>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Field({ label, helper, required, error, input }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/55 font-['NeueMontreal']">
          {label}
          {required && <span className="text-[#FF6700] ml-1">*</span>}
        </label>
        {helper && (
          <span className="text-[10px] text-[#0a0a0a]/35 font-['NeueMontreal']">
            {helper}
          </span>
        )}
      </div>
      {input}
      {error && (
        <p className="mt-2 text-xs text-[#CC5200] font-['NeueMontreal']">
          {error}
        </p>
      )}
    </div>
  );
}

function PillField({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/55 font-['NeueMontreal'] mb-3.5">
        {label}
      </label>
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

function ContactLink({ icon: Icon, label, value, href, external }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center justify-between gap-4 py-3 border-b border-[#0a0a0a]/10 last:border-b-0 hover:border-[#FF6700]/40 transition-colors"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-9 h-9 rounded-full bg-[#0a0a0a]/[0.04] border border-[#0a0a0a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#FF6700] group-hover:border-[#FF6700] transition-colors">
          <Icon className="w-4 h-4 text-[#0a0a0a]/75 group-hover:text-[#0a0a0a]" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40 font-['NeueMontreal']">
            {label}
          </p>
          <p className="font-['NeueMontreal'] text-[#0a0a0a] text-sm sm:text-base truncate">
            {value}
          </p>
        </div>
      </div>
      <LuArrowUpRight className="w-4 h-4 text-[#0a0a0a]/30 group-hover:text-[#FF6700] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" strokeWidth={2} />
    </a>
  );
}

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 sm:p-10 rounded-2xl border border-[#FF6700]/30 bg-[#FF6700]/[0.06]"
    >
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
