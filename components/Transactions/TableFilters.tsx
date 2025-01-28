"use client";
import { TRANSACTION_CATEGORIES } from "@/constants/transactionCategories";
import { Table as TanstackTable } from "@tanstack/react-table";
import Image from "next/image";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SortValue = "latest" | "oldest" | "atoz" | "ztoa" | "highest" | "lowest";

interface TableFiltersProps<TData> {
  table: TanstackTable<TData>;
  data: Array<TData & { category: string }>;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
}

const TransactionTableFilters = <TData,>({
  table,
  data,
  categoryFilter,
  setCategoryFilter,
}: TableFiltersProps<TData>) => {
  const categories = TRANSACTION_CATEGORIES;
  const handleSortChange = (value: SortValue) => {
    switch (value) {
      case "latest":
        table.setSorting([{ id: "date", desc: true }]);
        break;
      case "oldest":
        table.setSorting([{ id: "date", desc: false }]);
        break;
      case "atoz":
        table.setSorting([{ id: "name", desc: false }]);
        break;
      case "ztoa":
        table.setSorting([{ id: "name", desc: true }]);
        break;
      case "highest":
        table.setSorting([{ id: "amount", desc: true }]);
        break;
      case "lowest":
        table.setSorting([{ id: "amount", desc: false }]);
        break;
    }
  };

  const getCurrentValue = () => {
    const sorting = table.getState().sorting[0];
    if (!sorting) return "latest";

    const { id, desc } = sorting;
    if (id === "date") return desc ? "latest" : "oldest";
    if (id === "name") return desc ? "ztoa" : "atoz";
    if (id === "amount") return desc ? "highest" : "lowest";
    return "latest";
  };

  return (
    <div className="flex items-center justify-between gap-3xl">
      <div className="flex w-80 items-center gap-xs rounded-lg border border-beige-500 bg-white px-sm focus-within:ring-1 focus-within:ring-grey-900 focus-within:ring-offset-1">
        <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Image
          src="/assets/images/icon-search.svg"
          alt="Search"
          width={16}
          height={16}
          className="w-auto"
        />
      </div>
      <div className="flex flex-shrink-0 items-center gap-xl">
        <div className="flex items-center gap-xs">
          <span className="text-standard hidden text-nowrap text-grey-500 @[640px]:inline">
            Sort by
          </span>
          <Select value={getCurrentValue()} onValueChange={handleSortChange}>
            <SelectTrigger className="border-0 border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 @[510px]:border [&>svg]:hidden ">
              <div className="text-standard hidden gap-md text-grey-900 @[510px]:flex">
                <SelectValue placeholder="Latest" />
                <Image
                  src={"/assets/images/icon-caret-down.svg"}
                  alt="Dropdown"
                  width={11}
                  height={6}
                  className="w-auto"
                />
              </div>
              <div className="@[510px]:hidden">
                <Image
                  src={"/assets/images/icon-sort-mobile.svg"}
                  alt="Sort Icon"
                  width={15}
                  height={15}
                  className="h-4 w-4"
                />
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="atoz">A to Z</SelectItem>
              <SelectItem value="ztoa">Z to A</SelectItem>
              <SelectItem value="highest">Highest</SelectItem>
              <SelectItem value="lowest">Lowest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-xs">
          <span className="text-standard hidden text-nowrap text-grey-500 @[640px]:inline">
            Category
          </span>
          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <SelectTrigger className="border-0 border-beige-500 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 @[510px]:border [&>svg]:hidden ">
              <div className="text-standard hidden gap-md text-grey-900 @[510px]:flex">
                <SelectValue placeholder="All Transactions" />
                <Image
                  src={"/assets/images/icon-caret-down.svg"}
                  alt="Dropdown"
                  width={11}
                  height={6}
                  className="w-auto"
                />
              </div>
              <div className="@[510px]:hidden">
                <Image
                  src={"/assets/images/icon-filter-mobile.svg"}
                  alt="Filter Icon"
                  width={16}
                  height={15}
                  className="w-auto"
                />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category as string} value={category as string}>
                  {category as string}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TransactionTableFilters;
