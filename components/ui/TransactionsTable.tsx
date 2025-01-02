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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import clsx from "clsx";
import Image from "next/image";

import { Button } from "./button";
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
      <div className="flex items-center justify-between">
        <div className="flex w-56 items-center gap-xs rounded-lg border border-beige-500 bg-white px-sm focus-within:ring-1 focus-within:ring-grey-900 focus-within:ring-offset-1 @[750px]:w-80">
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
        <div className="flex items-center gap-xl">
          <div className="flex items-center gap-xs">
            <span className="text-standard text-nowrap text-grey-500">
              Sort by
            </span>
            <Select value={getCurrentValue()} onValueChange={handleSortChange}>
              <SelectTrigger className="text-standard gap-md border-beige-500 text-grey-900 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 [&>svg]:hidden">
                <SelectValue placeholder="Latest" />
                <Image
                  src={"/assets/images/icon-caret-down.svg"}
                  alt="Dropdown"
                  width={11}
                  height={6}
                />
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
            <span className="text-standard text-nowrap text-grey-500">
              Category
            </span>
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
            >
              <SelectTrigger className="text-standard gap-md border-beige-500 text-grey-900 focus:ring-1 focus:ring-grey-900 focus:ring-offset-1 [&>svg]:hidden">
                <SelectValue placeholder="All Transactions" />
                <Image
                  src={"/assets/images/icon-caret-down.svg"}
                  alt="Dropdown"
                  width={11}
                  height={6}
                />
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
        <TableHeader>
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
                  <TableCell key={cell.id}>
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
      <div className="mt-2xl flex items-center justify-between pt-2xl">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={clsx("flex h-10 items-center gap-md px-md", {
            "border-beige-500 text-grey-900": table.getCanPreviousPage(),
          })}
        >
          <Image
            src="/assets/images/icon-caret-left.svg"
            alt="Previous"
            width={5}
            height={5}
          />
          <span className="text-standard text-grey-900">Prev</span>
        </Button>
        <div className="flex gap-xs">
          {Array.from({ length: 5 }, (_, i) => {
            const { pageIndex } = table.getState().pagination;
            const totalPages = table.getPageCount();
            let pageToDisplay = i;
            if (pageIndex <= 1) {
              pageToDisplay = i;
            } else if (pageIndex >= totalPages - 2) {
              pageToDisplay = totalPages - 5 + i;
            } else {
              pageToDisplay = pageIndex - 2 + i;
            }
            if (pageToDisplay < 0 || pageToDisplay >= totalPages) return null;
            return (
              <Button
                key={pageToDisplay}
                variant={pageToDisplay === pageIndex ? "default" : "outline"}
                size="sm"
                onClick={() => table.setPageIndex(pageToDisplay)}
                className={clsx("h-10 w-10 border-beige-500 duration-0", {
                  "bg-grey-900 text-white": pageToDisplay === pageIndex,
                  "text-grey-900": pageToDisplay !== pageIndex,
                })}
              >
                {pageToDisplay + 1}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={clsx("flex h-10 items-center gap-md px-md", {
            "border-beige-500 text-grey-900": table.getCanNextPage(),
          })}
        >
          <span className="text-standard text-grey-900">Next</span>
          <Image
            src="/assets/images/icon-caret-right.svg"
            alt="Next"
            width={5}
            height={5}
          />
        </Button>
      </div>
    </div>
  );
};

export default TransactionsTable;
