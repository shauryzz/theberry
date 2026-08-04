// ──────────────────────────────────────────────────────────────────────────
//  BOOKING — all external booking + action URLs in ONE place.
//
//  Real DeskOS URLs wired in Oct 2026 from client's spreadsheet.
//  DeskOS domain: berry.deskos.net
//
//  URL naming inside DeskOS:
//    /meeting-rooms/berry?campus_id={N}  →  location-scoped meeting-room picker
//    /day-pass/{campus_id}/{plan_id}     →  specific day-pass plan
//
//  Campus IDs (from client spreadsheet):
//    80 = Noida
//    81 = Jhandewalan
//    82 = Barakhamba (Connaught Place)
//
//  SELF-SERVICE vs ENQUIRY-ONLY (confirmed with client Oct 2026):
//    Self-service via DeskOS: Meeting Rooms, Day Pass, Multi Visit Plans.
//    Everything else (Flexible Seat, Dedicated Desk, Private Cabin, Managed
//    Office, Virtual Office) is enquiry-only → routes to /contact by design.
//    This is intentional; do NOT re-add placeholder URLs.
//
//  PLAN ID CHANGES (Oct 2026):
//    - hot-desk     → flexible-seat  (renamed per client language)
//    - custom-suite → managed-office (renamed + scope narrowed to Noida)
// ──────────────────────────────────────────────────────────────────────────

const DESKOS = "https://berry.deskos.net";

export const BOOKING = {
  // ── Generic CTAs ────────────────────────────────────────────────────────
  // "Book a Free Tour" buttons across the site → /contact form.
  // Client confirmed tours are handled through enquiry rather than DeskOS.
  tour: "/contact",

  // ── Per-plan × per-location deep links ──────────────────────────────────
  // All plans below are enquiry-only. `null` routes to /contact via
  // getPlanBookingUrl(). This is the intended behaviour, not missing data.
  plans: {
    "flexible-seat": {
      barakhamba:   null,   // Not offered at Barakhamba
      jhandewalan: null,   // Enquiry-only
      "noida-sector-142":       null,   // Enquiry-only
    },
    "dedicated-desk": {
      barakhamba:   null,   // Enquiry-only
      jhandewalan: null,   // Enquiry-only
      "noida-sector-142":       null,   // Enquiry-only
    },
    "private-cabin": {
      barakhamba:   null,   // Enquiry-only
      jhandewalan: null,   // Enquiry-only
      "noida-sector-142":       null,   // Enquiry-only
    },
    "managed-office": {
      // Enterprise, Noida-only. Enquiry-only → routes to /contact.
      barakhamba:   null,
      jhandewalan: null,
      "noida-sector-142":       null,
    },
  },

  // ── Meeting Rooms — universal booking link (client decision, Oct 2026) ──
  // `all` is the ONE link used site-wide. It opens the DeskOS meeting-room
  // picker where the user chooses campus + room (Mulberry / Raspberry / Açaí).
  //
  // The per-campus and per-room deep links from the client's spreadsheet are
  // deliberately NOT used — the client asked for the universal link only, so
  // there is a single booking entry point and no link rot when rooms change.
  // Campus IDs kept here for reference only: 80 Noida · 81 Jhandewalan · 82 Barakhamba.
  meetingRoom: {
    all: `${DESKOS}/meeting-rooms/berry`,
  },

  // ── Virtual Office — enquiry-only, routes to /contact ───────────────────
  virtualOffice: {
    barakhamba:   null,   // Enquiry-only
    jhandewalan: null,   // Enquiry-only
    "noida-sector-142":       null,   // Enquiry-only
  },

  // ── Day Pass bundles — real URLs from client, one entry per bundle ──────
  // The Solutions page Day Pass card opens a picker modal that renders this
  // structure. Barakhamba has no bundles (day passes not offered).
  //
  // "Monthly" is used for both Jhandewalan's "30 DAYS PLAN" and Noida's
  // "MONTH PLAN" — same product, normalized label so the modal reads clean.
  dayPassBundles: {
    barakhamba: [],  // Not offered at Barakhamba
    jhandewalan: [
      { id: "single",   label: "Day Pass",       sub: "1 visit",    url: `${DESKOS}/day-pass/81/90` },
      { id: "visits10", label: "10-Visit Pack",  sub: "10 visits",  url: `${DESKOS}/day-pass/81/92` },
      { id: "visits15", label: "15-Visit Pack",  sub: "15 visits",  url: `${DESKOS}/day-pass/81/93` },
      { id: "monthly",  label: "Monthly Pass",   sub: "30 days",    url: `${DESKOS}/day-pass/81/91` },
      { id: "visits45", label: "45-Visit Pack",  sub: "45 visits",  url: `${DESKOS}/day-pass/81/94` },
    ],
    "noida-sector-142": [
      { id: "single",   label: "Day Pass",       sub: "1 visit",    url: `${DESKOS}/day-pass/80/85` },
      { id: "visits10", label: "10-Visit Pack",  sub: "10 visits",  url: `${DESKOS}/day-pass/80/87` },
      { id: "visits15", label: "15-Visit Pack",  sub: "15 visits",  url: `${DESKOS}/day-pass/80/88` },
      { id: "monthly",  label: "Monthly Pass",   sub: "30 days",    url: `${DESKOS}/day-pass/80/86` },
      { id: "visits45", label: "45-Visit Pack",  sub: "45 visits",  url: `${DESKOS}/day-pass/80/89` },
    ],
  },

  // ── WhatsApp (confirmed from brand deck) ────────────────────────────────
  whatsapp: "https://wa.me/917290811818",
  whatsappMessage: "Hi! I'd like to know more about The Berry Coworks.",

  // ── App store links (white-labelled DeskOS app) ─────────────────────────
  appStore:  "https://apps.apple.com/app/the-berry-coworks",                          // PLACEHOLDER
  playStore: "https://play.google.com/store/apps/details?id=com.theberrycoworks.app", // PLACEHOLDER
};

// Helper: returns the right booking URL for a plan + location combo.
// Returns "/contact" when the plan is unavailable at that location (null)
// or when the plan itself has no direct booking (e.g. Managed Office).
export function getPlanBookingUrl(planId, locationId) {
  return BOOKING.plans[planId]?.[locationId] || "/contact";
}

// Helper: returns true if the URL is external (DeskOS / WhatsApp / etc.)
// vs internal (/contact). Used to decide target="_blank" on links.
export function isExternalBooking(url) {
  return typeof url === "string" && url.startsWith("http");
}

// Helper: builds a WhatsApp link with optional pre-filled message.
export function whatsappLink(customMessage) {
  const msg = encodeURIComponent(customMessage || BOOKING.whatsappMessage);
  return `${BOOKING.whatsapp}?text=${msg}`;
}
