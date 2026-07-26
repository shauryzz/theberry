import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactContent from "../../components/ContactContent";

export const metadata = {
  title: "Contact · The Berry Coworks",
  description:
    "Get in touch with The Berry Coworks. Managed offices, partnerships, press, or just questions. We reply within 24 hours. Locations in Barakhamba, Jhandewalan & Noida.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  );
}