import ExperiencesByCategory from "@/components/modules/home/ExperiencesByCategory";
import FeaturedDestinations from "@/components/modules/home/FeaturedDestinations";
import Hero from "@/components/modules/home/hero/Hero";
import JoinAsGuide from "@/components/modules/home/JoinAsGuide";
import Testimonials from "@/components/modules/home/Testimonials";
import TopRatedGuides from "@/components/modules/home/TopRatedGuidesCard";
import TrustSignals from "@/components/modules/home/TrustSignals";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <TrustSignals />
      <FeaturedDestinations />
      <TopRatedGuides />
      <ExperiencesByCategory />
      <JoinAsGuide />
      <Testimonials />
    </div>
  );
}
