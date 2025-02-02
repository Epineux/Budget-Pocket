import { getTransactions } from "@/lib/transactions";
import { getUserInfos } from "@/lib/userInfos";
import BalanceInfo from "./BalanceInfo";

const UserBalances = async () => {
  try {
    const [userInfos, transactions] = await Promise.all([
      getUserInfos(),
      getTransactions(),
    ]);

    if (!userInfos) {
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h2 className="text-red-700">Error loading user balances</h2>
        </div>
      );
    }
    const transactionsExpenses =
      transactions?.filter((transaction) => transaction.amount < 0) || [];
    const totalExpenses = transactionsExpenses.reduce(
      (total, transaction) => total + Math.abs(transaction.amount),
      0,
    );
    return (
      <section className="mt-2xl grid grid-cols-1 gap-sm @[600px]:grid-cols-3 sm-490:gap-xl">
        <BalanceInfo
          title="Current Balance"
          amount={userInfos.currentBalance}
          currency="$"
        />
        <BalanceInfo title="Income" amount={userInfos.income} currency="$" />
        <BalanceInfo title="Expenses" currency="$" amount={totalExpenses} />
      </section>
    );
  } catch (error) {
    console.error("Error loading user balances:", error);
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-red-700">Error loading user balances</h2>
      </div>
    );
  }
};

export default UserBalances;
