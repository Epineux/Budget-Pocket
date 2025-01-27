"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TRANSACTION_CATEGORIES } from "@/constants/transactionCategories";
import { useFetchContacts } from "@/hooks/useFetchContacts";
import { useSubmitTransaction } from "@/hooks/useSubmitTransaction";
import { transactionFormSchema } from "@/schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "../DatePicker";
import NewContactDialog from "../NewContactDialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TransactionDialogFormProps = {
  isOpen: boolean;
  onSubmitted?: () => void;
};

const formSchema = transactionFormSchema;

export function TransactionDialogForm({
  onSubmitted,
}: TransactionDialogFormProps) {
  const { contacts, isLoading, refreshContacts } = useFetchContacts();
  const { createTransaction, isSubmitting } = useSubmitTransaction();
  const categories = TRANSACTION_CATEGORIES;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: undefined,
      amount: undefined,
      date: new Date(),
      category: "General",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await createTransaction(values);
    if (success) {
      form.reset();
      onSubmitted?.();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        <div className="flex w-full gap-lg">
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="!text-small-bold text-grey-500">
                  Choose a Contact
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 border border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 data-[placeholder]:text-neutral-500 [&>svg]:hidden">
                      <div className="text-standard mx-xs flex w-full justify-between gap-md">
                        <SelectValue placeholder="Select Contact" />
                        <Image
                          src={"/assets/images/icon-caret-down.svg"}
                          alt="Dropdown"
                          width={11}
                          height={6}
                        />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
                        <SelectItem
                          key={contact.id as string}
                          value={contact.id as string}
                        >
                          <div className="flex items-center gap-sm">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={contact.avatar} alt="Avatar" />
                              <AvatarFallback>?</AvatarFallback>
                            </Avatar>
                            <span className="text-standard text-grey-900">
                              {contact.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <NewContactDialog onContactCreated={refreshContacts} />
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Select category
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 border border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 data-[placeholder]:text-neutral-500 [&>svg]:hidden">
                    <div className="text-standard mx-xs flex w-full justify-between gap-md">
                      <SelectValue placeholder="Select Contact" />
                      <Image
                        src={"/assets/images/icon-caret-down.svg"}
                        alt="Dropdown"
                        width={11}
                        height={6}
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category as string}
                        value={category as string}
                      >
                        {category as string}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Transaction Amount
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    {...field}
                    type="number"
                    placeholder="e.g. 500"
                    className="text-standard h-12 border border-beige-500 pl-7 focus-visible:ring-1 focus-visible:ring-grey-900 focus-visible:ring-offset-1"
                    min={-1000000}
                    max={1000000}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || undefined)
                    }
                    value={field.value || ""}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="!text-small-bold text-grey-500">
                Transaction Date
              </FormLabel>
              <DatePicker value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="!mt-2xl h-12 w-full"
          type="submit"
          disabled={isLoading || isSubmitting}
        >
          Add Transaction
        </Button>
      </form>
    </Form>
  );
}
