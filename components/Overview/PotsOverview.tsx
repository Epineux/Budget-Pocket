import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";

const PotsOverview = () => {
  const potsInfo = data.pots;
  return (
    <div className="p-2xl @container col-span-5 rounded-xl bg-white md:col-span-3">
      <div className="flex justify-between">
        <h2 className="h2 text-grey-900">Pots</h2>
        <Link
          className="text-standard gap-sm text-grey-500 flex items-center hover:brightness-50"
          href="/pots"
        >
          <span>See Details</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            alt="Caret Right"
            width={5}
            height={8}
          />
        </Link>
      </div>
      <div className="mt-lg gap-lg @[460px]:grid-cols-2 grid grid-cols-1">
        <div className="gap-md bg-beige-100 p-md flex items-center rounded-xl">
          <div className="flex h-10 w-10 items-center justify-center">
            <Image
              src="/assets/images/icon-pot.svg"
              alt="Pots"
              width={26}
              height={35}
            />
          </div>
          <div className="gap-xs flex flex-col">
            <span className="text-standard text-grey-500">Total Saved</span>
            <span className="h2 xl:h1 text-grey-900">$850</span>
          </div>
        </div>
        <div className="gap-md grid grid-cols-2">
          {potsInfo
            .filter((pot) => pot.name !== "Holiday")
            .map((pot) => (
              <div key={pot.name} className="gap-md flex items-center">
                <div
                  style={{
                    backgroundColor: pot.theme,
                  }}
                  className="h-full w-1 rounded-full"
                ></div>
                <div className="gap-2xs flex flex-col">
                  <span className="text-small text-grey-500">{pot.name}</span>
                  <span className="text-standard-bold text-grey-900">
                    ${pot.total}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PotsOverview;
