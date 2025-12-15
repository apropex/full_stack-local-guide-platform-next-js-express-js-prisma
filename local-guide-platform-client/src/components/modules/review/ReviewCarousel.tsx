"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeCheck, MapPin, Quote, Star } from "lucide-react";
import Image from "next/image";

// --- Types based on Prisma ---
type ReviewWithRelations = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  tourist: {
    name: string;
    socialImageUrl: string | null;
    country?: string;
  };
  tour: {
    title: string;
    location: string;
    image: string; // Thumbnail
  };
  images: { url: string }[]; // Review images
};

// --- Mock Data ---
const reviews: ReviewWithRelations[] = [
  {
    id: "1",
    rating: 5,
    comment:
      "I have traveled to over 30 countries, but this experience in Sylhet was unparalleled. The guide curated a path that felt personal and deeply connected to nature. The boat ride at twilight is a memory I will cherish forever.",
    createdAt: "Oct 12, 2023",
    tourist: {
      name: "Eleanor P.",
      socialImageUrl: "/author/17.jpg",
      country: "United Kingdom",
    },
    tour: {
      title: "Ratargul Swamp Forest Exclusive",
      location: "Sylhet, Bangladesh",
      image: "/bento/2.jpg",
    },
    images: [{ url: "/bento/3.jpg" }, { url: "/bento/38.jpg" }],
  },
  {
    id: "2",
    rating: 5,
    comment:
      "The culinary journey through Old Dhaka was intense, chaotic, and absolutely delicious. Every bite told a story. Our guide didn't just show us food; he showed us the heart of the city.",
    createdAt: "Nov 05, 2023",
    tourist: {
      name: "James Carter",
      socialImageUrl: "/author/18.jpg",
      country: "USA",
    },
    tour: {
      title: "Old Dhaka Heritage Food Walk",
      location: "Dhaka, Bangladesh",
      image: "/bento/60.jpg",
    },
    images: [],
  },
];

export default function ReviewCarousel() {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12 space-y-3">
        <Badge
          variant="outline"
          className="border-primary/20 text-primary uppercase tracking-widest px-4 py-1"
        >
          Guest Stories
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-foreground">
          Unforgettable Moments
        </h2>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem key={review.id} className="basis-full">
              <div>
                <Card className="p-0 overflow-hidden border-0 shadow-2xl bg-background dark:bg-zinc-900 rounded-3xl grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                  {/* --- Left Side: Visuals (Image & User) --- */}
                  <div className="overflow-hidden lg:col-span-5 relative h-64 lg:h-auto w-full group">
                    <Image
                      src={review.tour.image}
                      alt={review.tour.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Floating Tour Location Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-xs border border-white/20 text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5" />
                        {review.tour.location}
                      </div>
                    </div>

                    {/* User Info (Overlapping) */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-4 border-background dark:border-zinc-900 shadow-lg">
                          <AvatarImage
                            src={review.tourist.socialImageUrl || ""}
                          />
                          <AvatarFallback>
                            {review.tourist.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-4 border-background dark:border-zinc-900">
                          <BadgeCheck className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div className="text-white">
                        <h4 className="font-bold text-lg leading-none">
                          {review.tourist.name}
                        </h4>
                        <p className="text-white/70 text-sm mt-1">
                          {review.tourist.country || "Verified Traveler"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* --- Right Side: Content --- */}
                  <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center relative">
                    {/* Large Decorative Quote Icon */}
                    <Quote className="absolute top-8 right-8 w-24 h-24 text-primary/5 rotate-180" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif text-foreground leading-relaxed italic relative z-10">
                      &quot;{review.comment}&quot;
                    </blockquote>

                    {/* Context: Tour Name */}
                    <div className="mt-8 pt-8 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                        Review for Experience
                      </p>
                      <h3 className="text-lg font-bold text-primary">
                        {review.tour.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {review.createdAt}
                      </p>
                    </div>

                    {/* User Uploaded Images (If Any) */}
                    {review.images.length > 0 && (
                      <div className="flex gap-3 mt-6">
                        {review.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative w-16 h-16 rounded-lg overflow-hidden border border-border cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <Image
                              src={img.url}
                              alt="User review"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Mobile Nav */}
        <div className="flex justify-center gap-4 mt-6 ">
          <CarouselPrevious className="static translate-y-0 size-14 backdrop-blur-md shadow-lg border border-slate-400 md:border-slate-200 hover:border-slate-400 dark:md:border-slate-600 dark:hover:border-slate-400/70 bg-slate-500/30 md:bg-slate-500/15 hover:bg-slate-500/30 dark:bg-slate-950/50 dark:md:bg-slate-950/25 dark:hover:bg-slate-950/50 text-slate-800 md:text-slate-500 hover:text-slate-800 dark:text-slate-200 dark:md:text-slate-500 dark:hover:text-slate-200" />
          <CarouselNext className="static translate-y-0 size-14 backdrop-blur-md shadow-lg border border-slate-400 md:border-slate-200 hover:border-slate-400 dark:md:border-slate-600 dark:hover:border-slate-400/70 bg-slate-500/30 md:bg-slate-500/15 hover:bg-slate-500/30 dark:bg-slate-950/50 dark:md:bg-slate-950/25 dark:hover:bg-slate-950/50 text-slate-800 md:text-slate-500 hover:text-slate-800 dark:text-slate-200 dark:md:text-slate-500 dark:hover:text-slate-200" />
        </div>
      </Carousel>
    </div>
  );
}
