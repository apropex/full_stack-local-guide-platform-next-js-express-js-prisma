import { UserStatus } from "@/constants";
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

export const CreateUserSchema_server = CreateUserSchema.omit({
  confirmPass: true,
}).extend(z.object({ confirmPass: z.string().optional() }).shape);

export const UpdateUserSchema = CreateUserSchema.omit({
  password: true,
  confirmPass: true,
});

export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type CreateUserPayload_server = z.infer<typeof CreateUserSchema_server>;
export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>;

export const UpdateUserByAdminSchema = z.object({
  status: z.enum(Object.values(UserStatus)),
  isDeleted: z.coerce.boolean<boolean>(),
  isVerified: z.coerce.boolean<boolean>(),
});

export type UpdateUserByAdminPayload = z.infer<typeof UpdateUserByAdminSchema>;
