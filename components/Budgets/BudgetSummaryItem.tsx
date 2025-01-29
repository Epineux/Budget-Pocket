import { Budget } from "@/schemas/budgetsSchema";
import { Transaction } from "@/schemas/transactionsSchemas";
import { filterTransactions } from "@/utils/filterTransactions";
import { formatNumber } from "@/utils/formatNumber";

type Props = {
  budget: Budget;
  transactions: Transaction[];
};

const BudgetSummaryItem = ({ budget, transactions }: Props) => {
  const currentDate = new Date(budget.created_at);
  const [currentMonth, currentYear] = [
    currentDate.getMonth(),
    currentDate.getFullYear(),
  ];
  // Filter transactions for expenses (amount < 0) of the current month
  const filteredTransactions = filterTransactions(
    transactions,
    currentMonth,
    currentYear,
  );
  const budgetSpent = filteredTransactions.reduce(
    (total, transaction) => total + Math.abs(transaction.amount),
    0,
  );
  return (
    <div className="flex items-center justify-between gap-md">
      <div className="flex items-center gap-md">
        <div
          style={{
            backgroundColor: budget.theme,
          }}
          className="h-[21px] w-1 rounded-full"
        ></div>
        <p className="text-small text-grey-500">{budget.category}</p>
      </div>
      <div className="flex items-center gap-xs">
        <p className="text-standard-bold text-grey-900">
          ${formatNumber(budgetSpent)}
        </p>
        <p className="text-small text-grey-500">
          of ${formatNumber(budget.maximum)}
        </p>
      </div>
    </div>
  );
};

export default BudgetSummaryItem;
