import { RecurringBill } from "@/schemas/recurringBillsSchema";

export function getBillTotals({
  recurringBillsData,
}: {
  recurringBillsData: RecurringBill[];
}) {
  const today = new Date();
  const currentDayOfMonth = today.getDate();

  const getDayFromString = (dateStr: string): number => {
    return parseInt(dateStr.replace(/(st|nd|rd|th)/, ""));
  };

  // Filter bills
  const paidBills = recurringBillsData.filter((bill) => bill.isPaid);

  const upcomingBills = recurringBillsData.filter((bill) => {
    if (bill.isPaid) return false;
    const billDayOfMonth = getDayFromString(bill.dueDate);
    return billDayOfMonth > currentDayOfMonth;
  });

  const dueBills = recurringBillsData.filter((bill) => {
    if (bill.isPaid) return false;
    const billDayOfMonth = getDayFromString(bill.dueDate);
    return billDayOfMonth <= currentDayOfMonth;
  });

  // Calculate totals
  const paidBillsTotal = paidBills.reduce(
    (total, bill) => total + bill.amount,
    0,
  );

  const upcomingBillsTotal = upcomingBills.reduce(
    (total, bill) => total + bill.amount,
    0,
  );

  const dueBillsTotal = dueBills.reduce(
    (total, bill) => total + bill.amount,
    0,
  );

  return {
    paidBillsTotal,
    upcomingBillsTotal,
    dueBillsTotal,
    paidBills,
    upcomingBills,
    dueBills,
  };
}
