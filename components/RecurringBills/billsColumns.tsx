"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RecurringBill } from "@/schemas/recurringBillsSchema";
import { parseDueDate } from "@/utils/dateUtils";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";
import { ActionsDropdown } from "./ActionDropdown";

const today = new Date();
const dayOfMonth = today.getDate();

export const columns: ColumnDef<RecurringBill>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => row.contacts.name,
    header: () => (
      <div className="text-small text-nowrap text-grey-500">Bill Title</div>
    ),

    cell: ({ row }) => {
      const name = row.original.contacts.name;
      const avatar = row.original.contacts.avatar;
      const dueDate = row.original.dueDate;
      const isPaid = row.original.isPaid;
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
      const isPaid = row.original.isPaid;

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
      const isPaid = row.original.isPaid;
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
                : "text-secondary-green",
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
      const recurringBillId = row.original.id;
      const amount = row.original.amount;
      const dueDate = row.original.dueDate;
      const isPaid = row.original.isPaid;
      const contact = row.original.contacts;
      return (
        <ActionsDropdown
          recurringBillId={recurringBillId}
          isPaid={isPaid}
          amount={amount}
          dueDate={dueDate}
          contact={contact}
        />
      );
    },
  },
];
