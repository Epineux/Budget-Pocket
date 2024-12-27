type RecurringBill = {
  name: string;
  amount: number;
  theme: string;
};

const RecurringBillsItem = ({
  recurringBill,
}: {
  recurringBill: RecurringBill;
}) => {
  return (
    <li
      className="flex justify-between rounded-lg border-l-4 bg-beige-100 px-md py-lg"
      style={{ borderColor: recurringBill.theme }}
    >
      <p className="text-standard text-grey-500">{recurringBill.name}</p>
      <p className="text-standard-bold text-grey-900">
        ${recurringBill.amount}
      </p>
    </li>
  );
};

export default RecurringBillsItem;
