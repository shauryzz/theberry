// Main navbar links.
// Order matters. Navbar.jsx auto-splits these in half (Math.ceil(length/2))
// around the centered logo, so reordering this array reshuffles the navbar.
//
// Oct 2026: /workspaces was merged into /solutions and that route deleted.
// "For Enterprises" (managed offices) is now its own page. The count is still
// 5, so the navbar split is unchanged: 3 left of the logo, 2 right.

export const NAV_LINKS = [
  { title: "Solutions",       href: "/solutions"       },
  { title: "Locations",       href: "/locations"       },
  { title: "For Enterprises", href: "/for-enterprises" },
  { title: "About",           href: "/about"           },
  { title: "Contact",         href: "/contact"         },
];

// Footer "Explore" column.
// This used to spell /solutions out as "Enterprise Solutions". That name now
// belongs to /for-enterprises, so each route carries its own label and the
// footer matches the navbar.
export const FOOTER_LINKS = [
  { title: "Solutions",       href: "/solutions"       },
  { title: "Locations",       href: "/locations"       },
  { title: "For Enterprises", href: "/for-enterprises" },
  { title: "About",           href: "/about"           },
  { title: "Contact",         href: "/contact"         },
];
