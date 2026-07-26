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

export const metadata = {
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
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