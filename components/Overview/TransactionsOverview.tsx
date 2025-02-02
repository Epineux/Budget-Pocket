import { getTransactions } from "@/lib/transactions";
import Image from "next/image";
import Link from "next/link";
import NoCurrentData from "../NoCurrentData";
import TransactionItem from "./TransactionsOverviewItem";

const TransactionsOverview = async () => {
  const transactionsData = await getTransactions();

  if (transactionsData.length === 0) {
    return (
      <div className="rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
        <div className="flex justify-between">
          <h2 className="h2 text-grey-900">Transactions</h2>
          <Link
            className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
            href="/transactions"
          >
            <span>View All</span>
            <Image
              src="/assets/images/icon-caret-right.svg"
              alt="Caret Right"
              width={5}
              height={8}
              className="w-auto"
            />
          </Link>
        </div>
        <NoCurrentData pageName="transactions" />
      </div>
    );
  }
  return (
    <div className="rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Transactions</h2>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href="/transactions"
        >
          <span>View All</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            alt="Caret Right"
            width={5}
            height={8}
            className="w-auto"
          />
        </Link>
      </div>
      <ul className="mt-2xl">
        {transactionsData.slice(-5).map((transaction, index) => (
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
