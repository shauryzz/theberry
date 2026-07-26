// ──────────────────────────────────────────────────────────────────────────
// SOLUTIONS — content for the combined Solutions page (Workspaces + Solutions).
//
// Page order follows the client's document:
//   hero → intro → office spaces → coworking spaces → additional solutions
//   → (transparent-pricing break) → every space includes → closing
//
// Priced products (Private Office, Dedicated Desk) live in data/plans.js.
// This file holds the non-priced offerings and the supporting copy.
//
// ⚠️ ANYTHING DESKOS SELLS CARRIES NO PRICING HERE. ON PURPOSE.
//
// DeskOS is the single source of truth for the products it books:
//   • Meeting rooms (hourly and bundles)
//   • Day passes
//   • Flexi-seat / multi-visit bundles (10 / 15 / 30 / 45)
//
// It shows live rates at the point of purchase. Putting those numbers on the
// site would create a second copy that silently drifts out of date. The
// client's rate tables exist as internal reference material and are
// deliberately NOT rendered — do not "fix" this by adding them back.
//
// Only the two ENQUIRY-ONLY products carry a price on this page:
// Private Office (per seat) and Dedicated Desk (per month), both in plans.js.
// ──────────────────────────────────────────────────────────────────────────

export const SOLUTIONS_HERO = {
  headline: { lead: "Space for the way", accent: "you work." },
  subhead:
    "Private offices, coworking space, and the day-to-day services that come with running a business, sorted by what you need.",
  intro:
    "We build spaces around how your team actually works, not a fixed idea of what a workspace should look like. That means room to move faster some weeks, slower others, and a setup that keeps up either way.",
  // Hero image. Sits BESIDE the copy, never behind it — text over a photo is
  // what hurt legibility previously. Swap for a real Berry shot when supplied.
  image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1400&q=85&fit=crop",
};

// ── Section sub-labels, verbatim from the client's document ───────────────
// Each sits under its section heading as an italic line (italic is the site's
// accent device). Client wording; capitalisation adjusted only.
export const SECTION_LABELS = {
  officeSpaces:        "Private cabins",
  coworkingSpaces:     "Flexible workspace.",
  additionalSolutions: "Services on top.",
  spaceIncludes:       "The basics.",
};

// ── Non-priced coworking offerings, booked through DeskOS ─────────────────
// `action: "picker"` opens the day-pass modal; `action: "link"` opens DeskOS.
export const COWORKING_EXTRAS = [
  {
    id: "day-pass",
    name: "Day Pass",
    alias: "Single day or a bundle",
    desc:
      "A single day's access to the space, or a bundle if you're in and out more often.",
    availableNote: "Jhandewalan and Noida",
    action: "picker",
    ctaLabel: "See day passes",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85&fit=crop",
  },
  {
    id: "meeting-rooms",
    name: "Meeting Rooms",
    alias: "By the hour or in a bundle",
    desc:
      "Book by the hour or in a bundle, in a room sized and equipped for whatever the meeting calls for. No membership needed.",
    availableNote: "All three locations",
    action: "link",
    ctaLabel: "Book a room",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=85&fit=crop",
  },
];

// ── Additional solutions — services that sit on top of a workspace ────────
export const ADDITIONAL_SOLUTIONS = [
  {
    id: "events",
    name: "Events",
    desc:
      "Host your next event at The Berry Coworks. Whether it's a workshop, a brand activation, a team celebration or a panel talk, we have a space equipped to make it memorable. Pick from a mix of room sizes and layouts, and lean on our team for the on-ground support that keeps the day running the way you planned it.",
    href: "/contact",
    ctaLabel: "Enquire",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&q=85&fit=crop",
  },
  {
    id: "virtual-office",
    name: "Virtual Office",
    desc:
      "A professional business address for company registration and correspondence, handled by our team, so your business has a presence at a prime location even while you work from wherever suits you.",
    href: "/contact",
    ctaLabel: "Get an address",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=900&q=85&fit=crop",
  },
  {
    id: "advertising",
    name: "Advertising",
    desc:
      "Put your brand in front of a community of engaged professionals across every centre, through the everyday spaces our members pass through. Talk to us about current formats and availability.",
    href: "/contact",
    ctaLabel: "Talk to us",
    image: "https://images.unsplash.com/photo-1523251343397-9225e4cb6319?w=900&q=85&fit=crop",
  },
];

// ── Every space includes — grouped, replacing the old flat STANDARDS list ─
export const SPACE_INCLUDES = [
  {
    group: "Work essentials",
    items: [
      "High-speed and secure internet",
      "Power backup on every floor",
      "Ergonomic setups",
      "Phone booths",
      "Bookable meeting rooms",
      "Business printers, scanning and courier handling",
    ],
  },
  {
    group: "Service and upkeep",
    items: [
      "Daily professional housekeeping",
      "Staffed front desk",
      "Security",
      "Mail handling",
      "Air conditioning and climate control",
    ],
  },
  {
    group: "Comfort and lifestyle",
    items: [
      "Pantry stocked with coffee, tea and snacks",
      "Comfortable lounge areas",
    ],
  },
  {
    group: "Community",
    items: [
      "A dedicated community manager",
      "A packed calendar of community events",
      "App access to book, connect and stay updated",
    ],
  },
];

// ── Transparent-pricing break. Existing approved copy, repositioned as the
//    lead-in to "Every space includes". Not from the new client document. ──
export const PRICING_BREAK = {
  headline: { lead: "One transparent price.", accent: "Everything included." },
  body:
    "What you see is what you pay. No setup fees, no hidden charges, no surprise invoices. Every membership comes with the basics built in.",
};

export const SOLUTIONS_CLOSING = {
  headline: { lead: "Not sure which", accent: "plan fits?" },
  // Client's wording, verbatim. The closing sentence overlaps with "help you
  // pick the right plan" just above it — flagged to the client, left as-is.
  body:
    "Book a free 15-minute tour. We'll show you the spaces, answer questions, and help you pick the right plan. And we'll point you to the right one.",
  ctaLabel: "Talk to our team",
};

// ──────────────────────────────────────────────────────────────────────────
// FOR ENTERPRISES page — kept here, NOT rendered by the Solutions page.
// The 5-step sequence matches the client's "how it works" exactly (consult,
// design, build, move in, grow), so it survives the split. Copy will be
// swapped for the client's wording when that page is built.
// ──────────────────────────────────────────────────────────────────────────
export const PROCESS = [
  { step: "01", title: "Consult",  desc: "We start with a call to understand your team's size, timeline and budget, and how you like to work." },
  { step: "02", title: "Design",   desc: "We lay out a space around your workflow and brand, and walk you through it before anything gets built." },
  { step: "03", title: "Build",    desc: "We handle the fit-out ourselves, from furniture to branding, and manage the process from start to finish." },
  { step: "04", title: "Move in",  desc: "You walk into a finished space on day one, ready to start working right away." },
  { step: "05", title: "Grow",     desc: "As your business changes, we stay involved, working alongside you to figure out what the space needs next." },
];
