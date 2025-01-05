import BudgetCategoryCard from "@/components/Budgets/BudgetCategoryCard";
import BudgetChartCard from "@/components/Budgets/BudgetChartCard";
import { Button } from "@/components/ui/button";
import data from "@/constants/data.json";

const page = () => {
  const budgetsData = data.budgets;
  return (
    <main className="px-md py-2xl @container sm-490:px-3xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Budgets</h1>
        <Button
          className="!text-standard-bold rounded-lg bg-grey-900  text-white"
          size="topPageButton"
        >
          + Add New Budget
        </Button>
      </div>
      <div className="mt-2xl flex flex-col gap-xl @[800px]:flex-row">
        <section className="flex-[2]">
          <BudgetChartCard />
        </section>
        <section className="flex-[3]">
          <ul className="flex flex-col gap-xl">
            {budgetsData.map((category) => (
              <li key={category.name}>
                <BudgetCategoryCard category={category} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default page;
