import HeroSection from "@/components/landing/HeroSection";
import PhilosophySection from "@/components/landing/PhilosophySection";
import SpecialistsSection from "@/components/landing/SpecialistsSection";
import ConciergeServices from "@/components/landing/ConciergeServices";
import Testimonials from "@/components/landing/Testimonials";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <main>
        <HeroSection />
        <PhilosophySection />
        <SpecialistsSection />
        <ConciergeServices />
        <Testimonials />
      </main>
    </div>
  );
}
