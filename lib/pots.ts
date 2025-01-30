import { potSchema } from "@/schemas/potsSchema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function getPots() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("pots").select("*");

  if (error) {
    throw new Error(`Failed to fetch pots: ${error.message}`);
  }

  const parsedData = z.array(potSchema).safeParse(data);

  if (!parsedData.success) {
    throw new Error(`Invalid data format: ${parsedData.error}`);
  }

  return parsedData.data;
}
