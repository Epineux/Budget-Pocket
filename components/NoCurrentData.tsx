import Image from "next/image";

const NoCurrentData = ({ pageName }: { pageName: string }) => {
  const messageLogo = (() => {
    switch (pageName) {
      case "budgets":
        return (
          <Image
            src="/assets/images/icon-nav-budgets.svg"
            width={40}
            height={40}
            alt="Budgets Icon"
          />
        );
      case "transactions":
        return (
          <Image
            src="/assets/images/icon-nav-transactions.svg"
            width={40}
            height={40}
            alt="Transactions Icon"
          />
        );
      case "pots":
        return (
          <Image
            src="/assets/images/icon-nav-pots.svg"
            width={40}
            height={40}
            alt="Pots Icon"
          />
        );
      case "recurringBills":
        return (
          <Image
            src="/assets/images/icon-nav-recurring-bills.svg"
            width={40}
            height={40}
            alt="Recurring Bills Icon"
          />
        );
      default:
        return null;
    }
  })();

  return (
    <div className="mt-2xl flex h-80 flex-col items-center justify-center gap-2xs p-xl">
      {messageLogo}
      <h2 className="h2 mt-sm text-grey-900">No {pageName} found</h2>
      <p className="text-standard text-grey-900">
        You don&apos;t have any {pageName} yet. Add one to get started !
      </p>
    </div>
  );
};

export default NoCurrentData;
