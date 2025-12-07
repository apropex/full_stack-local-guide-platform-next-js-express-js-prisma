//

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-188 overflow-hidden">
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
        <h1 className="text-5xl font-bold">Welcome to Our Website</h1>
        <p className="mt-4 text-xl max-w-2xl">
          This is a professional hero section with continuous background video.
        </p>
        <Link href={"#"}>
          <button className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
}
