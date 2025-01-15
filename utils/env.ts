import { z } from "zod";

const envSchema = z.object({
  SESSION_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
