import BudgetCategoryCard from "@/components/Budgets/BudgetCategoryCard";
import BudgetChartCard from "@/components/Budgets/BudgetChartCard";
import NewBudgetDialog from "@/components/Budgets/NewBudgetDialog";
import { getBudgets } from "@/lib/budgets";
import { getTransactions } from "@/lib/transactions";

const page = async () => {
  try {
    const budgetsData = await getBudgets();
    const transactionsData = await getTransactions();
    return (
      <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
        <div className="flex items-center justify-between">
          <h1 className="h1 text-grey-900">Budgets</h1>
          <NewBudgetDialog />
        </div>
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
      </main>
    );
  } catch (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-red-700">Error loading budgets</h2>
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    );
  }
};

export default page;
