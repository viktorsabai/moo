import { BusinessCalculator } from "./components/BusinessCalculator";
import { FaqSection } from "./components/FaqSection";
import { HeroSection } from "./components/HeroSection";
import { LandingHeader } from "./components/LandingHeader";
import { OfferFooter } from "./components/OfferFooter";
import { ScrollStorySection } from "./components/ScrollStorySection";
import { SiteFooter } from "./components/SiteFooter";

export default function HomePage() {
  return (
    <main className="moo-page">
      <LandingHeader />
      <HeroSection />
      <ScrollStorySection />
      <BusinessCalculator />
      <FaqSection />
      <OfferFooter />
      <SiteFooter />
    </main>
  );
}
