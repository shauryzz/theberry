import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactContent from "../../components/ContactContent";

export const metadata = {
  title: "Contact — The Berry Coworks",
  description:
    "Get in touch with The Berry Coworks. Custom suites, partnerships, press, or just questions — we reply within 24 hours. Locations in Connaught Place, Jhandewalan & Noida.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
    </>
  );
}
