import { z } from "zod";
import { contactsSchema } from "./transactionsSchemas";

export const recurringBillsSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  dueDate: z.string(),
  isPaid: z.boolean(),
  contact_id: z.string(),
  contacts: contactsSchema,
});

export type RecurringBill = z.infer<typeof recurringBillsSchema>;
