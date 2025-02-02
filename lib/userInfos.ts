import { userBalancesSchema } from "@/schemas/userSchema";
import { createClient } from "@/utils/supabase/server";
import { z } from "zod";

export async function getUserInfos() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("userInfos").select("*");

  if (error) {
    throw new Error(`Failed to fetch balances: ${error.message}`);
  }

  const parsedData = z.array(userBalancesSchema).safeParse(data);

  if (!parsedData.success) {
    throw new Error(`Invalid data format: ${parsedData.error}`);
  }

  return parsedData.data[0];
}
