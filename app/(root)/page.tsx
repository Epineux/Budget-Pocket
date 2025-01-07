import BalanceInfo from "@/components/Overview/BalanceInfo";
import BudgetsOverview from "@/components/Overview/BudgetsOverview";
import PotsOverview from "@/components/Overview/PotsOverview";
import RecurringBillsOverview from "@/components/Overview/RecurringBillsOverview";
import TransactionsOverview from "@/components/Overview/TransactionsOverview";

export default function Home() {
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <h1 className="h1 pb-lg text-grey-900">Overview</h1>
      <section className="mt-2xl grid grid-cols-1 gap-sm @[600px]:grid-cols-3 sm-490:gap-xl">
        <BalanceInfo title="Current Balance" amount={4836} currency="$" />
        <BalanceInfo title="Income" amount={3814.25} currency="$" />
        <BalanceInfo title="Expenses" amount={1700.5} currency="$" />
      </section>
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
    </main>
  );
}
