import z from "zod";

export const AdminSchema = z.object({
  father: z.string().min(1, "Father name is required"),
  fathersNid: z.string().min(1, "Father's NID is required"),
  dob: z.string().optional(),
  nid: z.string().min(1, "NID is required"),
});

export type AdminPayload = z.infer<typeof AdminSchema>;
