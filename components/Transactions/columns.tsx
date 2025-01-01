"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateToReadable } from "@/utils/formatDateToReadable";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { MoreVertical } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const transactionSchema = z.object({
  avatar: z.string().url(),
  name: z.string().min(1),
  category: z.string(),
  date: z.string().datetime(),
  amount: z.number(),
  recurring: z.boolean(),
});
export type Transaction = z.infer<typeof transactionSchema>;

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-small text-nowrap text-grey-500">
        Recipient / Sender
      </div>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const avatar = row.original.avatar;
      return (
        <div className="flex items-center gap-md">
          <Avatar>
            <AvatarImage src={avatar} alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <p className="text-standard-bold text-grey-900">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: () => (
      <div className="text-small text-nowrap text-grey-500">Category</div>
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as string;
      return <p className="text-small text-nowrap text-grey-500">{category}</p>;
    },
  },
  {
    accessorKey: "date",
    header: () => (
      <div className="text-small text-nowrap text-grey-500">
        Transaction Date
      </div>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date");
      const readableDate = formatDateToReadable(date as string);
      return (
        <p className="text-small text-nowrap text-grey-500">{readableDate}</p>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => (
      <div className="text-small text-nowrap text-right text-grey-500">
        Amount
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const stringAmount = amount.toFixed(2).toString();
      const displayedPrice = stringAmount.includes("-")
        ? "-$" + stringAmount.slice(1)
        : "+$" + stringAmount;
      return (
        <p
          className={clsx(
            "text-standard-bold text-nowrap text-right",
            amount < 0 ? "text-grey-900" : "text-secondary-green",
          )}
        >
          {displayedPrice}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-4 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4 text-grey-900" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View transaction details</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
