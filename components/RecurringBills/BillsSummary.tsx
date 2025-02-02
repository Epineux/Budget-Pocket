import { RecurringBill } from "@/schemas/recurringBillsSchema";
import { getBillTotals } from "@/utils/getTotals";

const BillsSummary = ({
  recurringBillsData,
}: {
  recurringBillsData: RecurringBill[];
}) => {
  const {
    paidBillsTotal,
    upcomingBillsTotal,
    dueBillsTotal,
    paidBills,
    upcomingBills,
    dueBills,
  } = getBillTotals({ recurringBillsData });
  return (
    <div className="w-full rounded-xl bg-white p-lg">
      <h3 className="h3 text-grey-900">Summary</h3>
      <ul className="mt-lg">
        <li>
          <div className="flex items-center justify-between">
            <p className="text-small text-grey-500">
              Paid Bills{" "}
              <span className="text-small-bold">({paidBills.length})</span>
            </p>
            <p className="text-small-bold text-grey-900">${paidBillsTotal}</p>
          </div>
          <hr className="my-md" />
        </li>
        <li>
          <div className="flex items-center justify-between">
            <p className="text-small text-grey-500">
              Upcoming Bills{" "}
              <span className="text-small-bold">({upcomingBills.length})</span>
            </p>
            <p className="text-small-bold text-grey-900">
              ${upcomingBillsTotal}
            </p>
          </div>
          <hr className="my-md" />
        </li>
        <li>
          <div className="flex items-center justify-between">
            <p className="text-small text-secondary-red">
              Due Bills{" "}
              <span className="text-small-bold">({dueBills.length})</span>
            </p>
            <p className="text-small-bold text-secondary-red">
              ${dueBillsTotal}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BillsSummary;
