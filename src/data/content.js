// ──────────────────────────────────────────────────────────────────────────
// Content blocks rendered across the site. Pulled out of components so copy,
// lists, and icon references live in data instead of hardcoded in JSX.
// ──────────────────────────────────────────────────────────────────────────

import {
  LuCalendarDays,
  LuUsers,
  LuMapPin,
  LuWifi,
  LuClock,
  LuMessageSquare,
} from "react-icons/lu";

// ── Feature strip (Marquee.jsx). Plain phrases only. The component renders
//    the separators between them, so no separator glyphs live in the data.
//    Client-supplied list (Oct 2026).
export const USPS = [
  "Phone Booths & Meeting Rooms",
  "Dedicated Desks",
  "Comfortable Lounge Areas",
  "Community Events",
  "App Access",
  "Bookable Meeting Rooms",
  "Metro-Connected Locations",
  "Staffed Front Desk",
  "Ergonomic Setups",
];

// ── "Working from The Berry Coworks gets you" slider, homepage About
//    section (About.jsx). Client-supplied list (Oct 2026).
//    Rendered as a horizontal slider of numbered cards, so each entry needs
//    a `title` (the card label) and an `img`.
export const PERKS = [
  {
    title: "A packed calendar of community events",
    img:   "/images/people-booth.webp",
  },
  {
    title: "Warm beverages on the house",
    img:   "/images/pantry-coffee.webp",
  },
  {
    title: "Phone booths and meeting rooms whenever you need to step away and focus",
    img:   "/images/phone-booths.webp",
  },
  {
    title: "Internet you can count on",
    img:   "/images/working-laptop.webp",
  },
  {
    title: "A floor full of people worth getting to know",
    img:   "/images/team-working.webp",
  },
];

// ── Stats (About.jsx). CountUp parses the digits + suffix in `value`. ──
export const STATS = [
  { value: "2300+", label: "Seat Capacity", sub: "to grow into"                 },
  { value: "5800+", label: "Members",       sub: "who make the space come alive" },
  { value: "6+",    label: "Years",         sub: "of trusted workspace expertise" },
];

// ── "More Ways to Work" offer menu, homepage About (About.jsx).
//    Booking deep links live in data/booking.js.
export const FLEX_OPTIONS = [
  {
    icon: LuCalendarDays,
    name: "Day Pass",
    desc: "A desk for the day. Walk in, work, leave. No membership, no lock-in.",
    img:  "/images/open-seating.webp",
  },
  {
    icon: LuUsers,
    name: "Meeting Room",
    desc: "A fully equipped room, bookable by the hour. Screen-share ready.",
    img:  "/images/meeting-window.webp",
  },
  {
    icon: LuMapPin,
    name: "Virtual Office",
    desc: "A registered business address and mail handling, without renting a seat.",
    img:  "/images/berry-lounge.webp",
  },
];

// ── Shared standards, /locations page (LocationsContent.jsx).
//    Space-quality framing; kept distinct from plans.js → ALL_PLANS_INCLUDE
//    (plan-inclusion framing).
//    Rewritten: shorter, more specific, no filler about "the work" or "flow".
//    Some overlap with pillars is intentional (this is a different page), but
//    the phrasing is different so it does not read like repetition.
export const SHARED_STANDARDS = [
  {
    label: "Natural Light",
    desc: "Floor-to-ceiling glass at every desk. Bright through the day.",
    img: "/images/window-nook.webp",
  },
  {
    label: "Ergonomic Furniture",
    desc: "Adjustable chairs and sit-stand desks at every seat.",
    img: "/images/dedicated-desks.webp",
  },
  {
    label: "High-Speed WiFi",
    desc: "Gigabit fibre with a backup line. Calls and uploads stay up.",
    img: "/images/working-laptop.webp",
  },
  {
    label: "F&B Counter",
    desc: "Fresh coffee, tea, and quick bites on tap.",
    img: "/images/barakhamba-fnb.webp",
  },
  {
    label: "Phone Booths",
    desc: "Soundproof pods for the calls that need quiet.",
    img: "/images/pod-green.webp",
  },
  {
    label: "Meeting Rooms",
    desc: "Screens and whiteboards, ready for stand-ups or pitches.",
    img: "/images/meeting-green.webp",
  },
  {
    label: "Print and Scan",
    desc: "On-site printing, scanning, and copying. No errands.",
    img: "/images/print-scan.webp",
  },
];

// ── ABOUT PAGE CONTENT (/about, AboutContent.jsx) ─────────────────────────
//    All copy below is the client's, verbatim from their document. Only
//    capitalisation is normalised (their doc is lowercase). No em dashes.

// "the space we wished existed" — the founding story.
export const ABOUT_STORY = {
  eyebrowless_heading: { lead: "The space we", accent: "wished existed." },
  paragraphs: [
    "Six years ago, if you wanted a well-designed workspace in India, you paid for it heavily. And if you couldn't, you made do with something that got the job done but never quite felt like yours. There was rarely anything in between. Workspace was either a considerable expense or a compromise, and for a generation of founders, freelancers and growing teams, that gap was just something you learned to live with.",
    "Two designers decided it didn't have to be.",
    "The Berry Coworks was founded by Parul Jain and Vishesh Kalkhandey, who kept circling back to the same question: why should a well-designed office be out of reach for anyone who wasn't already running a large company? They set out to build exactly that: a workspace shaped by design, but built to run as a serious business from day one.",
  ],
  // The berry metaphor + closing, kept as their own beats.
  metaphor:
    "The name follows the same logic. A berry is never just one thing: strawberries, blueberries, mulberries, raspberries, each shaped differently, each with its own place, and all of them better for being grown together. That's the community we had in mind: founders, freelancers and growing teams, each doing something different, sharing the same rooms.",
  closing:
    "The Berry Coworks today is where a growing community spends their working days, the space Parul and Vishesh set out to build from the start. It turns out a lot of people wished for the same thing they did.",
  signoff: "Parul & Vishesh",
};

// The two founder quotes, verbatim.
export const FOUNDER_QUOTES = [
  {
    quote: "We wanted to create something we wished existed. That's really all this started as.",
    name:  "Vishesh Kalkhandey",
    role:  "Founder and Managing Partner",
  },
  {
    quote: "Design isn't decoration, it's how we make sure a space works for the people using it.",
    name:  "Parul Jain",
    role:  "Founder and Managing Partner",
  },
];

// "the journey so far" — full year-by-year, verbatim. Ends open-ended.
export const JOURNEY = [
  { year: "2020", desc: "We launched our first address in Barakhamba, and the standard it set is one every space since has followed." },
  { year: "2021", desc: "Jhandewalan followed, our second address." },
  { year: "2022", desc: "We put more into Jhandewalan, and it's where we shaped the playbook every space runs on today." },
  { year: "2023", desc: "We put that playbook to work, sharpening how both addresses operate day to day." },
  { year: "2024", desc: "We spent time mapping out where we go next." },
  { year: "2025", desc: "The Berry at its most expansive yet, at Noida Sector 142." },
  { year: "2026", desc: "There's more on the way." },
];

// Closing line under the timeline.
export const JOURNEY_OUTRO = "And for the years to come...";

// One photo per journey year, shown as a taped print beside each entry on the
// /about timeline. Keyed by year so it survives reordering. Captions are the
// client's own place names where the year names a place; 2023/2024/2026 have
// no single location, so those captions are atmospheric and easy to change.
// Swap all of these for real photography when it arrives.
export const JOURNEY_SHOTS = {
  "2020": { src: "/images/barakhamba-lounge.webp", caption: "Barakhamba" },
  "2021": { src: "/images/jhandewalan-desks.webp", caption: "Jhandewalan" },
  "2022": { src: "/images/jhandewalan-library.webp", caption: "Jhandewalan" },
  "2023": { src: "/images/lounge-2.webp", caption: "Both addresses" },
  "2024": { src: "/images/coworking-people.webp", caption: "Mapping what's next" },
  "2025": { src: "/images/noida-fnb.webp", caption: "Noida · Sector 142" },
  "2026": { src: "/images/yellow-lounge.webp", caption: "On the way" },
};

// Placeholder collage/moodboard images for the story section. Swap for real
// founder + space photography. Deliberately a mix of orientations so the
// scattered layout reads like a moodboard (see the client's references).
export const ABOUT_COLLAGE = [
  "/images/detail-round-table.webp",
  "/images/detail-carpe-diem.webp",
  "/images/glass-shelves-2.webp",
  "/images/people-cafe.webp",
  "/images/booth-mural.webp",
];

// ── The Berry app, feature list + quick-action tiles (AppShowcase.jsx) ──
export const APP_FEATURES = [
  "Check availability and book meeting rooms and day passes instantly",
  "Find out about events and receive reminder notifications",
  "Network and connect with the community",
  "Interactive newsfeed",
  "Promote your business and gain opportunities",
];

export const APP_QUICK_ACTIONS = [
  { icon: LuWifi,          label: "WiFi",    sub: "Get Network" },
  { icon: LuClock,         label: "Hours",   sub: "Operating Times" },
  { icon: LuCalendarDays,  label: "Book",    sub: "Meeting Rooms" },
  { icon: LuMessageSquare, label: "Support", sub: "Raise Ticket" },
];
