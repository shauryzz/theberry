import "./globals.css";
import { Manrope, Inter } from "next/font/google";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import CustomCursor from "../components/CustomCursor";
import Transition from "../components/Transition";
import FloatingActions from "../components/FloatingActions";
import { SITE } from "../data/site";

// DISPLAY FONT — Manrope (modern grotesque). Loaded as a variable font,
// so any weight from 200–800 is available. Components use font-bold
// (weight 700) with tracking-tighter uppercase — exactly as originally
// designed. globals.css aliases legacy font-["Founders_Grotesk"] classes
// to --font-display, so no component edits are needed to change fonts.
const fontDisplay = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// ──────────────────────────────────────────────────────────────────────────
// SITE METADATA
//
// metadataBase is REQUIRED for social sharing. Open Graph needs absolute
// URLs, and without this Next emits a relative path that WhatsApp, LinkedIn
// and Slack all silently ignore — the link previews as bare text.
//
// SHARE IMAGE: /images/og.webp
//
// ⚠️ WEBP IS A COMPATIBILITY RISK FOR LINK PREVIEWS. Most scrapers handle it
// now, but WhatsApp is the historic hold-out and is exactly where these links
// get pasted most in India. If previews come back blank there, export the
// same artwork as JPG and change the three paths below — nothing else.
//
// The declared 1200×630 must match the file's real pixel dimensions.
// A mismatch makes some platforms crop or reject the image.
//
// Per-page titles set in each page.js override `title` here; the Open Graph
// block below is inherited site-wide unless a page overrides it.
//
// The domain comes from SITE.url in data/site.js — stated once, read here
// and by sitemap.js / robots.js.
// ──────────────────────────────────────────────────────────────────────────

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type:        "website",
    siteName:    SITE.name,
    title:       `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url:         "/",
    locale:      "en_IN",
    images: [
      { url: "/images/og.webp", width: 1200, height: 630, alt: SITE.name },
    ],
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    images:      ["/images/og.webp"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScrollProvider>
          <Transition>
            {children}
          </Transition>
        </SmoothScrollProvider>
        <FloatingActions />
      </body>
    </html>
  );
}