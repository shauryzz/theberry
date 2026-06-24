// ─────────────────────────────────────────────────────────────────────────
// LOCATIONS — The Berry Coworks
// ─────────────────────────────────────────────────────────────────────────
// Verified data (June 2026) from the client's Google Maps listings + brand deck:
//   - Connaught Place / Barakhamba Rd → maps.google.com/.../+Barakhamba
//   - Jhandewalan                     → maps.google.com/.../+Jhandewalan
//   - Noida Sector 142                → maps.google.com/.../+Noida+Sector+142
//
// Capacities, metro proximity, and descriptions sourced from the brand deck.
// Phone: main brand number used across all locations. Replace with per-location
// numbers when the client confirms.
//
// SAMPLE fields (replace as real content arrives): img, gallery,
//   highlights, neighbourhood, parking
// ─────────────────────────────────────────────────────────────────────────

const HERO_CONNAUGHT   = "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=85&fit=crop";
const HERO_JHANDEWALAN = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&fit=crop";
const HERO_NOIDA       = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=85&fit=crop";

export const LOCATIONS = [
  // ───────────────────────────────────────────────────────────────────────
  // BARAKHAMBA (CONNAUGHT PLACE)
  // 100 seats · Connaught Place address · steps from Barakhamba Metro
  // ───────────────────────────────────────────────────────────────────────
  {
    id:    "connaught",
    label: "Connaught Place",
    tag:   "Heritage District",
    img:   HERO_CONNAUGHT,

    desc:
      "Right off the escalator from Barakhamba Metro Station, in the heart of Central Delhi. 100 seats and a Connaught Place address — dedicated cabin seats, private cabins, virtual office space, and a fully equipped 8-seater meeting room. For professionals who want a well-considered workspace in the centre of the city.",

    address: {
      line1:   "102, First Floor, 27 New Delhi House",
      line2:   "Barakhamba Road, Connaught Lane",
      city:    "New Delhi",
      pincode: "110001",
      full:    "102, First Floor, 27 New Delhi House, Barakhamba Road, Connaught Lane, New Delhi 110001",
    },

    phone:    "+91 81784 49718",
    email:    "hello@theberrycoworks.com",
    hours:    "Mon–Sat · 8 AM – 9 PM · 24/7 for members",
    metro:    "Barakhamba Road (Blue Line) · Steps from the escalator",
    parking:  "Paid parking · Statesman House (5 min walk)",
    capacity: "100 seats · 8-seater meeting room",

    coords: { lat: 28.6302877, lng: 77.2231987 },

    highlights: [
      "On Barakhamba Road — Delhi's most-recognisable business address",
      "Steps from Barakhamba Road metro on the Blue Line",
      "Walking distance to Janpath, Khan Market, and India Gate",
      "Floor-to-ceiling windows along the entire Barakhamba-facing facade",
      "Private phone booths every fifteen seats — never wait for a call",
      "Member-only rooftop lounge with views across central Delhi",
      "On-site espresso bar and curated lunch menu daily",
      "Surrounded by every embassy, hotel, and boardroom that matters",
    ],

    neighbourhood:
      "Barakhamba Road is the eastern radial of Connaught Place — the road every Delhi boardroom faces. The Lalit, The Park, and a dozen embassies are on this street. The Statesman House, FICCI, and the offices of half the country's law firms are at this address.\n\nWalk five minutes in any direction and you'll find what your day needs. Lunch at Saravana Bhavan or Wenger's at the Inner Circle. Coffee at the Indian Coffee House. A meeting in the lobby of The Imperial. Late-night drinks in Khan Market. Connaught Place is not a neighbourhood — it's the centre of gravity for everyone who works in Delhi.\n\nFor members, the location pays its own rent. Clients meet you here because they'd come here anyway. Pitches feel different when you can walk a prospective partner from your desk to lunch at The Claridges in under ten minutes.",

    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1542740348-39501cd6e2b4?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1582653291997-079a1c04e09b?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1600&q=85&fit=crop",
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // JHANDEWALAN
  // 200 seats · 10 metres from Jhandewalan Metro · two 7-seater meeting rooms
  // ───────────────────────────────────────────────────────────────────────
  {
    id:    "jhandewalan",
    label: "Jhandewalan",
    tag:   "Creative Quarter",
    img:   HERO_JHANDEWALAN,

    desc:
      "Ten metres from Jhandewalan Metro Station. 200 seats designed for a community that values ease as much as it values the work. Flexi seats and day passes sit alongside dedicated cabin seats, private cabins, virtual office space, and two 7-seater meeting rooms — every kind of member finds exactly what they need.",

    address: {
      line1:   "1-E/3, First Floor, Block E 1",
      line2:   "Jhandewalan Extension",
      city:    "New Delhi",
      pincode: "110055",
      full:    "1-E/3, First Floor, Block E 1, Jhandewalan Extension, New Delhi 110055",
    },

    phone:    "+91 81784 49718",
    email:    "hello@theberrycoworks.com",
    hours:    "Mon–Sat · 8 AM – 9 PM · 24/7 for members",
    metro:    "Jhandewalan (Blue Line) · 10 metres from the station",
    parking:  "On-site stilt parking · 30 cars",
    capacity: "200 seats · two 7-seater meeting rooms",

    coords: { lat: 28.6444417, lng: 77.2003972 },

    highlights: [
      "Quiet first-floor workspace tucked into Block E 1 — no street noise",
      "Double-height ceilings, raw concrete walls, and curated art on every floor",
      "Soundproofed podcast studio bookable by members",
      "Ten metres from Jhandewalan Metro on the Blue Line",
      "South-facing terrace lounge with full-day natural light",
      "Free Friday lunches sourced from neighbourhood restaurants",
      "On-site stilt parking for thirty cars — rare for central Delhi",
      "Walking distance to Karol Bagh, Paharganj, and Rani Jhansi Road",
    ],

    neighbourhood:
      "Jhandewalan Extension is Delhi's quiet creative hub — wide streets, reasonable rents, and half the buildings hold a design studio, an ad agency, or a film editor on the second floor.\n\nIt's an ideal address for the kind of work that needs both centrality and breathing room. You're ten minutes from Connaught Place, fifteen from Karol Bagh, walking distance to the Jhandewalan Mandir, the DDA office complex, and the New Delhi Railway Station. The Blue Line runs overground here — a small detail that means your morning has a view.\n\nThe immediate area has the best of old Delhi compressed into a few blocks: legacy printing presses, fabric wholesalers, paratha shops that have run for sixty years, and a row of small cafés that members rotate through for their afternoon meetings.",

    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1542353436-312f0e1f67ff?w=1600&q=85&fit=crop",
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // NOIDA SECTOR 142
  // 700 seats today (path to 2,000) · 100m from Sector 142 Metro · DG backup
  // ───────────────────────────────────────────────────────────────────────
  {
    id:    "noida",
    label: "Noida",
    tag:   "Tech Corridor",
    img:   HERO_NOIDA,

    desc:
      "The Berry at its most expansive — 700 seats today with a clear path to 2,000. One hundred metres from Sector 142 Metro Station, with DG power backup throughout. The meeting infrastructure runs from formal meeting rooms to casual lounges to a dedicated conference room. Alongside flexible seats, dedicated desks, private cabins, and virtual office space, this is The Berry's most complete expression of what a workspace can be.",

    address: {
      line1:   "Vinpar Softech Building, Plot No 15",
      line2:   "Sector 142",
      city:    "Noida, Uttar Pradesh",
      pincode: "201304",
      full:    "Vinpar Softech Building, Plot No 15, Sector 142, Noida, Uttar Pradesh 201304",
    },

    phone:    "+91 81784 49718",
    email:    "hello@theberrycoworks.com",
    hours:    "Mon–Sat · 8 AM – 9 PM · 24/7 for members",
    metro:    "Sector 142 (Aqua Line) · 100 metres from the station",
    parking:  "On-site basement parking · 60 cars",
    capacity: "700 seats today · growing to 2,000",

    coords: { lat: 28.4997063, lng: 77.4152959 },

    highlights: [
      "Directly on the Noida-Greater Noida Expressway — the city's tech artery",
      "The Berry's largest floor-plate — 700 seats with a clear path to 2,000",
      "Formal meeting rooms, casual lounges, and a dedicated conference room",
      "One hundred metres from Sector 142 Metro on the Aqua Line",
      "Built for product teams — quiet zones, war rooms, and demo spaces",
      "Full DG power backup, fibre redundancy, and zero downtime since opening",
      "Roof garden with shaded outdoor seating and weekly Friday socials",
      "Easy taxi pickup, low traffic mornings, and ample visitor parking",
    ],

    neighbourhood:
      "Sector 142 sits on the Noida-Greater Noida Expressway — the corridor that defines Noida's tech economy. Paytm, HCL, Genpact, and half the country's product-engineering teams are within fifteen minutes of this address. The Sector 142 metro on the Aqua Line connects directly to Botanical Garden and the Blue Line interchange, putting central Delhi forty-five minutes away.\n\nThe Expressway location is the strategic pick: less traffic than the older Noida sectors, faster commute from Greater Noida and South Delhi, and you're surrounded by the kind of neighbours your team probably wants to interview at next.\n\nFor companies hiring engineers across NCR, this location is gold. Members tell us they close offers faster from Sector 142 because their candidates' commutes shrink by half.",

    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1604328471151-b52226907017?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=1000&q=85&fit=crop",
      "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1400&q=85&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=85&fit=crop",
    ],
  },
];

// Lookup helper used by /locations/[id]/page.js
export function getLocationById(id) {
  return LOCATIONS.find((loc) => loc.id === id);
}

// Returns the Google Maps URL for a location (used for "Open in Google Maps" links).
// Uses explicit `mapsUrl` field if set, otherwise builds one from coords.
// Returns null if neither is available — callers should handle that.
export function getMapsUrl(location) {
  if (!location) return null;
  if (location.mapsUrl) return location.mapsUrl;
  if (location.coords?.lat && location.coords?.lng) {
    return `https://www.google.com/maps/search/?api=1&query=${location.coords.lat},${location.coords.lng}`;
  }
  return null;
}

// Returns the embeddable Google Maps URL (for an <iframe>) built from coords.
// Returns null when coords are missing — callers should render a fallback.
export function getMapsEmbedUrl(location) {
  if (!location?.coords?.lat || !location?.coords?.lng) return null;
  return `https://maps.google.com/maps?q=${location.coords.lat},${location.coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
