import { columns } from "@/components/Transactions/transactionsColumns";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import data from "@/constants/data.json";

// Async function getData()
const page = () => {
  const transactionsData = data.transactions;

  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <h1 className="h1 text-grey-900">Transactions</h1>
      <section className="mt-2xl">
        <TransactionsTable columns={columns} data={transactionsData} />
      </section>
    </main>
  );
};

export default page;
