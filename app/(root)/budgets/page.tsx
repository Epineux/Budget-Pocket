// app/budgets/page.tsx
import BudgetsSection from "@/components/Budgets/BudgetsSection";
import NewBudgetDialog from "@/components/Budgets/NewBudgetDialog";
import Loader from "@/components/Loader";
import { Suspense } from "react";

const Page = () => {
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Budgets</h1>
        <NewBudgetDialog />
      </div>
      <Suspense fallback={<Loader />}>
        <BudgetsSection />
      </Suspense>
    </main>
  );
};

export default Page;
