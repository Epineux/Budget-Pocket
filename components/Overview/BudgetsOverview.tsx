import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";
import BudgetsChart from "../Budgets/BudgetsChart";

const BudgetsOverview = () => {
  const budgetsData = data.budgets;
  return (
    <div className="rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Budgets</h2>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href="/budgets"
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
      <div className="@[400px]:flex @[400px]:justify-around">
        <BudgetsChart budgetsData={budgetsData} />
        <ul className="grid grid-cols-2 gap-md @[400px]:my-12 @[400px]:grid-cols-1">
          {budgetsData.map((category) => (
            <li key={category.name} className="flex items-center gap-md">
              <div
                style={{
                  backgroundColor: category.theme,
                }}
                className="h-full w-1 rounded-full"
              ></div>
              <div className="flex flex-col gap-2xs">
                <span className="text-small text-grey-500">
                  {category.name}
                </span>
                <span className="text-standard-bold text-grey-900">
                  ${category.maximum}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetsOverview;
