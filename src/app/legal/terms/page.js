import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LegalContent from "../../../components/LegalContent";

export const metadata = {
  title: "Terms of Service · The Berry Coworks",
  description:
    "These terms explain how bookings and services work at The Berry Coworks, along with the policies that apply when you use our spaces and services.",
};

export default function TermsPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <LegalContent kind="terms" />
      <Footer />
    </main>
  );
}
