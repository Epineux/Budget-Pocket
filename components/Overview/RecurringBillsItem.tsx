import React from "react";

interface RecurringBillsItemProps {
  title: string;
  amount: number;
  theme: string;
}

const RecurringBillsItem: React.FC<RecurringBillsItemProps> = ({
  title,
  amount,
  theme,
}) => {
  return (
    <li
      className="flex justify-between rounded-lg border-l-4 bg-beige-100 px-md py-lg"
      style={{ borderColor: theme }}
    >
      <p className="text-standard text-grey-500">{title}</p>
      <p className="text-standard-bold text-grey-900">${amount}</p>
    </li>
  );
};

export default RecurringBillsItem;
