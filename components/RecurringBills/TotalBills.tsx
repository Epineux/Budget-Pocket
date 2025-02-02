import { RecurringBill } from "@/schemas/recurringBillsSchema";
import Image from "next/image";

const TotalBills = ({
  recurringBillsData,
}: {
  recurringBillsData: RecurringBill[];
}) => {
  const billsTotal = recurringBillsData.reduce(
    (total, bill) => total + bill.amount,
    0,
  );
  return (
    <div className="flex w-full gap-lg rounded-xl bg-grey-900 p-xl text-white @[500px]:flex-col @[500px]:justify-center sm-490:gap-2xl">
      <Image
        src="./assets/images/icon-recurring-bills.svg"
        width={40}
        height={40}
        alt="Recurring Bill Icon"
        className="h-10 w-10"
      />
      <div className="flex flex-col gap-xs">
        <p>Total Bills</p>
        <h1 className="h1">${billsTotal.toFixed(2)}</h1>
      </div>
    </div>
  );
};

export default TotalBills;
