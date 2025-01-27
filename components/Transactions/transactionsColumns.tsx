"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Transaction } from "@/schemas/transactionsSchemas";
import { formatDateToReadable } from "@/utils/formatDateToReadable";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.contacts.name,
    header: () => (
      <div className="text-small text-nowrap text-grey-500">
        Recipient / Sender
      </div>
    ),
    cell: ({ row }) => {
      const contactName = row.original.contacts.name;
      const avatar = row.original.contacts.avatar as string;
      const category = row.getValue("category") as string;
      return (
        <div>
          {/* Desktop */}
          <div className="hidden items-center gap-md @[640px]:flex">
            <Avatar>
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <p className="text-standard-bold text-grey-900">{contactName}</p>
          </div>
          {/* Mobile */}
          <div className="flex items-center gap-md @[640px]:hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2xs">
              <p className="text-standard-bold text-grey-900">{contactName}</p>
              <p className="text-small text-grey-500">{category}</p>
            </div>
          </div>
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
      return (
        <p className="text-small hidden text-nowrap text-grey-500 @[640px]:table-cell">
          {category}
        </p>
      );
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
        <p className="text-small hidden text-nowrap text-grey-500 @[640px]:table-cell">
          {readableDate}
        </p>
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
      const date = row.getValue("date");

      const stringAmount = amount.toFixed(2).toString();
      const displayedPrice = stringAmount.includes("-")
        ? "-$" + stringAmount.slice(1)
        : "+$" + stringAmount;
      return (
        <div>
          <p
            className={clsx(
              "text-standard-bold hidden text-nowrap text-right @[640px]:block",
              amount < 0 ? "text-grey-900" : "text-secondary-green",
            )}
          >
            {displayedPrice}
          </p>
          <div className="flex flex-col gap-2xs @[640px]:hidden">
            <p
              className={clsx(
                "text-standard-bold text-nowrap text-right @[640px]:hidden",
                amount < 0 ? "text-grey-900" : "text-secondary-green",
              )}
            >
              {displayedPrice}
            </p>
            <p className="text-small text-nowrap text-right text-grey-500">
              {formatDateToReadable(date as string)}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({}) => {
      // const transaction = row.original;

      return (
        <div className="hidden shrink-0 justify-end @[510px]:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild style={{ boxShadow: "none" }}>
              <Button
                variant="ghost"
                className="h-8 w-4 p-0 focus:border focus:border-grey-900"
              >
                <Image
                  src="/assets/images/icon-ellipsis.svg"
                  width={14}
                  height={4}
                  alt="Edit Icon"
                  className="rotate-90"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="px-md">
                Edit Transaction
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-md" />
              <DropdownMenuItem className="px-md text-secondary-red">
                Delete Transaction
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
