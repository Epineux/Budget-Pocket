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
import { useFetchContacts } from "@/hooks/useFetchContacts";
import { useSubmitBill } from "@/hooks/useSubmitBill";
import { billFormSchema } from "@/schemas/formsSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

type BillDialogFormProps = {
  onSubmitted?: () => void;
};

const formSchema = billFormSchema;

export function BillDialogForm({ onSubmitted }: BillDialogFormProps) {
  const { contacts, isLoading, refreshContacts } = useFetchContacts();
  const { createBill, isSubmitting } = useSubmitBill();
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contact: "",
      amount: 0,
      dueDate: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const success = await createBill(values);
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
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="!text-small-bold text-grey-500">
                  Due Day of Month
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value || "")}
                    value={field.value}
                  >
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
                  Amount due
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
                        field.onChange(isNaN(value) ? 0 : Math.abs(value));
                      }}
                      value={field.value || ""}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="!mt-2xl">
            <Button
              className="h-12 w-full flex-1 bg-grey-900 text-white"
              type="button"
              onClick={() => {
                form.handleSubmit(handleSubmit)();
              }}
              disabled={isLoading || isSubmitting}
            >
              Add Bill
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
