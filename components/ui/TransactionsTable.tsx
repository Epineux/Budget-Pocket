"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import TablePaginationControls from "../Transactions/TablePaginationControls";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";

import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface TransactionsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Array<TData & { category: string }>;
}

type SortValue = "latest" | "oldest" | "atoz" | "ztoa" | "highest" | "lowest";

const TransactionsTable = <TData, TValue>({
  columns,
  data,
}: TransactionsTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter: categoryFilter,
    },
    globalFilterFn: (row, _, filterValue) =>
      filterValue === "all" || row.getValue("category") === filterValue,
  });

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
    <div className="rounded-xl bg-white p-2xl @container">
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
                  />
                </div>
                <div className="@[510px]:hidden">
                  <Image
                    src={"/assets/images/icon-sort-mobile.svg"}
                    alt="Sort Icon"
                    width={15}
                    height={15}
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
                  />
                </div>
                <div className="@[510px]:hidden">
                  <Image
                    src={"/assets/images/icon-filter-mobile.svg"}
                    alt="Filter Icon"
                    width={16}
                    height={15}
                  />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                {Array.from(new Set(data.map((item) => item.category))).map(
                  (category) => (
                    <SelectItem
                      key={category as string}
                      value={category as string}
                    >
                      {category as string}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table className="mt-xl">
        <TableHeader className="hidden @[640px]:table-header-group">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-grey-100">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <tr className="h-xl"></tr>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-grey-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="px-0 @[640px]:px-4" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePaginationControls table={table} />
    </div>
  );
};

export default TransactionsTable;
