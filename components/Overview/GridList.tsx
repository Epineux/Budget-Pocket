import { Pot } from "@/schemas/potsSchema";

const GridList = ({ potsData }: { potsData: Pot[] }) => {
  // Logic to handle empty items in the UI
  const lastPots = potsData.slice(-4);
  const emptyCount = Math.max(0, 4 - lastPots.length);
  const emptyItems = Array(emptyCount)
    .fill(null)
    .map((_, index) => (
      <li key={`empty-${index}`} className="flex items-center gap-md opacity-0">
        <div className="h-full w-1 shrink-0 rounded-full bg-gray-200"></div>
        <div className="flex flex-col gap-2xs">
          <span className="text-small text-grey-500">Empty</span>
          <span className="text-standard-bold text-grey-900">$0</span>
        </div>
      </li>
    ));

  return (
    <ul className="grid grid-cols-2 gap-md">
      {lastPots.map((pot) => (
        <li key={pot.name} className="flex items-center gap-md">
          <div
            style={{
              backgroundColor: pot.theme,
            }}
            className="h-full w-1 shrink-0 rounded-full"
          ></div>
          <div className="flex flex-col gap-2xs">
            <span className="text-small text-grey-500">{pot.name}</span>
            <span className="text-standard-bold text-grey-900">
              ${pot.total}
            </span>
          </div>
        </li>
      ))}
      {emptyItems}
    </ul>
  );
};

export default GridList;
