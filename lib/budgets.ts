import { budgetsSchema } from "@/schemas/budgetsSchema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function getBudgets() {
  const supabase = await createClient();
  const { data: rawTransactions, error } = await supabase
    .from("budgets")
    .select("*");

  if (error) {
    throw new Error(`Failed to fetch budgets: ${error.message}`);
  }

  const parsedData = z.array(budgetsSchema).safeParse(rawTransactions);

  if (!parsedData.success) {
    throw new Error(`Invalid data format: ${parsedData.error}`);
  }

  return parsedData.data;
}
