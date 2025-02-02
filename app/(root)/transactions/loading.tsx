import NewTransactionDialog from "@/components/Transactions/NewTransactionDialog";

export default function Loading() {
  return (
    <main className="px-md py-xl @container sm-490:px-3xl sm-490:py-2xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Transactions</h1>
        <NewTransactionDialog />
      </div>
    </main>
  );
}
