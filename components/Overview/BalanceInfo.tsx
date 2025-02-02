import { formatNumber } from "@/utils/formatNumber";
import clsx from "clsx";
import { EditBalanceDialog } from "./EditBalanceDialog";

type BalanceInfoProps = {
  title: string;
  amount: number;
  currency: string;
};
const BalanceInfo = ({ title, amount, currency }: BalanceInfoProps) => {
  const amountFormatted = formatNumber(amount);

  return (
    <div
      className={clsx("rounded-xl p-xl", {
        "bg-grey-900 text-white": title === "Current Balance",
        "bg-white text-grey-900": title !== "Current Balance",
      })}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-standard">{title}</h4>
        {title !== "Expenses" && (
          <EditBalanceDialog title={title} currentAmount={amount} />
        )}
      </div>
      {/* To not overflow, h2 until desktop fullscreen */}
      <p
        className={clsx(
          "h2 xl:h1 mt-sm",
          title === "Current Balance" && amount < 0 && "text-secondary-red",
        )}
      >
        {currency}
        {amountFormatted}
      </p>
    </div>
  );
};

export default BalanceInfo;
