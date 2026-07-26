"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";

// ─── Animation variants ──────────────────────────────────────────────────
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const lineUp  = {
  hidden: { y: "105%" },
  show:   { y: "0%", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp  = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Placeholder copy ────────────────────────────────────────────────────
// IMPORTANT: This is generic boilerplate, not real legal text. Replace with
// counsel-reviewed copy before the site goes live. Both files share the
// same structural pattern (eyebrow → hero → numbered sections → contact).
const CONTENT = {
  privacy: {
    eyebrow:    "Privacy Policy",
    title:      ["Your privacy,", "respected."],
    accent:     "respected.",
    lastUpdate: "Last Updated · July 2026",
    intro:
      "URBANE ZEAL HOSPITALITY LLP, operating under the brand name THE BERRY COWORKS (\"The Berry Coworks\", \"we\", \"us\", or \"our\"), is committed to protecting and respecting your privacy. This Privacy Policy describes how we collect, use, disclose, store and otherwise process your Personal Information when you access our website, visit our coworking spaces, submit enquiries, use our services, attend our events, or otherwise interact with us. By accessing our website or using our services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and processing of your information as described herein.",
    sections: [
      {
        title: "Introduction",
        list: [
          "\"Personal Information\" means any information that relates to an identified or identifiable individual and includes any information capable of identifying you directly or indirectly.",
          "This Privacy Policy applies to all users of our website, members, visitors, guests, prospective customers, event attendees, vendors and any other individuals who interact with The Berry Coworks.",
          "References to \"you\" or \"your\" mean any individual whose Personal Information is collected by us.",
        ],
      },
      {
        title: "Information We Collect",
        body:
          "Depending on your relationship with us and the services you use, we may collect the following categories of information:",
        list: [
          "Contact Information, including your name, email address, telephone number, mailing address and company details.",
          "Professional Information, including your company name, designation, industry and business profile.",
          "Identity Verification Information, including government-issued identification documents, photographs, address proof and other information required for visitor management, security verification or compliance purposes.",
          "Billing and Payment Information, including billing address, GST details, payment information and transaction records.",
          "Workspace Usage Information, including membership details, booking history, meeting room reservations, visitor registrations, access logs, Wi-Fi usage information and service requests.",
          "Communications Information, including emails, messages, enquiries, feedback, support requests and any information voluntarily provided by you.",
          "Device and Usage Information, including IP address, browser type, operating system, device identifiers, pages visited, referral URLs and interactions with our website.",
          "Location Information, where permitted by your device settings or required to provide location-based services.",
          "CCTV and Security Information collected through surveillance systems installed at our facilities for safety, security and operational purposes.",
        ],
      },
      {
        title: "Information Collected From Third Parties",
        body: "We may receive Personal Information about you from:",
        list: [
          "Your employer, company or organization.",
          "Referral partners, brokers and business partners.",
          "Event organizers and community partners.",
          "Service providers assisting us in operating our business.",
          "Publicly available sources where permitted by applicable law.",
        ],
      },
      {
        title: "How We Use Your Information",
        body:
          "We may collect, use and process your Personal Information for the following purposes:",
        list: [
          "To provide coworking, office space, meeting room and related services.",
          "To manage memberships, bookings and visitor registrations.",
          "To verify identity and maintain the security of our premises.",
          "To communicate with you regarding enquiries, bookings, memberships, invoices and support requests.",
          "To improve our services, facilities, website and customer experience.",
          "To organize events, networking opportunities and community initiatives.",
          "To send updates, newsletters, promotions and marketing communications, subject to applicable law.",
          "To detect, investigate and prevent fraud, unauthorized access and misuse of our services.",
          "To comply with legal, regulatory and contractual obligations.",
          "To establish, exercise or defend legal claims.",
        ],
      },
      {
        title: "Cookies and Tracking Technologies",
        body:
          "Our website may use cookies, analytics tools and similar technologies to enhance user experience, understand website usage and improve our services. These technologies may collect information regarding your browsing activity, device information and interactions with our website. You may choose to disable cookies through your browser settings. Certain features of the website may not function properly if cookies are disabled.",
      },
      {
        title: "Sharing of Personal Information",
        body:
          "We do not sell your Personal Information. We may disclose your Personal Information to:",
        list: [
          "Service providers engaged to support our operations.",
          "Payment processors, technology providers and cloud service providers.",
          "Professional advisors including lawyers, auditors, consultants and accountants.",
          "Building owners, property managers or facility operators where necessary for operational or security purposes.",
          "Government authorities, regulatory agencies, law enforcement authorities or courts where required by applicable law.",
          "Any entity involved in a merger, acquisition, restructuring, financing, transfer of assets or similar corporate transaction.",
        ],
        footer:
          "All such disclosures shall be made only to the extent necessary for the purposes described in this Privacy Policy or as required by law.",
      },
      {
        title: "Marketing Communications",
        body:
          "We may send you information regarding memberships, workspace offerings, events, promotions and community initiatives. You may opt out of receiving promotional communications at any time by using the unsubscribe mechanism included in such communications or by contacting us directly. We may continue to send service-related communications that are necessary for the administration of your membership, booking or account.",
      },
      {
        title: "Data Retention",
        body:
          "We retain Personal Information only for as long as necessary to fulfil the purposes for which it was collected, including:",
        list: [
          "Providing services and managing memberships.",
          "Maintaining business and financial records.",
          "Complying with legal and regulatory requirements.",
          "Resolving disputes and enforcing contractual obligations.",
        ],
        footer:
          "Upon expiry of the applicable retention period, Personal Information may be securely deleted, anonymized or archived in accordance with applicable law.",
      },
      {
        title: "Information Security",
        body:
          "We implement reasonable technical, administrative and organizational measures designed to protect Personal Information against unauthorized access, disclosure, alteration, misuse or destruction. While we strive to protect your information, no method of transmission over the internet or method of electronic storage can be guaranteed to be completely secure. Accordingly, we cannot guarantee absolute security.",
      },
      {
        title: "Your Rights",
        body: "Subject to applicable law, you may have the right to:",
        list: [
          "Access Personal Information held about you.",
          "Request correction or updating of inaccurate information.",
          "Request deletion of Personal Information where legally permissible.",
          "Withdraw consent where processing is based on consent.",
          "Object to certain forms of processing.",
          "Request information regarding the manner in which your Personal Information is being processed.",
        ],
        footer: "We may require verification of identity before acting on any such request.",
      },
      {
        title: "Third-Party Websites",
        body:
          "Our website may contain links to third-party websites or services. This Privacy Policy does not apply to such third-party websites. We encourage you to review their respective privacy policies before providing any Personal Information.",
      },
      {
        title: "Changes to This Privacy Policy",
        body:
          "We reserve the right to modify this Privacy Policy at any time. Any changes shall become effective upon posting the revised Privacy Policy on our website. Your continued use of our services following such changes shall constitute your acceptance of the revised Privacy Policy.",
      },
      {
        title: "Contact Us",
        body:
          "If you have any questions, requests, complaints or concerns regarding this Privacy Policy or our privacy practices, please contact us at contact@theberrycoworks.com.",
      },
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────
export default function LegalContent({ kind }) {
  const data = CONTENT[kind];
  if (!data) return null;

  // The privacy policy names a dedicated contact address.
  const contactEmail = "contact@theberrycoworks.com";

  return (
    <main className="relative w-full bg-[#fafaf7] text-[#0a0a0a] overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-20 md:pb-24 border-b border-[#0a0a0a]/10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-6xl">
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              {data.eyebrow}
            </p>
          </motion.div>

          <h1 className='font-["Founders_Grotesk"] font-bold uppercase tracking-tighter leading-[0.95] text-[#0a0a0a] text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] max-w-[22ch]'>
            {data.title.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineUp} className="block">
                  {line === data.accent || line.endsWith(data.accent) ? (
                    <>
                      {line.replace(data.accent, "")}
                      <span className="text-[#FF6700]">{data.accent}</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div variants={fadeUp} className="mt-8 sm:mt-10 flex flex-col gap-4 max-w-[60ch]">
            <p className="font-['NeueMontreal'] text-base sm:text-lg text-[#0a0a0a]/65 leading-relaxed">
              {data.intro}
            </p>
            <p className="font-['NeueMontreal'] text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]/40">
              {data.lastUpdate}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── SECTIONS ─── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-[80ch]"
        >
          <div className="grid grid-cols-1 gap-10 sm:gap-12 md:gap-14">
            {data.sections.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="border-t border-[#0a0a0a]/15 pt-6 sm:pt-8"
              >
                <div className="flex items-baseline gap-4 mb-3 sm:mb-4">
                  <span className="font-['Founders_Grotesk'] text-xs tracking-[0.3em] text-[#FF6700] flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className='font-["Founders_Grotesk"] font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight text-[#0a0a0a]'>
                    {s.title}
                  </h2>
                </div>

                {s.body && (
                  <p className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed pl-0 sm:pl-8">
                    {s.body}
                  </p>
                )}

                {s.list && (
                  <ol className="mt-4 space-y-3 pl-0 sm:pl-8">
                    {s.list.map((item, j) => (
                      <li key={j} className="flex gap-3 font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed">
                        <span className="text-[#FF6700] font-['Founders_Grotesk'] text-sm flex-shrink-0 pt-0.5 w-5">
                          {String.fromCharCode(97 + j)}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {s.footer && (
                  <p className="mt-4 font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed pl-0 sm:pl-8">
                    {s.footer}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CONTACT BLOCK ─── */}
      <section className="px-5 sm:px-10 md:px-20 py-14 sm:py-20 md:py-28 border-b border-[#0a0a0a]/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#FF6700]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#FF6700] font-['NeueMontreal']">
              Questions?
            </p>
          </motion.div>

          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] mb-6'>
            <motion.span variants={lineUp} className="block">Write to <span className="text-[#FF6700]">Us.</span></motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed mb-8"
          >
            For anything related to this policy (corrections, deletion requests, or genuine questions), reach the team at the email below or via the contact page.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
            >
              {contactEmail}
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              Contact page
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
