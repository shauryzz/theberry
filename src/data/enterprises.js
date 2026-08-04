// ──────────────────────────────────────────────────────────────────────────
// FOR ENTERPRISES, content for /for-enterprises.
//
// RULES THIS FILE FOLLOWS:
//   1. Client wording is reproduced exactly. Capitalisation is the ONLY thing
//      changed (their document is typed in lowercase). No added punctuation,
//      no joining or splitting of their sentences.
//   2. No em dashes anywhere in rendered copy.
//   3. Headings follow the site pattern: uppercase, last word orange. Where
//      the client's line carries no full stop, none is added.
//
// The five "how it works" steps are NOT duplicated here. They live in
// data/solutions.js as PROCESS, which was written for this page and is
// imported directly, so there is one source of truth.
//
// ON THE "500+ MEMBERS" FIGURE:
//    The client uses different member counts in different documents. Theirs
//    is the wording that ships, so the community point below stays exactly as
//    supplied. Do not reconcile it against the homepage figure.
// ──────────────────────────────────────────────────────────────────────────

export const ENTERPRISE_HERO = {
  // "looking for an office that's built for your business?"
  headline: { lead: "Looking for an office that's built for your", accent: "business?" },

  // The client's document sets these as two separate lines, with the brand
  // name emphasised. Rendered as two paragraphs, exactly as written, with
  // nothing inserted between them.
  introLead:  "Introducing",
  introBrand: "managed spaces by The Berry Coworks",
  introBody:
    "A one-stop solution that plans your space, brings good design into it, and makes the everyday experience of working there better for your team.",
};

export const ENTERPRISE_INTRO = {
  // "an office, built and run for you."
  heading: { lead: "An office, built and", accent: "run for you." },
  body:
    "For businesses that need more than a desk, we build and manage the entire office ourselves. Our team sources the space, designs it around your brand, builds it out, and keeps it running once your team has moved in, so setting up an office is never something you have to manage on your own.",
};

// Hero image band, matching the treatment on the Solutions page.
export const ENTERPRISE_HERO_IMAGE =
  "/images/boardroom-long.webp";

// ── Managed offices, the dark showcase the client asked to keep ───────────
export const MANAGED_OFFICE = {
  // "an office that runs itself."
  heading: { lead: "An office that", accent: "runs itself." },
  body:
    "Our team designs, builds and runs a workspace built around your requirements, so you can focus on the work. Available at Noida.",
  image:
    "/images/noida-private-cabin.webp",
  points: [
    {
      title: "End-to-end setup",
      desc:  "We design, build, furnish and brand the space, then hand over the keys once you've signed off.",
    },
    {
      title: "Built around your team",
      desc:  "Every choice, from furniture to conference rooms, is shaped around how your team works.",
    },
    {
      title: "One team, start to finish",
      desc:  "Our in-house team handles sourcing, design, construction and day-to-day operations.",
    },
    {
      title: "Community access",
      // Client's figure, left exactly as supplied. See the note at the top.
      desc:  "Plug into 500+ members and a calendar of events worth knowing about.",
    },
  ],
};

export const SHAPED_AROUND = {
  // "shaped around your team". The client's line carries no full stop, but the
  // site's heading pattern puts one on the last word and the user ruled for
  // consistency over a literal match. Do not strip it back out.
  heading: { lead: "Shaped around your", accent: "team." },
  body:
    "From a furnished suite to a fully branded office, we build around your team's size and how you like to work, so it's ready the day you move in.",
};

// Expanding photo panels beneath "shaped around your team". Hovering a panel
// opens it and the others give way, so the range of spaces reads as something
// you explore rather than another block of text. No captions, because any
// wording here would be invented rather than the client's.
export const SPACE_GALLERY = [
  { src: "/images/jhandewalan-private-cabin.webp", alt: "Furnished private suite" },
  { src: "/images/desks-rows.webp", alt: "Open team floor"         },
  { src: "/images/meeting-mural.webp", alt: "Conference room"         },
  { src: "/images/lounge-ottoman.webp", alt: "Branded office floor"    },
];

// Heading for the five step block. The steps themselves come from PROCESS
// in data/solutions.js.
export const PROCESS_HEADING = { lead: "Start to", accent: "move-in." };

export const ENTERPRISE_CTA = {
  // "tell us what you need."
  heading: { lead: "Tell us what", accent: "you need." },
  body:
    "A 30-minute call is usually enough for us to point you at the right option. Book a tour, or drop us a message.",
  primary:   { label: "Get in touch", href: "/contact" },
  secondary: { label: "WhatsApp us" },   // href built from booking.js
};
