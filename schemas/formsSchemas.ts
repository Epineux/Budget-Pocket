import { z } from "zod";
import { transactionCategorySchema } from "./transactionsSchemas";

export const transactionFormSchema = z.object({
  contact: z.string().min(1, "Please select a contact"),
  amount: z.number().positive("Amount must be greater than 0"),
  date: z.date(),
  category: transactionCategorySchema,
  type: z.enum(["income", "expense"]),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, "Please enter a name").max(25, "Name too long"),
  avatar: z.string().min(1, "Please select an avatar"),
});

export const budgetFormSchema = z.object({
  category: z.string().nonempty("Please select a category"),
  maximumSpend: z.number().positive().int(),
  theme: z.string().nonempty("Please select a theme"),
});
