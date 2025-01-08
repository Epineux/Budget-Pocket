import data from "../../constants/data.json";

const BillsSummary = () => {
  const RecurringBillsInfo = data.recurringBills;
  return (
    <div className="rounded-xl bg-white p-lg">
      <h3 className="h3 text-grey-900">Summary</h3>
      <ul className="mt-lg">
        {RecurringBillsInfo.map((recurringBill) => (
          <li key={recurringBill.name}>
            {recurringBill.name !== "Due Soon" ? (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-small text-grey-500">
                    {recurringBill.name}
                  </p>
                  <p className="text-small-bold text-grey-900">
                    ${recurringBill.amount}
                  </p>
                </div>
                <hr className="my-md" />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-small text-secondary-red">
                  {recurringBill.name}
                </p>
                <p className="text-small-bold text-secondary-red">
                  ${recurringBill.amount}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillsSummary;
