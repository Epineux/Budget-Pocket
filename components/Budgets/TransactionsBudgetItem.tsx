import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Transaction } from "@/schemas/transactionsSchemas";
import { formatDateToReadable } from "@/utils/dateUtils";
import clsx from "clsx";

const TransactionBudgetItem = ({
  transaction,
  isLast,
}: {
  transaction: Transaction;
  isLast: boolean;
}) => {
  const readableDate = formatDateToReadable(transaction.date);
  const DisplayPrice = () => {
    const stringAmount = transaction.amount.toFixed(2).toString();
    const displayedPrice = stringAmount.includes("-")
      ? "-$" + stringAmount.slice(1)
      : "+$" + stringAmount;
    return (
      <p
        className={clsx(
          "text-small-bold",
          transaction.amount < 0 ? "text-grey-900" : "text-secondary-green",
        )}
      >
        {displayedPrice}
      </p>
    );
  };

  return (
    <li>
      <div className="flex justify-between gap-md">
        <div className="flex items-center gap-md">
          <Avatar className="h-8 w-8">
            <AvatarImage src={transaction.contacts.avatar} alt="Avatar" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <p className="text-small-bold text-grey-900">
            {transaction.contacts.name}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2xs">
          <DisplayPrice />
          <p className="text-small text-nowrap text-grey-500">{readableDate}</p>
        </div>
      </div>
      {!isLast && <hr className="my-sm border-grey-500/15" />}
    </li>
  );
};

export default TransactionBudgetItem;
