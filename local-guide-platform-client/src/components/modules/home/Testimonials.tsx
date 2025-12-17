import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { iReview } from "@/interfaces/tour.interfaces";
import { getAllReviewsPublic } from "@/services/review.services";
import { CheckCircle2, MapPin, Quote, Star } from "lucide-react";
import Image from "next/image";

// --- Unique Review Card Component ---
const ReviewCard = ({ review }: { review: iReview }) => {
  const tourImage = review.tour.images?.[0].url || "/author/17.jpg";

  return (
    <div className="h-full p-2">
      <Card className="h-full flex flex-col justify-between border-border/40 bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg dark:bg-zinc-900/50 relative overflow-hidden group">
        {/* tour image */}
        <div className="absolute top-0 z-0 max-h-60 overflow-hidden">
          <Image
            src={tourImage}
            alt={review.tour.title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative Quote Icon (Background) */}

        <CardHeader className="px-0 pb-2 pt-38 relative z-10">
          <div className="flex items-center gap-4 px-6 py-2.5 bg-black/50 backdrop-blur-xs">
            <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
              <AvatarImage src={review.tourist.socialImageUrl || ""} />
              <AvatarFallback>{review.tourist.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold text-foreground text-base leading-none">
                {review.tourist.name}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-white/80">
                  • {review.createdAt}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative z-10 py-4">
          <Quote className="absolute z-10 -top-6 right-6 w-16 h-16 text-primary/5 rotate-180 pointer-events-none group-hover:text-primary/10 transition-colors" />
          {/* Verification Badge */}
          <div className="mb-3">
            <Badge
              variant="outline"
              className="text-[10px] py-0 h-5 border-green-200 bg-green-50 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 gap-1 rounded-sm px-1.5"
            >
              <CheckCircle2 className="w-3 h-3" /> Verified Traveler
            </Badge>
          </div>

          <p className="text-muted-foreground leading-relaxed italic relative">
            &quot;{review.comment}&quot;
          </p>

          {/* review images */}
          <div className="mt-6 flex gap-2 rounded-xl overflow-hidden">
            {(
              review.images || [
                { url: "/bento/60.jpg" },
                { url: "/bento/51.jpg" },
                { url: "/bento/41.jpg" },
              ]
            ).map((image, i) => (
              <Image
                key={i}
                src={image.url}
                alt=""
                width={130}
                height={100}
                className="object-cover flex-1"
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 relative z-10 mt-auto">
          {/* Linked Tour Card (Mini) */}
          <div className="w-full  rounded-lg p-2.5 flex items-center gap-3 border border-border/50 group-hover:bg-secondary/7 transition-colors cursor-pointer">
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="size-3" /> {review.tour.location}
              </span>
              <p className="text-sm font-semibold text-foreground truncate w-full">
                {review.tour.title}
              </p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

// --- Main Section Component ---
export default async function Testimonials() {
  const result = await getAllReviewsPublic();

  if (!result.success || !result.data) return null;

  return (
    <SectionContainer>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <SectionTitle
          title="Loved by"
          highlight="Travelers"
          description="Don't just take our word for it. Read honest reviews from travelers who have explored with our guides."
          className="max-w-lg"
        />

        {/* Navigation Controls (will be moved into carousel via CSS or component prop normally, but here placed statically for layout) */}
        <div className="hidden md:flex gap-2">
          {/* Note: In Shadcn carousel, buttons are usually inside. We'll use default positioning or custom below */}
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {(result.data as iReview[]).map((review) => (
            <CarouselItem
              key={review.id}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom positioned buttons */}
        <div className="absolute -top-24 right-0 hidden md:flex gap-2">
          <CarouselPrevious className="static translate-y-0 h-10 w-10 border-input hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="static translate-y-0 h-10 w-10 border-input hover:bg-primary hover:text-primary-foreground" />
        </div>

        {/* Mobile Only Controls (Optional) */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </SectionContainer>
  );
}
