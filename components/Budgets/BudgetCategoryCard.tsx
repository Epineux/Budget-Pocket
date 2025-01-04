import Image from "next/image";
import { Progress } from "../ui/progress";

type BudgetCategoryCardProps = {
  category: {
    name: string;
    theme: string;
    spent: number;
    maximum: number;
  };
};

const BudgetCategoryCard = ({ category }: BudgetCategoryCardProps) => {
  const valueRemaining = category.maximum - category.spent;
  return (
    <div className="flex flex-col gap-lg rounded-xl bg-white p-2xl @container">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <div
            style={{
              backgroundColor: category.theme,
            }}
            className="h-4 w-4 rounded-full"
          ></div>
          <h2 className="h2 text-grey-900">{category.name}</h2>
        </div>
        <Image
          src="/assets/images/icon-ellipsis.svg"
          width={14}
          height={4}
          alt="Edit Icon"
        />
      </div>
      <div className="flex flex-col gap-md">
        <p className="text-standard text-grey-500">
          Maximum of ${category.maximum}
        </p>
        <div className="h-8 rounded bg-beige-100 p-2xs">
          <Progress
            value={
              category.spent >= category.maximum
                ? 100
                : (category.spent / category.maximum) * 100
            }
            className="h-full rounded"
            style={
              {
                "--progress-indicator-color": category.theme,
              } as React.CSSProperties
            }
          />
        </div>
        <div className="grid grid-cols-2">
          <div className="flex gap-md">
            <div
              style={{
                backgroundColor: category.theme,
              }}
              className="h-full w-1 rounded-full"
            ></div>
            <div className="flex flex-col gap-2xs">
              <span className="text-small text-grey-500">Spent</span>
              <span className="text-standard-bold text-grey-900">
                ${category.spent}
              </span>
            </div>
          </div>
          <div className="flex gap-md">
            <div
              style={{
                backgroundColor: "#F8F4F0",
              }}
              className="h-full w-1 rounded-full"
            ></div>
            <div className="flex flex-col gap-2xs">
              <span className="text-small text-grey-500">Remaining</span>
              <span className="text-standard-bold text-grey-900">
                ${valueRemaining > 0 ? valueRemaining : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCategoryCard;
