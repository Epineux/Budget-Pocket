import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";
import BudgetsChart from "./BudgetsChart";

const BudgetsOverview = () => {
  const budgetsData = data.budgets;
  return (
    <div className="p-2xl @container col-span-5 rounded-xl bg-white md:col-span-2">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Budgets</h2>
        <Link
          className="text-standard gap-sm text-grey-500 flex items-center hover:brightness-50"
          href="/budgets"
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
      <div className="@[400px]:grid-cols-4 grid grid-cols-1">
        <BudgetsChart budgetsData={budgetsData} />
        <div className="gap-md @[400px]:grid-cols-1 @[400px]:my-12 grid grid-cols-2">
          {budgetsData.map((category) => (
            <div key={category.name} className="gap-md flex items-center">
              <div
                style={{
                  backgroundColor: category.theme,
                }}
                className="h-full w-1 rounded-full"
              ></div>
              <div className="gap-2xs flex flex-col">
                <span className="text-small text-grey-500">
                  {category.name}
                </span>
                <span className="text-standard-bold text-grey-900">
                  ${category.maximum}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetsOverview;
