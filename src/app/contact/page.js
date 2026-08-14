import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactContent from "../../components/ContactContent";

export const metadata = {
  title: "Contact · The Berry Coworks",
  description:
    "Looking for a coworking space, private office or meeting room? Talk to The Berry Coworks about bookings, visits, partnerships or finding the right workspace for you.",
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