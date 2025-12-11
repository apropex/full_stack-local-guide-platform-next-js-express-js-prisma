import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { iTour } from "@/interfaces/tour.interfaces";
import { Star } from "lucide-react";
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

  const imageUrl = images?.[0]?.url ?? "";

  return (
    <Link href={`/tours/${id}`} className="block">
      <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-white dark:bg-gray-800 border-none shadow-md">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <Badge className="absolute top-2 right-2 bg-blue-600 text-white">
              {location}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 truncate">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center mt-2 text-sm text-gray-700 dark:text-gray-300">
            <span>
              {duration} {durationType.toLowerCase()}
            </span>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {rating} ({totalReviews})
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ${price.toFixed(2)}
          </span>
          <Badge variant="secondary" className="text-xs">
            Book Now
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
