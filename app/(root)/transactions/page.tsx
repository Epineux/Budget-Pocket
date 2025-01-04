import { columns } from "@/components/Transactions/columns";
import TransactionsTable from "@/components/Transactions/TransactionsTable";
import data from "@/constants/data.json";

// Async function getData()
const page = () => {
  const transactionsData = data.transactions;

  return (
    <main className="px-md py-2xl @container sm-490:px-3xl">
      <h1 className="h1 text-grey-900">Transactions</h1>
      <section className="mt-2xl">
        <TransactionsTable columns={columns} data={transactionsData} />
      </section>
    </main>
  );
};

export default page;
