import BalanceLoader from "@/components/BalanceLoader";
import Loader from "@/components/Loader";
import BudgetsOverview from "@/components/Overview/BudgetsOverview";
import PotsOverview from "@/components/Overview/PotsOverview";
import RecurringBillsOverview from "@/components/Overview/RecurringBillsOverview";
import TransactionsOverview from "@/components/Overview/TransactionsOverview";
import UserBalances from "@/components/Overview/UserBalances";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <h1 className="h1 text-grey-900 md:pb-lg">Overview</h1>
      <Suspense fallback={<BalanceLoader />}>
        <UserBalances />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <section className="mt-2xl flex flex-col gap-md @[800px]:flex-row sm-490:gap-xl">
          {/* Left */}
          <div className="flex flex-[3] flex-col gap-md sm-490:gap-xl">
            <PotsOverview />
            <TransactionsOverview />
          </div>
          {/* Right */}
          <div className="flex flex-[2] flex-col gap-md sm-490:gap-xl">
            <BudgetsOverview />
            <RecurringBillsOverview />
          </div>
        </section>
      </Suspense>
    </main>
  );
}
