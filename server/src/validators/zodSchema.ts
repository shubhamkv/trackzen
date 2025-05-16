import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1),
  username: z.string().email().trim(),
  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

export const loginSchema = z.object({
  username: z.string().email().trim(),
  password: z.string().min(6, "password must be at least 6 characters").trim(),
});
