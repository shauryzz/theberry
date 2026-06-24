// Amenities data — used by /amenities page and (optionally) homepage teasers.
// Icons come from react-icons/lu (Lucide). Only commonly-stable Lu names used.

import {
  LuWifi,
  LuPrinter,
  LuMonitor,
  LuCalendarDays,
  LuVideo,
  LuHeadphones,
  LuUsers,
  LuSun,
  LuWind,
  LuLeaf,
  LuSparkles,
  LuStar,
  LuCoffee,
  LuHandshake,
  LuMessageSquare,
  LuKey,
  LuShield,
  LuZap,
  LuPackage,
  LuClock,
  LuPhone,
} from "react-icons/lu";

export const AMENITY_GROUPS = [
  {
    eyebrow: "01 · Productivity",
    title: "Built for the work.",
    desc: "Everything that makes deep work possible — without a single dropped call or buffering meeting.",
    items: [
      { icon: LuWifi,         name: "Gigabit symmetric WiFi", desc: "Primary fibre, redundant ISP. Never a flicker." },
      { icon: LuPrinter,      name: "Print, scan, copy",      desc: "From your phone or any desk." },
      { icon: LuMonitor,      name: "External monitors",      desc: "27\" displays available on request." },
      { icon: LuCalendarDays, name: "Meeting rooms",          desc: "Bookable in 60 seconds via the app." },
      { icon: LuVideo,        name: "Video-conferencing kit", desc: "Logitech rigs, screen-share ready." },
      { icon: LuHeadphones,   name: "Phone booths",           desc: "Soundproof. For when the call matters." },
    ],
  },
  {
    eyebrow: "02 · Comfort",
    title: "Eight-hour days, made easy.",
    desc: "We chose furniture, light, and air on the assumption you'd spend a whole day here.",
    items: [
      { icon: LuUsers,    name: "Ergonomic seating",          desc: "Premium task chairs. Your back will know." },
      { icon: LuSun,      name: "Natural light at every desk", desc: "No corner seats facing a wall." },
      { icon: LuWind,     name: "Climate-controlled HVAC",     desc: "Pre-set for the right temperature, year-round." },
      { icon: LuLeaf,     name: "Wellness room",               desc: "Private. For calls, prayer, nursing, or a moment." },
      { icon: LuSparkles, name: "Daily housekeeping",          desc: "Your desk reset every morning." },
      { icon: LuStar,     name: "Sit / stand desks",           desc: "Adjustable on request. Take the call standing." },
    ],
  },
  {
    eyebrow: "03 · Hospitality",
    title: "More than a desk.",
    desc: "We hire baristas, not janitors. Curate events, not bulletin boards. Build community on purpose.",
    items: [
      { icon: LuCoffee,         name: "Specialty coffee & tea", desc: "Single-origin, brewed properly." },
      { icon: LuHandshake,      name: "Member-only events",      desc: "Founders fireside. Friday socials. Skill swaps." },
      { icon: LuMessageSquare,  name: "Community Slack",         desc: "Every member is one DM away." },
      { icon: LuStar,           name: "Concierge service",       desc: "Restaurant booking. Cabs. Print runs. Yes." },
    ],
  },
  {
    eyebrow: "04 · Operations",
    title: "The unsexy essentials.",
    desc: "The things you should never have to think about — because someone already did.",
    items: [
      { icon: LuKey,     name: "24/7 access for members",    desc: "Your card, your hours." },
      { icon: LuShield,  name: "CCTV + access control",       desc: "Every door, every floor, every minute." },
      { icon: LuZap,     name: "Power backup",                desc: "UPS + diesel generator. Always on." },
      { icon: LuPackage, name: "Mail & package handling",     desc: "We sign for it. You collect when ready." },
      { icon: LuClock,   name: "On-site IT support",          desc: "Real humans, 8 AM – 9 PM, every day." },
      { icon: LuPhone,   name: "Front desk",                  desc: "Visitors greeted. Calls routed. Always." },
    ],
  },
];

// Universal across all locations — the things every member gets, regardless of plan.
export const STANDARDS = [
  "Gigabit fibre internet, primary + backup",
  "Power backup (UPS + DG) on every floor",
  "Daily professional housekeeping",
  "24/7 CCTV + biometric access control",
  "On-site IT support, 8 AM – 9 PM",
  "Mail & courier handling",
  "Pet-friendly common areas",
  "Pantry stocked with coffee, tea, and snacks",
];
