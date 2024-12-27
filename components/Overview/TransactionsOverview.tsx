import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";
import TransactionItem from "./TransactionItem";

const TransactionsOverview = () => {
  const transactionsInfos = data.transactions;
  return (
    <div className="rounded-xl bg-white p-2xl @container">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Transactions</h2>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href="/pots"
        >
          <span>View All</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            alt="Caret Right"
            width={5}
            height={8}
          />
        </Link>
      </div>
      <ul className="mt-2xl">
        {transactionsInfos.slice(0, 5).map((transaction, index) => (
          <TransactionItem
            key={index}
            transaction={transaction}
            isLast={index === 4}
          />
        ))}
      </ul>
    </div>
  );
};

export default TransactionsOverview;
