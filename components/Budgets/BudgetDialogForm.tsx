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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import data from "../../constants/data.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { z } from "zod";
import { Input } from "../ui/input";

const formSchema = z.object({
  category: z.string().nonempty("Please select a category"),
  maximumSpend: z.number().positive().int(),
  theme: z.string().nonempty("Please select a theme"),
});

export function BudgetDialogForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      maximumSpend: undefined,
      theme: "",
    },
  });
  const categories = data.categories;
  const themes = data.themes;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Budget Category
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
          name="maximumSpend"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Maximum Spend
              </FormLabel>
              <FormControl>
                <div className=" relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    {...field}
                    type="number"
                    placeholder="e.g. 500"
                    className="text-standard h-12 border border-beige-500 pl-7 focus-visible:ring-1 focus-visible:ring-grey-900 focus-visible:ring-offset-1"
                    min={0}
                    max={9999}
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
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="!text-small-bold text-grey-500">
                Theme
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="h-12 border border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 data-[placeholder]:text-neutral-500 [&>svg]:hidden">
                    <div className="text-standard mx-xs flex w-full justify-between gap-md">
                      <SelectValue placeholder="Select Theme" />
                      <Image
                        src={"/assets/images/icon-caret-down.svg"}
                        alt="Dropdown"
                        width={11}
                        height={6}
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem
                        key={theme.name as string}
                        value={theme.name as string}
                      >
                        <div className="flex items-center gap-md">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: theme.color }}
                          />
                          <span>{theme.name as string}</span>
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
        <Button className="!mt-2xl h-12 w-full" type="submit">
          Add Budget
        </Button>
      </form>
    </Form>
  );
}

function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
}
