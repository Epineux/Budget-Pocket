import { Transaction } from "@/schemas/transactionsSchemas";

type Props = {
  transactionsData: Transaction[];
  budgetCategories: Set<string>;
  currentMonth: number;
  currentYear: number;
};

export const getTotalSpent = ({
  transactionsData,
  budgetCategories,
  currentMonth,
  currentYear,
}: Props) => {
  return transactionsData.reduce((sum: number, transaction: Transaction) => {
    const transactionDate = new Date(transaction.date);
    // Check if the transaction is within the current month and year
    const isCurrentMonthAndYear =
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear;

    // Only add if:
    // 1. Transaction category exists in budget categories
    // 2. Transaction amount is negative (expense)
    // 3. Transaction is within the current month and year
    if (
      budgetCategories.has(transaction.category) &&
      transaction.amount < 0 &&
      isCurrentMonthAndYear
    ) {
      return sum + Math.abs(transaction.amount);
    }
    return sum;
  }, 0);
};
