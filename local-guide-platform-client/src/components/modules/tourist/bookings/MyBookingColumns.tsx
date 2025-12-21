import IdField from "@/components/shared/IdField";
import { iTableColumns } from "@/components/shared/ManagementTable";
import { BookingStatus, PaymentStatus } from "@/constants";
import { iBooking } from "@/interfaces/tour.interfaces";
import { cn } from "@/lib/utils";
import formatDate from "@/utils/formatDate";

export const myBookingsColumns: iTableColumns<iBooking>[] = [
  {
    header: "TrxID",
    accessor: ({ payment }) => <IdField id={payment.trxId} />,
  },
  {
    header: "Payment ID",
    accessor: ({ paymentId }) => <IdField id={paymentId} />,
  },
  {
    header: "Tour ID",
    accessor: ({ tourId }) => <IdField id={tourId} />,
  },
  {
    header: "Amount",
    accessor: ({ payment }) => payment.amount,
  },
  {
    header: "Booked At",
    accessor: ({ createdAt }) => formatDate(createdAt),
  },
  {
    header: "Start Time",
    accessor: ({ startDate }) => formatDate(startDate, true),
  },
  {
    header: "Endtime",
    accessor: ({ endDate }) => formatDate(endDate, true),
  },
  {
    header: "Booking Status",
    accessor: ({ status }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": status === BookingStatus.CONFIRMED,
            "bg-rose-600": status === BookingStatus.CANCELLED,
            "bg-violet-600": status === BookingStatus.PENDING,
          },
        )}
      >
        {status}
      </span>
    ),
  },
  {
    header: "Payment Status",
    accessor: ({ payment }) => (
      <span
        className={cn(
          "uppercase bg-amber-600 text-white py-1 px-1.5 text-xs rounded-xs",
          {
            "bg-green-600": payment.status === PaymentStatus.SUCCESS,
            "bg-rose-600": payment.status === PaymentStatus.CANCELLED,
            "bg-violet-600": payment.status === PaymentStatus.PENDING,
          },
        )}
      >
        {payment.status}
      </span>
    ),
  },
];
