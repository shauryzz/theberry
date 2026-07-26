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
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1200&q=85&fit=crop",
    availableAt: ["connaught", "jhandewalan", "noida"],
    priceUnit: "per seat + taxes",
    pricing: {
      connaught:   16500,
      jhandewalan: 11500,
      noida:        7500,
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
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=85&fit=crop",
    availableAt: ["jhandewalan", "noida"],   // Barakhamba: coworking not offered
    priceUnit: "per month + taxes",
    pricing: {
      connaught:   null,                     // not offered
      jhandewalan: 8500,
      noida:       5500,
    },
    badge: "Most Popular",
  },
];
