import { z } from "zod";

// Schema for environment variables
const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("Invalid URL for NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .nonempty("NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
});

export const env = envSchema.parse(process.env);
