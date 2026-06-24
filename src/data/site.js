// Brand-level constants used across the site.

export const SITE = {
  name: "The Berry Coworks",
  shortName: "The Berry",
  tagline: "Premium Workspaces in Delhi NCR",
  description:
    "Premium coworking spaces in Connaught Place, Jhandewalan & Noida. Natural light, ergonomic design, and a community built for ambitious people.",

  // Contact — confirmed from brand deck (June 2026)
  email:        "hello@theberrycoworks.com",          // PLACEHOLDER — confirm with client
  emailHref:    "mailto:hello@theberrycoworks.com",   // PLACEHOLDER — confirm with client
  phone:        "+91 81784 49718",
  phoneHref:    "tel:+918178449718",
  whatsapp:     "+91 72908 11818",
  whatsappHref: "https://wa.me/917290811818",

  // Hours (general — see locations.js for per-location hours).
  // Standardised to 8 AM to match locations.js + amenities.js. The brand deck
  // does not state operating hours; update this one value if the client confirms otherwise.
  hours:        "Mon–Sat · 8 AM – 9 PM · 24/7 for members",

  // Brand
  founded: 2020,
  copyrightYear: 2026,

  belief: "Together we strive for better.",

  addressLine: "Connaught Place · Jhandewalan · Noida",
};

export const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/theberrycoworks" },
  { name: "LinkedIn",  href: "https://in.linkedin.com/company/theberrycoworks" },
  { name: "Facebook",  href: "https://m.facebook.com/theberrycoworks/" },
  { name: "Twitter",   href: "https://twitter.com/theberrycoworks" },
];

// ──────────────────────────────────────────────────────────────────────────
// Founders — names confirmed from brand deck.
// Photos are still placeholders; swap when client supplies real headshots.
// ──────────────────────────────────────────────────────────────────────────
export const FOUNDERS = [
  {
    name: "Vishesh Kalkhandey",
    role: "Co-Founder",
    bio: "Vishesh co-founded The Berry Coworks alongside Parul in 2020. A designer by training, he leads strategy, locations, and the long-term shape of the business — turning the original belief that great design shouldn't be a luxury into a network across Delhi NCR.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=85&fit=crop",   // PLACEHOLDER
    linkedin: "https://linkedin.com",                                                          // PLACEHOLDER
  },
  {
    name: "Parul Jain",
    role: "Co-Founder",
    bio: "Parul co-founded The Berry Coworks alongside Vishesh in 2020. A designer by training, she runs operations, community, and the daily experience of every member — the small details that separate a workspace people tolerate from one they actually want to be in.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&fit=crop", // PLACEHOLDER
    linkedin: "https://linkedin.com",                                                          // PLACEHOLDER
  },
];

// Long-form belief statements used on About page
export const BELIEFS = [
  {
    title: "Light matters.",
    desc:  "Every desk gets natural light. Not because it's pretty — because the work is better. We turned down two larger leases for this reason alone.",
  },
  {
    title: "Community over inventory.",
    desc:  "We measure ourselves by who chooses to keep working here, not by how many seats we can fit. Three locations, five hundred members, almost zero churn.",
  },
  {
    title: "Premium isn't loud.",
    desc:  "The best spaces feel quiet. Considered. Like someone thought about the small things — the chair, the lighting, the coffee, the silence — because we did.",
  },
  {
    title: "Show up for each other.",
    desc:  "Members refer members. Founders meet founders. The network behind the desk is the whole point, and we work every day to keep it real.",
  },
];
