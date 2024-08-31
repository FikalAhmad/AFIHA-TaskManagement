"use client";

import { z } from "zod";

export const ListScheme = z.object({
  name: z.string({ message: "Name is required!" }),
  color: z.string({
    message: "Color is required",
  }),
  userId: z.string(),
});
