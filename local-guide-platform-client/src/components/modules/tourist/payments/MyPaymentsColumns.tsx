import IdField from "@/components/shared/IdField";
import { iTableColumns } from "@/components/shared/ManagementTable";
import { BookingStatus, PaymentStatus } from "@/constants";
import { iPayment } from "@/interfaces/tour.interfaces";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

export const myPaymentsColumns: iTableColumns<iPayment>[] = [
  {
    header: "TrxID",
    accessor: ({ trxId }) => <IdField id={trxId} />,
  },
  {
    header: "Booking ID",
    accessor: ({ booking }) => <IdField id={booking?.id || ""} />,
  },
  {
    header: "Amount",
    accessor: ({ amount }) => amount,
  },
  {
    header: "Booked At",
    accessor: ({ createdAt }) => formatDate(createdAt),
  },
  {
    header: "Payment Status",
    accessor: ({ booking }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": booking.status === BookingStatus.CONFIRMED,
            "bg-rose-600": booking.status === BookingStatus.CANCELLED,
            "bg-violet-600": booking.status === BookingStatus.PENDING,
          },
        )}
      >
        {booking.status}
      </span>
    ),
  },
  {
    header: "Payment Status",
    accessor: ({ status }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": status === PaymentStatus.SUCCESS,
            "bg-rose-600": status === PaymentStatus.CANCELLED,
            "bg-violet-600": status === PaymentStatus.PENDING,
          },
        )}
      >
        {status}
      </span>
    ),
  },
];
