"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { BudgetDialogForm } from "./BudgetDialogForm";
const NewBudgetDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="!text-standard-bold rounded-lg bg-grey-900  text-white"
          size="topPageButton"
        >
          + Add New Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="h1 text-grey-900">Add New Budget</DialogTitle>
          <DialogDescription className="text-standard py-sm text-grey-500">
            Choose a category to set a spending budget. Expenses of the current
            month for this category will be tracked.
          </DialogDescription>
        </DialogHeader>
        <BudgetDialogForm onSubmitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NewBudgetDialog;
