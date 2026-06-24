import Navbar       from "../../components/Navbar";
import AboutContent  from "../../components/AboutContent";
import Footer        from "../../components/Footer";

export const metadata = {
  title: "About · The Berry Coworks",
  description:
    "Founded in 2020 by Parul Jain and Vishesh Kalkhandey, The Berry Coworks runs three coworking spaces across Delhi NCR — built on the belief that great design and genuine accessibility belong together.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  );
}
