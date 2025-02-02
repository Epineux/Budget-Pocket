import NoCurrentData from "@/components/NoCurrentData";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import { columns } from "@/components/Transactions/transactionsColumns";
import { getTransactions } from "@/lib/transactions";

export default async function TransactionsList() {
  const transactionsData = await getTransactions();

  if (transactionsData.length === 0) {
    return <NoCurrentData pageName="transactions" />;
  }

  return <TransactionsTable columns={columns} data={transactionsData} />;
}
