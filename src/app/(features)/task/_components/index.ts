"use client";

import { z } from "zod";

export const TaskScheme = z.object({
  title: z.string({ message: "Title is required!" }),
  description: z.string({
    message: "Description is required",
  }),
  userId: z.string(),
});

export const TaskDetailScheme = z.object({
  title: z.string(),
  description: z.string(),
  list: z.string(),
});
