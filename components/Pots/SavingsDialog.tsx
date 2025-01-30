"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useSavingsDialog } from "@/hooks/useSavingsDialog";
import { Pot } from "@/schemas/potsSchema";
import { SavingsDialogForm } from "./SavingsDialogForm";

type Props = {
  newSavings: "addition" | "subtraction";
  pot: Pot;
};
const SavingsDialog = ({ newSavings, pot }: Props) => {
  const {
    open,
    newAmount,
    handleOpenChange,
    getPercentageText,
    getTotalText,
    isButtonDisabled,
    handleAmountChange,
    handleSubmit,
  } = useSavingsDialog({ pot, newSavings });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="text-standard-bold flex-1 rounded-lg border border-beige-100 bg-beige-100 hover:border-beige-500 hover:bg-beige-100/50"
          variant="ghost"
          disabled={isButtonDisabled}
          size={"potCardButton"}
        >
          {newSavings === "addition" ? "+ Add Money" : "Withdraw"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="h2 text-grey-900">
            {newSavings === "addition"
              ? `Add to ${pot.name} Pot`
              : `Withdraw from ${pot.name} Pot`}
          </DialogTitle>
          <DialogDescription className="text-standard pt-sm text-grey-500">
            {newSavings === "addition"
              ? "Enter an amount to add money to your pot"
              : "Enter an amount to withdraw money from your pot"}
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-standard text-grey-500">Total Saved</p>
            <h1 className="h1 text-grey-900">${getTotalText()}</h1>
          </div>
          <Progress
            value={
              newAmount >= pot.target ? 100 : (newAmount / pot.target) * 100
            }
            className="mb-sm mt-md h-2"
            style={
              {
                "--progress-indicator-color": pot.theme,
              } as React.CSSProperties
            }
          />
          <div className="flex items-center justify-between">
            <p className="text-small-bold text-grey-500">
              {getPercentageText()}
            </p>
            <p className="text-small text-grey-500">Target of ${pot.target}</p>
          </div>
        </div>
        <SavingsDialogForm
          currentAmount={pot.total}
          newSavingsType={newSavings}
          potTarget={pot.target}
          dialogOpen={open}
          potId={pot.id}
          handleAmountChange={handleAmountChange}
          handleSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SavingsDialog;
