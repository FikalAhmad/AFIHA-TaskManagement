"use client";

import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email({
    message: "Email is required!",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
