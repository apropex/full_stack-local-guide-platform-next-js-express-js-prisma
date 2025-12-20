"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { tourCategories } from "@/constants";

import { cn } from "@/lib/utils";
import {
  Loader2,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function TourFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  // --- Local States for Controlled Inputs ---
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const [price, setPrice] = useState(Number(searchParams.get("price")) || 5000);

  // Advanced filters states
  const [location, setLocation] = useState(
    searchParams.get("location")?.toString() || "",
  );
  const [duration, setDuration] = useState(
    searchParams.get("duration")?.toString() || "",
  );
  const [groupSize, setGroupSize] = useState(
    searchParams.get("maxGroupSize")?.toString() || "",
  );
  const [tags, setTags] = useState(searchParams.get("tags")?.toString() || "");

  // --- Helper: Update URL ---
  const updateURL = (paramsToUpdate: { [key: string]: string | null }) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  // --- Handlers ---

  // 1. Debounced Handler for URL Update
  const handleDebouncedURLUpdate = useDebouncedCallback(
    (key: string, value: string) => {
      updateURL({ [key]: value });
    },
    500,
  );

  // 2. Input Change Handlers (Instant UI update + Debounced URL)
  const handleSearchChange = (val: string) => {
    setSearch(val);
    handleDebouncedURLUpdate("search", val);
  };

  const handlePriceChange = (value: number[]) => {
    setPrice(value[0]);
    handleDebouncedURLUpdate("price", value[0].toString());
  };

  const handleLocationChange = (val: string) => {
    setLocation(val);
    handleDebouncedURLUpdate("location", val);
  };

  const handleDurationChange = (val: string) => {
    setDuration(val);
    handleDebouncedURLUpdate("duration", val);
  };

  const handleGroupSizeChange = (val: string) => {
    setGroupSize(val);
    handleDebouncedURLUpdate("maxGroupSize", val);
  };

  const handleTagsChange = (val: string) => {
    setTags(val);
    handleDebouncedURLUpdate("tags", val);
  };

  // 3. Direct Change (Selects)
  const handleDirectChange = (key: string, value: string) => {
    updateURL({ [key]: value });
  };

  // 4. Clear All Function
  const handleClearFilter = () => {
    // 1. Reset Local States Immediately
    setSearch("");
    setPrice(5000);
    setLocation("");
    setDuration("");
    setGroupSize("");
    setTags("");

    // 2. Reset URL
    startTransition(() => {
      replace(`${pathname}`);
    });
  };

  // 5. Sync State on External Navigation (Optional but Good)
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== search && !isPending) {
      setSearch(currentSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]); // search dependency cannot be provided, it may cause a loop.

  return (
    <aside
      className={cn("w-full h-fit sticky top-24 overflow-hidden", className)}
    >
      {/* Premium Glass Card Container */}
      <div
        className={cn(
          "rounded-xl border border-black/20 dark:border-white/20 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl shadow-2xl shadow-zinc-200/50 dark:shadow-zinc-900/50 overflow-hidden transition-all duration-300 px-1 relative",
          isPending && "opacity-80",
        )}
      >
        {/* Loading Overlay (Optional Premium Touch) */}
        {isPending && (
          <div className="absolute top-2 right-2 z-50 animate-spin text-primary">
            <Loader2 size={16} />
          </div>
        )}

        {/* Header Section */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-border/40">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            <h2 className="text-lg font-serif tracking-wide font-medium text-foreground">
              Refine Search
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilter}
            disabled={isPending}
            className="h-8 px-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            Reset{" "}
            <RotateCcw
              className={cn("ml-1 size-3", isPending && "animate-spin")}
            />
          </Button>
        </div>

        <div className="p-6 space-y-8">
          {/* 1. KEYWORD SEARCH (Controlled) */}
          <div className="space-y-3 group">
            <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Destination / Keyword
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Where to next?"
                className="pl-8 border-0 border-b border-border/60 rounded-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 text-base font-medium transition-all"
              />
            </div>
          </div>

          {/* 2. CATEGORY (Select - Directly driven by URL params is fine, or state) */}
          <div className="space-y-3">
            <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Experience Type
            </Label>
            <Select
              value={searchParams.get("category")?.toString() || ""}
              onValueChange={(val) => handleDirectChange("category", val)}
            >
              <SelectTrigger className="w-full border-border/40 bg-background/50 focus:ring-0 focus:ring-offset-0 hover:bg-background/80 transition-all h-11">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {tourCategories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-sm cursor-pointer"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. PRICE RANGE (Controlled Slider) */}
          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-end">
              <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Budget
              </Label>
              <Badge
                variant="secondary"
                className="font-mono text-base px-2 py-0.5 bg-primary/10 text-primary border-0 rounded-sm"
              >
                Up to ${price}
              </Badge>
            </div>
            <Slider
              value={[price]}
              max={10000}
              step={100}
              onValueChange={handlePriceChange}
              className="py-4 [&>.relative>.bg-primary]:bg-primary [&>.block]:border-primary/50 [&>.block]:bg-background [&>.block]:ring-offset-background"
            />
          </div>

          <Separator className="bg-border/40" />

          {/* 4. SORTING & ORDER */}
          <div className="flex gap-4">
            <div className="space-y-2 w-full">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Sort By
              </Label>
              <Select
                value={searchParams.get("sortBy") || ""}
                onValueChange={(val) => handleDirectChange("sortBy", val)}
              >
                <SelectTrigger className="h-9 w-full text-sm border-border/40 bg-transparent">
                  <SelectValue placeholder="Recommended" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Order
              </Label>
              <Select
                value={searchParams.get("sortOrder") || "desc"}
                onValueChange={(val) => handleDirectChange("sortOrder", val)}
              >
                <SelectTrigger className="h-9 w-full text-sm border-border/40 bg-transparent">
                  <SelectValue placeholder="Ascending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Low to High</SelectItem>
                  <SelectItem value="desc">High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 5. ADVANCED FILTERS (Controlled Inputs) */}
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-border/40"
          >
            <AccordionItem value="advanced" className="border-b-0">
              <AccordionTrigger className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary py-4 hover:no-underline">
                Advanced Filters
              </AccordionTrigger>
              <AccordionContent className="space-y-5 px-1 pt-2">
                {/* Location */}
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                    <Input
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      placeholder="Specific Location..."
                      className="pl-8 h-9 text-xs bg-muted/30 border-transparent focus:bg-background focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                {/* Duration & Group Size */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">
                      Max Duration
                    </Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      placeholder="e.g. 5"
                      className="h-8 text-xs bg-muted/30 border-transparent"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm text-muted-foreground">
                      Group Size
                    </Label>
                    <Input
                      type="number"
                      value={groupSize}
                      onChange={(e) => handleGroupSizeChange(e.target.value)}
                      placeholder="e.g. 10"
                      className="h-8 text-xs bg-muted/30 border-transparent"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-muted-foreground">
                    Filter by Tags
                  </Label>
                  <Input
                    value={tags}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="adventure, couple, food..."
                    className="h-9 text-xs bg-muted/30 border-transparent"
                  />
                </div>

                {/* Rating - Directly Driven by URL is fine for buttons */}
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Minimum Rating
                  </Label>
                  <div className="flex gap-2">
                    {[5, 4, 3].map((star) => (
                      <button
                        key={star}
                        onClick={() =>
                          handleDirectChange("rating", star.toString())
                        }
                        className={cn(
                          "flex-1 py-1.5 text-xs border rounded-md transition-all",
                          searchParams.get("rating") === star.toString()
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border/60 hover:border-primary/50 text-muted-foreground",
                        )}
                      >
                        {star}+ ★
                      </button>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Decorative Blur Element */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 dark:bg-primary/25 rounded-full blur-[80px] -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-[80px] -z-10 pointer-events-none" />
    </aside>
  );
}
