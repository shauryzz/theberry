import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SolutionsContent from "../../components/SolutionsContent";

export const metadata = {
  title: "Solutions · The Berry Coworks",
  description:
    "A dedicated desk when you need your own spot, a flexible setup when things change, or a managed office when your team needs more. Find the setup that works for you.",
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