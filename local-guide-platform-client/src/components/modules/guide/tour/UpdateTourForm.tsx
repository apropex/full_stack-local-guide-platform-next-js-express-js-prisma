"use client";

import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import MultiFileUploader from "@/components/MultiFileUploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Difficulty, TourDurationType } from "@/constants";
import { iImage } from "@/interfaces";
import { iTour } from "@/interfaces/tour.interfaces";
import { cn } from "@/lib/utils";
import { updateTour } from "@/services/tour.services";
import { urid } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateTourPayload,
  CreateTourSchema,
} from "./../../../../zod/tour.schema";
import TourForm from "./TourForm";

interface UpdateTourFormProps {
  tour: iTour;
}

export default function UpdateTourForm({ tour }: UpdateTourFormProps) {
  const [images, setImages] = useState<File[] | null>(null);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const highlights = tour.highlights.map((v) => ({ value: v }));
  const includes = tour.includes.map((v) => ({ value: v }));
  const excludes = tour.excludes.map((v) => ({ value: v }));
  const whatToBring = tour.whatToBring.map((v) => ({ value: v }));

  const tags = tour.tags.join(", ");
  const languages = tour.languages.join(", ");

  const [defaultImages, setDefaultImages] = useState<iImage[]>(
    tour.images ?? [],
  );
  const [selectedImages, setSelectedImages] = useState<iImage[]>([]);

  const form = useForm<CreateTourPayload>({
    resolver: zodResolver(CreateTourSchema),
    defaultValues: {
      title: tour.title,
      description: tour.description,
      highlights,
      price: tour.price,
      duration: tour.duration,
      durationType: TourDurationType.HOURS,
      location: tour.location,
      latitude: tour.latitude,
      longitude: tour.longitude,
      meetingPoint: tour.meetingPoint,
      maxGroupSize: tour.maxGroupSize,
      category: tour.category,
      tags,
      languages,
      difficulty: Difficulty.MEDIUM,
      includes,
      excludes,
      whatToBring,
      cancellationPolicy: tour.cancellationPolicy,
    },
  });

  async function onSubmit(values: CreateTourPayload) {
    if (!images || [...images, ...defaultImages].length < 3)
      return setImageError(true);

    setImageError(false);
    setLoading(true);
    const alertId = _alert.loading("Updating tour...", {
      id: urid(),
    });

    const result = await updateTour(tour.id, values, images, [
      ...selectedImages,
    ]);

    _alert.dismiss(alertId);

    if (result.success) {
      form.reset();
      _alert.success("The tour updated successfully!");
      router.push("/dashboard/guide/my-tours");
    } else {
      _alert.error("Failed to update tour", result.message);
    }

    setLoading(false);
  }

  const handleSelectImage = (image: iImage) => {
    if (selectedImages.some(({ publicId }) => publicId === image.publicId)) {
      const filteredImages = selectedImages.filter(
        ({ publicId }) => publicId !== image.publicId,
      );
      setSelectedImages(filteredImages);
    } else {
      setSelectedImages((prev) => [image, ...prev]);
    }
  };

  const handleRemoveImageView = (value?: string) => {
    if (value === "all") {
      setSelectedImages((prev) => [...defaultImages, ...prev]);
      setDefaultImages([]);
    } else {
      const filteredImages = defaultImages.filter(
        (image) =>
          !selectedImages.some(({ publicId }) => publicId === image.publicId),
      );
      setDefaultImages([...filteredImages]);
    }
  };

  return (
    <div className="border border-primary/50 p-4 rounded-2xl space-y-8">
      <h3 className="text-xl md:text-2xl font-semibold text-center text-primary border-b pb-1 mb-5">
        Update Tour Form
      </h3>
      <TourForm form={form} onSubmit={onSubmit} id="update_tour_form" />

      {defaultImages.length < 6 && (
        <MultiFileUploader
          setImages={setImages}
          maxFiles={6 - defaultImages.length}
        />
      )}

      {imageError &&
        ([...(images ?? []), ...defaultImages].length ?? 0) < 3 && (
          <p className="text-sm text-destructive">
            Minimum 3 images are required
          </p>
        )}

      {defaultImages.length > 0 && (
        <>
          <Label className="mb-2 mt-6">Update Old Images</Label>
          <div className="border border-input rounded-xl overflow-hidden p-3">
            <div className="pb-3 flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveImageView()}
                disabled={
                  defaultImages.length === 0 || selectedImages.length === 0
                }
              >
                <Trash2Icon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Remove selected images
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveImageView("all")}
                disabled={defaultImages.length === 0}
              >
                <Trash2Icon
                  className="-ms-0.5 size-3.5 opacity-60"
                  aria-hidden="true"
                />
                Remove all
              </Button>
            </div>
            <div className="rounded-md overflow-hidden grid grid-cols-3 gap-2">
              {defaultImages.map((image, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectImage(image)}
                  className="w-full h-full cursor-pointer relative"
                >
                  <Image
                    src={image.url}
                    alt="img"
                    width={200}
                    height={200}
                    className={cn("w-full h-full object-cover", {
                      "opacity-40": selectedImages.some(
                        ({ publicId }) => image.publicId === publicId,
                      ),
                    })}
                  />
                  <span className="inline-flex items-center justify-center rounded-md p-1.5 absolute top-2 right-2 bg-background/60">
                    <Checkbox
                      id={image.publicId}
                      checked={selectedImages.some(
                        ({ publicId }) => image.publicId === publicId,
                      )}
                      className="cursor-pointer"
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center">
        <LoadingButton
          form="update_tour_form"
          isLoading={loading}
          loadingText={"Updating..."}
          type="submit"
          className="w-full max-w-sm"
          disabled={loading}
        >
          Update Tour
        </LoadingButton>
      </div>
    </div>
  );
}
