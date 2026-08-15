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
//    Everything else (Private Office, Dedicated Desk, Virtual Office) is
//    enquiry-only → routes to /contact by design.
//    This is intentional; do NOT re-add placeholder URLs.
//
//  PLAN IDS (Aug 2026) — must stay in sync with `id` in data/plans.js:
//    private-office · dedicated-desk
//    See the note above `plans` below for what was renamed and why.
// ──────────────────────────────────────────────────────────────────────────

const DESKOS = "https://berry.deskos.net";

export const BOOKING = {
  // ── Generic CTAs ────────────────────────────────────────────────────────
  // "Book a Free Tour" buttons across the site → /contact form.
  // Client confirmed tours are handled through enquiry rather than DeskOS.
  tour: "/contact",

  // ── Per-plan × per-location deep links ──────────────────────────────────
  // KEYS MUST MATCH `id` IN data/plans.js. LocationDetail calls
  // getPlanBookingUrl(plan.id, location.id), so a key that does not match a
  // plan id is never read — the lookup silently misses and falls through to
  // /contact, which looks correct today only because every value is null.
  //
  // RENAMED (Aug 2026) to close that gap, following the client's product
  // consolidation:
  //   private-cabin  → private-office   ("private cabin" and "private office"
  //                                      are ONE product; Private Office is
  //                                      the name that ships)
  //   flexible-seat  → REMOVED          (merged into dedicated-desk; "open
  //                                      seat", "hot desk" and "dedicated
  //                                      desk" are ONE product)
  //   managed-office → REMOVED          (no longer a self-serve plan; it is
  //                                      an enterprise offering on
  //                                      /for-enterprises and is absent from
  //                                      plans.js)
  //
  // All values stay null. That is deliberate: both products are enquiry-only
  // and route to /contact. Do NOT re-add placeholder URLs.
  plans: {
    "private-office": {
      barakhamba:         null,   // Enquiry-only
      jhandewalan:        null,   // Enquiry-only
      "noida-sector-142": null,   // Enquiry-only
    },
    "dedicated-desk": {
      barakhamba:         null,   // Not offered at Barakhamba (no coworking floor)
      jhandewalan:        null,   // Enquiry-only
      "noida-sector-142": null,   // Enquiry-only
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

  // ── WhatsApp ────────────────────────────────────────────────────────────
  // Aug 2026: moved onto the main landline (+91 11 4000 2726). Calls hit an
  // IVR, messages route via MSG91 as the WhatsApp BSP. Old number
  // 917290811818 is retired.
  //
  // ⚠️ DUPLICATE SOURCE OF TRUTH: SITE.whatsappHref in data/site.js holds
  // this same URL. Both must be changed together or the floating button and
  // the footer will point at different numbers. Consider collapsing this to
  // read from SITE instead.
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
