import z from "zod";

// password regex from above
export const PASSWORD_REGEX =
  /^(?=.{8,128}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};:'",.<>\/?\\|`~])[^\s]+$/;

const commonPasswords = new Set([
  "password",
  "123456",
  "123456789",
  "qwerty",
  "111111",
  "abc123",
  "12345678",
  "password1",
  "iloveyou",
  "admin",
  // production: use a bigger list (10k+) stored server-side or a check service
]);

export const PasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(128, { message: "Password cannot exceed 128 characters" })
  .regex(PASSWORD_REGEX, {
    message:
      "Password must include uppercase, lowercase, number, and a special character, and must not contain spaces",
  })
  .refine((pw) => !commonPasswords.has(pw.toLowerCase()), {
    message: "That password is too common — please choose a stronger one",
  });

export const DateSchema = z
  .string()
  .refine((value) => !isNaN(new Date(value).getTime()), {
    message: "Invalid date format",
  });

// const a = DateSchema.parse("2024-12-03"); // OK
// const b = DateSchema.parse("abc");        // throws

export const VerificationDocs = z.object({
  father: z.string().min(1, "Father name is required"),
  fathersNid: z.string().min(1, "Father's NID is required"),
});
