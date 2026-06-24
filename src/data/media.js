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
  homeAboutHero:     "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&q=90&fit=crop",

  // /about — origin-story full-bleed image
  aboutOriginStory:  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=90&fit=crop",

  // /amenities — full-bleed "Morning light / Evening calm" break
  amenitiesShowcase: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&q=85&fit=crop",

  // Homepage <TrustedBy /> — scrolling brand-logo strip (real local images in
  // public/images/). If the files aren't .png, fix the extensions here only.
  brandStrip: [
    "/images/brands1.webp",
    "/images/brands2.webp",
    "/images/brands3.webp",
  ],
};
