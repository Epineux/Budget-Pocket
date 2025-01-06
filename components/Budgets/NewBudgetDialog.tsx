import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { BudgetDialogForm } from "./BudgetDialogForm";
const NewBudgetDialog = () => {
  return (
    <Dialog>
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
            Choose a category to set a spending budget. These categories can
            help you monitor spending.
          </DialogDescription>
        </DialogHeader>
        <BudgetDialogForm />
      </DialogContent>
    </Dialog>
  );
};

export default NewBudgetDialog;
