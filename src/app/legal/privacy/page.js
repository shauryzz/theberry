import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LegalContent from "../../../components/LegalContent";

export const metadata = {
  title: "Privacy Policy · The Berry Coworks",
  description:
    "How The Berry Coworks collects, uses, and protects your data. Member privacy policy for our coworking spaces in Barakhamba, Jhandewalan & Noida.",
};

export default function PrivacyPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <LegalContent kind="privacy" />
      <Footer />
    </main>
  );
}