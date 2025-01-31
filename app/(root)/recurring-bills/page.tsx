import BillsSummary from "@/components/RecurringBills/BillsSummary";
import BillsTable from "@/components/RecurringBills/BillsTable";
import TotalBills from "@/components/RecurringBills/TotalBills";
import { columns } from "@/components/RecurringBills/billsColumns";
import { getRecurringBills } from "@/lib/recurringBills";
const page = async () => {
  const recurringBillsData = await getRecurringBills();
  console.log(recurringBillsData);
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Recurring Bills</h1>
        {/* <NewRecurringBillDialog /> */}
      </div>
      <section className="mt-2xl flex flex-col gap-xl @[800px]:flex-row">
        <div className="flex flex-[2] flex-col gap-sm @[500px]:flex-row @[500px]:gap-xl @[800px]:flex-col">
          <TotalBills />
          <BillsSummary />
        </div>
        <div className="flex-[3]">
          <BillsTable columns={columns} data={recurringBillsData} />
        </div>
      </section>
    </main>
  );
};

export default page;
