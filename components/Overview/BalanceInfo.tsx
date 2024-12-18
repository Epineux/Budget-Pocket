import { formatNumber } from "@/utils/formatNumber";
import clsx from "clsx";

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
      <h4 className="text-standard">{title}</h4>
      {/* To not overflow, h2 until desktop fullscreen */}
      <p className="h2 xl:h1 mt-sm">
        {currency}
        {amountFormatted}
      </p>
    </div>
  );
};

export default BalanceInfo;
