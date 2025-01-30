import BudgetsChart from "@/components/Budgets/BudgetsChart";
import { Budget } from "@/schemas/budgetsSchema";
import { Transaction } from "@/schemas/transactionsSchemas";
import BudgetSummaryItem from "./BudgetSummaryItem";

type Props = {
  budgetsData: Budget[];
  transactionsData: Transaction[];
};

const BudgetChartCard = ({ budgetsData, transactionsData }: Props) => {
  return (
    <div className="rounded-xl bg-white px-lg py-xl @container sm-490:p-2xl">
      <div className="items-center justify-around @[550px]:flex">
        <BudgetsChart
          budgetsData={budgetsData}
          transactionsData={transactionsData}
        />
        <div className="pt-3xl @[550px]:pt-0">
          <h2 className="h2 text-grey-900">Spending Summary</h2>
          <ul className="mt-xl grid grid-cols-1">
            {budgetsData.map((budget, index) => {
              const categoryTransactions = transactionsData.filter(
                (transaction) => transaction.category === budget.category,
              );

              return (
                <li key={budget.category}>
                  <BudgetSummaryItem
                    budget={budget}
                    transactions={categoryTransactions}
                  />
                  {index !== budgetsData.length - 1 && (
                    <hr className="my-md border-grey-100" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BudgetChartCard;
