import Image from "next/image";
import data from "../../constants/data.json";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Progress } from "../ui/progress";
import SavingsDialog from "./SavingsDialog";

const PotList = () => {
  const pots = data.pots;
  return (
    <ul className="grid grid-cols-1 gap-xl sm-490:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
      {pots.map((pot) => (
        <li
          className="flex flex-col gap-2xl rounded-xl bg-white px-lg py-xl sm-490:px-xl"
          key={pot.name}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div
                style={{
                  backgroundColor: pot.theme,
                }}
                className="h-4 w-4 rounded-full"
              ></div>
              <h2 className="h2 text-grey-900">{pot.name}</h2>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild style={{ boxShadow: "none" }}>
                <Button
                  variant="ghost"
                  className="h-4 w-8 p-0 focus:border focus:border-grey-900"
                >
                  <Image
                    src="/assets/images/icon-ellipsis.svg"
                    width={14}
                    height={4}
                    alt="Edit Icon"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="px-md">Edit Pot</DropdownMenuItem>
                <DropdownMenuSeparator className="mx-md" />
                <DropdownMenuItem className="px-md text-secondary-red">
                  Delete Pot
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <p className="text-standard text-grey-500">Total Saved</p>
              <h1 className="h1 text-grey-900">${pot.total}</h1>
            </div>
            <Progress
              value={
                pot.total >= pot.target ? 100 : (pot.total / pot.target) * 100
              }
              className="mb-sm mt-md h-2"
              style={
                {
                  "--progress-indicator-color": pot.theme,
                } as React.CSSProperties
              }
            />
            <div className="flex items-center justify-between">
              <p className="text-small-bold text-grey-500">
                {((pot.total / pot.target) * 100).toFixed(1)}%
              </p>
              <p className="text-small text-grey-500">
                Target of ${pot.target}
              </p>
            </div>
          </div>
          <div className="flex gap-md">
            <SavingsDialog newSavings="addition" pot={pot} />
            <SavingsDialog newSavings="subtraction" pot={pot} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PotList;
