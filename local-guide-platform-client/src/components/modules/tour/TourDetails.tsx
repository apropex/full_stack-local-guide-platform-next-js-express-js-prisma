import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { iTour } from "@/interfaces/tour.interfaces";
import { Star } from "lucide-react";
import Image from "next/image";
import BookNowButton from "./BookNowButton";

interface TourDetailsProps {
  tour: iTour;
}

export default function TourDetails({ tour }: TourDetailsProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96"
        style={{ backgroundImage: `url(${tour.images[0].url})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 py-16 flex flex-col justify-end h-full">
          <h1 className="text-4xl font-bold text-white mb-2">{tour.title}</h1>
          <div className="flex items-center text-white">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold">{tour.rating}</span>
            <span className="ml-2 text-sm">({tour.totalReviews} reviews)</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">About This Tour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {tour.description}
              </p>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                {tour.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {tour.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image.url}
                    alt={`Tour image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                    width={300}
                    height={180}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Placeholder */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Coming soon: User reviews and ratings.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Details */}
        <div className="lg:col-span-1 space-y-8">
          {/* Booking Card / CTA */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg sticky top-4">
            <CardHeader>
              <CardTitle className="text-2xl">Book This Tour</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Price:</span>
                <span className="text-xl font-bold">
                  ${tour.price.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Duration:</strong> {tour.duration}{" "}
                  {tour.durationType.toLowerCase()}
                </p>
                <p>
                  <strong>Location:</strong> {tour.location}
                </p>
                <p>
                  <strong>Meeting Point:</strong> {tour.meetingPoint}
                </p>
                <p>
                  <strong>Max Group Size:</strong> {tour.maxGroupSize}
                </p>
                <p>
                  <strong>Difficulty:</strong> {tour.difficulty}
                </p>
              </div>
              <BookNowButton tourId={tour.id} />
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-white dark:bg-gray-800 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {tour.languages.map((lang, index) => (
                    <Badge key={index} variant="secondary">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Includes</h3>
                <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                  {tour.includes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Excludes</h3>
                <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                  {tour.excludes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What to Bring</h3>
                <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                  {tour.whatToBring.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cancellation Policy</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {tour.cancellationPolicy}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
