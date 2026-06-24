// ──────────────────────────────────────────────────────────────────────────
// Content blocks rendered across the site. Pulled out of components so copy,
// lists, and icon references live in data — not hardcoded in JSX.
// ──────────────────────────────────────────────────────────────────────────

import {
  LuCalendarDays,
  LuUsers,
  LuMapPin,
  LuWifi,
  LuClock,
  LuMessageSquare,
} from "react-icons/lu";

// ── Marquee keywords (Marquee.jsx). Plain phrases only — the component renders
//    the separators between them, so no separator glyphs live in the data. ──
export const USPS = [
  "Delhi NCR's Finest Coworking",
  "Natural Light Spaces",
  "Ergonomic Furniture",
  "24/7 Access",
  "F&B Counter",
  "Community Events",
  "Metro Connected",
  "Hot Desks · Cabins · Suites",
];

// ── Four pillars — homepage About section (About.jsx).
//    `icon` is descriptive metadata only — not consumed at render time. ──
export const PILLARS = [
  {
    icon: "🌿",
    title: "Natural Light",
    desc:  "Floor-to-ceiling windows at every location. Real greenery. The kind of light that makes long days feel shorter.",
    img:   "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&fit=crop",
  },
  {
    icon: "🪑",
    title: "Considered Design",
    desc:  "Two designers founded The Berry — every chair, surface, and corner chosen because the details are the work.",
    img:   "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85&fit=crop",
  },
  {
    icon: "🤝",
    title: "Real Community",
    desc:  "MSMEs, startups, freelancers, and enterprise teams. The kind of room where the next conversation starts in the hallway.",
    img:   "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=85&fit=crop",
  },
  {
    icon: "📍",
    title: "Metro Connected",
    desc:  "Steps from Barakhamba in CP, Jhandewalan, and Sector 142 in Noida. Three doors. All metro-walkable.",
    img:   "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=900&q=85&fit=crop",
  },
];

// ── Stats (About.jsx + AboutContent.jsx). CountUp parses digits + suffix. ──
export const STATS = [
  { value: "500+", label: "Members"           },
  { value: "150+", label: "Brands Served"     },
  { value: "5+",   label: "Years Established" },
  { value: "24/7", label: "Member Access"     },
];

// ── "More Ways to Work" offer menu — homepage About (About.jsx).
//    Booking deep links live in data/booking.js. ──
export const FLEX_OPTIONS = [
  {
    icon: LuCalendarDays,
    name: "Day Pass",
    desc: "A desk for the day. Walk in, work, leave — no membership, no lock-in.",
    img:  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85&fit=crop",
  },
  {
    icon: LuUsers,
    name: "Meeting Room",
    desc: "Book a fully equipped room by the hour. Screen-share ready, bookable in seconds.",
    img:  "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=900&q=85&fit=crop",
  },
  {
    icon: LuMapPin,
    name: "Virtual Office",
    desc: "A prestige business address and mail handling — without the desk.",
    img:  "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=900&q=85&fit=crop",
  },
];

// ── Shared standards chips — /locations page (LocationsContent.jsx).
//    Space-quality framing; kept distinct from plans.js → ALL_PLANS_INCLUDE
//    (plan-inclusion framing) and amenities.js → STANDARDS (detailed list). ──
export const SHARED_STANDARDS = [
  "Natural Light",
  "Ergonomic Furniture",
  "24/7 Member Access",
  "High-Speed WiFi",
  "F&B Counter",
  "Phone Booths",
  "Meeting Rooms",
  "Print & Scan",
];

// ── Company journey / timeline — /about page (AboutContent.jsx) ──
export const JOURNEY = [
  {
    year: "2020",
    title: "The Idea",
    desc:  "Two friends, working from home during the pandemic, decide to build the workspace they wished existed.",
  },
  {
    year: "2022",
    title: "Connaught Place",
    desc:  "Our first space opens in the heart of Delhi. The community starts forming the day the doors open.",
  },
  {
    year: "2024",
    title: "Expanding Reach",
    desc:  "Jhandewalan opens. Then Noida. Premium coworking expands across Delhi NCR, faster than we planned.",
  },
  {
    year: "2026",
    title: "The Berry App",
    desc:  "Members get their workspace in their pocket — one-tap bookings, payments, community, all in-app.",
  },
];

// ── The Berry app — feature list + quick-action tiles (AppShowcase.jsx) ──
export const APP_FEATURES = [
  "One-tap room & desk booking",
  "Service requests with live status",
  "Print straight from your phone",
  "Member community & events feed",
  "Attendance & invoices, all in-app",
];

export const APP_QUICK_ACTIONS = [
  { icon: LuWifi,          label: "WiFi",    sub: "Get Network" },
  { icon: LuClock,         label: "Hours",   sub: "Operating Times" },
  { icon: LuCalendarDays,  label: "Book",    sub: "Meeting Rooms" },
  { icon: LuMessageSquare, label: "Support", sub: "Raise Ticket" },
];
