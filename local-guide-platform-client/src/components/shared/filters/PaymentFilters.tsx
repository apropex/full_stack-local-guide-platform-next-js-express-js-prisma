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
  Activity,
  DollarSign,
  Filter,
  Fingerprint,
  Hash,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function PaymentFilters({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isPending, startTransition] = useTransition();

  // --- Local States for Controlled Inputs ---
  const [id, setId] = useState(searchParams.get("id")?.toString() || "");
  const [trxId, setTrxId] = useState(
    searchParams.get("trxId")?.toString() || "",
  );
  const [amount, setAmount] = useState(
    searchParams.get("amount")?.toString() || "",
  );

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

  // 1. Debounced Handler
  const handleDebouncedURLUpdate = useDebouncedCallback(
    (key: string, value: string) => {
      updateURL({ [key]: value });
    },
    500,
  );

  // 2. Input Change Handlers
  const handleIdChange = (val: string) => {
    setId(val);
    handleDebouncedURLUpdate("id", val);
  };

  const handleTrxIdChange = (val: string) => {
    setTrxId(val);
    handleDebouncedURLUpdate("trxId", val);
  };

  const handleAmountChange = (val: string) => {
    setAmount(val);
    handleDebouncedURLUpdate("amount", val);
  };

  // 3. Status Change (Direct)
  const handleStatusChange = (val: string) => {
    updateURL({ status: val });
  };

  // 4. Clear All
  const handleClearFilter = () => {
    setId("");
    setTrxId("");
    setAmount("");

    startTransition(() => {
      replace(`${pathname}`);
    });
  };

  // 5. Sync State on External Navigation
  useEffect(() => {
    const currentId = searchParams.get("id") || "";
    if (currentId !== id && !isPending) setId(currentId);

    const currentTrxId = searchParams.get("trxId") || "";
    if (currentTrxId !== trxId && !isPending) setTrxId(currentTrxId);

    const currentAmount = searchParams.get("amount") || "";
    if (currentAmount !== amount && !isPending) setAmount(currentAmount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className={cn("w-full h-fit relative", className)}>
      {/* Premium Glass Card Container */}
      <div
        className={cn(
          "rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-zinc-950/60 backdrop-blur-xl shadow-xl shadow-zinc-200/50 dark:shadow-zinc-900/50 overflow-hidden transition-all duration-300 px-1 relative",
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
            <Filter className="size-4 text-primary" />
            <h2 className="text-lg font-serif tracking-wide font-medium text-foreground">
              Payment Filters
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
          {/* 1. TRX ID (Main Search) */}
          <div className="space-y-3 group">
            <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Transaction ID
            </Label>
            <div className="relative">
              <Hash className="absolute left-2 top-2.5 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                value={trxId}
                onChange={(e) => handleTrxIdChange(e.target.value)}
                placeholder="Search TrxID..."
                className="pl-8 border-0 border-b border-border/60 rounded-none bg-transparent shadow-none focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/50 text-base font-medium transition-all font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* 2. Amount Input */}
            <div className="space-y-3">
              <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Amount
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  placeholder="0.00"
                  className="pl-8 h-10 border-border/40 bg-background/50 focus:bg-background transition-all font-mono text-sm"
                />
              </div>
            </div>

            {/* 3. Status Select */}
            <div className="space-y-3">
              <Label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Status
              </Label>
              <Select
                value={searchParams.get("status")?.toString() || ""}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-full border-border/40 bg-background/50 focus:ring-0 focus:ring-offset-0 hover:bg-background/80 transition-all h-10">
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-muted-foreground" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="SUCCESS">Success</SelectItem>
                  <SelectItem value="FAILED">Failed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator className="bg-border/40" />

          {/* 4. Payment ID (Advanced / Less used) */}
          <Accordion
            type="single"
            collapsible
            className="w-full border-t border-border/40"
          >
            <AccordionItem value="advanced" className="border-b-0">
              <AccordionTrigger className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary py-4 hover:no-underline">
                Special Filters
              </AccordionTrigger>
              <AccordionContent className="px-1 pt-2">
                <div className="space-y-2">
                  <Label className="text-xs uppercase text-muted-foreground">
                    Lookup Payment ID
                  </Label>
                  <div className="relative">
                    <Fingerprint className="absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                    <Input
                      value={id}
                      onChange={(e) => handleIdChange(e.target.value)}
                      placeholder="Enter System Payment ID"
                      className="pl-8 h-9 text-xs bg-muted/30 border-transparent focus:bg-background focus:border-primary/30 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2 w-full mt-4">
                  <Label className="text-xs uppercase text-muted-foreground">
                    Limit
                  </Label>
                  <Select
                    value={searchParams.get("limit") || "12"}
                    onValueChange={(val) => updateURL({ limit: val })}
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
