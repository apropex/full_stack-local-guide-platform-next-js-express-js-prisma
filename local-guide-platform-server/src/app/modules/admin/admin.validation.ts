import z from "zod";
import { VerificationDocs } from "../../../shared/common-zod-schema";

export const AdminSchema = z.object({
  verificationDocs: VerificationDocs.optional(),
  dob: z.string(),
  nid: z.string(),
});

export type AdminPayload = z.infer<typeof AdminSchema>;
