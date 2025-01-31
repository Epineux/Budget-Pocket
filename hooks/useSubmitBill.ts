import { billFormSchema } from "@/schemas/formsSchemas";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const useSubmitBill = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createBill = async (values: z.infer<typeof billFormSchema>) => {
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user?.id) {
        toast.error("You must be logged in to register a bill");
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("recurringBills").insert([
        {
          amount: values.amount,
          dueDate: values.dueDate,
          contact_id: values.contact,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast.success("Bill registered successfully");
      router.refresh();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createBill, isSubmitting };
};
