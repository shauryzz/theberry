import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LegalContent from "../../../components/LegalContent";

export const metadata = {
  title: "Privacy Policy · The Berry Coworks",
  description:
    "We take your privacy seriously at The Berry Coworks. Learn how we collect, use and protect your information when you visit our website, make a booking or interact with our services.",
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