import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";
import TransactionItem from "./TransactionsBudgetItem";

type TransactionsBudgetProps = {
  transactionsCategory: string;
};

const TransactionsBudget = ({
  transactionsCategory,
}: TransactionsBudgetProps) => {
  const transactionsInfos = data.transactions;
  const filteredTransactions = transactionsInfos
    .filter((transaction) => transaction.category === transactionsCategory)
    .slice(0, 3);
  return (
    <div className="rounded-xl bg-beige-100 p-md sm-490:p-lg">
      <div className="flex items-center justify-between">
        <h3 className="h3 text-grey-900">Latest Spending</h3>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href={`/transactions?category=${transactionsCategory}`}
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
        {filteredTransactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            transaction={transaction}
            isLast={index === filteredTransactions.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionsBudget;
