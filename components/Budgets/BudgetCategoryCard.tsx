import { Budget } from "@/schemas/budgetsSchema";
import { Transaction } from "@/schemas/transactionsSchemas";
import { formatDateToMonthYear } from "@/utils/dateUtils";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import BudgetProgress from "./BudgetProgress";
import TransactionsBudget from "./TransactionsBudget";

const BudgetCategoryCard = ({
  budget,
  transactions,
}: {
  budget: Budget;
  transactions: Transaction[];
}) => {
  const budgetDateObj = new Date(budget.created_at);
  const [budgetMonth, budgetYear] = [
    budgetDateObj.getMonth(),
    budgetDateObj.getFullYear(),
  ];
  // Filter transactions for expenses (amount < 0) within the same month as the budget
  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        transaction.amount < 0 &&
        new Date(transaction.date).getMonth() === budgetMonth &&
        new Date(transaction.date).getFullYear() === budgetYear,
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <div className="flex flex-col gap-lg rounded-xl bg-white px-lg py-xl @container sm-490:p-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div
            style={{
              backgroundColor: budget.theme,
            }}
            className="h-4 w-4 rounded-full"
          ></div>
          <h2 className="h2 text-grey-900">{budget.category}</h2>
          <span className="text-small-bold text-grey-500">
            {formatDateToMonthYear(budget.created_at)}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild style={{ boxShadow: "none" }}>
            <Button
              variant="ghost"
              className="h-4 w-8 p-0 focus:border focus:border-grey-900"
            >
              <Image
                src="/assets/images/icon-ellipsis.svg"
                width={14}
                height={4}
                alt="Menu Icon"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="px-md">Edit Budget</DropdownMenuItem>
            <DropdownMenuSeparator className="mx-md" />
            <DropdownMenuItem className="px-md text-secondary-red">
              Delete Budget
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BudgetProgress budget={budget} transactions={filteredTransactions} />
      <TransactionsBudget
        transactions={filteredTransactions}
        budgetCategory={budget.category}
      />
    </div>
  );
};

export default BudgetCategoryCard;
