import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { iTour } from "@/interfaces/tour.interfaces";
import { ArrowUpRight, Clock, MapPin, Star } from "lucide-react";
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

  const imageUrl = images?.[0]?.url ?? "/placeholder-tour.jpg"; // Fallback image handling

  return (
    <Link href={`/tours/${id}`} className="block h-full group">
      <Card className="pt-0 h-full flex flex-col border-0 shadow-sm bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 ring-1 ring-zinc-100 dark:ring-zinc-800">
        {/* --- Image Section --- */}
        <div className="relative aspect-4/3 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />

          {/* Overlay Gradient (Subtle) */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Floating Location Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              variant="secondary"
              className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md text-zinc-800 dark:text-zinc-200 border-0 px-3 py-1.5 shadow-sm font-medium gap-1.5 hover:bg-white"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {location}
            </Badge>
          </div>
        </div>

        {/* --- Content Section --- */}
        <CardContent className="flex-1 p-5 space-y-3">
          {/* Title & Arrow */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-zinc-300 group-hover:text-blue-500 transition-colors shrink-0" />
          </div>

          {/* Metadata Row (Duration & Rating) */}
          <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/50 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">
                {duration} {durationType.toLowerCase()}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-zinc-700 dark:text-zinc-300">
                {rating}
              </span>
              <span className="text-xs text-zinc-400">({totalReviews})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </CardContent>

        {/* --- Footer Section --- */}
        <CardFooter className="p-5 pt-0 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50">
          <div className="flex flex-col pt-4">
            <span className="text-xs text-zinc-400 font-medium uppercase tracking-wide">
              From
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ${price.toFixed(0)}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                / person
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Badge className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-blue-600 dark:hover:bg-blue-400 transition-colors px-4 py-1.5 rounded-full font-semibold pointer-events-none group-hover:bg-blue-600 dark:group-hover:bg-blue-400">
              Book Now
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
