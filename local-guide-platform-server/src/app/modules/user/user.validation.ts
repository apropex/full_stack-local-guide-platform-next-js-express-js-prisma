import z from "zod";
import { PasswordSchema } from "../../../shared/common-zod-schema";

export const UpdateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  bio: z.string().max(160, "Bio must be maximum 160 characters").optional(),
  address: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  nationality: z.string().optional(),
});

export const CreateUserSchema = z
  .object({
    password: PasswordSchema,
  })
  .extend(UpdateUserSchema.shape);

export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;
