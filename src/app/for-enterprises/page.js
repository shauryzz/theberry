import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import EnterprisesContent from "../../components/EnterprisesContent";

export const metadata = {
  title: "For Enterprises · The Berry Coworks",
  description:
    "Need an office that works around your team? The Berry Coworks takes care of the space, setup and everyday operations, giving businesses a ready-to-use office.",
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