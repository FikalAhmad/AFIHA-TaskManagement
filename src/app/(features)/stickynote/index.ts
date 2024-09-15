"use client";

import { z } from "zod";

export const StickyNoteScheme = z.object({
  title: z.string(),
  content: z.string({
    message: "Content is required",
  }),
  color: z.string({
    message: "Color is required!",
  }),
  userId: z.string(),
});
