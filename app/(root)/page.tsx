import BalanceInfo from "@/components/Overview/BalanceInfo";
import BudgetsOverview from "@/components/Overview/BudgetsOverview";
import PotsOverview from "@/components/Overview/PotsOverview";
import RecurringBillsOverview from "@/components/Overview/RecurringBillsOverview";
import TransactionsOverview from "@/components/Overview/TransactionsOverview";

export default function Home() {
  return (
    <main className="px-md py-2xl @container sm-490:px-3xl">
      <h1 className="h1 pb-lg text-grey-900">Overview</h1>
      <section className="mt-2xl grid grid-cols-1 gap-xl @[600px]:grid-cols-3">
        <BalanceInfo title="Current Balance" amount={4836} currency="$" />
        <BalanceInfo title="Income" amount={3814.25} currency="$" />
        <BalanceInfo title="Expenses" amount={1700.5} currency="$" />
      </section>
      <section className="mt-2xl flex flex-col gap-xl @[800px]:flex-row">
        {/* Left */}
        <div className="flex flex-[3] flex-col gap-xl">
          <PotsOverview />
          <TransactionsOverview />
        </div>
        {/* Right */}
        <div className="flex flex-[2] flex-col gap-xl">
          <BudgetsOverview />
          <RecurringBillsOverview />
        </div>
      </section>
    </main>
  );
}
