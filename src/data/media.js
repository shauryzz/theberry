// ──────────────────────────────────────────────────────────────────────────
// Standalone section / hero images that aren't tied to a specific data record.
// (Location, plan, pillar, and flex-option images live with their own data in
//  locations.js / plans.js / content.js.)
//
// These are Unsplash placeholders for now. When the client supplies real assets:
//   1. Drop the files into  public/images/...  (subfolders are fine)
//   2. Replace each URL below with its path, e.g.  "/images/about/hero.webp"
// Nothing in the components needs to change — they all read from here.
// ──────────────────────────────────────────────────────────────────────────

export const MEDIA = {
  // Homepage <About /> hero — parallax background image
  homeAboutHero:     "/images/noida-reception.webp",

  // Homepage <About /> hero — small photos SCATTERED across the headline
  // (editorial collage treatment). They are positioned absolutely and sit
  // over the type at varied sizes, shapes and angles, so order maps to
  // placement: [0] left, [1] top-right, [2] lower-right.
  // Swap these for real Berry photos when the client supplies them.
  aboutInlineShots: [
    "/images/people-cafe.webp",
    "/images/jhandewalan-library.webp",
    "/images/working-laptop.webp",
  ],

  // /about — origin-story full-bleed image
  aboutOriginStory:  "/images/lounge-2.webp",

  // Homepage <PullQuote /> — featured-quote side image. Bright, natural-light
  // workspace placeholder; swap for the client's real photo when it arrives.
  pullQuoteImage:    "/images/cafe-plants.webp",

  // /amenities — full-bleed "Morning light / Evening calm" break
  amenitiesShowcase: "/images/glass-shelves.webp",

  // Homepage <TrustedBy /> — scrolling brand-logo strip (real local images in
  // public/images/). If the files aren't .png, fix the extensions here only.
  // App mockup hero (inside <AppShowcase />). Interior coworking placeholder —
  // swap for a real in-space photo any time; nothing else needs to change.
  appHero:           "/images/noida-reception.webp",

  // Homepage <TrustedBy /> — individual member logos. Each renders in a uniform
  // chip in the scrolling marquee, so mixed backgrounds/sizes look consistent.
  // Filenames are referenced exactly as they sit in public/images/ (some are
  // messy exports). Renaming to clean slugs later is recommended but optional —
  // if you rename, update the paths here only; the component needs no changes.
  memberLogos: [
    { src: "/images/2022109af96d38c521e5a882819e5f7e.jpg-removebg-preview.png", alt: "Aramex" },
    { src: "/images/airtel-logo-png_seeklogo-556531.png", alt: "Airtel" },
    { src: "/images/credflow-logo.png", alt: "CredFlow" },
    { src: "/images/hand-with-gostop-log.png", alt: "goSTOPS" },
    { src: "/images/herbal_chakra_logo.jpg-removebg-preview.png", alt: "Herbal Chakra" },
    { src: "/images/images.png", alt: "GMoney" },
    { src: "/images/indiamart-logo-png_seeklogo-349456.png", alt: "IndiaMART" },
    { src: "/images/iris-logo-1_8918b411-61b7-445f-a5e0-d4a49fcb8b1b.webp", alt: "IRIS" },
    { src: "/images/logo-256.png", alt: "SuperHumanRace" },
    { src: "/images/nuvama-logo-png_seeklogo-639453.png", alt: "Nuvama" },
    { src: "/images/quick-heal-logo-png_seeklogo-296886.png", alt: "Quick Heal" },
    { src: "/images/TATRAS-Logo-H-03-2025-1-removebg-preview.png", alt: "TATRAS" },
    { src: "/images/Template.-Webinar-2-2-removebg-preview.png", alt: "Neotas" },
    { src: "/images/tree.jpeg", alt: "Treelife" },
    { src: "/images/unnamed.png", alt: "SMIFS" },
    { src: "/images/11unnamed.png", alt: "KUWY" },
    { src: "/images/cloudera-logo-png_seeklogo-385623.png", alt: "Cloudera" },
    { src: "/images/GeneralNews.avif", alt: "CarDekho" },
    { src: "/images/inditradecapital_logo.jpg-removebg-preview.png", alt: "Indit Trade Capital" },
    { src: "/images/PATH_Logo_Color.png", alt: "PATH" },
  ],
};
