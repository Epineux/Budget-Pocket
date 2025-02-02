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
import { updateBill } from "@/lib/recurringBillsClient";
import { billUpdateFormSchema } from "@/schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type EditBillDialogProps = {
  billId: string;
  currentDueDate: string;
  currentAmount: number;
};

const formSchema = billUpdateFormSchema;
export const EditBillDialog = ({
  billId,
  currentDueDate,
  currentAmount,
}: EditBillDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dueDate: currentDueDate,
      newAmount: currentAmount,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await updateBill(billId, values.dueDate, values.newAmount);
    if (success) {
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          Edit Recurring Bill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Recurring Bill</DialogTitle>
          <DialogDescription className="hidden">
            Edit the due date and amount of the recurring bill.
          </DialogDescription>
        </DialogHeader>
        <Form {...form} aria-label="Edit Recurring Bill Form">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-small-bold text-grey-500">
                    Due Date
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 border border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 data-[placeholder]:text-neutral-500 [&>svg]:hidden">
                        <div className="text-standard mx-xs flex w-full justify-between gap-md">
                          <SelectValue placeholder="Select Category" />
                          <Image
                            src={"/assets/images/icon-caret-down.svg"}
                            alt="Dropdown"
                            width={11}
                            height={6}
                            className="w-auto"
                          />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <div className="grid grid-cols-7">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <SelectItem
                                key={day}
                                value={day.toString()}
                                className="text-standard"
                              >
                                {day}
                              </SelectItem>
                            ),
                          )}
                        </div>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
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
              Save Changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
