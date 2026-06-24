import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import Marquee from "../components/Marquee";
import About from "../components/About";
import TrustedBy from "../components/TrustedBy";
import PullQuote from "../components/PullQuote";
import WorkspaceTypes from "../components/WorkspaceTypes";
import Featured from "../components/Featured";
import Testimonials from "../components/Testimonials";
import AppShowcase from "../components/AppShowcase";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[#fafaf7] overflow-x-hidden">
      <Navbar />
      <LandingPage />
      <Marquee />
      <About />
      <TrustedBy />
      <PullQuote />
      <WorkspaceTypes />
      <Featured />
      <Testimonials />
      <AppShowcase />
      <FinalCTA />
      <Footer />
    </main>
  );
}
