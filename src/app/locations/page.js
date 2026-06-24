import Navbar           from "../../components/Navbar";
import LocationsContent  from "../../components/LocationsContent";
import Footer            from "../../components/Footer";

export const metadata = {
  title: "Locations · The Berry Coworks",
  description:
    "Premium coworking spaces across Delhi NCR's most-wanted neighbourhoods — Connaught Place, Jhandewalan, and Noida.",
};

export default function LocationsPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <LocationsContent />
      <Footer />
    </main>
  );
}
