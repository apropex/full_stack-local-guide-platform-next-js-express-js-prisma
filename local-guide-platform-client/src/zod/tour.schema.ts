import { Difficulty, TourDurationType } from "@/constants";
import z from "zod";

export const CreateTourSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),

  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .max(1000, "Description is must be less than 1000 characters"),

  highlights: z
    .array(z.object({ value: z.string() }))
    .min(1, { message: "At least one highlights is required" }),

  price: z.coerce
    .number<number>()
    .min(0, { message: "Price cannot be negative" }),

  duration: z.coerce
    .number<number>()
    .min(0, { message: "Duration cannot be negative" }),

  durationType: z.enum(
    Object.values(TourDurationType) as [string, ...string[]],
    {
      message: "Enter a valid duration type",
    },
  ),

  location: z.string().trim().min(1, { message: "Location is required" }),

  latitude: z.coerce
    .number<number>()
    .min(0, { message: "Latitude cannot be negative" })
    .optional(),

  longitude: z.coerce
    .number<number>()
    .min(0, { message: "Longitude cannot be negative" })
    .optional(),

  meetingPoint: z
    .string()
    .trim()
    .min(1, { message: "Meeting Point is required" }),

  maxGroupSize: z.coerce
    .number<number>()
    .min(0, { message: "Max people size cannot be negative" }),

  category: z.string().trim().min(1, { message: "Category is required" }),

  tags: z.string().min(1, { message: "At least one tag is required" }),

  languages: z
    .string()
    .min(1, { message: "At least one language is required" }),

  difficulty: z.enum(Object.values(Difficulty) as [string, ...string[]], {
    message: "Enter a valid difficulty",
  }),

  includes: z.array(z.object({ value: z.string() })),

  excludes: z.array(z.object({ value: z.string() })),

  whatToBring: z.array(z.object({ value: z.string() })),

  cancellationPolicy: z
    .string()
    .trim()
    .min(1, { message: "Cancellation policy is required" }),
});

export const UpdateTourSchema = z
  .object({
    deletedImages: z.array(z.string()).optional(),
  })
  .extend(CreateTourSchema.shape);

export type CreateTourPayload = z.infer<typeof CreateTourSchema>;
export type UpdateTourPayload = z.infer<typeof UpdateTourSchema>;
