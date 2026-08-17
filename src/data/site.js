// Brand-level constants used across the site.

export const SITE = {
  name: "The Berry Coworks",
  shortName: "The Berry",

  // Tagline: short, specific, no filler. Used in <title> tags and hero fallbacks.
  tagline: "Coworking Spaces across Delhi NCR.",

  description:
    "Work your way at The Berry Coworks, with spaces for independent professionals, teams and businesses. Choose a desk, a private space or an office that fits what you’re building.",

  // Contact
  email: "contact@theberrycoworks.com",
  emailHref: "mailto:contact@theberrycoworks.com",

  // ── ONE NUMBER, TWO CHANNELS ──────────────────────────────────────────
  // Calls and WhatsApp both use the same number.
  phone: "+91 72908 11818",
  phoneHref: "tel:+917290811818",
  whatsapp: "+91 72908 11818",
  whatsappHref: "https://wa.me/917290811818",

  // Hours (general; per-location hours live in locations.js).
  hours: "Mon to Sat, 8 AM to 8 PM.",

  // Brand
  founded: 2020,
  copyrightYear: 2026,

  addressLine: "Barakhamba, Jhandewalan, Noida",

  // ── CANONICAL URL ────────────────────────────────────────────────────
  // Read by layout.js (metadataBase, for Open Graph), sitemap.js and
  // robots.js.
  url: "https://theberrycoworks.com",
};

// Client listed only Instagram and LinkedIn.
export const SOCIALS = [
  {
    name: "Instagram",
    href: "https://instagram.com/theberrycoworks",
  },
  {
    name: "LinkedIn",
    href: "https://in.linkedin.com/company/theberrycoworks",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Founders
// ─────────────────────────────────────────────────────────────────────────

export const FOUNDERS = [
  {
    name: "Vishesh Kalkhandey",
    role: "Co-Founder",
    bio: "Vishesh co-founded The Berry Coworks with Parul in 2020. He leads strategy and locations. His background is in design.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=85&fit=crop",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Parul Jain",
    role: "Co-Founder",
    bio: "Parul co-founded The Berry Coworks with Vishesh in 2020. She runs operations and community. Her background is in design.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=85&fit=crop",
    linkedin: "https://linkedin.com",
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Beliefs
// ─────────────────────────────────────────────────────────────────────────

export const BELIEFS = [
  {
    title: "Light matters.",
    desc:
      "Every desk gets a window. We turned down two larger leases so this stayed true.",
  },
  {
    title: "Community over inventory.",
    desc:
      "We measure ourselves by who chooses to keep working here, not by how many seats we can fit. Three locations, five hundred members, almost zero churn.",
  },
  {
    title: "The small things add up.",
    desc:
      "The chair, the coffee, the acoustics, the entrance. None of these are big decisions on their own. Together they are the difference.",
  },
  {
    title: "Show up for each other.",
    desc:
      "Members refer members. Founders introduce founders. The network is the whole point, and we work to keep it real.",
  },
];