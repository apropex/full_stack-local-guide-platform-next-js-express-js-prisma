import z from "zod";

export const AdminSchema = z.object({
  verificationDocs: z.array(z.string()).optional(),
  dob: z.string(),
  nid: z.string(),
});

export type AdminPayload = z.infer<typeof AdminSchema>;
