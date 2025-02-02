import { getPots } from "@/lib/pots";
import Image from "next/image";
import Link from "next/link";
import NoCurrentData from "../NoCurrentData";
import GridList from "./GridList";

const PotsOverview = async () => {
  const potsData = await getPots();

  if (potsData.length === 0) {
    return (
      <div className=" rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
        <div className="flex justify-between">
          <h2 className="h2 text-grey-900">Pots</h2>
          <Link
            className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
            href="/pots"
          >
            <span>See Details</span>
            <Image
              src="/assets/images/icon-caret-right.svg"
              alt="Caret Right"
              width={5}
              height={8}
              className="w-auto"
            />
          </Link>
        </div>
        <NoCurrentData pageName="pots" />
      </div>
    );
  }
  return (
    <div className=" rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Pots</h2>
        <Link
          className="text-standard flex items-center gap-sm text-grey-500 hover:brightness-50"
          href="/pots"
        >
          <span>See Details</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            alt="Caret Right"
            width={5}
            height={8}
            className="w-auto"
          />
        </Link>
      </div>
      <div className="mt-lg grid grid-cols-1 gap-lg @[460px]:grid-cols-2">
        <div className="flex items-center gap-md rounded-xl bg-beige-100 p-md">
          <div className="flex h-10 w-10 items-center justify-center">
            <Image
              src="/assets/images/icon-pot.svg"
              alt="Pots"
              width={26}
              height={35}
              className="w-auto"
            />
          </div>
          <div className="flex flex-col gap-xs">
            <span className="text-standard text-grey-500">Total Saved</span>
            <span className="h2 xl:h1 text-grey-900">$850</span>
          </div>
        </div>
        <GridList potsData={potsData} />
      </div>
    </div>
  );
};

export default PotsOverview;
