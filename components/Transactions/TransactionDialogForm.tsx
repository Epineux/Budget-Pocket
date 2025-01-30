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
import { useState } from "react";
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
  onSubmitted?: () => void;
};

const formSchema = transactionFormSchema;

export function TransactionDialogForm({
  onSubmitted,
}: TransactionDialogFormProps) {
  const { contacts, isLoading, refreshContacts } = useFetchContacts();
  const { createTransaction, isSubmitting } = useSubmitTransaction();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const categories = TRANSACTION_CATEGORIES;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: undefined,
      amount: undefined,
      date: new Date(),
      category: "General",
      type: "expense",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const amount =
      values.type === "expense"
        ? -Math.abs(values.amount!)
        : Math.abs(values.amount!);
    const success = await createTransaction({
      ...values,
      amount,
    });
    if (success) {
      form.reset();
      onSubmitted?.();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <div className="flex w-full gap-sm sm-490:gap-lg">
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
                            className="w-auto"
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
                                <AvatarImage
                                  src={contact.avatar}
                                  alt="Avatar"
                                />
                                <AvatarFallback>?</AvatarFallback>
                              </Avatar>
                              <span className="text-standard w-24 truncate break-words text-grey-900 mobile:w-full">
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
            <div className="ml-auto mt-auto">
              <Button
                className="text-standard hidden h-12 rounded-lg bg-grey-900 text-white sm-490:inline"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setContactDialogOpen(true);
                }}
              >
                + Add New Contact
              </Button>
              <Button
                className="text-standard h-12 rounded-lg bg-grey-900 text-white sm-490:hidden"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setContactDialogOpen(true);
                }}
              >
                New Contact
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-small-bold text-grey-500">
                  Select Category
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
                    <SelectContent className="max-h-64 overflow-y-auto">
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
                      min={0.01}
                      step={0.01}
                      max={1000000}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]|\.|Backspace|Delete|Tab|ArrowLeft|ArrowRight|ArrowUp|ArrowDown/.test(
                            e.key,
                          )
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(
                          isNaN(value) ? undefined : Math.abs(value),
                        );
                      }}
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="!mt-2xl flex gap-sm">
            <Button
              className="h-12 flex-1 bg-secondary-green hover:bg-secondary-green/90"
              type="button"
              onClick={() => {
                form.setValue("type", "income");
                form.handleSubmit(handleSubmit)();
              }}
              disabled={isLoading || isSubmitting}
            >
              Add Income
            </Button>
            <Button
              className="h-12 flex-1 bg-secondary-red hover:bg-secondary-red/90"
              type="button"
              onClick={() => {
                form.setValue("type", "expense");
                form.handleSubmit(handleSubmit)();
              }}
              disabled={isLoading || isSubmitting}
            >
              Add Expense
            </Button>
          </div>
        </form>
      </Form>
      <NewContactDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
        onContactCreated={refreshContacts}
      />
    </div>
  );
}
