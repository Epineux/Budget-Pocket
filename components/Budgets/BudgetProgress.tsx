import { Budget } from "@/schemas/budgetsSchema";
import { Transaction } from "@/schemas/transactionsSchemas";
import React from "react";
import { Progress } from "../ui/progress";

type BudgetProgressProps = {
  budget: Budget;
  transactions: Transaction[];
};

const BudgetProgress = ({ budget, transactions }: BudgetProgressProps) => {
  const budgetSpent = transactions.reduce(
    (total, transaction) => total + Math.abs(transaction.amount),
    0,
  );
  const valueRemaining = Math.max(budget.maximum - budgetSpent, 0);
  return (
    <div className="flex flex-col gap-md">
      <p className="text-standard text-grey-500">
        Maximum of ${budget.maximum}
      </p>
      <div className="h-8 rounded bg-beige-100 p-2xs">
        <Progress
          value={
            budget.maximum === 0
              ? 0
              : budgetSpent >= budget.maximum
                ? 100
                : (budgetSpent / budget.maximum) * 100
          }
          className="h-full rounded"
          style={
            {
              "--progress-indicator-color": budget.theme,
            } as React.CSSProperties
          }
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="flex gap-md">
          <div
            style={{
              backgroundColor: budget.theme,
            }}
            className="h-full w-1 rounded-full"
          ></div>
          <div className="flex flex-col gap-2xs">
            <span className="text-small text-grey-500">Spent</span>
            <span className="text-standard-bold text-grey-900">
              ${budgetSpent}
            </span>
          </div>
        </div>
        <div className="flex gap-md">
          <div
            style={{
              backgroundColor: "#F8F4F0",
            }}
            className="h-full w-1 rounded-full"
          ></div>
          <div className="flex flex-col gap-2xs">
            <span className="text-small text-grey-500">Remaining</span>
            <span className="text-standard-bold text-grey-900">
              ${valueRemaining}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;
