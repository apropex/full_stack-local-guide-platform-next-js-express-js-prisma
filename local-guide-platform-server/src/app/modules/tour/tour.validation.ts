import { Difficulty, TourDurationType, TourStatus } from "@prisma/client";
import z from "zod";

export const CreateTourPayloadSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),

  description: z.string().trim().min(1, { message: "Description is required" }),

  highlights: z
    .array(z.string().trim().min(1, { message: "Highlights cannot be empty" }))
    .min(1, { message: "At least one highlights is required" }),

  price: z.number().min(0, { message: "Price cannot be negative" }),

  duration: z.number().min(0, { message: "Duration cannot be negative" }),

  durationType: z.enum(
    Object.values(TourDurationType) as [string, ...string[]],
    { message: "Enter a valid duration type" },
  ),

  location: z.string().trim().min(1, { message: "Location is required" }),

  latitude: z
    .number()
    .min(0, { message: "Latitude cannot be negative" })
    .optional(),

  longitude: z
    .number()
    .min(0, { message: "Longitude cannot be negative" })
    .optional(),

  meetingPoint: z
    .string()
    .trim()
    .min(1, { message: "Meeting Point is required" }),

  maxGroupSize: z
    .number()
    .min(0, { message: "Max people size cannot be negative" }),

  category: z.string().trim().min(1, { message: "Category is required" }),

  tags: z
    .array(z.string().trim().min(1, { message: "Tag cannot be empty" }))
    .min(1, { message: "At least one tag is required" }),

  languages: z
    .array(z.string().trim().min(1, { message: "Languages cannot be empty" }))
    .min(1, { message: "At least one language is required" }),

  difficulty: z.enum(Object.values(Difficulty) as [string, ...string[]], {
    message: "Enter a valid difficulty",
  }),

  includes: z.array(z.string().trim()),

  excludes: z.array(z.string().trim()),

  whatToBring: z.array(z.string().trim()),

  cancellationPolicy: z
    .string()
    .trim()
    .min(1, { message: "Cancellation policy is required" }),
});

export const UpdateTourPayloadSchema = z
  .object({
    deletedImages: z.array(z.string()).optional(),
  })
  .extend(CreateTourPayloadSchema.shape);

export const UpdateTourByAdminSchema = z.object({
  approveStatus: z.enum(Object.values(TourStatus)),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export type UpdateTourByAdminPayload = z.infer<typeof UpdateTourByAdminSchema>;
