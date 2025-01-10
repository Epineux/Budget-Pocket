"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import BillsSort from "./BillsSort";
import BillsTablePaginationControls from "./BillsTablePaginationControls";

interface BillsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Array<TData>;
}

const BillsTable = <TData, TValue>({
  columns,
  data,
}: BillsTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "dueDate", desc: false },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
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
    },
  });

  return (
    <div className="rounded-xl bg-white px-lg py-xl @container sm-490:px-2xl sm-490:py-2xl">
      <BillsSort table={table} />
      <Table className="mt-lg sm-490:mt-xl">
        <TableHeader className="hidden @[590px]:table-header-group">
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-grey-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="px-0 @[590px]:px-4" key={cell.id}>
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
      <BillsTablePaginationControls table={table} />
    </div>
  );
};

export default BillsTable;
