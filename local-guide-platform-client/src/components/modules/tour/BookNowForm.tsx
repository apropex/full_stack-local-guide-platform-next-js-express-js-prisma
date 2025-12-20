"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import MultiDateSelect from "@/components/MultiDateSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createBooking } from "@/services/booking.services";
import { urid } from "@/utils";
import { mergeDateAndTime } from "@/utils/formatDate";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface iProps {
  tourId: string;
  disable?: boolean;
}

export default function BookNowForm({ tourId, disable = false }: iProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [startTime, setStartTime] = useState("09:30:00");
  const [endTime, setEndTime] = useState("11:30:00");

  const handleBooking = async () => {
    if (!dateRange || !startTime.trim() || !endTime.trim()) {
      _alert.error("Select a date range and time.");
      return;
    }

    const startDate = mergeDateAndTime(dateRange.from, startTime);
    const endDate = mergeDateAndTime(dateRange.to, endTime);

    setLoading(true);
    const id = _alert.loading("Trying to book a tour", { id: urid() });

    const result = await createBooking(tourId, { startDate, endDate });

    _alert.dismiss(id);

    if (result.success && result.meta?.options?.paymentURL) {
      setOpen(false);
      window.location.href = result.meta.options.paymentURL;
    } else _alert.error("Failed to book tour.", result.message);

    setLoading(false);
  };

  const dateFormate = (date: string | Date | undefined) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        disabled={disable}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {disable ? "You can not book this tour" : "Book Now"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-auto">
          <DialogHeader>
            <DialogTitle>Book a Tour</DialogTitle>
            <DialogDescription>
              Enter you visiting date and time.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <MultiDateSelect
              dateRange={dateRange}
              setDateRange={setDateRange}
              label="Select visiting date (range)"
            />
            {dateRange && (
              <Input
                readOnly
                value={`${dateFormate(dateRange?.from)} - ${dateFormate(dateRange?.to)}`}
              />
            )}

            <div>
              <Label htmlFor="time-picker" className="pb-1.5">
                Time
              </Label>
              <div
                className={cn(
                  "flex items-center gap-2 bg-input/30 border-gray-900/20 dark:border-input h-9 w-full min-w-0 rounded-md border px-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
                  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                )}
              >
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  value={startTime}
                  onChange={({ target }) => setStartTime(target.value)}
                  className="p-0 w-auto border-none bg-transparent focus-visible:border-none focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
                <span>-</span>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  value={endTime}
                  onChange={({ target }) => setEndTime(target.value)}
                  className="p-0 w-auto border-none bg-transparent focus-visible:border-none focus-visible:ring-0 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <LoadingButton
              isLoading={loading}
              loadingText="Booking now..."
              onClick={handleBooking}
              disabled={loading || disable}
            >
              {disable ? "You can not book this tour" : "Book Now"}
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
