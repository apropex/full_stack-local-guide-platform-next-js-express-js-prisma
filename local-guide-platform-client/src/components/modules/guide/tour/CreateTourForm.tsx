"use client";

import { TourDurationType } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateTourPayload,
  CreateTourSchema,
} from "./../../../../zod/tour.schema";

export default function CreateTourForm() {
  const [images, setImages] = useState<File[] | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<CreateTourPayload>({
    resolver: zodResolver(CreateTourSchema),
    defaultValues: {
      title: "",
      description: "",
      highlights: [{ value: "" }],
      price: undefined,
      duration: undefined,
      durationType: TourDurationType.HOURS,
      location: "",
      latitude: undefined,
      longitude: undefined,
      meetingPoint: "",
      maxGroupSize: 0,
      category: "",
      tags: "",
      languages: "",
      difficulty: "",
      includes: [{ value: "" }],
      excludes: [{ value: "" }],
      whatToBring: [{ value: "" }],
      cancellationPolicy: "",
    },
  });

  return (
    <div className="">
      <h1 className="">This is CreateTourForm component</h1>
    </div>
  );
}
