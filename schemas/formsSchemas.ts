import { z } from "zod";
import { transactionCategorySchema } from "./transactionsSchemas";

export const transactionFormSchema = z.object({
  contact: z.string(),
  amount: z.number(),
  date: z.date(),
  category: transactionCategorySchema,
});
