import { Pot } from "@/schemas/potsSchema";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type UseSavingsDialogProps = {
  pot: Pot;
  newSavings: "addition" | "subtraction";
};

export const useSavingsDialog = ({
  pot,
  newSavings,
}: UseSavingsDialogProps) => {
  const [projectedTotal, setProjectedTotal] = useState(pot.total);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setProjectedTotal(pot.total);
    }
  };

  const getPercentageText = () => {
    if (newSavings === "addition") {
      return projectedTotal >= pot.target
        ? "100%"
        : `${((projectedTotal / pot.target) * 100).toFixed(1)}%`;
    }
    return `${Math.max(0, (projectedTotal / pot.target) * 100).toFixed(1)}%`;
  };

  const getTotalText = () => {
    if (newSavings === "addition") {
      return projectedTotal >= pot.target ? pot.target : projectedTotal;
    }
    return Math.max(0, projectedTotal);
  };

  const handleAmountChange = (amount: number) => {
    const newTotal =
      newSavings === "addition" ? amount + pot.total : pot.total - amount;
    setProjectedTotal(newTotal);
  };

  const handleSubmit = async (amount: number) => {
    setIsSubmitting(true);
    const newTotal =
      newSavings === "addition" ? pot.total + amount : pot.total - amount;

    const { error } = await supabase
      .from("pots")
      .update({ total: newTotal })
      .eq("id", pot.id);

    if (error) {
      console.error("Error updating pot total:", error);
    } else {
      toast.success(
        newSavings === "addition"
          ? "Amount added successfully!"
          : "Amount withdrawn successfully!",
      );
      router.refresh();
      handleOpenChange(false);
    }
    setIsSubmitting(false);
  };

  const isButtonDisabled =
    newSavings === "addition"
      ? projectedTotal >= pot.target
      : projectedTotal <= 0;

  return {
    open,
    projectedTotal,
    handleOpenChange,
    getPercentageText,
    getTotalText,
    handleAmountChange,
    handleSubmit,
    isButtonDisabled,
    isSubmitting,
  };
};
