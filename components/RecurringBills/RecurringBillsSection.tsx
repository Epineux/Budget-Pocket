import BillsSummary from "@/components/RecurringBills/BillsSummary";
import BillsTable from "@/components/RecurringBills/BillsTable";
import TotalBills from "@/components/RecurringBills/TotalBills";
import { columns } from "@/components/RecurringBills/billsColumns";
import { getRecurringBills } from "@/lib/recurringBills";
import NoCurrentData from "../NoCurrentData";

export default async function RecurringBillsSection() {
  const recurringBillsData = await getRecurringBills();

  if (recurringBillsData.length === 0) {
    return <NoCurrentData pageName="recurring bills" />;
  }

  return (
    <section className="mt-2xl flex flex-col gap-xl @[800px]:flex-row">
      <div className="flex flex-[2] flex-col gap-sm @[500px]:flex-row @[500px]:gap-xl @[800px]:flex-col">
        <TotalBills recurringBillsData={recurringBillsData} />
        <BillsSummary recurringBillsData={recurringBillsData} />
      </div>
      <div className="flex-[3]">
        <BillsTable columns={columns} data={recurringBillsData} />
      </div>
    </section>
  );
}
