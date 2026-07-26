import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SolutionsContent from "../../components/SolutionsContent";

export const metadata = {
  title: "Solutions · The Berry Coworks",
  description:
    "Private cabins, managed offices, and multi-location access for teams and enterprises across Barakhamba, Jhandewalan & Noida. We design the space, run the fit-out, and handle the day-to-day.",
};

export default function SolutionsPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <SolutionsContent />
      <Footer />
    </main>
  );
}