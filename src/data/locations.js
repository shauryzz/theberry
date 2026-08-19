// ─────────────────────────────────────────────────────────────────────────
// LOCATIONS — The Berry Coworks
// ─────────────────────────────────────────────────────────────────────────

const HERO_CONNAUGHT = "/images/barakhamba-hero.webp";
const HERO_JHANDEWALAN = "/images/jhandewalan-hero.webp";
const HERO_NOIDA = "/images/noida-reception.webp";
const HERO_SECTOR63 = "/images/sector63-hero.webp";
const HERO_GURUGRAM_SECTOR53 =
  "/images/gurugram-sector53-hero.webp";

export const LOCATIONS = [
  // ───────────────────────────────────────────────────────────────────────
  // BARAKHAMBA
  // ───────────────────────────────────────────────────────────────────────
  {
    id: "barakhamba",
    label: "Barakhamba",
    area: "Barakhamba Road",
    img: HERO_CONNAUGHT,

    desc:
      "Set inside Connaught Place, one of Delhi's oldest and busiest commercial circles, Barakhamba puts you a few minutes from some of the city's best-known offices, restaurants and metro connections, right where central Delhi does its business.",

    whatsInside:
      "Barakhamba is a private-office workspace in the heart of central Delhi, built for businesses looking for a dedicated space of their own. Private offices are fully furnished and ready for teams to move in and work comfortably. A virtual office is also available for businesses that want a central Delhi business address without a physical workspace.",

    whoItsFor:
      "Barakhamba is built for businesses looking for a private office in central Delhi, whether you’re a small team setting up a dedicated workspace or an established business looking for a long-term office.",

    address: {
      line1: "102, First Floor, 27 New Delhi House",
      line2: "Barakhamba Road, Connaught Lane",
      city: "New Delhi",
      pincode: "110001",
      full: "102, FF, 27 New Delhi House, Barakhamba Rd, Connaught Lane, Barakhamba, New Delhi, Delhi 110001",
    },

    phone: "+91 72908 11818",
    email: "contact@theberrycoworks.com",
    hours: "Mon to Sat, 8 AM to 8 PM.",

    metro: "Barakhamba Road (Blue Line), steps from the escalator",
    parking: "Paid parking at Statesman House, 5 min walk",
    capacity: "100 seats, 8-seater meeting room",

    coords: {
      lat: 28.6302877,
      lng: 77.2231987,
    },

    highlightTabs: [
      "The Address",
      "Metro",
      "The Area",
      "The Space",
      "Phone Booths",
    ],

    highlights: [
      "On Barakhamba Road, Delhi's most-recognisable business address",
      "Steps from Barakhamba Road metro on the Blue Line",
      "Walking distance to Janpath, Khan Market, and India Gate",
      "Floor-to-ceiling windows along the Barakhamba-facing facade",
      "Private phone booths every fifteen seats",
      "Member-only rooftop lounge with views across central Delhi",
      "On-site espresso bar and curated lunch menu daily",
      "Embassies, hotels, and boardrooms all on the same street",
    ],

    neighbourhood:
      "Barakhamba Road is the eastern radial of Connaught Place, the road every Delhi boardroom faces. The Lalit, The Park, and a dozen embassies are on this street. The Statesman House, FICCI, and the offices of half the country's law firms are at this address.\n\nWalk five minutes in any direction and you'll find what your day needs. Lunch at Saravana Bhavan or Wenger's at the Inner Circle. Coffee at the Indian Coffee House. A meeting in the lobby of The Imperial. Late-night drinks in Khan Market.\n\nFor members, the location pays its own rent. Clients meet you here because they'd come here anyway. Pitches feel different when you can walk a prospective partner from your desk to lunch at The Claridges in under ten minutes.",

    gallery: [
      "/images/barakhamba-lounge.webp",
      "/images/barakhamba-cabin.webp",
      "/images/barakhamba-fnb.webp",
      "/images/barakhamba-meeting-room.webp",
      "/images/barakhamba-services.webp",
      "/images/barakhamba-cabin-2.webp",
      "/images/barakhamba-lounge-2.webp",
      "/images/barakhamba-fnb-2.webp",
      "/images/barakhamba-library.webp",
      "/images/barakhamba-workstation.webp",
      "/images/print-scan.webp",
      "/images/lounge-green.webp",
      "/images/hallway-art.webp",
      "/images/meeting-room-glass.webp",
      "/images/glass-shelves.webp",
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // JHANDEWALAN
  // ───────────────────────────────────────────────────────────────────────
  {
    id: "jhandewalan",
    label: "Jhandewalan",
    area: "Jhandewalan Extension",
    img: HERO_JHANDEWALAN,
    heroDim: true,

    desc:
      "Tucked into Jhandewalan's quieter commercial stretch, this centre sits close to Paharganj and central Delhi's older business lanes, an easy reach for anyone working out of the heart of the city.",

    whatsInside:
      "Jhandewalan is a flexible workspace for professionals and teams, with private offices, dedicated desks, day passes and meeting rooms. Whether you need a desk for the day, a workspace for the month or a private office for your team, there’s a setup that fits. Meeting rooms are also available for teams that need a professional space for meetings and conversations.",

    whoItsFor:
      "Jhandewalan works well for professionals who need a workspace for the day, people looking for a dedicated desk, and teams that want a private office as their regular base.",

    address: {
      line1: "1-E/3, First Floor, Block E 1",
      line2: "Jhandewalan Extension",
      city: "New Delhi",
      pincode: "110055",
      full: "1-E/3, First Floor, Block E 1, Jhandewalan Extension, Jhandewalan, New Delhi, Delhi 110055",
    },

    phone: "+91 72908 11818",
    email: "contact@theberrycoworks.com",
    hours: "Mon to Sat, 8 AM to 8 PM.",

    metro: "Jhandewalan (Blue Line), 10 metres from the station",
    parking: "On-site stilt parking for 30 cars",
    capacity: "200 seats, two 7-seater meeting rooms",

    coords: {
      lat: 28.6444417,
      lng: 77.2003972,
    },

    highlightTabs: [
      "The Space",
      "Interiors",
      "Studio",
      "Metro",
      "Terrace",
    ],

    highlights: [
      "Quiet first-floor workspace tucked into Block E 1",
      "Double-height ceilings, raw concrete walls, and curated art on every floor",
      "Soundproofed podcast studio bookable by members",
      "Ten metres from Jhandewalan Metro on the Blue Line",
      "South-facing terrace lounge",
      "Free Friday lunches from neighbourhood restaurants",
      "On-site stilt parking for thirty cars, rare for central Delhi",
      "Walking distance to Karol Bagh, Paharganj, and Rani Jhansi Road",
    ],

    neighbourhood:
      "Jhandewalan Extension is Delhi's quiet creative hub. Wide streets, reasonable rents, and half the buildings hold a design studio, an ad agency, or a film editor on the second floor.\n\nYou're ten minutes from Connaught Place, fifteen from Karol Bagh, walking distance to the Jhandewalan Mandir, the DDA office complex, and the New Delhi Railway Station. The Blue Line runs overground here, which means your morning has a view.\n\nThe area has the best of old Delhi compressed into a few blocks: legacy printing presses, fabric wholesalers, paratha shops that have run for sixty years, and a row of small cafés that members rotate through for their afternoon meetings.",

    gallery: [
      "/images/jhandewalan-private-cabin.webp",
      "/images/jhandewalan-cabin.webp",
      "/images/jhandewalan-meeting-room.webp",
      "/images/jhandewalan-library.webp",
      "/images/jhandewalan-team.webp",
      "/images/jhandewalan-desks.webp",
      "/images/jhandewalan-lounge.webp",
      "/images/jw.webp",
      "/images/jw1.webp",
      "/images/jw3.webp",
      "/images/mural-desk.webp",
      "/images/mural-workstations.webp",
      "/images/pod-green.webp",
      "/images/lounge-ottoman.webp",
      "/images/booth-green.webp",
    ],
  },

  // ───────────────────────────────────────────────────────────────────────
  // NOIDA SECTOR 142
  // ───────────────────────────────────────────────────────────────────────
  {
    id: "noida-sector-142",
    label: "Noida",
    area: "Sector 142",
    img: HERO_NOIDA,

    desc:
      "Set inside Sector 142's fast-growing business corridor, this centre sits among some of Noida's newer corporate campuses and tech offices, built for teams who need scale close by.",

    whatsInside:
      "Noida, Sector 142 offers a flexible workspace for professionals and teams, with open seating, dedicated desks, private offices and day passes. Meeting rooms are also available for meetings, presentations and team discussions. Day passes are available for professionals who need a workspace for the day. A virtual office is also available for businesses that need a professional address without a physical workspace.",

    whoItsFor:
      "Noida, Sector 142 works well for professionals who need a flexible workspace, growing teams looking for dedicated desks, and businesses that want a private office as their regular base.",

    address: {
      line1: "Vinpar Softech Building, Plot No 15",
      line2: "Sector 142",
      city: "Noida, Uttar Pradesh",
      pincode: "201304",
      full: "Vinpar Softech Building, Plot No 15, Sector 142, Noida, Uttar Pradesh 201304",
    },

    phone: "+91 72908 11818",
    email: "contact@theberrycoworks.com",
    hours: "Mon to Sat, 8 AM to 8 PM.",

    metro: "Sector 142 (Aqua Line), 100 metres from the station",
    parking: "On-site basement parking for 60 cars",
    capacity: "700 seats today, growing to 2,000",

    coords: {
      lat: 28.4997063,
      lng: 77.4152959,
    },

    highlightTabs: [
      "Expressway",
      "Floor Plate",
      "Meeting Rooms",
      "Metro",
      "Team Zones",
    ],

    highlights: [
      "Directly on the Noida-Greater Noida Expressway",
      "The Berry's largest floor-plate: 700 seats today, path to 2,000",
      "Formal meeting rooms, casual lounges, and a dedicated conference room",
      "One hundred metres from Sector 142 Metro on the Aqua Line",
      "Built for product teams: quiet zones, war rooms, and demo spaces",
      "Full DG power backup, fibre redundancy, zero downtime since opening",
      "Roof garden with shaded outdoor seating and Friday socials",
      "Easy taxi pickup, low traffic mornings, ample visitor parking",
    ],

    neighbourhood:
      "Sector 142 sits on the Noida-Greater Noida Expressway, the corridor that defines Noida's tech economy. Paytm, HCL, Genpact, and half the country's product-engineering teams are within fifteen minutes of this address. The Sector 142 metro on the Aqua Line connects directly to Botanical Garden and the Blue Line interchange, putting central Delhi forty-five minutes away.\n\nThe Expressway location is the strategic pick: less traffic than the older Noida sectors, faster commute from Greater Noida and South Delhi, and you're surrounded by the kind of neighbours your team probably wants to interview at next.\n\nFor companies hiring engineers across NCR, this location is gold. Members tell us they close offers faster from Sector 142 because their candidates' commutes shrink by half.",

    gallery: [
      "/images/noida-private-cabin.webp",
      "/images/noida-lounge.webp",
      "/images/noida-fnb.webp",
      "/images/noida-desks.webp",
      "/images/noida-games.webp",
      "/images/noida-entrance.webp",
      "/images/noida-signage.webp",
      "/images/noida-window-seats.webp",
      "/images/noida-nook.webp",
      "/images/noida-building.webp",
      "/images/boardroom-long.webp",
      "/images/desks-rows.webp",
      "/images/meeting-mural.webp",
      "/images/booth-social.webp",
      "/images/cafe-busy.webp",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────

export function getLocationById(id) {
  return LOCATIONS.find((loc) => loc.id === id);
}

export function getMapsUrl(location) {
  if (!location) return null;

  if (location.mapsUrl) {
    return location.mapsUrl;
  }

  if (location.coords?.lat && location.coords?.lng) {
    return `https://www.google.com/maps/search/?api=1&query=${location.coords.lat},${location.coords.lng}`;
  }

  return null;
}

export function getMapsEmbedUrl(location) {
  if (!location) return null;

  if (location.mapsEmbedUrl) {
    return location.mapsEmbedUrl;
  }

  const query = [
    "The Berry Coworks",
    location.area,
    location.address?.city,
  ]
    .filter(Boolean)
    .join(", ");

  if (query.trim()) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(
      query
    )}&z=16&output=embed`;
  }

  if (location.coords?.lat && location.coords?.lng) {
    return `https://maps.google.com/maps?q=${location.coords.lat},${location.coords.lng}&z=15&output=embed`;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────
// HOMEPAGE MAP
// Only currently active locations are represented here.
// ─────────────────────────────────────────────────────────────────────────

const ALL_LOCATIONS_EMBED_URL = null;

export function getAllLocationsMapEmbedUrl() {
  if (ALL_LOCATIONS_EMBED_URL) {
    return ALL_LOCATIONS_EMBED_URL;
  }

  return "https://maps.google.com/maps?q=The+Berry+Coworks&ll=28.5915,77.2796&z=10&output=embed";
}

// ─────────────────────────────────────────────────────────────────────────
// UPCOMING LOCATIONS
// ─────────────────────────────────────────────────────────────────────────
// These are intentionally outside LOCATIONS so they do not:
// - generate /locations/[id] pages
// - appear as active locations elsewhere
// - become clickable
// - get treated as operational locations

export const UPCOMING_LOCATIONS = [
  {
    id: "gurugram-sector-53",
    label: "Gurugram",
    area: "Sector 53",
    badge: "New Location",
    desc: "Bringing the Berry Coworks experience to Gurugram",
    img: HERO_GURUGRAM_SECTOR53,
  },

  {
    id: "noida-sector-63",
    label: "Noida",
    area: "Sector 63",
    badge: "Coming Soon",
    desc:
      "Our next centre is taking shape in Noida, Sector 63. More on this soon.",
    img: HERO_SECTOR63,
  },
];

// Keep this export so any existing file that still imports
// UPCOMING_LOCATION does not immediately break.
export const UPCOMING_LOCATION = UPCOMING_LOCATIONS[0];