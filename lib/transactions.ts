import { transactionSchema } from "@/schemas/transactionsSchemas";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function getTransactions() {
  const supabase = await createClient();
  const { data: rawTransactions, error } = await supabase.from("transactions")
    .select(`
      id,
      amount,
      category,
      date,
      contact_id,
      contacts (
        id,
        name,
        avatar
      )
    `);

  if (error) {
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }

  const parsedData = z.array(transactionSchema).safeParse(rawTransactions);

  if (!parsedData.success) {
    throw new Error(`Invalid data format: ${parsedData.error}`);
  }

  return parsedData.data;
}
