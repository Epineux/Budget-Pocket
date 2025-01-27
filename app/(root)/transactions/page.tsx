import NewTransactionDialog from "@/components/Transactions/NewTransactionDialog";
import { columns } from "@/components/Transactions/transactionsColumns";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import { transactionSchema } from "@/schemas/transactionsSchemas";
import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { z } from "zod";

const page = async () => {
  // fetch transactions
  const supabase = await createClient();
  const { data: rawTransactions, error } = await supabase.from("transactions")
    .select(`
    id,
    amount,
    category,
    date,
    contact_id,
    contacts (
      id,
      name,
      avatar
    )
  `);

  if (error) {
    console.error(error);
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-red-700">Error loading transactions</h2>
        <p className="text-red-600">{error.message}</p>
        {error.details && (
          <p className="text-sm text-red-500">{error.details}</p>
        )}
      </div>
    );
  }

  const parsedData = z.array(transactionSchema).safeParse(rawTransactions);

  if (!parsedData.success) {
    console.error("Data validation error:", parsedData.error);
    return <div>Error: Invalid data format</div>;
  }

  const transactionsData = parsedData.data;

  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Transactions</h1>
        <NewTransactionDialog />
      </div>
      <section className="mt-2xl">
        <Suspense fallback={<div>Loading...</div>}>
          <TransactionsTable columns={columns} data={transactionsData} />
        </Suspense>
      </section>
    </main>
  );
};

export default page;
