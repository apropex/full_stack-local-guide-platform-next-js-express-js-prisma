import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { iGuide } from "@/interfaces/user.interfaces";
import { topRatedGuides } from "@/services/guide.services";
import { ArrowRight, Heart, MapPin, Star, Verified } from "lucide-react";
import Image from "next/image";

// const guidesData = [
//   {
//     id: "1",
//     dailyRate: 45,
//     totalRatings: 545,
//     totalReviews: 120,
//     city: "Sylhet",
//     country: "Bangladesh",
//     expertise: ["Nature", "Hiking"],
//     user: {
//       name: "Jabed Hasan",
//       socialImageUrl: "/author/17.jpg",
//     },
//   },
//   {
//     id: "2",
//     dailyRate: 30,
//     totalRatings: 4.8,
//     totalReviews: 85,
//     city: "Dhaka",
//     country: "Bangladesh",
//     expertise: ["History", "Foodie"],
//     user: {
//       name: "Atiq Hasan",
//       socialImageUrl: "/author/18.jpg",
//     },
//   },
//   {
//     id: "3",
//     dailyRate: 50,
//     totalRatings: 5.0,
//     totalReviews: 42,
//     city: "Bandarban",
//     country: "Bangladesh",
//     expertise: ["Adventure", "Trekking"],
//     user: {
//       name: "Marma Singh",
//       socialImageUrl: "/author/19.jpg",
//     },
//   },
//   {
//     id: "4",
//     dailyRate: 25,
//     totalRatings: 4.7,
//     totalReviews: 200,
//     city: "Cox's Bazar",
//     country: "Bangladesh",
//     expertise: ["Photography", "Relaxation"],
//     user: {
//       name: "Karim Ahmed",
//       socialImageUrl: "/author/20.jpg",
//     },
//   },
//   {
//     id: "5",
//     dailyRate: 45,
//     totalRatings: 4.9,
//     totalReviews: 120,
//     city: "Sylhet",
//     country: "Bangladesh",
//     expertise: ["Nature", "Hiking"],
//     user: {
//       name: "Jabed Hasan",
//       socialImageUrl: "/author/17.jpg",
//     },
//   },
//   {
//     id: "6",
//     dailyRate: 30,
//     totalRatings: 4.8,
//     totalReviews: 85,
//     city: "Dhaka",
//     country: "Bangladesh",
//     expertise: ["History", "Foodie"],
//     user: {
//       name: "Atiq Hasan",
//       socialImageUrl: "/author/18.jpg",
//     },
//   },
//   {
//     id: "7",
//     dailyRate: 50,
//     totalRatings: 5.0,
//     totalReviews: 42,
//     city: "Bandarban",
//     country: "Bangladesh",
//     expertise: ["Adventure", "Trekking"],
//     user: {
//       name: "Marma Singh",
//       socialImageUrl: "/author/19.jpg",
//     },
//   },
//   {
//     id: "8",
//     dailyRate: 25,
//     totalRatings: 4.7,
//     totalReviews: 200,
//     city: "Cox's Bazar",
//     country: "Bangladesh",
//     expertise: ["Photography", "Relaxation"],
//     user: {
//       name: "Karim Ahmed",
//       socialImageUrl: "/author/20.jpg",
//     },
//   },
// ];

// --- Unique "Profile Style" Guide Card ---

const GuideCard = ({ guide }: { guide: iGuide }) => {
  const avgRating = (guide.totalRatings ?? 0) / (guide.totalReviews ?? 0) || 0;
  const avatar = guide.user?.avatar?.url || guide.user.socialImageUrl;

  return (
    <div className="group h-full p-1">
      <Card className="border border-primary/20 hover:border-primary relative h-full flex flex-col items-center pt-10 pb-6 px-6 overflow-hidden bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:bg-zinc-900/80 rounded-3xl">
        {/* 1. Gradient Border Effect on Hover */}
        <div className="absolute inset-0 rounded-3xl p-0.5 bg-transparent bg-linear-to-b from-transparent to-transparent group-hover:from-primary/10 group-hover:to-purple-500/10 -z-10 transition-all duration-500 opacity-0 group-hover:opacity-100" />

        {/* 2. Top Badges (Floating) */}
        <div className="absolute top-4 right-4 z-10">
          {/* Like/Heart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {avgRating >= 4.5 && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 px-3 py-1 shadow-md">
              Super Guide
            </Badge>
          </div>
        )}

        {/* 3. Avatar Section with Glow */}
        <div className="relative mb-4">
          {/* Subtle Glow behind image */}
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative w-28 h-28 p-1 rounded-full border-2 border-dashed border-muted-foreground/30 group-hover:border-primary/50 group-hover:rotate-12 transition-all duration-700">
            <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-background dark:border-zinc-900 shadow-lg">
              <Image
                src={avatar || "/placeholder-avatar.png"}
                // TODO: crate /placeholder-avatar.png
                alt={guide.user.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* Verified Checkmark Badge */}
            <div className="absolute bottom-1 right-1 bg-background rounded-full p-0.5 shadow-sm">
              <Verified className="w-6 h-6 fill-blue-500 text-white" />
            </div>
          </div>
        </div>

        {/* 4. Name & Location (Centered) */}
        <div className="text-center space-y-1 mb-5 w-full">
          <h3 className="text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {guide.user.name}
          </h3>
          <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {guide.city}, {guide.country}
            </span>
          </div>
        </div>

        {/* 5. Expertise Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 w-full px-2">
          {guide.expertise.slice(0, 3).map((exp, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-card/80 border border-foreground/40"
            >
              {exp}
            </span>
          ))}
        </div>

        {/* 6. Stats Grid (Divider based) */}
        <div className="w-full grid grid-cols-2 divide-x divide-border/50 border-t border-b border-border/50 py-3 mb-5 bg-secondary/5">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <div className="flex items-center gap-1 font-bold text-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {avgRating}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Rating
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="font-bold text-foreground">
              {guide.totalReviews}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
              Reviews
            </span>
          </div>
        </div>

        {/* 7. Footer: Price & Action */}
        <div className="w-full flex items-center justify-between mt-auto px-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">
                ${guide.dailyRate}
              </span>
              <span className="text-sm text-muted-foreground">/day</span>
            </div>
          </div>
          <Button
            size="icon"
            className="rounded-full w-10 h-10 shadow-md group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

// --- Main Section ---
export default async function TopRatedGuides() {
  const result = await topRatedGuides();

  if (!result.success) return null;

  return (
    <SectionContainer className="bg-card/60">
      {/* Section Header with stylized underline */}
      <div className="mb-21 text-center max-w-2xl mx-auto">
        <Badge
          variant="outline"
          className="mb-4 py-1.5 px-4 rounded-full border-primary/20 bg-primary/5 text-primary"
        >
          Trusted Locals
        </Badge>

        <SectionTitle
          title="Top Rated"
          highlight="Guides"
          description="Explore the city with locals who know every corner, story, and secret spot."
        />
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 pb-8">
            {(result.data as iGuide[])?.map((guide) => (
              <CarouselItem
                key={guide.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/3"
              >
                <GuideCard guide={guide} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Custom Navigation Buttons (Centered below or on sides) */}
          <div className="hidden md:flex justify-end gap-2 absolute -top-16 right-[50%] translate-x-[50%]">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 border-muted bg-background hover:bg-primary hover:text-white" />
            <CarouselNext className="static translate-y-0 h-10 w-10 border-muted bg-background hover:bg-primary hover:text-white" />
          </div>
        </Carousel>
      </div>

      <div className="mt-8 text-center md:hidden">
        <Button className="w-full" size="lg">
          Explore All Guides
        </Button>
      </div>
    </SectionContainer>
  );
}
