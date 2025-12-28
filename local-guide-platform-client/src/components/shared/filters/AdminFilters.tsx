/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Calendar,
  Fingerprint,
  Loader2,
  RotateCcw,
  Search,
  ShieldAlert,
  User,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function AdminFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  // --- Local States for Controlled Inputs ---
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  );
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
  const handleDebouncedURLUpdate = useDebouncedCallback(
    (key: string, value: string) => {
      updateURL({ [key]: value });
    },
    500,
  );

  // Generic Input Handler
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    key: string,
    value: string,
  ) => {
    setter(value);
    handleDebouncedURLUpdate(key, value);
  };

  // Direct Change
  const handleDirectChange = (key: string, value: string) => {
    updateURL({ [key]: value });
  };

  // Clear All
  const handleClearFilter = () => {
    setSearch("");
    setId("");
    setUserId("");
    setDob("");

    startTransition(() => {
      replace(`${pathname}`);
    });
  };

  // Sync State
  useEffect(() => {
    const syncState = (key: string, setter: any) => {
      const val = searchParams.get(key) || "";
      setter((prev: string) => (prev !== val && !isPending ? val : prev));
    };

    syncState("search", setSearch);
    syncState("id", setId);
    syncState("userId", setUserId);
    syncState("dob", setDob);
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
            <ShieldAlert className="size-5 text-primary" />
            <h2 className="text-lg font-serif tracking-wide font-medium text-foreground">
              Admin Filters
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
          {/* 1. KEYWORD SEARCH */}
          <div className="space-y-3 group">
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Search Admin
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={search}
                onChange={(e) =>
                  handleInputChange(setSearch, "search", e.target.value)
                }
                placeholder="Name, Email or Contact..."
                className="pl-8 border-0 border-b border-border/60 rounded-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 text-base font-medium transition-all"
              />
            </div>
          </div>

          {/* 2. IDENTIFIERS (Admin ID & User ID) */}
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Identifiers
            </Label>
            <div className="grid grid-cols-1 gap-4">
              {/* Admin ID */}
              <div className="relative">
                <Fingerprint className="absolute left-2 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={id}
                  onChange={(e) =>
                    handleInputChange(setId, "id", e.target.value)
                  }
                  placeholder="System Admin ID"
                  className="pl-8 h-9 text-xs bg-muted/30 border-transparent focus:bg-background transition-all font-mono"
                />
              </div>

              {/* User ID */}
              <div className="relative">
                <User className="absolute left-2 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={userId}
                  onChange={(e) =>
                    handleInputChange(setUserId, "userId", e.target.value)
                  }
                  placeholder="Linked User ID"
                  className="pl-8 h-9 text-xs bg-muted/30 border-transparent focus:bg-background transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <Separator className="bg-border/40" />

          {/* 3. ADDITIONAL DETAILS (Accordion) */}
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-border/40"
          >
            <AccordionItem value="advanced" className="border-b-0">
              <AccordionTrigger className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary py-4 hover:no-underline">
                Additional Details
              </AccordionTrigger>
              <AccordionContent className="space-y-5 px-1 pt-2">
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
                        <SelectItem value="-createdAt">Newest First</SelectItem>
                        <SelectItem value="createdAt">Oldest First</SelectItem>
                        <SelectItem value="id">Admin ID</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1 w-full">
                    <Label className="text-xs uppercase text-muted-foreground">
                      Limit
                    </Label>
                    <Select
                      value={searchParams.get("limit") || "12"}
                      onValueChange={(val) => handleDirectChange("limit", val)}
                    >
                      <SelectTrigger className="h-8 text-xs w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 per page</SelectItem>
                        <SelectItem value="6">6 per page</SelectItem>
                        <SelectItem value="12">12 per page</SelectItem>
                        <SelectItem value="24">24 per page</SelectItem>
                        <SelectItem value="48">48 per page</SelectItem>
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
