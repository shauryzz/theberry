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

// ─── Legal copy ──────────────────────────────────────────────────────────
// This is the client's supplied legal text, reproduced VERBATIM from their
// two PDFs (Privacy Policy, August 2026 · Terms of Service, August 2026).
//
// DO NOT EDIT THE WORDING. Not for tone, not for punctuation, not for the
// site's usual conventions. Legal copy is counsel-reviewed and any change
// has to come back from the client as a new document.
//
// Structural note: the hero shows `intro`, then `sections` renders below it.
// For Terms, `intro` holds the FIRST paragraph of the client's section (1)
// and the section itself holds the remaining three, so the full text still
// appears exactly once and in their order. Nothing is duplicated or dropped.
//
// A section may carry: body (string OR array of paragraphs), list (renders
// a. b. c. — matches the Privacy PDF), bullets (unordered — matches the
// Terms PDF's User Conduct dots), table (the cancellation policy), footer
// (string OR array of paragraphs — the Privacy PDF's Account and Data
// Deletion section runs paragraphs both before AND after its lettered list,
// so `footer` had to grow the same array support `body` already had).
const CONTENT = {
  privacy: {
    title:      ["Your privacy,", "respected."],
    accent:     "respected.",
    lastUpdate: "Last Updated · August 2026",
    intro:
      "URBANE ZEAL HOSPITALITY LLP, operating under the brand name THE BERRY COWORKS (\"The Berry Coworks\", \"we\", \"us\", or \"our\"), is committed to protecting and respecting your privacy. This Privacy Policy describes how we collect, use, disclose, store and otherwise process your Personal Information when you access our website or mobile application, visit our coworking spaces, submit enquiries, use our services, attend our events, or otherwise interact with us. By accessing our website, using our mobile application or using our services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection and processing of your information as described herein.",
    sections: [
      {
        title: "Introduction",
        list: [
          "\"Personal Information\" means any information that relates to an identified or identifiable individual and includes any information capable of identifying you directly or indirectly.",
          "This Privacy Policy applies to all users of our website and mobile application, members, visitors, guests, prospective customers, event attendees, vendors and any other individuals who interact with The Berry Coworks.",
          "References to \"you\" or \"your\" mean any individual whose Personal Information is collected by us.",
        ],
      },
      {
        title: "Information We Collect",
        body:
          "Depending on your relationship with us, the services you use and the features you access, we may collect the following categories of information:",
        list: [
          "Website and Mobile Application Information: This Privacy Policy also applies to your use of The Berry Coworks mobile application (\"App\"). When you use the App, we may collect information necessary to create and manage your account, provide coworking and workspace-related services, process bookings and reservations, facilitate access to our facilities, communicate with you, and maintain the security and functionality of the App. Depending on the features you use and the permissions you grant, the App may access or collect information such as your name, email address, telephone number, account and membership details, booking and transaction information, device information, IP address, and other information described in this Privacy Policy.",
          "Contact Information, including your name, email address, telephone number, mailing address and company details.",
          "Professional Information, including your company name, designation, industry and business profile.",
          "Identity Verification Information, including government-issued identification documents, photographs, address proof and other information required for visitor management, security verification or compliance purposes.",
          "Billing and Payment Information, including billing address, GST details, payment information and transaction records.",
          "Workspace Usage Information, including membership details, booking history, meeting room reservations, visitor registrations, access logs, Wi-Fi usage information and service requests.",
          "Communications Information, including emails, messages, enquiries, feedback, support requests and any information voluntarily provided by you.",
          "Device and Usage Information, including IP address, browser type, operating system, device identifiers, pages visited, referral URLs and interactions with our website or App.",
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
          "To create and manage accounts and memberships.",
          "To process and manage bookings, reservations and visitor registrations.",
          "To verify identity and maintain the security of our premises and facilities.",
          "To facilitate access to our facilities and manage workspace usage.",
          "To communicate with you regarding enquiries, bookings, memberships, invoices, account-related matters and support requests.",
          "To improve our services, facilities, website, App and customer experience.",
          "To organize events, networking opportunities and community initiatives.",
          "To send updates, newsletters, promotions and marketing communications, subject to applicable law.",
          "To detect, investigate and prevent fraud, unauthorized access, misuse and security incidents.",
          "To maintain the security, functionality and performance of our website, App, systems and services.",
          "To comply with legal, regulatory and contractual obligations.",
          "To establish, exercise or defend legal claims.",
        ],
      },
      {
        title: "Cookies and Tracking Technologies",
        body: [
          "Our website and, where applicable, our App may use cookies, analytics tools and similar technologies to enhance user experience, understand usage and improve our services.",
          "These technologies may collect information regarding your browsing or usage activity, device information and interactions with our website or App.",
          "You may choose to disable cookies through your browser settings. Certain features of the website may not function properly if cookies are disabled.",
          "Where the App uses device permissions or similar technologies, you may be able to manage or withdraw such permissions through your device settings, subject to the functionality required for particular services.",
        ],
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
          "Other third parties where disclosure is necessary to provide a service requested by you, fulfil a contractual obligation, protect our rights or property, or comply with applicable law.",
        ],
        footer:
          "All such disclosures shall be made only to the extent necessary for the purposes described in this Privacy Policy or as required by law.",
      },
      {
        title: "Marketing Communications",
        body: [
          "We may send you information regarding memberships, workspace offerings, events, promotions and community initiatives.",
          "You may opt out of receiving promotional communications at any time by using the unsubscribe mechanism included in such communications or by contacting us directly.",
          "We may continue to send service-related communications that are necessary for the administration of your membership, booking or account.",
        ],
      },
      {
        title: "Data Retention",
        body:
          "We retain Personal Information only for as long as necessary to fulfil the purposes for which it was collected, including:",
        list: [
          "Providing services and managing memberships and accounts.",
          "Maintaining business and financial records.",
          "Complying with legal and regulatory requirements.",
          "Resolving disputes and enforcing contractual obligations.",
          "Preventing fraud, misuse and unauthorized access.",
          "Maintaining records necessary for security, accounting, audit and legitimate business purposes.",
        ],
        footer:
          "Upon expiry of the applicable retention period, Personal Information may be securely deleted, anonymized or archived in accordance with applicable law.",
      },
      {
        title: "Account and Data Deletion",
        body: [
          "You may request deletion of your The Berry Coworks account and associated Personal Information at any time, subject to applicable law and any information that we are required or permitted to retain for legal, regulatory, security, fraud prevention, dispute resolution, accounting, record-keeping or other legitimate purposes.",
          "To request deletion of your account and Personal Information, you may contact us at contact@theberrycoworks.com with the subject line \"Account Deletion Request\". Please provide sufficient information for us to verify your identity and locate your account, such as the name, email address or telephone number associated with your account.",
          "For security purposes, we may request additional information or verification before processing a deletion request. We will use any information provided for verification only to the extent necessary to authenticate the request and process it securely.",
          "Once a valid deletion request has been verified and approved:",
        ],
        list: [
          "We will take reasonable steps to delete or anonymize Personal Information associated with your account that we are not required or permitted to retain.",
          "Your account may be deactivated or permanently deleted, and you may no longer be able to access account-related features, membership information, booking history or other services associated with the account.",
          "Certain information may remain in our records where retention is required or permitted by applicable law, regulation, contractual obligations, accounting requirements, security requirements, fraud prevention, dispute resolution or the establishment, exercise or defence of legal claims.",
          "Information that has been aggregated or anonymized so that it can no longer reasonably be associated with you may be retained and used for legitimate business purposes.",
          "Where your Personal Information has been shared with service providers who process information on our behalf, we may take reasonable steps to request deletion or appropriate handling of such information, subject to their legal and contractual obligations.",
          "Deletion from active systems may not result in immediate deletion from backup, archival or disaster-recovery systems. Such copies may be retained for a limited period in accordance with our security, backup and retention practices and will be deleted or overwritten in the ordinary course.",
        ],
        footer: [
          "If you have an active membership, pending booking, outstanding payment, unresolved dispute or other ongoing contractual relationship with us, certain information may need to be retained or your deletion request may be subject to the completion of the relevant process.",
          "Submitting an account deletion request does not automatically cancel any booking, membership, payment obligation or other contractual commitment unless separately confirmed by us.",
          "We will process deletion requests within a reasonable period and in accordance with applicable law. If we are unable to delete certain information, we will retain it only to the extent and for the period permitted or required by applicable law or for the legitimate purposes described in this Privacy Policy.",
        ],
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
          "Request deletion of your account and associated Personal Information in accordance with Section (9) of this Privacy Policy.",
        ],
        footer: "We may require verification of identity before acting on any such request.",
      },
      {
        title: "Third-Party Websites and Services",
        body: [
          "Our website or App may contain links to third-party websites, applications or services. This Privacy Policy does not apply to such third-party websites, applications or services. We encourage you to review their respective privacy policies before providing any Personal Information.",
          "Where we use third-party service providers to support our website, App, bookings, payments, communications or other services, such providers may process Personal Information on our behalf in accordance with their contractual obligations and applicable law.",
        ],
      },
      {
        title: "Changes to This Privacy Policy",
        body: [
          "We reserve the right to modify this Privacy Policy at any time.",
          "Any changes shall become effective upon posting the revised Privacy Policy on our website or through other appropriate means where required by applicable law.",
          "Your continued use of our website, App or services following such changes shall constitute your acceptance of the revised Privacy Policy to the extent permitted by applicable law.",
        ],
      },
      {
        title: "Contact Us",
        body: [
          "If you have any questions, requests, complaints or concerns regarding this Privacy Policy, account deletion, data deletion or our privacy practices, please contact us at:",
          "URBANE ZEAL HOSPITALITY LLP",
          "Brand: THE BERRY COWORKS",
          "Email: contact@theberrycoworks.com",
          "For account or data deletion requests, please use the subject line: \"Account Deletion Request\"",
        ],
      },
    ],
    contact: {
      heading: ["Write to ", "Us."],
      accent:  "Us.",
      body:
        "For anything related to this policy (corrections, deletion requests, or genuine questions), reach the team at the email below or via the contact page.",
      emails: ["contact@theberrycoworks.com"],
      office: null,
    },
  },

  terms: {
    title:      ["Using this", "website."],
    accent:     "website.",
    lastUpdate: "Last Updated · August 2026",
    // First paragraph of the client's section (1). The remaining three
    // paragraphs of that section follow immediately below in `sections`.
    intro:
      "These Website Terms of Service (\"Terms\") govern your access to and use of the website located at https://theberrycoworks.com/ (the \"Website\"), owned and operated by URBANE ZEAL HOSPITALITY LLP, operating under the brand name THE BERRY COWORKS (\"The Berry Coworks\", \"we\", \"us\" or \"our\").",
    sections: [
      {
        title: "Terms",
        body: [
          "By accessing or using the Website, submitting an enquiry, making a booking, applying for a membership, making a payment, or using any functionality available through the Website, you agree to be bound by these Terms and our Privacy Policy.",
          "These Terms apply solely to your use of the Website and the information, content and services made available through it. The use of our coworking spaces, memberships, private offices, dedicated desks, virtual offices, meeting rooms, event spaces and other services may also be governed by a separate Agreement. In the event of any inconsistency, the provisions of the applicable Agreement shall prevail.",
          "We reserve the right to modify, update or replace these Terms at any time by publishing the revised version on the Website. Your continued use of the Website following such updates constitutes your acceptance of the revised Terms.",
        ],
      },
      {
        title: "Content",
        body: [
          "All text, graphics, logos, trademarks, photographs, videos, illustrations, software, designs, blogs, marketing material and other content available on the Website (\"Content\") are owned by or licensed to The Berry Coworks and are protected under applicable intellectual property laws.",
          "Subject to these Terms, you may access and use the Website solely for personal, informational and lawful purposes. You may not copy, reproduce, distribute, publish, modify, transmit, create derivative works from or commercially exploit any Content without our prior written consent. We reserve the right to update, edit, modify or remove any Content at any time without prior notice.",
        ],
      },
      {
        title: "Payments & KYC",
        body: [
          "Payments made through the Website shall be processed through our authorised payment gateway. Unless otherwise stated, prices displayed through Razorpay are inclusive of applicable GST. Where prices are indicated as exclusive of taxes, applicable taxes shall be charged in addition to the displayed price.",
          "Refunds, where applicable, shall be processed in accordance with the Cancellation Policy set out below.",
          "Completion of our Know Your Customer (KYC) verification process is mandatory before activation of any service. We reserve the right to withhold, suspend or cancel any booking, membership or service until the required KYC documentation has been successfully completed and verified.",
        ],
      },
      {
        title: "Cancellation Policy",
        // Rendered as stacked rows rather than a real <table>: a two-column
        // table with this much text per cell is unreadable on a phone.
        table: {
          headings: ["Service", "Policy"],
          rows: [
            ["Day Pass",       "Free cancellation up to 24 hours before the scheduled booking. No refund thereafter. One reschedule may be permitted, subject to availability."],
            ["Meeting Room",   "Free cancellation up to 24 hours before the scheduled booking. No refund thereafter. Rescheduling is permitted, subject to availability."],
            ["Event Space",    "Cancellation more than 7 days before the scheduled event is eligible for a full refund. Cancellations within 7 days are non-refundable. Rescheduling may be permitted at our discretion."],
            ["Dedicated Desk", "Cancellation, refunds and termination shall be governed by the applicable Service Agreement."],
            ["Private Office", "Cancellation, refunds and termination shall be governed by the applicable Service Agreement."],
            ["Virtual Office", "Refunds are available only before completion of KYC verification and activation of the service. Once activated, fees are non-refundable."],
          ],
        },
      },
      {
        title: "User Conduct",
        body:
          "Users of the Website and our services agree to use them responsibly and in compliance with applicable laws. You shall not:",
        bullets: [
          "Engage in any illegal or unlawful activity.",
          "Harass, threaten or intimidate any person.",
          "Damage or misuse our property or facilities.",
          "Misuse internet or network services provided by us.",
          "Conduct unauthorised commercial or business activities.",
          "Smoke in areas where smoking is prohibited.",
          "Bring hazardous, dangerous or prohibited materials onto the premises.",
          "Disrupt or interfere with other members, guests or staff.",
        ],
        footer:
          "The Berry Coworks reserves the right to refuse, suspend or terminate access to the Website, premises or services if these Terms are violated or where such action is reasonably necessary for the safety, security or proper operation of our business.",
      },
      {
        title: "Disclaimer & Limitation of Liability",
        body: [
          "The Website and all Content are provided on an \"as is\" and \"as available\" basis.",
          "While we make reasonable efforts to ensure that the information available on the Website is accurate and up to date, we do not warrant that the Website will always be uninterrupted, error-free, secure or free from inaccuracies.",
          "To the fullest extent permitted under applicable law, The Berry Coworks disclaims all express and implied warranties, including warranties of merchantability, fitness for a particular purpose and non-infringement.",
          "The Berry Coworks shall not be liable for any indirect, incidental, consequential, special or punitive damages arising out of or relating to the use of the Website, any interruption of services, or products or services provided by third parties, including payment service providers.",
          "Nothing contained in these Terms excludes or limits liability where such exclusion is prohibited by applicable law.",
          "These Terms shall be governed by and construed in accordance with the laws of India.",
          "If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
          "These Terms constitute the entire agreement between you and The Berry Coworks regarding your use of the Website and supersede all prior communications relating to the Website.",
          "Our failure to enforce any provision of these Terms shall not constitute a waiver of our rights.",
        ],
      },
    ],
    contact: {
      heading: ["Write to ", "Us."],
      accent:  "Us.",
      body:
        "If you have any questions, requests, complaints or feedback regarding these Terms or the Website, you may contact us at:",
      emails: ["contact@theberrycoworks.com", "marketing@theberrycoworks.com"],
      office: {
        label:   "Regd. Office",
        entity:  "URBANE ZEAL HOSPITALITY LLP",
        address: "Building No./Flat No. 15, Vinpar Softech Pvt Ltd, Sector 142, Noida, Gautam Buddha Nagar, Uttar Pradesh 201305 India",
      },
    },
  },
};

// ─── Component ───────────────────────────────────────────────────────────
export default function LegalContent({ kind }) {
  const data = CONTENT[kind];
  if (!data) return null;

  // Contact block differs per document: Privacy names one address, Terms
  // names two plus a registered office. Read from the data, never hardcoded.
  const c = data.contact;

  return (
    <main className="relative w-full bg-[#fafaf7] text-[#0a0a0a] overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="relative px-5 sm:px-10 md:px-20 pt-32 sm:pt-40 md:pt-48 pb-14 sm:pb-20 md:pb-24 border-b border-[#0a0a0a]/10">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-6xl">
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

                {/* body accepts a string or an array of paragraphs. The Terms
                    sections run several paragraphs each; Privacy runs one —
                    except where the source PDF itself breaks a section into
                    multiple paragraphs (Cookies, Marketing, Account & Data
                    Deletion, Third-Party, Changes), which now use the array
                    form too so the paragraph breaks match the client's PDF. */}
                {s.body && (
                  Array.isArray(s.body) ? (
                    <div className="space-y-4 pl-0 sm:pl-8">
                      {s.body.map((p, k) => (
                        <p key={k} className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed pl-0 sm:pl-8">
                      {s.body}
                    </p>
                  )
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

                {/* Unordered, for the Terms document's dotted lists. Kept
                    separate from `list` because the client's two PDFs use
                    different markers and neither should be normalised. */}
                {s.bullets && (
                  <ul className="mt-4 space-y-3 pl-0 sm:pl-8">
                    {s.bullets.map((item, j) => (
                      <li key={j} className="flex gap-3 font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-[#FF6700] flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Cancellation policy. Stacked rows, not a <table>: the
                    policy text is long and a real two-column table forces
                    horizontal scroll on a phone. Reads as a definition list,
                    which is what it actually is. */}
                {s.table && (
                  <div className="mt-5 pl-0 sm:pl-8">
                    <div className="hidden sm:grid grid-cols-[minmax(140px,1fr)_3fr] gap-6 pb-3 border-b border-[#0a0a0a]/15">
                      {s.table.headings.map((h) => (
                        <p key={h} className="font-['Founders_Grotesk'] text-xs uppercase tracking-[0.25em] text-[#0a0a0a]/40">
                          {h}
                        </p>
                      ))}
                    </div>
                    <dl className="divide-y divide-[#0a0a0a]/10">
                      {s.table.rows.map(([service, policy]) => (
                        <div key={service} className="grid grid-cols-1 sm:grid-cols-[minmax(140px,1fr)_3fr] gap-1.5 sm:gap-6 py-4 sm:py-5">
                          <dt className="font-['Founders_Grotesk'] font-bold text-base md:text-lg text-[#0a0a0a] leading-snug">
                            {service}
                          </dt>
                          <dd className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed m-0">
                            {policy}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* footer accepts a string or an array of paragraphs — the
                    Privacy PDF's "Account and Data Deletion" section (9) is
                    the reason for the array form: it runs three more
                    paragraphs AFTER its lettered list, which a single-string
                    footer couldn't hold without either dropping line breaks
                    or truncating content. */}
                {s.footer && (
                  Array.isArray(s.footer) ? (
                    <div className="mt-4 space-y-4 pl-0 sm:pl-8">
                      {s.footer.map((p, k) => (
                        <p key={k} className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/70 leading-relaxed pl-0 sm:pl-8">
                      {s.footer}
                    </p>
                  )
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
          <h2 className='font-["Founders_Grotesk"] font-bold uppercase text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] tracking-tighter leading-[0.95] text-[#0a0a0a] overflow-hidden pb-[0.05em] mb-6'>
            <motion.span variants={lineUp} className="block">
              {c.heading[0]}<span className="text-[#FF6700]">{c.heading[1]}</span>
            </motion.span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="font-['NeueMontreal'] text-base md:text-lg text-[#0a0a0a]/65 leading-relaxed mb-8"
          >
            {c.body}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 sm:gap-4">
            {c.emails.map((email) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#0a0a0a] text-[#fafaf7] rounded-full text-sm font-['NeueMontreal'] tracking-wide hover:bg-[#FF6700] hover:text-[#0a0a0a] transition-colors duration-300"
              >
                {email}
                <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
              </a>
            ))}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-[#0a0a0a]/25 rounded-full text-sm text-[#0a0a0a]/85 font-['NeueMontreal'] tracking-wide hover:bg-[#0a0a0a] hover:text-[#fafaf7] transition-all duration-300"
            >
              Contact page
              <LuArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </motion.div>

          {/* Registered office. Terms only — the client's document carries it,
              the Privacy document does not, so it renders only where supplied. */}
          {c.office && (
            <motion.div variants={fadeUp} className="mt-10 pt-8 border-t border-[#0a0a0a]/15 max-w-[46ch]">
              <p className="font-['Founders_Grotesk'] text-xs uppercase tracking-[0.25em] text-[#0a0a0a]/40 mb-3">
                {c.office.label}
              </p>
              <p className="font-['NeueMontreal'] text-base text-[#0a0a0a]/85 leading-relaxed">
                {c.office.entity}
              </p>
              <p className="mt-1 font-['NeueMontreal'] text-base text-[#0a0a0a]/60 leading-relaxed">
                {c.office.address}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </main>
  );
}