import NoCurrentData from "@/components/NoCurrentData";
import NewTransactionDialog from "@/components/Transactions/NewTransactionDialog";
import { columns } from "@/components/Transactions/transactionsColumns";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import { getTransactions } from "@/lib/transactions";
import { Suspense } from "react";

const page = async () => {
  try {
    const transactionsData = await getTransactions();

    return (
      <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
        <div className="flex items-center justify-between">
          <h1 className="h1 text-grey-900">Transactions</h1>
          <NewTransactionDialog />
        </div>
        <section className="mt-2xl">
          {transactionsData.length > 0 ? (
            <Suspense fallback={<div>Loading...</div>}>
              <TransactionsTable columns={columns} data={transactionsData} />
            </Suspense>
          ) : (
            <NoCurrentData pageName="transactions" />
          )}
        </section>
      </main>
    );
  } catch (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-red-700">Error loading transactions</h2>
        <p className="text-red-600">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </p>
      </div>
    );
  }
};

export default page;
