import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LegalContent from "../../../components/LegalContent";

export const metadata = {
  title: "Privacy Policy — The Berry Coworks",
  description:
    "How The Berry Coworks collects, uses, and protects your data. Member privacy policy for our coworking spaces in Connaught Place, Jhandewalan & Noida.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <LegalContent kind="privacy" />
      <Footer />
    </>
  );
}
