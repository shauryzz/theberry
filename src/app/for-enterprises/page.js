import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EnterprisesContent from "../../components/EnterprisesContent";

export const metadata = {
  title: "For Enterprises · The Berry Coworks",
  description:
    "Managed offices by The Berry Coworks. We source, design, build and run the entire office for your team, then keep it running once you've moved in. Available at Noida.",
};

export default function ForEnterprisesPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <EnterprisesContent />
      <Footer />
    </main>
  );
}