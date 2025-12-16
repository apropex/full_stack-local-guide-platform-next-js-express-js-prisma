import CustomButton from "@/components/buttons/CustomButton";
import Link from "next/link";
import HeroSearchCard from "./HeroSearchCard";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen ">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/hero-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay (optional) */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Foreground Content */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto h-full min-h-screen relative z-1 flex flex-col md:flex-row items-center justify-center md:justify-between gap-10">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-center md:items-start justify-center md:justify-start text-center md:text-left text-white ">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-bold max-w-3xl">
              Explore the unseen side of the world with LASV Guides
            </h1>
            <p className="mt-4 text-sm sm:text-xl max-w-2xl">
              Book authentic tours with verified local experts instantly
            </p>
            <Link href={"/tours"} className="block w-full max-w-60">
              <CustomButton className="mt-6 w-full h-14 bg-white/90 hover:bg-white text-black px-6 py-3 rounded-lg font-semibold ">
                Get Started
              </CustomButton>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <HeroSearchCard />
        </div>
      </div>
    </section>
  );
}
