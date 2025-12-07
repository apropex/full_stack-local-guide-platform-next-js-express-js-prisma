/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { join } from "@/utils";
import {
  ChevronsUpDown,
  CopyIcon,
  EditIcon,
  EllipsisVertical,
  EyeIcon,
  Trash2Icon,
} from "lucide-react";

export interface iTableColumns<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
  sortKey?: keyof T;
}

interface iManagementTable<T> {
  data: T[];
  columns: iTableColumns<T>[];
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  rowKey: (row: T) => string;
  isRefresh: boolean;
  emptyMessage?: string;
}

export default function ManagementTable<T>({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
  rowKey,
  emptyMessage,
}: iManagementTable<T>) {
  //

  const handleSort = (i: string | number | symbol | undefined) => {
    if (!(typeof i === "string")) return;
  };

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            {(columns || []).map((col, i) => (
              <TableHead
                key={join("management-table-head-", i)}
                className={col.className}
              >
                {col.sortKey ? (
                  <span className="flex items-center gap-1.5 hover:text-foreground transition-colors font-medium select-none">
                    {col.header}
                    <ChevronsUpDown
                      className="size-4 text-primary cursor-pointer"
                      onClick={() => handleSort(col.sortKey)}
                    />
                  </span>
                ) : (
                  col.header
                )}
              </TableHead>
            ))}
            <TableHead className="w-14">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!(data || []).length ? (
            <TableRow>
              <TableCell
                colSpan={(columns || []).length + 1}
                className="text-center py-8 text-muted-foreground"
              >
                {emptyMessage || "No data found"}
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.map((item) => (
                <TableRow key={rowKey(item)}>
                  {columns.map((col, i) => (
                    <TableCell key={i} className={col.className}>
                      {typeof col.accessor === "function"
                        ? col.accessor(item)
                        : String(item[col.accessor])}
                    </TableCell>
                  ))}
                  <TableCell className="w-full h-15 flex justify-end items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button>
                          <EllipsisVertical className="size-5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>actions</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(
                                (item as any).id || "",
                              )
                            }
                          >
                            <CopyIcon className="size-4" />
                            Copy Id
                          </DropdownMenuItem>
                          {onView && (
                            <DropdownMenuItem onClick={() => onView(item)}>
                              <EyeIcon className="size-4" />
                              View
                            </DropdownMenuItem>
                          )}
                          {onEdit && (
                            <DropdownMenuItem onClick={() => onEdit(item)}>
                              <EditIcon className="size-4" />
                              Edit
                            </DropdownMenuItem>
                          )}
                          {onDelete && (
                            <DropdownMenuItem onClick={() => onDelete(item)}>
                              <Trash2Icon className="size-4" />
                              Delete
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
