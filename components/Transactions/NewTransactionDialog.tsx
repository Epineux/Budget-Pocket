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
import { TransactionDialogForm } from "./TransactionDialogForm";
const NewTransactionDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="!text-standard-bold rounded-lg bg-grey-900 text-white @[450px]:px-md @[450px]:py-md"
          size="noPaddingButton"
        >
          <span className="hidden @[450px]:inline">+ Add New Transaction</span>
          <span className="h1 flex h-12 w-12 items-center justify-center @[450px]:hidden">
            +
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="h1 text-grey-900">
            Add New Transaction
          </DialogTitle>
          <DialogDescription className="text-standard py-sm text-grey-500">
            Add a new transaction to your account. This will modify your
            balance.
          </DialogDescription>
        </DialogHeader>
        <TransactionDialogForm onSubmitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NewTransactionDialog;
