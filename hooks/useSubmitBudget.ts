import { budgetFormSchema } from "@/schemas/formsSchemas";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const useSubmitBudget = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createBudget = async (values: z.infer<typeof budgetFormSchema>) => {
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) {
        toast.error("You must be logged in to create a budget");
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("budgets").insert([
        {
          category: values.category,
          maximum: values.maximumSpend,
          theme: values.theme,
          created_at: new Date().toISOString(),
          user_id: user.id,
        },
      ]);

      if (error) {
        if (error.code === "23505") {
          toast.error(
            "A budget for this category already exists. Please choose a different category.",
          );
        } else {
          toast.error("Failed to create budget. Please try again.");
        }
        throw error;
      }

      toast.success("Budget created successfully!");
      router.refresh();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createBudget, isSubmitting };
};
