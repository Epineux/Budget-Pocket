import Loader from "@/components/Loader"; // Import the Loader component
import NewBillDialog from "@/components/RecurringBills/NewBillDialog";
import RecurringBillsSection from "@/components/RecurringBills/RecurringBillsSection"; // Import the new component
import { Suspense } from "react";

const Page = () => {
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Recurring Bills</h1>
        <NewBillDialog />
      </div>
      <Suspense fallback={<Loader />}>
        <RecurringBillsSection />
      </Suspense>
    </main>
  );
};

export default Page;
