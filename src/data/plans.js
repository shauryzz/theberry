// ──────────────────────────────────────────────────────────────────────────
// PLANS — the two priced, self-serve workspace products.
//
// RESTRUCTURED (Oct 2026) from the client's combined Solutions content:
//
//   • "Private Cabin" and "Private Office" are ONE product. Named
//     Private Office here, with the cabin wording kept in `alias`.
//   • "Flexible Seat", "Open Seat", "Hot Desk" and "Dedicated Desk" are ONE
//     product. Named Dedicated Desk, with the other names kept in `alias`.
//   • "Managed Office" has MOVED OFF this page entirely. It is an enterprise
//     offering now and lives on the For Enterprises page, so it is no longer
//     a self-serve plan and is deliberately absent from this array.
//
// PRICING BASIS CHANGED: private offices are priced PER SEAT, dedicated desks
// PER MONTH. `priceUnit` carries that, so the UI never hardcodes "/mo".
// A null price means the product is not offered at that location and the
// location is simply omitted from the price list (never shown as "N/A").
//
// `pricePrefix` (optional): a short lead-in rendered before the price, e.g.
// "starting at". Client asked for this on Dedicated Desk only. Omit it (or
// leave undefined) and nothing is prepended — that is how Private Office
// stays a plain per-location price.
//
// Day passes and meeting rooms are NOT here: they are booked through DeskOS
// and carry no on-site pricing. They live in data/solutions.js.
// ──────────────────────────────────────────────────────────────────────────
export const PLANS = [
  {
    id: "private-office",
    name: "Private Office",
    alias: "Also called a private cabin",
    tagline: "A closed office for your team",
    description:
      "A closed, furnished office built for privacy and comfort, ready for your team to move straight in.",
    image: "/images/private-cabin-window.webp",
    availableAt: ["barakhamba", "jhandewalan", "noida-sector-142"],
    priceUnit: "per seat + taxes",
    pricing: {
      barakhamba:   18500,
      jhandewalan: 14000,
      "noida-sector-142":        9000,
    },
    badge: null,
  },
  {
    id: "dedicated-desk",
    name: "Dedicated Desk",
    alias: "Open seat, hot desk and dedicated desk all describe the same thing here",
    tagline: "A place on the floor that is yours",
    description:
      "A desk on our coworking floor, whether you need it for a single day, want the same one held for you, or just want the flexibility of moving around. A place on the floor that is yours whenever you need it.",
    image: "/images/dedicated-desks.webp",
    availableAt: ["jhandewalan", "noida-sector-142"],   // Barakhamba: coworking not offered
    priceUnit: "per month + taxes",
    pricePrefix: "starting at",   // Client copy — Dedicated Desk only
    pricing: {
      barakhamba:   null,                     // not offered
      jhandewalan: 8500,
      "noida-sector-142":       5500,
    },
    badge: "Most Popular",
  },
];
