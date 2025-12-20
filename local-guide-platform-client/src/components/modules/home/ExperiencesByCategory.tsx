"use client";

import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { iTour } from "@/interfaces/tour.interfaces";
import { cn } from "@/lib/utils";
import { getAllToursPublic } from "@/services/tour.services";
import {
  Camera,
  Clock,
  Compass,
  Heart,
  Landmark,
  MapPin,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

// --- Types based on Prisma ---
type TourType = {
  id: string;
  title: string;
  price: number;
  duration: number;
  durationType: "HOURS" | "DAYS";
  location: string;
  maxGroupSize: number;
  category: string;
  rating: number;
  totalReviews: number;
  images: { url: string }[];
  isDiscounted?: boolean; // Optional visual flair
  discountedPrice?: number;
};

// --- Categories Config ---
const categories = [
  {
    id: "Photography",
    label: "Photography",
    icon: Camera,
    color: "text-blue-500",
  },
  { id: "Food", label: "Food Crawl", icon: Utensils, color: "text-orange-500" },
  {
    id: "Heritage",
    label: "Heritage",
    icon: Landmark,
    color: "text-amber-600",
  },
  {
    id: "Adventure",
    label: "Adventure",
    icon: Compass,
    color: "text-emerald-500",
  },
];

// --- Mock Data ---
const tours: TourType[] = [
  // Food
  {
    id: "1",
    title: "Old Dhaka Street Food Safari",
    price: 35,
    duration: 4,
    durationType: "HOURS",
    location: "Dhaka, Bangladesh",
    maxGroupSize: 10,
    category: "Food",
    rating: 4.8,
    totalReviews: 156,
    images: [{ url: "/bento/3.jpg" }],
  },
  {
    id: "2",
    title: "Traditional Bengali Cooking Class",
    price: 50,
    duration: 3,
    durationType: "HOURS",
    location: "Sylhet",
    maxGroupSize: 6,
    category: "Food",
    rating: 5.0,
    totalReviews: 45,
    images: [{ url: "/bento/38.jpg" }],
  },
  // Adventure
  {
    id: "3",
    title: "Ratargul Swamp Forest Kayaking",
    price: 65,
    duration: 1,
    durationType: "DAYS",
    location: "Sylhet",
    maxGroupSize: 8,
    category: "Adventure",
    rating: 4.9,
    totalReviews: 210,
    images: [{ url: "/bento/41.jpg" }],
    isDiscounted: true,
    discountedPrice: 55,
  },
  {
    id: "4",
    title: "Bandarban Hill Trekking Expedition",
    price: 120,
    duration: 2,
    durationType: "DAYS",
    location: "Bandarban",
    maxGroupSize: 12,
    category: "Adventure",
    rating: 4.7,
    totalReviews: 89,
    images: [{ url: "/bento/51.jpg" }],
  },
  // Heritage
  {
    id: "5",
    title: "Lalbagh Fort Historical Walk",
    price: 20,
    duration: 3,
    durationType: "HOURS",
    location: "Dhaka",
    maxGroupSize: 20,
    category: "Heritage",
    rating: 4.6,
    totalReviews: 320,
    images: [{ url: "/bento/60.jpg" }],
  },
  // Photography
  {
    id: "6",
    title: "Sunrise Photography at Cox's Bazar",
    price: 55,
    duration: 3,
    durationType: "HOURS",
    location: "Cox's Bazar",
    maxGroupSize: 4,
    category: "Photography",
    rating: 4.8,
    totalReviews: 92,
    images: [{ url: "/bento/41.jpg" }],
  },
  {
    id: "7",
    title: "Golden Hour Street Photography Walk",
    price: 30,
    duration: 2,
    durationType: "HOURS",
    location: "Dhaka",
    maxGroupSize: 6,
    category: "Photography",
    rating: 4.7,
    totalReviews: 58,
    images: [{ url: "/bento/60.jpg" }],
  },
  {
    id: "8",
    title: "Mountain Landscape Photography Tour",
    price: 70,
    duration: 1,
    durationType: "DAYS",
    location: "Bandarban",
    maxGroupSize: 5,
    category: "Photography",
    rating: 4.9,
    totalReviews: 110,
    images: [{ url: "/bento/2.jpg" }],
  },
  {
    id: "9",
    title: "Night Sky & Astrophotography Session",
    price: 65,
    duration: 5,
    durationType: "HOURS",
    location: "Sajek Valley",
    maxGroupSize: 4,
    category: "Photography",
    rating: 4.8,
    totalReviews: 67,
    images: [{ url: "/bento/3.jpg" }],
  },
];

// --- Component: Tour Card ---
const TourCard = ({ tour }: { tour: TourType }) => {
  return (
    <div className="group h-full">
      <Card className="pt-0 h-full border-0 shadow-md bg-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-zinc-900/60">
        {/* Image Container */}
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={tour.images[0]?.url || "/placeholder-tour.jpg"}
            alt={tour.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge
              variant="secondary"
              className="bg-white/90 text-black backdrop-blur-md font-semibold shadow-sm hover:bg-white"
            >
              {tour.category}
            </Badge>
          </div>

          <div className="absolute top-3 right-3">
            <button className="p-2 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-red-500 hover:text-white transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Info on Image */}
          <div className="absolute bottom-3 left-3 text-white flex items-center gap-3 text-xs font-medium">
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration} {tour.durationType === "HOURS" ? "Hours" : "Days"}
            </div>
            <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full backdrop-blur-sm">
              <Users className="w-3.5 h-3.5" />
              Max {tour.maxGroupSize}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <CardContent className="p-5 flex flex-col grow gap-3">
          {/* Location */}
          <div className="flex items-center text-muted-foreground text-xs font-medium uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 mr-1" />
            {tour.location}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {tour.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-sm">{tour.rating}</span>
            <span className="text-muted-foreground text-xs">
              ({tour.totalReviews} reviews)
            </span>
          </div>

          {/* Footer: Price & Button */}
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">From</span>
              <div className="flex items-baseline gap-2">
                {tour.isDiscounted && (
                  <span className="text-sm line-through text-muted-foreground">
                    ${tour.price}
                  </span>
                )}
                <span className="text-xl font-bold text-primary">
                  ${tour.isDiscounted ? tour.discountedPrice : tour.price}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white dark:hover:text-white transition-all"
            >
              Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// --- Main Section Component ---
export default function ExperiencesByCategory() {
  const [activeCategory, setActiveCategory] = React.useState("Photography");
  const [isAnimating, setIsAnimating] = React.useState(false);
  const [tours, setTours] = React.useState<iTour[]>([]);

  // Filter Logic (In real app, this would be an API call)
  // For demo, if less than 4 items, we might just duplicate or show what we have
  const filteredTours = tours.filter((t) => t.category === activeCategory);

  // Fill up to 4 items for UI demo (optional logic)
  const displayTours =
    filteredTours.length > 0 ? filteredTours : tours.slice(0, 4);

  const handleCategoryChange = (catId: string) => {
    if (catId === activeCategory) return;
    setIsAnimating(true);
    setActiveCategory(catId);
    setTimeout(() => setIsAnimating(false), 300); // Simple fade timing
  };

  React.useEffect(() => {
    if (tours?.[0]?.category === activeCategory) return;
    (async () => {
      const result = await getAllToursPublic(
        `category=${activeCategory}&limit=4`,
      );
      if (result.success) setTours(result.data as iTour[]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <SectionContainer>
      {/* Header */}
      <SectionTitle
        title="Discover by"
        highlight="Interest"
        description="Whether you are a foodie, a history buff, or an adrenaline junkie, we have curated experiences just for you."
        className="max-w-xl mx-auto text-center mb-8 md:mb-12"
      />

      {/* Category Tabs (Horizontal Scroll on Mobile) */}
      <div className="flex flex-wrap justify-center overflow-x-auto pb-4 mb-8 gap-4 no-scrollbar px-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 md:px-6 py-1.5 md:py-3 rounded-full text-sm font-medium transition-all duration-300 border whitespace-nowrap",
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg scale-105"
                  : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("w-4 h-4", isActive ? "text-white" : cat.color)}
              />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Content Grid */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ease-in-out min-h-[400px]",
          isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0",
        )}
      >
        {displayTours.length > 0 ? (
          displayTours.map((tour) => <TourCard key={tour.id} tour={tour} />)
        ) : (
          <div className="col-span-4 flex flex-col items-center justify-center text-muted-foreground py-20">
            <Compass className="w-12 h-12 mb-4 opacity-20" />
            <p>No tours found in this category yet.</p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Link href={`/tours?category=${activeCategory}`}>
          <Button variant="link" className="text-primary text-lg gap-1">
            View all {activeCategory} Experiences{" "}
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </Link>
      </div>
    </SectionContainer>
  );
}
