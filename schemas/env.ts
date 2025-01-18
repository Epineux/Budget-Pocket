import { z } from "zod";

// Schema for environment variables
const envSchema = z.object({
  SESSION_SECRET: z.string().nonempty("SESSION_SECRET is required"),
  POSTGRES_URL: z.string().url("Invalid URL for POSTGRES_URL"),
  POSTGRES_PRISMA_URL: z.string().url("Invalid URL for POSTGRES_PRISMA_URL"),
  SUPABASE_URL: z.string().url("Invalid URL for SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("Invalid URL for NEXT_PUBLIC_SUPABASE_URL"),
  POSTGRES_URL_NON_POOLING: z
    .string()
    .url("Invalid URL for POSTGRES_URL_NON_POOLING"),
  SUPABASE_JWT_SECRET: z.string().nonempty("SUPABASE_JWT_SECRET is required"),
  POSTGRES_USER: z.string().nonempty("POSTGRES_USER is required"),
  POSTGRES_PASSWORD: z.string().nonempty("POSTGRES_PASSWORD is required"),
  POSTGRES_DATABASE: z.string().nonempty("POSTGRES_DATABASE is required"),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .nonempty("SUPABASE_SERVICE_ROLE_KEY is required"),
  POSTGRES_HOST: z.string().nonempty("POSTGRES_HOST is required"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .nonempty("NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),
});

export const env = envSchema.parse(process.env);
