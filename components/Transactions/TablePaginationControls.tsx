import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import clsx from "clsx";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

type Props<TData> = {
  table: Table<TData>;
};
const TablePaginationControls = <TData,>({ table }: Props<TData>) => {
  return (
    <div>
      {/* Desktop */}
      <div className="mt-2xl hidden items-center justify-between pt-2xl @[510px]:flex">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={clsx("h-10 items-center gap-md px-md", {
            "border-beige-500 text-grey-900": table.getCanPreviousPage(),
          })}
        >
          <Image
            src="/assets/images/icon-caret-left.svg"
            alt="Previous"
            width={5}
            height={5}
            className="w-auto"
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
                onClick={() => table.setPageIndex(pageToDisplay)}
                className={clsx("h-10 w-10 border-beige-500 duration-0 ", {
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
            className="w-auto"
          />
        </Button>
      </div>
      {/* Mobile */}
      <div className="mt-2xl flex items-center justify-between pt-2xl @[510px]:hidden">
        <div className="flex gap-xs">
          <Button
            variant="outline"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-10 items-center border-beige-500 text-grey-900"
          >
            <ChevronFirst size={20} className="text-grey-900" />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-10 w-10 items-center border-beige-500 text-grey-900"
          >
            <ChevronLeft size={20} className="text-grey-900" />
          </Button>
        </div>

        <p className="text-standard text-grey-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        <div className="flex gap-xs">
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-10 w-10 items-center border-beige-500 text-grey-900"
          >
            <ChevronRight size={20} className="text-grey-900" />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="h-10 items-center border-beige-500 text-grey-900"
          >
            <ChevronLast size={20} className="text-grey-900" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePaginationControls;
