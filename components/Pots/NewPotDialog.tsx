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
import { PotDialogForm } from "./PotDialogForm";
const NewPotDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="!text-standard-bold rounded-lg bg-grey-900  text-white"
          size="topPageButton"
        >
          + Add New Pot
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="h1 text-grey-900">Add New Pot</DialogTitle>
          <DialogDescription className="text-standard py-sm text-grey-500">
            Create a pot to set savings targets. You can track total pot value
            in the Overview.
          </DialogDescription>
        </DialogHeader>
        <PotDialogForm onSubmitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default NewPotDialog;
