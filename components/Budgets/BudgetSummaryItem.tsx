import { formatNumber } from "@/utils/formatNumber";

type SummaryItemProps = {
  category: {
    name: string;
    theme: string;
    spent: number;
    maximum: number;
  };
};
const BudgetSummaryItem = ({ category }: SummaryItemProps) => {
  return (
    <div className="flex items-center justify-between gap-md">
      <div className="flex items-center gap-md">
        <div
          style={{
            backgroundColor: category.theme,
          }}
          className="h-[21px] w-1 rounded-full"
        ></div>
        <p className="text-small text-grey-500">{category.name}</p>
      </div>
      <div className="flex items-center gap-xs">
        <p className="text-standard-bold text-grey-900">
          ${formatNumber(category.spent)}
        </p>
        <p className="text-small text-grey-500">
          of ${formatNumber(category.maximum)}
        </p>
      </div>
    </div>
  );
};

export default BudgetSummaryItem;
