// ──────────────────────────────────────────────────────────────────────────
//  BOOKING — all external booking + action URLs in ONE place.
//
//  UPDATED (Nov 2026): Meeting Rooms and Day Pass now route to a SINGLE
//  universal booking link — https://booking.theberrycoworks.com/ — instead
//  of per-campus / per-plan DeskOS deep links. The client wants one entry
//  point site-wide, matching the same decision already made for Meeting
//  Rooms in Oct 2026, now extended to Day Pass as well.
//
//  The old berry.deskos.net deep links (campus IDs, plan IDs) are REMOVED
//  below. Campus IDs kept only as a historical reference in this comment,
//  in case the client ever asks for per-location links again:
//    80 = Noida · 81 = Jhandewalan · 82 = Barakhamba (Connaught Place)
//
//  SELF-SERVICE vs ENQUIRY-ONLY (confirmed with client Oct 2026):
//    Self-service: Meeting Rooms, Day Pass, Multi Visit Plans — now all via
//    the universal link below.
//    Everything else (Private Office, Dedicated Desk, Virtual Office) is
//    enquiry-only → routes to /contact by design.
//    This is intentional; do NOT re-add placeholder URLs.
// ──────────────────────────────────────────────────────────────────────────

const UNIVERSAL_BOOKING = "https://booking.theberrycoworks.com/";

export const BOOKING = {
  // ── Generic CTAs ────────────────────────────────────────────────────────
  // "Book a Free Tour" buttons across the site → /contact form.
  // Client confirmed tours are handled through enquiry rather than online booking.
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
  // `all` is the ONE link used site-wide. It opens the universal booking
  // page where the user picks campus + room (Mulberry / Raspberry / Açaí).
  meetingRoom: {
    all: UNIVERSAL_BOOKING,
  },

  // ── Virtual Office — enquiry-only, routes to /contact ───────────────────
  virtualOffice: {
    barakhamba:   null,   // Enquiry-only
    jhandewalan: null,   // Enquiry-only
    "noida-sector-142":       null,   // Enquiry-only
  },

  // ── Day Pass bundles — now all point to the universal booking link ─────
  // (Nov 2026) Every bundle, at every location, opens the same
  // UNIVERSAL_BOOKING URL. The per-location / per-bundle structure is kept
  // as-is — DayPassPickerModal reads this shape directly — only the `url`
  // values changed. Barakhamba has no bundles (day passes not offered).
  dayPassBundles: {
    barakhamba: [],  // Not offered at Barakhamba
    jhandewalan: [
      { id: "single",   label: "Day Pass",       sub: "1 visit",    url: UNIVERSAL_BOOKING },
      { id: "visits10", label: "10-Visit Pack",  sub: "10 visits",  url: UNIVERSAL_BOOKING },
      { id: "visits15", label: "15-Visit Pack",  sub: "15 visits",  url: UNIVERSAL_BOOKING },
      { id: "monthly",  label: "Monthly Pass",   sub: "30 days",    url: UNIVERSAL_BOOKING },
      { id: "visits45", label: "45-Visit Pack",  sub: "45 visits",  url: UNIVERSAL_BOOKING },
    ],
    "noida-sector-142": [
      { id: "single",   label: "Day Pass",       sub: "1 visit",    url: UNIVERSAL_BOOKING },
      { id: "visits10", label: "10-Visit Pack",  sub: "10 visits",  url: UNIVERSAL_BOOKING },
      { id: "visits15", label: "15-Visit Pack",  sub: "15 visits",  url: UNIVERSAL_BOOKING },
      { id: "monthly",  label: "Monthly Pass",   sub: "30 days",    url: UNIVERSAL_BOOKING },
      { id: "visits45", label: "45-Visit Pack",  sub: "45 visits",  url: UNIVERSAL_BOOKING },
    ],
  },

  // ── WhatsApp ────────────────────────────────────────────────────────────
  // Aug 2026: moved onto the main landline (+917290811818). Calls hit an
  // IVR, messages route via MSG91 as the WhatsApp BSP. Old number
  //  is retired.
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

// Helper: returns true if the URL is external (booking platform / WhatsApp /
// etc.) vs internal (/contact). Used to decide target="_blank" on links.
export function isExternalBooking(url) {
  return typeof url === "string" && url.startsWith("http");
}

// Helper: builds a WhatsApp link with optional pre-filled message.
export function whatsappLink(customMessage) {
  const msg = encodeURIComponent(customMessage || BOOKING.whatsappMessage);
  return `${BOOKING.whatsapp}?text=${msg}`;
}