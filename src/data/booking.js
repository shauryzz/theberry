// ──────────────────────────────────────────────────────────────────────────
//  All booking + external action URLs in ONE place.
//
//  The client confirmed DeskOS provides BOTH:
//    - A global "Book a Tour" URL (opens a location/plan picker)
//    - Per-plan × per-location DEEP LINKS (meeting room, day pass, etc.)
//
//  Strategy: every external action below is a new-tab link. Iframe embed
//  is supported by DeskOS too — if the client later wants in-page booking,
//  we add a small <BookingModal /> wrapper. For launch, new tab is fastest
//  and avoids payment-gateway CSP / X-Frame-Options headaches.
//
//  TO SWAP IN REAL LINKS:
//    Replace BASE with the real DeskOS sub-domain the client gives you,
//    then verify each plan path matches the deep-link shape they provide.
// ──────────────────────────────────────────────────────────────────────────

const BASE = "https://book.theberrycoworks.com"; // PLACEHOLDER

export const BOOKING = {
  // ── Generic CTAs ────────────────────────────────────────────────────────
  // Used by the floating "Book a Tour" pill and any "Book a Free Tour" CTA.
  tour: `${BASE}/tour`,

  // ── Per-plan × per-location deep links ──────────────────────────────────
  // Lookup happens via getPlanBookingUrl() below. Custom suite has no direct
  // booking link — it routes to /contact for a custom quote.
  plans: {
    "hot-desk": {
      connaught:   `${BASE}/cp/hot-desk`,
      jhandewalan: `${BASE}/jhandewalan/hot-desk`,
      noida:       `${BASE}/noida/hot-desk`,
    },
    "dedicated-desk": {
      connaught:   `${BASE}/cp/dedicated-desk`,
      jhandewalan: `${BASE}/jhandewalan/dedicated-desk`,
      noida:       `${BASE}/noida/dedicated-desk`,
    },
    "private-cabin": {
      connaught:   `${BASE}/cp/private-cabin`,
      jhandewalan: `${BASE}/jhandewalan/private-cabin`,
      noida:       `${BASE}/noida/private-cabin`,
    },
    "custom-suite": {
      // Enterprise — always routes to /contact (custom quote)
      connaught:   null,
      jhandewalan: null,
      noida:       null,
    },
  },

  // ── Confirmed by client: deep links exist for these ─────────────────────
  dayPass: {
    connaught:   `${BASE}/cp/day-pass`,
    jhandewalan: `${BASE}/jhandewalan/day-pass`,
    noida:       `${BASE}/noida/day-pass`,
  },
  meetingRoom: {
    connaught:   `${BASE}/cp/meeting-room`,
    jhandewalan: `${BASE}/jhandewalan/meeting-room`,
    noida:       `${BASE}/noida/meeting-room`,
  },
  virtualOffice: {
    connaught:   `${BASE}/cp/virtual-office`,
    jhandewalan: `${BASE}/jhandewalan/virtual-office`,
    noida:       `${BASE}/noida/virtual-office`,
  },

  // ── WhatsApp (confirmed from brand deck) ────────────────────────────────
  whatsapp: "https://wa.me/917290811818",
  whatsappMessage: "Hi! I'd like to know more about The Berry Coworks.",

  // ── App store links (white-labelled DeskOS app) ─────────────────────────
  appStore:  "https://apps.apple.com/app/the-berry-coworks",                          // PLACEHOLDER
  playStore: "https://play.google.com/store/apps/details?id=com.theberrycoworks.app", // PLACEHOLDER
};

// Helper: returns the right booking URL for a plan + location combo.
// Custom suite (or any null) falls back to /contact for a custom quote.
export function getPlanBookingUrl(planId, locationId) {
  return BOOKING.plans[planId]?.[locationId] || "/contact";
}

// Helper: returns true if the URL is external (DeskOS) vs internal (/contact).
export function isExternalBooking(url) {
  return typeof url === "string" && url.startsWith("http");
}

// Helper: builds a WhatsApp link with optional pre-filled message.
export function whatsappLink(customMessage) {
  const msg = encodeURIComponent(customMessage || BOOKING.whatsappMessage);
  return `${BOOKING.whatsapp}?text=${msg}`;
}
