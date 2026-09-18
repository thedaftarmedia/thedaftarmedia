import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import PhilosophySection from "../components/PhilosophySection";
import BrandSwitcherSection from "../components/BrandSwitcherSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import PartnerEcosystem from "../components/PartnerEcosystem";
import WhoWeWorkWith from "../components/WhoWeWorkWith";
import ServicesPosters from "../components/ServicesPosters";
import CaseStudiesSection from "../components/CaseStudiesSection";
import IndustryMythSection from "../components/IndustryMythSection";
import DaftarDifference from "../components/DaftarDifference";
import SocialProofSection from "../components/SocialProofSection";
import ProcessDesiSection from "../components/ProcessDesiSection";
import BigConversionSection from "../components/BigConversionSection";
import FooterSection from "../components/FooterSection";
import { Marquee } from "../lib/motion";

const MARQUEE_ITEMS = ["Branding", "Creative", "Growth", "Launch", "Performance", "Storytelling", "Digital"];

export default function HomePage() {
  return (
    <main className="flex flex-col mx-auto" data-testid="home-page">
      <Navbar />
      <HeroSection />
      <div className="border-y-2 border-ink bg-hot py-4 text-ink">
        <Marquee>
          {MARQUEE_ITEMS.map((m) => (
            <span key={m} className="mx-6 inline-flex items-center gap-12 font-sans text-xl font-black uppercase tracking-tight md:text-2xl">
              {m} <span className="font-serif italic">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
      <PhilosophySection />
      <BrandSwitcherSection />
      <CapabilitiesSection />
      {/* <PartnerEcosystem /> */}
      <WhoWeWorkWith />
      <ServicesPosters />
      <CaseStudiesSection />
      <IndustryMythSection />
      <DaftarDifference />
      <SocialProofSection />
      <ProcessDesiSection />
      <BigConversionSection />
      <FooterSection />
    </main>
  );
}
