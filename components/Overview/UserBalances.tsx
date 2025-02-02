import { getTransactions } from "@/lib/transactions";
import { getUserInfos } from "@/lib/userInfos";
import BalanceInfo from "./BalanceInfo";

const UserBalances = async () => {
  try {
    const [userInfos, transactions] = await Promise.all([
      getUserInfos(),
      getTransactions(),
    ]);

    // Default values if no userInfos
    const currentBalance = userInfos?.currentBalance ?? 0;
    const income = userInfos?.income ?? 0;

    // Ensure transactions is an array, default to empty array if null/undefined
    const transactionsExpenses = (transactions || []).filter(
      (transaction) => transaction.amount < 0,
    );

    const totalExpenses = transactionsExpenses.reduce(
      (total, transaction) => total + Math.abs(transaction.amount),
      0,
    );

    return (
      <section className="mt-2xl grid grid-cols-1 gap-sm @[600px]:grid-cols-3 sm-490:gap-xl">
        <BalanceInfo
          title="Current Balance"
          amount={currentBalance}
          currency="$"
        />
        <BalanceInfo title="Income" amount={income} currency="$" />
        <BalanceInfo title="Expenses" currency="$" amount={totalExpenses} />
      </section>
    );
  } catch (error) {
    console.error("Error loading user balances:", error);
    // Even in case of error, show zeros instead of error message
    return (
      <section className="mt-2xl grid grid-cols-1 gap-sm @[600px]:grid-cols-3 sm-490:gap-xl">
        <BalanceInfo title="Current Balance" amount={0} currency="$" />
        <BalanceInfo title="Income" amount={0} currency="$" />
        <BalanceInfo title="Expenses" currency="$" amount={0} />
      </section>
    );
  }
};

export default UserBalances;
