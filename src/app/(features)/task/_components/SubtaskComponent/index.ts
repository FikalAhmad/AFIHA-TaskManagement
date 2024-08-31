"use client";

import { z } from "zod";

export const SubtaskScheme = z.object({
  title: z.string({ message: "Title is required!" }),
  taskId: z.string(),
});
