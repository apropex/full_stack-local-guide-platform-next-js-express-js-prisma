import FeaturedDestinations from "@/components/modules/home/FeaturedDestinations";
import Hero from "@/components/modules/home/hero/Hero";
import TrustSignals from "@/components/modules/home/TrustSignals";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <TrustSignals />
      <FeaturedDestinations />
    </div>
  );
}
