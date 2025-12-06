import z from "zod";
import { PasswordSchema } from "./common-zod-schema";

export const CreateUserSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().optional(),
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    bio: z.string().max(160, "Bio must be maximum 160 characters").optional(),
    address: z.string().optional(),
    language: z.string().optional(),
    country: z.string().optional(),
    nationality: z.string().optional(),
    password: PasswordSchema,
    confirmPass: z.string(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords do not match",
    path: ["confirmPass"],
  });

export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type UpdateUserPayload = z.infer<typeof CreateUserSchema>; //! TODO:
