import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";
import RecurringBillsItem from "./RecurringBillsItem";

const RecurringBillsOverview = () => {
  const recurringBillsInfo = data.recurringBills;
  return (
    <div className="rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Recurring Bills</h2>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href="/recurring-bills"
        >
          <span>See Details</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            alt="Caret Right"
            width={5}
            height={8}
          />
        </Link>
      </div>
      <ul className="mt-2xl flex flex-col gap-sm">
        {recurringBillsInfo.map((recurringBill) => (
          <RecurringBillsItem
            key={recurringBill.name}
            recurringBill={recurringBill}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecurringBillsOverview;
