import { potFormSchema } from "@/schemas/formsSchemas";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const useSubmitPot = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const createPot = async (values: z.infer<typeof potFormSchema>) => {
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.id) {
        toast.error("You must be logged in to create a pot");
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from("pots").insert([
        {
          name: values.name,
          target: values.target,
          theme: values.theme,
          total: 0,
          user_id: user.id,
        },
      ]);

      if (error) {
        toast.error("Failed to create pot. Please try again.");
        throw error;
      }

      toast.success("Pot created successfully!");
      router.refresh();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { createPot, isSubmitting };
};
