import "./globals.css";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import CustomCursor from "../components/CustomCursor";
import Transition from "../components/Transition";
import FloatingActions from "../components/FloatingActions";
import { SITE } from "../data/site";

// Both are variable fonts — next/font loads all weights automatically
// and self-hosts them at build time. Works perfectly with output: "export".
const fontDisplay = Bricolage_Grotesque({
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
