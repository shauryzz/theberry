import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LegalContent from "../../../components/LegalContent";

export const metadata = {
  title: "Terms of Service · The Berry Coworks",
  description:
    "The terms governing your use of The Berry Coworks website, including content, payments, KYC, cancellations and user conduct.",
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
