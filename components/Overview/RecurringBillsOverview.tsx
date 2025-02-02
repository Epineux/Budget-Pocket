import Image from "next/image";
import Link from "next/link";
import RecurringBillsItem from "./RecurringBillsItem";

import { getRecurringBills } from "@/lib/recurringBills";
import { getBillTotals } from "@/utils/getTotals";
import NoCurrentData from "../NoCurrentData";

const RecurringBillsOverview = async () => {
  const recurringBillsInfos = await getRecurringBills();

  if (recurringBillsInfos.length === 0) {
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
              className="w-auto"
            />
          </Link>
        </div>
        <NoCurrentData pageName="recurring bills" />
      </div>
    );
  }
  const { paidBillsTotal, upcomingBillsTotal, dueBillsTotal } = getBillTotals({
    recurringBillsData: recurringBillsInfos,
  });
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
            className="w-auto"
          />
        </Link>
      </div>
      <ul className="mt-2xl flex flex-col gap-sm">
        <RecurringBillsItem
          title={"Paid Bills"}
          amount={paidBillsTotal}
          theme={"#82C9D7"}
        />
        <RecurringBillsItem
          title={"Total Upcoming"}
          amount={upcomingBillsTotal}
          theme={"#F2CDAC "}
        />
        <RecurringBillsItem
          title={"Due Bills"}
          amount={dueBillsTotal}
          theme={"#C94736"}
        />
      </ul>
    </div>
  );
};

export default RecurringBillsOverview;
