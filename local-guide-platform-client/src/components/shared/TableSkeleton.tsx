//

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  action?: boolean;
}

export default function TableSkeleton({
  columns,
  rows = 10,
  action,
}: TableSkeletonProps) {
  const colArray = [...Array(columns)];

  return (
    <div className="rounded-lg border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {colArray.map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
            {action && (
              <TableHead className="w-[70px]">
                <Skeleton className="h-4 w-full" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, idx) => (
            <TableRow key={idx}>
              {colArray.map((_, i) => (
                <TableCell key={i}>
                  {i === 0 ? (
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="flex-1 h-4" />
                    </div>
                  ) : (
                    <Skeleton className="h-4 w-full" />
                  )}
                </TableCell>
              ))}

              {action && (
                <TableCell>
                  <Skeleton className="size-8 rounded-md" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
