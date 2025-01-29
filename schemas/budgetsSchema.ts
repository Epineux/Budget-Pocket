import { z } from "zod";
import { transactionCategorySchema } from "./transactionsSchemas";

export const budgetsSchema = z.object({
  id: z.string(),
  category: transactionCategorySchema,
  maximum: z.number(),
  theme: z.string().min(1),
  created_at: z.string(),
});

export type Budget = z.infer<typeof budgetsSchema>;
