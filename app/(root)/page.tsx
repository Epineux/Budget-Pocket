import BalanceInfo from "@/components/Overview/BalanceInfo";
import BudgetsOverview from "@/components/Overview/BudgetsOverview";
import PotsOverview from "@/components/Overview/PotsOverview";
import RecurringBillsOverview from "@/components/Overview/RecurringBillsOverview";
import TransactionsOverview from "@/components/Overview/TransactionsOverview";

export default function Home() {
  return (
    <main className="px-3xl py-2xl">
      <h1 className="h1 pb-lg text-grey-900">Overview</h1>
      <section className="mt-2xl grid gap-xl md:grid-cols-3">
        <BalanceInfo title="Current Balance" amount={4836} currency="$" />
        <BalanceInfo title="Income" amount={3814.25} currency="$" />
        <BalanceInfo title="Expenses" amount={1700.5} currency="$" />
      </section>
      <section className="mt-2xl grid grid-cols-5 gap-xl">
        <PotsOverview />
        <BudgetsOverview />
        <TransactionsOverview />
        <RecurringBillsOverview />
      </section>
    </main>
  );
}
