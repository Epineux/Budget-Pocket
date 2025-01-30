import { z } from "zod";

export const potSchema = z.object({
  id: z.string(),
  name: z.string(),
  target: z.number(),
  total: z.number(),
  theme: z.string(),
});

export type Pot = z.infer<typeof potSchema>;
