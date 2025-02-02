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
import { Input } from "@/components/ui/input";
import { updateBalance } from "@/lib/userInfosClient";
import { balanceUpdateFormSchema } from "@/schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

type EditBalanceDialogProps = {
  title: string;
  currentAmount: number;
};

const formSchema = balanceUpdateFormSchema;
export const EditBalanceDialog = ({
  title,
  currentAmount,
}: EditBalanceDialogProps) => {
  const parsedTitle = title === "Income" ? "income" : "currentBalance";
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newAmount: currentAmount,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await updateBalance(values.newAmount, parsedTitle);

    if (success) {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>
          <Edit className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {title} Balance</DialogTitle>
          <DialogDescription className="hidden">
            Edit your {title} balance.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="newAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-small-bold text-grey-500">
                    New Amount
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="text-standard h-12 border border-beige-500 pl-7 focus-visible:ring-1 focus-visible:ring-grey-900 focus-visible:ring-offset-1"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="!mt-2xl w-full">
              Save New Balance
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
