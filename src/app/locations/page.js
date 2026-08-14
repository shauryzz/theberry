import Navbar           from "../../components/Navbar";
import LocationsContent  from "../../components/LocationsContent";
import Footer            from "../../components/Footer";

export const metadata = {
  title: "Locations · The Berry Coworks",
  description:
    "Explore The Berry Coworks locations and find a workspace that fits your needs. With new spaces opening across Delhi NCR and beyond, we’re continuing to grow into new places.",
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
