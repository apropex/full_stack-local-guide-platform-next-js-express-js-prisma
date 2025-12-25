/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Briefcase,
  Calendar,
  Clock,
  Compass,
  DollarSign,
  Hash,
  Loader2,
  Map,
  RotateCcw,
  Search,
  Star,
  User,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function GuideFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  // --- Local States for Controlled Inputs ---
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const [expertise, setExpertise] = useState(
    searchParams.get("expertise")?.toString() || "",
  );

  // Numeric Fields
  const [experienceYears, setExperienceYears] = useState(
    searchParams.get("experienceYears")?.toString() || "",
  );
  const [dailyRate, setDailyRate] = useState(
    searchParams.get("dailyRate")?.toString() || "",
  );
  const [hourlyRate, setHourlyRate] = useState(
    searchParams.get("hourlyRate")?.toString() || "",
  );
  const [totalRatings, setTotalRatings] = useState(
    searchParams.get("totalRatings")?.toString() || "",
  );
  const [totalReviews, setTotalReviews] = useState(
    searchParams.get("totalReviews")?.toString() || "",
  );

  // Technical/Other
  const [id, setId] = useState(searchParams.get("id")?.toString() || "");
  const [userId, setUserId] = useState(
    searchParams.get("userId")?.toString() || "",
  );
  const [dob, setDob] = useState(searchParams.get("dob")?.toString() || "");

  // --- Helper: Update URL ---
  const updateURL = (paramsToUpdate: { [key: string]: string | null }) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset pagination

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      // Handle "all" logic for select inputs
      if (value && value.trim() !== "" && value !== "all") {
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
  const handleDebouncedURLUpdate = useDebouncedCallback(
    (key: string, value: string) => {
      updateURL({ [key]: value });
    },
    500,
  );

  // Generic Handler for Text/Number Inputs
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    key: string,
    value: string,
  ) => {
    setter(value);
    handleDebouncedURLUpdate(key, value);
  };

  // Direct Change (Selects)
  const handleDirectChange = (key: string, value: string) => {
    updateURL({ [key]: value });
  };

  // Clear All
  const handleClearFilter = () => {
    setSearch("");
    setExpertise("");
    setExperienceYears("");
    setDailyRate("");
    setHourlyRate("");
    setTotalRatings("");
    setTotalReviews("");
    setId("");
    setUserId("");
    setDob("");

    startTransition(() => {
      replace(`${pathname}`);
    });
  };

  // Sync State on External Navigation
  useEffect(() => {
    const syncState = (key: string, setter: any) => {
      const val = searchParams.get(key) || "";
      setter((prev: string) => (prev !== val && !isPending ? val : prev));
    };

    syncState("search", setSearch);
    syncState("expertise", setExpertise);
    syncState("experienceYears", setExperienceYears);
    syncState("dailyRate", setDailyRate);
    syncState("hourlyRate", setHourlyRate);
    // ... others are less critical for instant sync but good practice to add if needed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
        {/* Loading Overlay */}
        {isPending && (
          <div className="absolute top-2 right-2 z-50 animate-spin text-primary">
            <Loader2 size={16} />
          </div>
        )}

        {/* Header Section */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-border/40">
          <div className="flex items-center gap-2">
            <Compass className="size-5 text-primary" />
            <h2 className="text-lg font-serif tracking-wide font-medium text-foreground">
              Find a Guide
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
          {/* 1. SEARCH & EXPERTISE */}
          <div className="space-y-4">
            <div className="space-y-2 group">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Keywords
              </Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  value={search}
                  onChange={(e) =>
                    handleInputChange(setSearch, "search", e.target.value)
                  }
                  placeholder="Name, Bio or Location..."
                  className="pl-8 border-0 border-b border-border/60 rounded-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 text-base font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Expertise Area
              </Label>
              <div className="relative">
                <Map className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input
                  value={expertise}
                  onChange={(e) =>
                    handleInputChange(setExpertise, "expertise", e.target.value)
                  }
                  placeholder="e.g. Hiking, History, Food..."
                  className="pl-8 h-10 border-border/40 bg-background/50 focus:bg-background transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* 2. EXPERIENCE & VERIFICATION */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase text-muted-foreground">
                Min Experience
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-2 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  type="number"
                  value={experienceYears}
                  onChange={(e) =>
                    handleInputChange(
                      setExperienceYears,
                      "experienceYears",
                      e.target.value,
                    )
                  }
                  placeholder="Years"
                  className="pl-7 h-9 text-xs bg-muted/30 border-transparent focus:bg-background transition-all"
                />
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Label className="text-xs uppercase text-muted-foreground">
                Verified Only
              </Label>
              <Select
                value={searchParams.get("isVerifiedGuide")?.toString() || ""}
                onValueChange={(val) =>
                  handleDirectChange("isVerifiedGuide", val)
                }
              >
                <SelectTrigger className="w-full h-9 text-xs border-border/40 bg-muted/30">
                  <div className="flex items-center gap-1">
                    <BadgeCheck className="size-3 text-muted-foreground" />
                    <SelectValue placeholder="All" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 3. RATES (Daily & Hourly) */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Max Rates
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  type="number"
                  value={dailyRate}
                  onChange={(e) =>
                    handleInputChange(setDailyRate, "dailyRate", e.target.value)
                  }
                  placeholder="Daily"
                  className="pl-7 h-9 text-xs bg-muted/30 border-transparent focus:bg-background transition-all"
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-2 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) =>
                    handleInputChange(
                      setHourlyRate,
                      "hourlyRate",
                      e.target.value,
                    )
                  }
                  placeholder="Hourly"
                  className="pl-7 h-9 text-xs bg-muted/30 border-transparent focus:bg-background transition-all"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-border/40" />

          {/* 4. ADVANCED FILTERS (Accordion) */}
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-border/40"
          >
            <AccordionItem value="advanced" className="border-b-0">
              <AccordionTrigger className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary py-4 hover:no-underline">
                Technical Details
              </AccordionTrigger>
              <AccordionContent className="space-y-5 px-1 pt-2">
                {/* IDs */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Guide ID
                    </Label>
                    <div className="relative">
                      <Hash className="absolute left-2 top-2 size-3 text-muted-foreground" />
                      <Input
                        value={id}
                        onChange={(e) =>
                          handleInputChange(setId, "id", e.target.value)
                        }
                        placeholder="Guide ID"
                        className="pl-6 h-8 text-xs font-mono bg-muted/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      User ID
                    </Label>
                    <div className="relative">
                      <User className="absolute left-2 top-2 size-3 text-muted-foreground" />
                      <Input
                        value={userId}
                        onChange={(e) =>
                          handleInputChange(setUserId, "userId", e.target.value)
                        }
                        placeholder="Linked User ID"
                        className="pl-6 h-8 text-xs font-mono bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Ratings & Reviews */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Min Rating
                    </Label>
                    <div className="relative">
                      <Star className="absolute left-2 top-2 size-3 text-muted-foreground" />
                      <Input
                        type="number"
                        step="0.1"
                        max="5"
                        value={totalRatings}
                        onChange={(e) =>
                          handleInputChange(
                            setTotalRatings,
                            "totalRatings",
                            e.target.value,
                          )
                        }
                        placeholder="0-5"
                        className="pl-6 h-8 text-xs bg-muted/30"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Min Reviews
                    </Label>
                    <div className="relative">
                      <Badge className="absolute left-2 top-2 size-3 p-0 rounded-full bg-muted-foreground/20 text-transparent" />
                      <span className="absolute left-2.5 top-2 text-[8px] font-bold text-muted-foreground">
                        #
                      </span>
                      <Input
                        type="number"
                        value={totalReviews}
                        onChange={(e) =>
                          handleInputChange(
                            setTotalReviews,
                            "totalReviews",
                            e.target.value,
                          )
                        }
                        placeholder="Count"
                        className="pl-6 h-8 text-xs bg-muted/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Date of Birth
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                    <Input
                      type="date"
                      value={dob}
                      onChange={(e) =>
                        handleInputChange(setDob, "dob", e.target.value)
                      }
                      className="pl-8 h-9 text-xs bg-muted/30 border-transparent"
                    />
                  </div>
                </div>

                {/* Sorting & Limit */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div className="space-y-1 w-full">
                    <Label className="text-xs uppercase text-muted-foreground">
                      Sort By
                    </Label>
                    <Select
                      value={searchParams.get("sort") || "-createdAt"}
                      onValueChange={(val) => handleDirectChange("sort", val)}
                    >
                      <SelectTrigger className="h-8 text-xs w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-createdAt">Newest</SelectItem>
                        <SelectItem value="dailyRate">Daily Price</SelectItem>
                        <SelectItem value="-totalRatings">Top Rated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 w-full">
                    <Label className="text-xs uppercase text-muted-foreground">
                      Limit
                    </Label>
                    <Select
                      value={searchParams.get("limit") || "10"}
                      onValueChange={(val) => handleDirectChange("limit", val)}
                    >
                      <SelectTrigger className="h-8 text-xs w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </aside>
  );
}
