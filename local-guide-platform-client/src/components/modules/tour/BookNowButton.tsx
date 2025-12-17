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
  DialogTrigger,
} from "@/components/ui/dialog";
import { createBooking } from "@/services/booking.services";
import { urid } from "@/utils";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function BookNowButton({ tourId }: { tourId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleBooking = async () => {
    setLoading(true);
    const id = _alert.loading("Trying to book a tour", { id: urid() });

    const result = await createBooking(tourId);

    _alert.dismiss(id);

    if (result.success && result.meta?.options?.paymentURL) {
      window.location.href = result.meta.options.paymentURL;
    } else {
      _alert.error("Failed to book tour.", result.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Book Now
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTrigger asChild></DialogTrigger>

          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <MultiDateSelect
              dateRange={dateRange}
              setDateRange={setDateRange}
              label="Select visiting date"
            />
          </div>

          <div>
            <Button variant="outline">Cancel</Button>
            <LoadingButton
              isLoading={loading}
              loadingText="Booking now..."
              onClick={handleBooking}
              disabled={loading}
            >
              Book Now
            </LoadingButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
