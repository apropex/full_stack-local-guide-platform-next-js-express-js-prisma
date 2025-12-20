import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { iTour } from "@/interfaces/tour.interfaces";
import { ArrowRight, Clock, Heart, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TourCardProps {
  tour: iTour;
}

export default function TourCard({ tour }: TourCardProps) {
  const {
    id,
    title,
    description,
    price,
    duration,
    durationType,
    location,
    rating,
    totalReviews,
    images,
  } = tour;

  const imageUrl = images?.[0]?.url ?? "/placeholder-tour.jpg";

  return (
    <Link href={`/tours/${id}`} className="block w-full group">
      <Card className="py-0 relative flex flex-col md:flex-row overflow-hidden border border-zinc-200/60 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900 rounded-4xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-zinc-300 dark:hover:border-zinc-700">
        {/* --- Left Side: Image Section (40% width on Desktop) --- */}
        <div className="relative w-full md:w-[40%] h-64 md:h-auto shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={false}
          />

          {/* Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

          {/* Top Left Badge: Location */}
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-white/95 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-800 dark:text-zinc-200 hover:bg-white border-0 px-3 py-1.5 shadow-sm font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {location}
            </Badge>
          </div>

          {/* Top Right: Wishlist/Heart Icon (Optional Decorative) */}
          <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white text-white hover:text-red-500 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* --- Right Side: Content Section --- */}
        <div className="flex flex-col flex-1 p-6 md:p-8 justify-between">
          {/* Top Row: Rating & Category */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-zinc-900 dark:text-zinc-100">{rating}</span>
              <span className="text-zinc-400">({totalReviews} reviews)</span>
            </div>

            {/* Optional Tag - e.g. "Best Seller" or just Type */}
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2.5 py-1 rounded-md">
              Adventure
            </span>
          </div>

          {/* Main Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Features Grid / Pills */}
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {duration} {durationType}
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full">
                <Users className="w-3.5 h-3.5" />
                Group Tour
              </div>
            </div>
          </div>

          {/* Footer Section: Price & CTA */}
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide mb-1">
                Starting from
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                  ${price.toFixed(0)}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                  / person
                </span>
              </div>
            </div>

            {/* Custom Styled Button */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 px-5 py-2.5 rounded-full transition-all group-hover:bg-blue-600 dark:group-hover:bg-blue-500 dark:group-hover:text-white group-hover:pl-6 group-hover:pr-4">
              Book Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
