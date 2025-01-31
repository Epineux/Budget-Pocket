import { recurringBillsSchema } from "@/schemas/recurringBillsSchema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function getRecurringBills() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("recurringBills").select(`
    id,
    amount,
    dueDate,
    isPaid,
    contact_id,
    contacts (
      id,
      name,
      avatar
    )
  `);

  if (error) {
    throw new Error(`Failed to fetch recurring bills: ${error.message}`);
  }

  const parsedData = z.array(recurringBillsSchema).safeParse(data);

  if (!parsedData.success) {
    throw new Error(`Invalid data format: ${parsedData.error}`);
  }

  return parsedData.data;
}
