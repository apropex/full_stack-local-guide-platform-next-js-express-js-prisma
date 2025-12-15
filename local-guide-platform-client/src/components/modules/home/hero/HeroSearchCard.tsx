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
import { MapPin, Search } from "lucide-react";

export default function HeroSearchCard() {
  return (
    <div className="sm:min-w-110">
      <div className="relative rounded-2xl p-4 md:p-5 bg-black/20 backdrop-blur-sm border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* subtle glow */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/20 to-transparent opacity-60 pointer-events-none" />

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
                  placeholder="Where are you going?"
                  className="h-6 border-0 bg-transparent p-0 text-sm text-white placeholder:text-white/50 focus-visible:ring-0"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs text-white/70">Category</label>
              <Select>
                <SelectTrigger
                  className="data-[size=default]:h-10.5 data-[size=sm]:h-8 bg-transparent text-white border border-white/20
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
            className="
              w-full h-11 rounded-xl
              bg-primary text-white
              hover:bg-primary/90
              shadow-lg shadow-primary/30
            "
          >
            <Search className="size-4 mr-2" />
            Search Tours
          </Button>
        </div>
      </div>
    </div>
  );
}
