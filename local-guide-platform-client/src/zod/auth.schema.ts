import z from "zod";
import { PasswordSchema } from "./common-zod-schema";

export const LoginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string({ error: "Enter a valid password" }),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const ResetPasswordSchema = z.object({
  oldPassword: z.string({ error: "Enter a valid old password" }),
  newPassword: PasswordSchema,
});

export type ResetPasswordPayload = z.infer<typeof ResetPasswordSchema>;
