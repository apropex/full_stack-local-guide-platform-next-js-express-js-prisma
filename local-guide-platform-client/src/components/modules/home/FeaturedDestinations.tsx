"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  {
    id: 1,
    name: "Sylhet",
    image: "/bento/3.jpg",
    guides: 56,
    className: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    name: "Cox's Bazar",
    image: "/bento/38.jpg",
    guides: 84,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    name: "Dhaka",
    image: "/bento/41.jpg",
    guides: 120,
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 4,
    name: "Bandarban",
    image: "/bento/51.jpg",
    guides: 32,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    name: "Chittagong",
    image: "/bento/60.jpg",
    guides: 45,
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 6,
    name: "Rangamati",
    image: "/bento/47.jpg",
    guides: 32,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 7,
    name: "Hathazari",
    image: "/bento/2.jpg",
    guides: 32,
    className: "md:col-span-1 md:row-span-1",
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-24 md:py-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Popular Destinations
            </h2>
            <p className="mt-3 text-slate-500 dark:text-muted-foreground text-lg">
              Explore the hidden gems guided by locals who know them best.
            </p>
          </div>

          {/* View All button */}
          <Link
            href="#"
            className="group flex items-center gap-2 text-base font-semibold text-primary hover:text-primary/80 transition-colors bg-gray-100 dark:bg-white/90 dark:hover:bg-white px-3 py-1.5 rounded"
          >
            View all cities
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {destinations.map((city) => (
            <Link
              href={`/explore?city=${city.name}`}
              key={city.id}
              className={`relative group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${city.className}`}
            >
              <Image
                src={city.image}
                alt={city.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={city.id === 1} // First image will load quickly
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* content */}
              <div className="absolute bottom-0 left-0 p-6 w-full text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                  <span className="bg-white/20 backdrop-blur-md text-xs px-2 py-1 rounded-full font-medium border border-white/10">
                    {city.guides}+ Guides
                  </span>
                </div>

                <h3 className="text-2xl font-bold tracking-wide">
                  {city.name}
                </h3>

                <div className="flex items-center gap-1 text-slate-300 text-sm mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Bangladesh</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
