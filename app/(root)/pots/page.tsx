import PotList from "@/components/Pots/PotList";
import NewPotDialog from "@/components/Pots/NewPotDialog";

const page = () => {
  return (
    <main className="px-md py-2xl @container sm-490:px-3xl">
      <div className="flex items-center justify-between">
        <h1 className="h1 text-grey-900">Pots</h1>
        <NewPotDialog />
      </div>
      <section className="mt-2xl">
        <PotList />
      </section>
    </main>
  );
};

export default page;
