import { z } from "zod";

export const userBalancesSchema = z.object({
  currentBalance: z.number(),
  income: z.number(),
});

export type UserBalances = z.infer<typeof userBalancesSchema>;
