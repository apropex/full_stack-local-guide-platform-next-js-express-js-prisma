"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import MultiFileUploader from "@/components/MultiFileUploader";
import { Difficulty, TourDurationType } from "@/constants";
import { createTour } from "@/services/tour.services";
import { urid } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateTourPayload,
  CreateTourSchema,
} from "./../../../../zod/tour.schema";
import TourForm from "./TourForm";

export default function CreateTourForm() {
  const [images, setImages] = useState<File[] | null>(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<CreateTourPayload>({
    resolver: zodResolver(CreateTourSchema),
    defaultValues: {
      title: "",
      description: "",
      highlights: [{ value: "" }],
      price: 0,
      duration: 0,
      durationType: TourDurationType.HOURS,
      location: "",
      latitude: 0,
      longitude: 0,
      meetingPoint: "",
      maxGroupSize: 0,
      category: "",
      tags: "",
      languages: "",
      difficulty: Difficulty.MEDIUM,
      includes: [{ value: "" }],
      excludes: [{ value: "" }],
      whatToBring: [{ value: "" }],
      cancellationPolicy: "",
    },
  });

  async function onSubmit(values: CreateTourPayload) {
    if (!images || images.length < 3) return setImageError(true);

    setImageError(false);
    setLoading(true);
    const alertId = _alert.loading("Creating tour...", {
      id: urid(),
    });

    const result = await createTour(values, images);

    _alert.dismiss(alertId);

    if (result.success) {
      form.reset();
      _alert.success("A tour created successfully!");
      router.push("/dashboard/guide/my-tours");
    } else {
      _alert.error("Failed to create tour", result.message);
    }

    setLoading(false);
  }

  return (
    <div className="border border-primary/50 p-4 rounded-2xl space-y-8">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-primary border-b pb-1 mb-5">
        Create Tour Form
      </h3>
      <TourForm form={form} onSubmit={onSubmit} id="create_tour_form" />
      <MultiFileUploader setImages={setImages} />
      {imageError && (images?.length ?? 0) < 3 && (
        <p className="text-sm text-destructive">
          Minimum 3 images are required
        </p>
      )}
      <div className="flex justify-center">
        <LoadingButton
          form="create_tour_form"
          isLoading={loading}
          loadingText={"Creating..."}
          type="submit"
          className="w-full max-w-sm"
          disabled={loading}
        >
          Create Tour
        </LoadingButton>
      </div>
    </div>
  );
}
