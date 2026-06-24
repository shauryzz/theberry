import { notFound } from "next/navigation";
import Navbar         from "../../../components/Navbar";
import LocationDetail from "../../../components/LocationDetail";
import Footer         from "../../../components/Footer";
import { LOCATIONS, getLocationById } from "../../../data/locations";

// Pre-render every location at build time.
export function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ id: loc.id }));
}

// Per-location SEO metadata.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const location = getLocationById(id);
  if (!location) return { title: "Not Found · The Berry Coworks" };

  return {
    title: `${location.label} · The Berry Coworks`,
    description: `Premium coworking space in ${location.label}, Delhi NCR. ${location.desc || ""}`.trim(),
  };
}

export default async function LocationDetailPage({ params }) {
  const { id } = await params;
  const location = getLocationById(id);
  if (!location) notFound();

  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <LocationDetail location={location} />
      <Footer />
    </main>
  );
}
