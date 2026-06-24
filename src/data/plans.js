// Pricing is per location → per plan. Replace numbers with real ones from client.
// Set price to null for "Custom quote / Contact us".
export const PLANS = [
  {
    id: "hot-desk",
    name: "Hot Desk",
    tagline: "For nomads & freelancers",
    description: "Any open seat, any day. Walk in, plug in, work.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&q=85&fit=crop",
    pricing: {
      connaught:   8500,
      jhandewalan: 7500,
      noida:       6500,
    },
    features: [
      "Access to all open seating areas",
      "High-speed WiFi & power",
      "Use of phone booths & lounges",
      "F&B counter access",
      "Community events & networking",
    ],
    badge: null,
  },
  {
    id: "dedicated-desk",
    name: "Dedicated Desk",
    tagline: "For consistent solo work",
    description: "Your own desk, every day. Locker, monitor, and a permanent setup.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=85&fit=crop",
    pricing: {
      connaught:   15000,
      jhandewalan: 12500,
      noida:       11000,
    },
    features: [
      "Your own permanent desk",
      "Personal locker & storage",
      "Ergonomic chair & monitor option",
      "Priority booking for meeting rooms",
      "All Hot Desk benefits included",
      "24/7 access",
    ],
    badge: "Most Popular",
  },
  {
    id: "private-cabin",
    name: "Private Cabin",
    tagline: "For small teams (2-6 seats)",
    description: "A lockable private space designed for focused team work.",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=900&q=85&fit=crop",
    pricing: {
      connaught:   45000,
      jhandewalan: 38000,
      noida:       32000,
    },
    features: [
      "Lockable private cabin",
      "Configurable for 2-6 people",
      "Branded signage option",
      "Dedicated meeting room hours",
      "Mail & courier handling",
      "All Dedicated Desk benefits",
    ],
    badge: null,
  },
  {
    id: "custom-suite",
    name: "Custom Suite",
    tagline: "For enterprises (10+ seats)",
    description: "A bespoke workspace, built around your team's identity and workflow.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&fit=crop",
    pricing: {
      connaught:   null,
      jhandewalan: null,
      noida:       null,
    },
    features: [
      "Fully branded private suite",
      "Custom layout & build-out",
      "Dedicated reception & support",
      "Reserved meeting rooms",
      "Custom IT & networking",
      "Enterprise SLA & invoicing",
    ],
    badge: null,
  },
];

export const ALL_PLANS_INCLUDE = [
  "Gigabit WiFi",
  "F&B Counter",
  "Phone Booths",
  "Meeting Rooms",
  "Printing & Scanning",
  "Mail Handling",
  "Community Events",
  "Metro Access",
];