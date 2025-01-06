import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import PotDialogForm from "./PotDialogForm";
const NewPotDialog = () => {
  return (
    <Dialog>
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
            Choose a category to set a spending Pot. These categories can help
            you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <PotDialogForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewPotDialog;
