import { Contact } from "@/schemas/transactionsSchemas";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

export const updateBillPaidStatus = async (
  billId: string,
  amount: number,
  contact: Contact,
) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("recurringBills")
      .update({ isPaid: true })
      .eq("id", billId);

    if (error) throw error;

    toast.success("Bill marked as paid");
    // If the bill is paid, create a transaction for it
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const user_id = user?.id;

      if (!user_id) {
        throw new Error("User not authenticated");
      }

      const { error: transactionError } = await supabase
        .from("transactions")
        .insert([
          {
            amount: (amount * -1).toFixed(2),
            date: new Date().toISOString(),
            category: "Bills",
            contact_id: contact.id,
            user_id: user_id,
          },
        ]);

      if (transactionError) throw transactionError;
    } catch (error) {
      console.error("Not able to create transaction for paid bill", error);
    }

    return true;
  } catch (error) {
    console.error("Failed to update bill status:", error);
    toast.error("Failed to update bill status");
    return false;
  }
};

export const deleteBill = async (billId: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("recurringBills")
      .delete()
      .eq("id", billId);

    if (error) throw error;

    toast.success("Bill deleted");
    return true;
  } catch (error) {
    console.error("Failed to delete bill:", error);
    toast.error("Failed to delete bill");
    return false;
  }
};

export const updateBill = async (
  billId: string,
  dueDate: string,
  newAmount: number,
) => {
  const supabase = createClient();

  try {
    const { error } = await supabase
      .from("recurringBills")
      .update({ dueDate, amount: newAmount })
      .eq("id", billId);

    if (error) throw error;

    toast.success("Bill updated successfully");
    return true;
  } catch (error) {
    console.error("Failed to update bill:", error);
    toast.error("Failed to update bill");
    return false;
  }
};
