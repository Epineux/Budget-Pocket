"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteBill, updateBillPaidStatus } from "@/lib/recurringBillsClient";
import { addTransactionToBalance } from "@/lib/userInfosClient";
import { Contact } from "@/schemas/transactionsSchemas";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { EditBillDialog } from "./EditBillDialog";

type ActionsDropdownProps = {
  recurringBillId: string;
  isPaid: boolean;
  amount: number;
  dueDate: string;
  contact: Contact;
};

export const ActionsDropdown = ({
  recurringBillId,
  isPaid,
  amount,
  dueDate,
  contact,
}: ActionsDropdownProps) => {
  const router = useRouter();

  const handleMarkAsPaid = async () => {
    const success = await updateBillPaidStatus(
      recurringBillId,
      amount,
      contact,
    );
    if (success) {
      addTransactionToBalance(amount * -1);
      router.refresh();
    }
  };

  const handleDelete = async () => {
    const success = await deleteBill(recurringBillId);
    if (success) {
      router.refresh();
    }
  };

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
          {!isPaid && (
            <div>
              <DropdownMenuItem
                className="px-md text-secondary-green"
                onClick={handleMarkAsPaid}
              >
                Mark Bill as Paid
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-md" />
            </div>
          )}
          <EditBillDialog
            billId={recurringBillId}
            currentAmount={amount}
            currentDueDate={dueDate}
          />
          <DropdownMenuSeparator className="mx-md" />
          <DropdownMenuItem
            className="px-md text-secondary-red"
            onClick={handleDelete}
          >
            Delete Recurring Bill
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
