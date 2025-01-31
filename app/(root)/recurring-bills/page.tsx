import NoCurrentData from "@/components/NoCurrentData";
import BillsSummary from "@/components/RecurringBills/BillsSummary";
import BillsTable from "@/components/RecurringBills/BillsTable";
import NewBillDialog from "@/components/RecurringBills/NewBillDialog";
import TotalBills from "@/components/RecurringBills/TotalBills";
import { columns } from "@/components/RecurringBills/billsColumns";
import { getRecurringBills } from "@/lib/recurringBills";
const page = async () => {
  try {
    const recurringBillsData = await getRecurringBills();
    return (
      <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
        <div className="flex items-center justify-between">
          <h1 className="h1 text-grey-900">Recurring Bills</h1>
          <NewBillDialog />
        </div>
        {recurringBillsData.length > 0 ? (
          <section className="mt-2xl flex flex-col gap-xl @[800px]:flex-row">
            <div className="flex flex-[2] flex-col gap-sm @[500px]:flex-row @[500px]:gap-xl @[800px]:flex-col">
              <TotalBills />
              <BillsSummary />
            </div>
            <div className="flex-[3]">
              <BillsTable columns={columns} data={recurringBillsData} />
            </div>
          </section>
        ) : (
          <NoCurrentData pageName="recurringBills" />
        )}
      </main>
    );
  } catch (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-red-700">Error loading recurring bills</h2>
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    );
  }
};

export default page;
