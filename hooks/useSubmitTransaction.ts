import { transactionFormSchema } from "@/schemas/formsSchemas";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

export const useSubmitTransaction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createTransaction = async (
    values: z.infer<typeof transactionFormSchema>,
  ) => {
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) throw new Error("User not authenticated");

      const { error } = await supabase.from("transactions").insert([
        {
          amount: values.amount,
          date: values.date.toISOString(),
          category: values.category,
          contact_id: values.contact,
          user_id: user.id,
        },
      ]);

      if (error) throw error;
      router.refresh();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createTransaction, isSubmitting };
};
