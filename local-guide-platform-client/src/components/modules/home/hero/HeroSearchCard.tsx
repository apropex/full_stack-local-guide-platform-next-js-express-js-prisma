"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tourCategories } from "@/constants";
import { iTour } from "@/interfaces/tour.interfaces";
import { getAllToursPublic } from "@/services/tour.services";
import { join } from "@/utils";
import { DollarSign, MapPin, Search, Star, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSearchCard() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [tours, setTours] = useState<iTour[] | null>(null);

  useEffect(() => {
    if (!location.trim() && !category) return;

    const timer = setTimeout(() => {
      (async () => {
        let query = "";

        if (location.trim()) query = join("search=", location.trim());
        if (category) query = join("category=", category);
        if (location.trim() && category) {
          query = join("search=", location.trim(), "&", "category=", category);
        }

        const result = await getAllToursPublic(query);

        if (result.success) setTours(result.data as iTour[]);
      })();
    }, 555);

    return () => {
      clearTimeout(timer);
    };
  }, [location, category]);

  return (
    <div className="sm:min-w-110">
      <div className="relative rounded-2xl p-4 md:p-5 bg-black/20 backdrop-blur-sm border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-transparent opacity-60 pointer-events-none" />

        {location.trim() && category && (
          <Button
            variant={"outline"}
            size={"icon-sm"}
            onClick={() => {
              setLocation("");
              setCategory("");
            }}
            className="absolute z-10 right-3 top-3 bg-transparent text-white shadow-lg shadow-primary/30 border-white/30 dark:border-white/30"
          >
            <X />
          </Button>
        )}

        <div className="relative space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Find Your Perfect Tour
            </h2>
            <p className="text-xs text-white/70">Explore curated experiences</p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {/* Location */}
            <div className="space-y-1 flex-1">
              <label className="text-xs text-white/70">Location</label>
              <div className="flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 focus-within:border-primary/70 focus-within:ring-2 focus-within:ring-primary/30 transition">
                <MapPin className="size-4 text-white/60" />
                <Input
                  value={location}
                  onChange={({ target }) => setLocation(target.value)}
                  placeholder="Where are you going?"
                  className="h-6 border-0 bg-transparent p-0 text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs text-white/70">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className="data-[size=default]:h-10.5 data-[size=sm]:h-8 bg-transparent dark:bg-transparent text-white border border-white/20 dark:border-white/20
                  focus:ring-2 focus:ring-primary/30 data-placeholder:text-white/50"
                >
                  <SelectValue placeholder="Select tour category" />
                </SelectTrigger>
                <SelectContent>
                  {tourCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Button */}

          <Button
            className="w-full h-11 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30
            "
          >
            <Search className="size-4 mr-1.5" />
            Search Tours
          </Button>
        </div>

        {/* search result */}
        {tours && (location.trim().length > 0 || category.length > 0) && (
          <div className="w-full absolute -bottom-2 left-0 translate-y-full">
            <div className="relative z-10 rounded-2xl p-4 md:p-5 bg-black/20 border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] max-h-60 overflow-y-auto text-white">
              {/* subtle glow */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-transparent opacity-60 pointer-events-none" />

              <div className="flex flex-col gap-2">
                {tours && tours.length > 0 ? (
                  tours?.map((tour) => (
                    <Link
                      key={tour.id}
                      href={join("tours/", tour.id)}
                      className="flex gap-1.5 border-b border-white/40 pb-1.5"
                    >
                      <Image
                        src={tour.images[0]?.url}
                        alt="tour image"
                        width={40}
                        height={30}
                        className="object-cover"
                      />

                      <div>
                        <h5 className="line-clamp-1">{tour.title}</h5>
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center gap-1">
                            <Star
                              size={12}
                              className="text-amber-400 fill-amber-400"
                            />
                            <span className="text-sm">{tour.rating}</span>
                          </div>
                          <div className="flex items-center gap-0.5">
                            <DollarSign size={12} />
                            <span className="text-sm">{tour.price}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-sm">
                            <span>Duration: </span>
                            <span>{tour.duration}</span>
                            <span className="capitalize">
                              {tour.durationType.toLowerCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-0.5 text-sm">
                            <span>Difficulty: </span>
                            <span className="capitalize">
                              {tour.difficulty.toLowerCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>
                    <p className="text-white font-medium">
                      No tours found with this filter
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
