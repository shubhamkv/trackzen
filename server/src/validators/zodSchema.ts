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

export const activitySchema = z.object({
  url: z.string().url(),
  domain: z.string(),
  title: z.string(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),
  endTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end time" }),
  duration: z.number().int().nonnegative(),
  sessionId: z.string().cuid(),
});

export const paramsSchema = z.object({
  sessionId: z.string().cuid(),
});

export const createSessionSchema = z.object({
  startTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start time",
    })
    .optional(),
  endTime: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid end time" })
    .optional(),
  totalTabs: z.number().int().min(0),
  sessionId: z.string().cuid().optional(),
  // activities: z.array(activitySchema),
});
