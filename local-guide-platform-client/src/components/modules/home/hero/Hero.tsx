import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
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
      <div className="relative z-1 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold max-w-3xl">
          Explore the unseen side of the world with LASV Guides
        </h1>
        <p className="mt-4 text-sm sm:text-xl max-w-2xl">
          Book authentic tours with verified local experts instantly
        </p>
        <Link href={"/tours"}>
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}
