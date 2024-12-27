import Image from "next/image";
import Link from "next/link";
import data from "../../constants/data.json";

const PotsOverview = () => {
  const potsInfo = data.pots;
  return (
    <div className=" rounded-xl bg-white p-2xl @container">
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
            />
          </div>
          <div className="flex flex-col gap-xs">
            <span className="text-standard text-grey-500">Total Saved</span>
            <span className="h2 xl:h1 text-grey-900">$850</span>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-md">
          {potsInfo
            .filter((pot) => pot.name !== "Holiday")
            .map((pot) => (
              <li key={pot.name} className="flex items-center gap-md">
                <div
                  style={{
                    backgroundColor: pot.theme,
                  }}
                  className="h-full w-1 rounded-full"
                ></div>
                <div className="flex flex-col gap-2xs">
                  <span className="text-small text-grey-500">{pot.name}</span>
                  <span className="text-standard-bold text-grey-900">
                    ${pot.total}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PotsOverview;
