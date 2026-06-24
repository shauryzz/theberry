import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LegalContent from "../../../components/LegalContent";

export const metadata = {
  title: "Terms of Service — The Berry Coworks",
  description:
    "Terms of Service for theberrycoworks.com and our coworking spaces in Connaught Place, Jhandewalan & Noida.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <LegalContent kind="terms" />
      <Footer />
    </>
  );
}
