import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AmenitiesContent from "../../components/AmenitiesContent";

export const metadata = {
  title: "Amenities — The Berry Coworks",
  description:
    "Every detail considered. Gigabit WiFi, ergonomic seating, specialty coffee, 24/7 access, power backup, on-site IT — what's included with every plan at The Berry Coworks.",
};

export default function AmenitiesPage() {
  return (
    <>
      <Navbar />
      <AmenitiesContent />
      <Footer />
    </>
  );
}
