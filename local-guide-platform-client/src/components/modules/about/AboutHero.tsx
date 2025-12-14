import SectionContainer from "@/components/shared/SectionContainer";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function AboutHero() {
  return (
    <SectionContainer containerClass="relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
          <Badge
            variant="outline"
            className="px-4 py-1 text-sm border-primary/20 text-primary bg-primary/5 uppercase tracking-widest"
          >
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
            We are redefining <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              how you travel.
            </span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            TourBook wasn&apos;t built in a boardroom. It started with a
            backpack and a realization: the best stories aren&apos;t found in
            guidebooks, they are told by locals. We are bridging the gap between
            wanderlust and authentic local experiences.
          </p>

          <div className="flex gap-8 pt-4">
            <div>
              <h3 className="text-3xl font-bold text-foreground">50+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                Cities
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <h3 className="text-3xl font-bold text-foreground">12k+</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                Travelers
              </p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <h3 className="text-3xl font-bold text-foreground">4.9</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mt-1">
                Rating
              </p>
            </div>
          </div>
        </div>

        {/* Image Collage */}
        <div className="relative h-[500px] w-full hidden lg:block">
          {/* Main Image */}
          <div className="absolute right-0 top-0 w-3/4 h-5/6 rounded-4xl overflow-hidden shadow-2xl border-4 border-background dark:border-zinc-900 z-10">
            <Image
              src="/bento/38.jpg"
              alt="Travelers"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Secondary Image (Floating) */}
          <div className="absolute left-0 bottom-0 w-1/2 h-1/2 rounded-4xl overflow-hidden shadow-2xl border-4 border-background dark:border-zinc-900 z-20 animate-bounce-slow">
            <Image
              src="/bento/51.jpg"
              alt="Local Guide"
              fill
              className="object-cover"
            />
          </div>
          {/* Decorative Dot Pattern */}
          <div className="absolute top-10 left-10 opacity-20 -z-10">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="currentColor"
              className="text-foreground"
            >
              <pattern
                id="dots"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="2" />
              </pattern>
              <rect width="100" height="100" fill="url(#dots)" />
            </svg>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
