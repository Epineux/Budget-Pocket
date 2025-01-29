import { Transaction } from "@/schemas/transactionsSchemas";
import Image from "next/image";
import Link from "next/link";
import TransactionItem from "./TransactionsBudgetItem";

const TransactionsBudget = ({
  transactions,
  budgetCategory,
}: {
  transactions: Transaction[];
  budgetCategory: string;
}) => {
  const lastTransactions = transactions.slice(0, 3);
  return (
    <div className="rounded-xl bg-beige-100 p-md sm-490:p-lg">
      <div className="flex items-center justify-between">
        <h3 className="h3 text-grey-900">Latest Spending</h3>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href={`/transactions?category=${budgetCategory}`}
        >
          <span>See All</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            width={5}
            height={8}
            alt="See All Icon"
            className="w-auto"
          />
        </Link>
      </div>
      <ul className="mt-lg">
        {lastTransactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            transaction={transaction}
            isLast={index === lastTransactions.length - 1}
          />
        ))}
        {transactions.length === 0 && (
          <li className="mt-xl flex items-center ">
            <p className="text-standard text-grey-500">No spending yet</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TransactionsBudget;
