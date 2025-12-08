import z from "zod";
import { VerificationDocs } from "../../../shared/common-zod-schema";

export const GuideSchema = z.object({
  expertise: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  about: z.string().optional(),
  experienceYears: z
    .number({ error: "Experience must be number type" })
    .optional(),
  city: z.string(),
  country: z.string(),
  dailyRate: z.number({ error: "Daily rate must be number type" }),
  hourlyRate: z.number({ error: "Hourly rate must be number type" }),
  verificationDocs: VerificationDocs.optional(),
  dob: z.string(),
  nid: z.string(),
});

export type GuidePayload = z.infer<typeof GuideSchema>;
