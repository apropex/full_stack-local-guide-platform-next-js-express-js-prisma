"use client";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { getPagination } from "@/utils/getPagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
};

export default function PaginationComponent({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pages = getPagination(currentPage, totalPages);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (value: number | undefined) => {
    if (value) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(value));
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  return (
    <Pagination className="w-auto">
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Go to first page"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage === 1 ? undefined : 1)}
          >
            <ChevronFirstIcon size={16} aria-hidden="true" />
          </button>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Go to previous page"
            disabled={currentPage === 1}
            onClick={() =>
              handlePageChange(currentPage === 1 ? undefined : currentPage - 1)
            }
          >
            <ChevronLeftIcon size={16} aria-hidden="true" />
          </button>
        </PaginationItem>

        {/* Page number links */}
        {pages.map((page, i) =>
          page === "..." ? (
            <PaginationItem key={i}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => handlePageChange(Number(page))}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next page button */}
        <PaginationItem>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Go to next page"
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(
                currentPage === totalPages ? undefined : currentPage + 1,
              )
            }
          >
            <ChevronRightIcon size={16} aria-hidden="true" />
          </button>
        </PaginationItem>

        {/* Last page button */}
        <PaginationItem>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Go to last page"
            disabled={currentPage === totalPages}
            onClick={() =>
              handlePageChange(
                currentPage === totalPages ? undefined : totalPages,
              )
            }
          >
            <ChevronLastIcon size={16} aria-hidden="true" />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
