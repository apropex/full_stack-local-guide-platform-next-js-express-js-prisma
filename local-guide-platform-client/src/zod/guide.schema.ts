import z from "zod";

export const GuideSchema = z.object({
  expertise: z.array(z.object({ value: z.string() })).optional(),
  languages: z.array(z.object({ value: z.string() })).optional(),
  about: z.string().optional(),
  experienceYears: z.string().optional(),
  city: z.string().optional(),
  country: z.string().trim().min(1, "Country rate is required"),
  dailyRate: z.string().trim().min(1, "Daily rate is required"),
  hourlyRate: z.string().trim().min(1, "Hourly rate is required"),
  father: z.string().trim().min(1, "Father name is required"),
  fathersNid: z.string().trim().min(1, "Father's NID is required"),
  dob: z.string(),
  nid: z.string(),
});

export type GuidePayload = z.infer<typeof GuideSchema>;
