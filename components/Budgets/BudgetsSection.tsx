import BudgetCategoryCard from "@/components/Budgets/BudgetCategoryCard";
import BudgetChartCard from "@/components/Budgets/BudgetChartCard";
import { getBudgets } from "@/lib/budgets";
import { getTransactions } from "@/lib/transactions";
import NoCurrentData from "../NoCurrentData";

export default async function BudgetsSection() {
  const budgetsData = await getBudgets();
  const transactionsData = await getTransactions();

  if (budgetsData.length === 0) {
    return <NoCurrentData pageName="budgets" />;
  }

  return (
    <div className="mt-2xl flex flex-col gap-xl @[800px]:flex-row">
      <section className="flex-[2]">
        <BudgetChartCard
          budgetsData={budgetsData}
          transactionsData={transactionsData}
        />
      </section>
      <section className="flex-[3]">
        <ul className="flex flex-col gap-xl">
          {budgetsData.map((budget) => {
            const categoryTransactions = transactionsData.filter(
              (transaction) => transaction.category === budget.category,
            );
            return (
              <li key={budget.category}>
                <BudgetCategoryCard
                  budget={budget}
                  transactions={categoryTransactions}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
