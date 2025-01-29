import { Transaction } from "@/schemas/transactionsSchemas";

export const filterTransactions = (
  transactions: Transaction[],
  budgetMonth?: number,
  budgetYear?: number,
) =>
  transactions
    .filter(
      (transaction) =>
        transaction.amount < 0 &&
        new Date(transaction.date).getMonth() === budgetMonth &&
        new Date(transaction.date).getFullYear() === budgetYear,
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
