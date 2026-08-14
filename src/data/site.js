// Brand-level constants used across the site.

export const SITE = {
  name: "The Berry Coworks",
  shortName: "The Berry",
  // Tagline: short, specific, no filler. Used in <title> tags and hero fallbacks.
  tagline: "A workspace worth showing up to.",
  description:
    "Coworking spaces in Barakhamba, Jhandewalan, and Noida. Ready-to-move-in cabins, flexible seats, meeting rooms, and managed offices across Delhi NCR.",

  // Contact — confirmed from brand deck (June 2026)
  email:        "contact@theberrycoworks.com",        // Confirmed by client (Oct 2026)
  emailHref:    "mailto:contact@theberrycoworks.com",

  // ── ONE NUMBER, TWO CHANNELS (client change, Aug 2026 → replaced) ──────
  // Calls and WhatsApp both land on +91 87962 20683.
  //
  // This REPLACES +91 11 4000 2726 outright — that number (011-40002726
  // locally) is fully retired, not forwarded, not left as a fallback. It
  // should not appear anywhere else in the codebase; if a search turns it
  // up in a component that doesn't read from SITE.phone/whatsappHref
  // (footer, schema.org JSON-LD, a page-specific WhatsApp link), that spot
  // needs the same swap by hand.
  //
  // This is a 10-digit mobile number, not an 011-prefixed Delhi landline,
  // so there's no separate local/international display form the way the
  // old number had — "+91 87962 20683" is used as-is for both display
  // strings.
  //
  // phoneHref / whatsappHref stay in unbroken +91 form (no spaces) so they
  // dial/open correctly from a phone that is not roaming on an Indian
  // network.
  phone:        "+91 87962 20683",
  phoneHref:    "tel:+918796220683",
  whatsapp:     "+91 87962 20683",
  whatsappHref: "https://wa.me/918796220683",

  // Hours (general; per-location hours live in locations.js).
  // Standardised to 8 AM to match locations.js. Update this one value if the
  // client confirms different operating hours.
  hours:        "Mon to Sat, 8 AM to 8 PM.",

  // Brand
  founded: 2020,
  copyrightYear: 2026,

  addressLine: "Barakhamba, Jhandewalan, Noida",

  // ── CANONICAL URL ──────────────────────────────────────────────────────
  // Read by layout.js (metadataBase, for Open Graph), sitemap.js and
  // robots.js. Lives here so the domain is stated ONCE — the same value in
  // three files is how the WhatsApp number nearly shipped half-updated.
  // No trailing slash: Next appends paths to it.
  url: "https://theberrycoworks.com",
};

// Client listed only Instagram and LinkedIn (Oct 2026). Facebook and Twitter
// were removed rather than hidden, so nothing links to a dormant profile.
// Re-add here if those accounts become active; the footer and mobile menu
// both read from this array, so no component changes are needed.
export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/theberrycoworks" },
  { name: "LinkedIn",  href: "https://in.linkedin.com/company/theberrycoworks" },
];

// ──────────────────────────────────────────────────────────────────────────
// Founders — names confirmed from brand deck.
// Photos are still placeholders; swap when client supplies real headshots.
// Bios rewritten to be shorter and less abstract. Same voice, less filler.
// ──────────────────────────────────────────────────────────────────────────
export const FOUNDERS = [
  {
    name: "Vishesh Kalkhandey",
    role: "Co-Founder",
    bio: "Vishesh co-founded The Berry Coworks with Parul in 2020. He leads strategy and locations. His background is in design.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=85&fit=crop",   // PLACEHOLDER
    linkedin: "https://linkedin.com",                                                          // PLACEHOLDER
  },
  {
    name: "Parul Jain",
    role: "Co-Founder",
    bio: "Parul co-founded The Berry Coworks with Vishesh in 2020. She runs operations and community. Her background is in design.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&fit=crop", // PLACEHOLDER
    linkedin: "https://linkedin.com",                                                          // PLACEHOLDER
  },
];

// Long-form belief statements used on About page.
// Trimmed heavily. Every line now says one specific thing instead of one
// abstract thing dressed up in punchier punctuation.
export const BELIEFS = [
  {
    title: "Light matters.",
    desc:  "Every desk gets a window. We turned down two larger leases so this stayed true.",
  },
  {
    title: "Community over inventory.",
    desc:  "We measure ourselves by who chooses to keep working here, not by how many seats we can fit. Three locations, five hundred members, almost zero churn.",
  },
  {
    title: "The small things add up.",
    desc:  "The chair, the coffee, the acoustics, the entrance. None of these are big decisions on their own. Together they are the difference.",
  },
  {
    title: "Show up for each other.",
    desc:  "Members refer members. Founders introduce founders. The network is the whole point, and we work to keep it real.",
  },
];