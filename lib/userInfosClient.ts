import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export async function updateBalance(
  newAmount: number,
  title: "currentBalance" | "income",
) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  try {
    if (typeof newAmount !== "number" || isNaN(newAmount)) {
      throw new Error("Invalid amount provided");
    }

    const { error } = await supabase
      .from("userInfos")
      .update({ [title]: newAmount })
      .eq("user_id", userId);

    if (error) throw error;

    toast.success("Balance updated successfully");
    return true;
  } catch (error) {
    console.error("Failed to update balance:", error);
    toast.error("Failed to update balance");
    return false;
  }
}

export const addTransactionToBalance = async (amount: number) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    throw new Error("Invalid amount provided");
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const userId = user?.id;

  if (!userId) {
    throw new Error("User not found");
  }

  const oldBalance = await supabase
    .from("userInfos")
    .select("currentBalance")
    .eq("user_id", userId)
    .single();

  if (oldBalance.error) {
    throw new Error(`Failed to fetch balance: ${oldBalance.error.message}`);
  }

  const newBalance = oldBalance.data.currentBalance + amount;

  try {
    const { error } = await supabase
      .from("userInfos")
      .update({ currentBalance: newBalance })
      .eq("user_id", userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Failed to update balance:", error);
    toast.error("Failed to update balance");
    return false;
  }
};
