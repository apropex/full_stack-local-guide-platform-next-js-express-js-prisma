"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import { createBooking } from "@/services/booking.services";
import { urid } from "@/utils";
import { useState } from "react";

export default function BookNowButton({ tourId }: { tourId: string }) {
  const [loading, setLoading] = useState(false);

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
    <LoadingButton
      isLoading={loading}
      loadingText="Booking now..."
      onClick={handleBooking}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      disabled={loading}
    >
      Book Now
    </LoadingButton>
  );
}
