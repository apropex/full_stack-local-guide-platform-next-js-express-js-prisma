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
  BadgeCheck,
  Ban,
  Fingerprint,
  Loader2,
  RotateCcw,
  Search,
  Shield,
  Trash2,
  User,
  UserCog,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function TouristFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  // --- Local States for Controlled Inputs ---
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || "",
  );
  const [id, setId] = useState(searchParams.get("id")?.toString() || "");

  // --- Helper: Update URL ---
  const updateURL = (paramsToUpdate: { [key: string]: string | null }) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset pagination

    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      // Handle "all" logic for select inputs to remove the param
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

  // 1. Debounced Handler
  const handleDebouncedURLUpdate = useDebouncedCallback(
    (key: string, value: string) => {
      updateURL({ [key]: value });
    },
    500,
  );

  // 2. Input Change Handlers
  const handleSearchChange = (val: string) => {
    setSearch(val);
    handleDebouncedURLUpdate("search", val);
  };

  const handleIdChange = (val: string) => {
    setId(val);
    handleDebouncedURLUpdate("id", val);
  };

  // 3. Direct Change (Selects)
  const handleDirectChange = (key: string, value: string) => {
    updateURL({ [key]: value });
  };

  // 4. Clear All Function
  const handleClearFilter = () => {
    setSearch("");
    setId("");

    // Resetting URL removes all query params including selects
    startTransition(() => {
      replace(`${pathname}`);
    });
  };

  // 5. Sync State on External Navigation
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== search && !isPending) setSearch(currentSearch);

    const currentId = searchParams.get("id") || "";
    if (currentId !== id && !isPending) setId(currentId);

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
            <UserCog className="size-5 text-primary" />
            <h2 className="text-lg font-serif tracking-wide font-medium text-foreground">
              User Filters
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
          {/* 1. KEYWORD SEARCH (Name, Email, Phone) */}
          <div className="space-y-3 group">
            <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Search Users
            </Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Name, Email or Phone..."
                className="pl-8 border-0 border-b border-border/60 rounded-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 text-base font-medium transition-all"
              />
            </div>
          </div>

          {/* 2. CORE FILTERS (Role & Status) */}
          <div className="space-y-4">
            {/* Role Select */}
            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                User Role
              </Label>
              <Select
                value={searchParams.get("role")?.toString() || ""}
                onValueChange={(val) => handleDirectChange("role", val)}
              >
                <SelectTrigger className="w-full border-border/40 bg-background/50 h-10">
                  <div className="flex items-center gap-2">
                    <Shield className="size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="All Roles" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                  <SelectItem value="GUIDE">Guide</SelectItem>
                  <SelectItem value="TOURIST">Tourist</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status Select */}
            <div className="space-y-2">
              <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Account Status
              </Label>
              <Select
                value={searchParams.get("status")?.toString() || ""}
                onValueChange={(val) => handleDirectChange("status", val)}
              >
                <SelectTrigger className="w-full border-border/40 bg-background/50 h-10">
                  <div className="flex items-center gap-2">
                    <Ban className="size-3.5 text-muted-foreground" />
                    <SelectValue placeholder="All Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="BANNED">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-border/40" />

          {/* 3. ADVANCED FILTERS (Accordion) */}
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-border/40"
          >
            <AccordionItem value="advanced" className="border-b-0">
              <AccordionTrigger className="text-sm uppercase tracking-widest text-muted-foreground hover:text-primary py-4 hover:no-underline">
                Advanced Details
              </AccordionTrigger>
              <AccordionContent className="space-y-5 px-1 pt-2">
                {/* User ID */}
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground">
                    User ID
                  </Label>
                  <div className="relative">
                    <Fingerprint className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                    <Input
                      value={id}
                      onChange={(e) => handleIdChange(e.target.value)}
                      placeholder="System ID"
                      className="pl-8 h-9 text-xs bg-muted/30 border-transparent focus:bg-background focus:border-primary/30 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Gender Select */}
                <div className="space-y-2 w-full">
                  <Label className="text-xs text-muted-foreground">
                    Gender
                  </Label>
                  <Select
                    value={searchParams.get("gender")?.toString() || ""}
                    onValueChange={(val) => handleDirectChange("gender", val)}
                  >
                    <SelectTrigger className="w-full h-9 text-xs border-border/40 bg-muted/30">
                      <div className="flex items-center gap-2">
                        <User className="size-3 text-muted-foreground" />
                        <SelectValue placeholder="Any Gender" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Boolean Flags (Verified & Deleted) */}
                <div className="grid grid-cols-2 gap-3">
                  {/* isVerified */}
                  <div className="space-y-2 w-full">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <BadgeCheck size={12} /> Verified?
                    </Label>
                    <Select
                      value={searchParams.get("isVerified")?.toString() || ""}
                      onValueChange={(val) =>
                        handleDirectChange("isVerified", val)
                      }
                    >
                      <SelectTrigger className="w-full h-9 text-xs border-border/40 bg-muted/30">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="true">Yes (Verified)</SelectItem>
                        <SelectItem value="false">No (Unverified)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* isDeleted */}
                  <div className="space-y-2 w-full">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Trash2 size={12} /> Deleted?
                    </Label>
                    <Select
                      value={searchParams.get("isDeleted")?.toString() || ""}
                      onValueChange={(val) =>
                        handleDirectChange("isDeleted", val)
                      }
                    >
                      <SelectTrigger className="w-full h-9 text-xs border-border/40 bg-muted/30">
                        <SelectValue placeholder="All" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="true">Yes (Deleted)</SelectItem>
                        <SelectItem value="false">No (Active)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Sorting & Limit */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <div className="space-y-1 w-full">
                    <Label className="text-[10px] uppercase text-muted-foreground">
                      Sort By
                    </Label>
                    <Select
                      value={searchParams.get("sort") || "-createdAt"}
                      onValueChange={(val) => handleDirectChange("sort", val)}
                    >
                      <SelectTrigger className="h-8 text-[10px] w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-createdAt">Newest First</SelectItem>
                        <SelectItem value="createdAt">Oldest First</SelectItem>
                        <SelectItem value="email">Email (A-Z)</SelectItem>
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
