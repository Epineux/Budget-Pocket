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
  const [newAmount, setNewAmount] = useState(pot.total);
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setNewAmount(pot.total);
    }
  };

  const getPercentageText = () => {
    if (newSavings === "addition") {
      return newAmount >= pot.target
        ? "100%"
        : `${((newAmount / pot.target) * 100).toFixed(1)}%`;
    }
    return `${Math.max(0, (newAmount / pot.target) * 100).toFixed(1)}%`;
  };

  const getTotalText = () => {
    if (newSavings === "addition") {
      return newAmount >= pot.target ? pot.target : newAmount;
    }
    return Math.max(0, newAmount);
  };

  const handleAmountChange = (amount: number) => {
    const newTotal =
      newSavings === "addition" ? amount + pot.total : pot.total - amount;
    setNewAmount(newTotal);
  };

  const handleSubmit = async (amount: number) => {
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
  };

  const isButtonDisabled =
    newSavings === "addition" ? newAmount >= pot.target : newAmount <= 0;

  return {
    open,
    newAmount,
    handleOpenChange,
    getPercentageText,
    getTotalText,
    handleAmountChange,
    handleSubmit,
    isButtonDisabled,
  };
};
