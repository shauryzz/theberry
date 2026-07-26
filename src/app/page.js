import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import Marquee from "../components/Marquee";
import About from "../components/About";
import TrustedBy from "../components/TrustedBy";
import PullQuote from "../components/PullQuote";
// DETACHED (Oct 2026) — the "Choose Your Way of Working" plan-card grid was
// pulled from the homepage at the client's request. The component file
// src/components/WorkspaceTypes.jsx is intentionally KEPT and untouched, so
// restoring it is just a matter of uncommenting this import and the tag below.
// Nothing else depends on it: the /workspaces route renders WorkspacesContent,
// which is a different component and is unaffected.
// import WorkspaceTypes from "../components/WorkspaceTypes";
import Featured from "../components/Featured";
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
      {/* DETACHED — see the commented import above. To bring the plan-card
          grid back, uncomment this line and that import. It sat here, between
          PullQuote and Featured. */}
      {/* <WorkspaceTypes /> */}
      <Featured />
      <AppShowcase />
      <FinalCTA />
      <Footer />
    </main>
  );
}