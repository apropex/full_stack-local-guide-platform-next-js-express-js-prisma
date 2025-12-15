//

import z from "zod";

export const ReviewSchema = z.object({
  rating: z.coerce.number<number>().optional(),
  comment: z.string().min(1, "Comment is required"),
  touristId: z.string().optional(),
  tourId: z.string().optional(),
});

export type ReviewPayload = z.infer<typeof ReviewSchema>;
