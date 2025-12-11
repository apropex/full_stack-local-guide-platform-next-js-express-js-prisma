import { iTableColumns } from "@/components/shared/ManagementTable";
import { Difficulty, TourStatus } from "@/constants";
import { iTour } from "@/interfaces/tour.interfaces";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

export const myTourColumns: iTableColumns<iTour>[] = [
  {
    header: "title",
    accessor: ({ title }) => title,
  },
  {
    header: "Price",
    accessor: ({ price }) => <span>$ {price}</span>,
  },
  {
    header: "Duration",
    accessor: ({ duration, durationType }) => (
      <span className="capitalize">
        {duration} {durationType}
      </span>
    ),
  },
  {
    header: "Max Guest",
    accessor: ({ maxGroupSize }) => maxGroupSize,
  },
  {
    header: "Category",
    accessor: ({ category }) => category,
  },
  {
    header: "Created At",
    accessor: ({ createdAt }) => formatDate(createdAt),
  },
  {
    header: "Difficulty",
    accessor: ({ difficulty }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": difficulty === Difficulty.EASY,
            "bg-rose-600": difficulty === Difficulty.HARD,
          },
        )}
      >
        {difficulty}
      </span>
    ),
  },
  {
    header: "Approved",
    accessor: ({ approveStatus }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": approveStatus === TourStatus.APPROVED,
            "bg-destructive": approveStatus === TourStatus.REJECTED,
          },
        )}
      >
        {approveStatus}
      </span>
    ),
  },
  {
    header: "Active",
    accessor: ({ isActive }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": isActive,
          },
        )}
      >
        {String(isActive)}
      </span>
    ),
  },
  {
    header: "Deleted",
    accessor: ({ isDeleted }) => (
      <span
        className={cn(
          "uppercase bg-destructive text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": !isDeleted,
          },
        )}
      >
        {String(isDeleted)}
      </span>
    ),
  },
];
