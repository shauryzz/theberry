import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WorkspacesContent from "../../components/WorkspacesContent";

export const metadata = {
  title: "Workspaces & Pricing | The Berry Coworks",
  description:
    "Hot desks, dedicated desks, private cabins, and custom suites across Connaught Place, Jhandewalan, and Noida. Find the right plan for the way you work.",
};

export default function WorkspacesPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <WorkspacesContent />
      <Footer />
    </main>
  );
}
