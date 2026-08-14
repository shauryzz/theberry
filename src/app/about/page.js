import Navbar       from "../../components/Navbar";
import AboutContent  from "../../components/AboutContent";
import Footer        from "../../components/Footer";

export const metadata = {
  title: "About · The Berry Coworks",
  description:
    "Founded in 2020, The Berry Coworks builds coworking and office spaces around how people work today, with a focus on design, accessibility and the everyday work experience.",
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
