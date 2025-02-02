import Loader from "@/components/Loader";
import NewTransactionDialog from "@/components/Transactions/NewTransactionDialog";
import TransactionsList from "@/components/Transactions/TransactionsList";

import { Suspense } from "react";

const page = () => {
  {
    return (
      <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
        <div className="flex items-center justify-between">
          <h1 className="h1 text-grey-900">Transactions</h1>
          <NewTransactionDialog />
        </div>
        <section className="mt-2xl">
          <Suspense fallback={<Loader />}>
            <TransactionsList />
          </Suspense>
        </section>
      </main>
    );
  }
};

export default page;
