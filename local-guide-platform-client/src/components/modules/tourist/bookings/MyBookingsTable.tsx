"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { iBooking } from "@/interfaces/tour.interfaces";
import { join } from "@/utils";
import { useRouter } from "next/navigation";
import { myBookingsColumns } from "./MyBookingColumns";

interface TourTableProps {
  bookings: iBooking[];
}

export default function MyBookingsTable({ bookings }: TourTableProps) {
  const router = useRouter();

  return (
    <ManagementTable
      data={bookings}
      columns={myBookingsColumns}
      onView={({ id }) =>
        router.push(join("/dashboard/admin/manage-tours/tour-details?id=", id))
      }
      rowKey={({ id }) => id}
      emptyMessage="No bookings found"
      isRefresh={false}
    />
  );
}
