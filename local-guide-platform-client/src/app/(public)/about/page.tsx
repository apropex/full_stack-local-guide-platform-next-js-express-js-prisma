import AboutHero from "@/components/modules/about/AboutHero";
import CoreValues from "@/components/modules/about/CoreValues";
import TeamSection from "@/components/modules/about/TeamSection";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CoreValues />
      <TeamSection />
    </div>
  );
}
