"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { parseDueDate } from "@/utils/dateUtils";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const today = new Date();
const dayOfMonth = today.getDate();

export const recurringBillSchema = z.object({
  avatar: z.string().url(),
  name: z.string().min(1),
  dueDate: z.string(),
  amount: z.number(),
  paid: z.boolean(),
});
export type RecurringBill = z.infer<typeof recurringBillSchema>;

export const columns: ColumnDef<RecurringBill>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="text-small text-nowrap text-grey-500">Bill Title</div>
    ),

    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const avatar = row.original.avatar;
      const dueDate = row.original.dueDate;
      const isPaid = row.original.paid;
      return (
        <div>
          {/* Desktop */}
          <div className="hidden items-center gap-md @[590px]:flex">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <p className="text-standard-bold text-grey-900">{name}</p>
          </div>
          {/* Mobile */}
          <div className="flex items-center gap-md @[590px]:hidden">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt="Avatar" />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2xs">
              <p className="text-standard-bold text-grey-900">{name}</p>
              <div className="flex items-center gap-xs">
                <p className="text-small text-nowrap text-grey-500 ">
                  Monthly-{dueDate}
                </p>
                {isPaid ? (
                  <Image
                    src="/assets/images/icon-bill-paid.svg"
                    width={13}
                    height={13}
                    alt="Paid Icon"
                  />
                ) : dayOfMonth >= parseDueDate(dueDate) ? (
                  <Image
                    src="/assets/images/icon-bill-due.svg"
                    width={13}
                    height={13}
                    alt="Due Icon"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    accessorFn: (row) => parseInt(row.dueDate.replace(/\D/g, "")),
    header: () => (
      <div className="text-small text-nowrap text-grey-500">Due Date</div>
    ),
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      const isPaid = row.original.paid;

      return (
        <div className=" hidden items-center gap-xs @[590px]:flex">
          <p className="text-small text-nowrap text-grey-500 ">
            Monthly-{dueDate}
          </p>
          {isPaid ? (
            <Image
              src="/assets/images/icon-bill-paid.svg"
              width={16}
              height={16}
              alt="Paid Icon"
            />
          ) : dayOfMonth >= parseDueDate(dueDate) ? (
            <Image
              src="/assets/images/icon-bill-due.svg"
              width={16}
              height={16}
              alt="Due Icon"
            />
          ) : null}
        </div>
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
      const isPaid = row.original.paid;
      const dueDate = row.original.dueDate;
      const stringAmount = amount.toFixed(2).toString();
      return (
        <div>
          <p
            className={clsx(
              "text-standard-bold text-nowrap text-right",
              !isPaid
                ? dayOfMonth >= parseDueDate(dueDate)
                  ? "text-secondary-red"
                  : "text-grey-900"
                : "text-green-500",
            )}
          >
            ${stringAmount}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const recurringBill = row.original;

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
                Edit Recurring Bill
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-md" />
              <DropdownMenuItem className="px-md text-secondary-red">
                Delete Recurring Bill
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
