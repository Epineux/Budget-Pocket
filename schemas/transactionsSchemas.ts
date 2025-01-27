import { TRANSACTION_CATEGORIES } from "@/constants/transactionCategories";
import { z } from "zod";

export const transactionCategorySchema = z.enum(TRANSACTION_CATEGORIES);

export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});

export const transactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  category: transactionCategorySchema,
  date: z.string().date(),
  contact_id: z.string(),
  contacts: contactSchema,
});

export type Contact = z.infer<typeof contactSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
