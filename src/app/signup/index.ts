"use client";

import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({ message: "Email is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
});
