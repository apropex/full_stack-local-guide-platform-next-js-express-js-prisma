import MyBookingsTable from "@/components/modules/tourist/bookings/MyBookingsTable";
import PaginationComponent from "@/components/PaginationComponent";
import BookingFilters from "@/components/shared/filters/BookingFilters";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iBooking } from "@/interfaces/tour.interfaces";
import { getMyBookings } from "@/services/booking.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface MyBookingsProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyBookingsPage({
  searchParams,
}: MyBookingsProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getMyBookings(query)) as iResponse<iBooking[]>;

  const totalPages = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Bookings Management"
        description="My bookings information and details"
      />

      <div className="w-fit grid lg:grid-cols-12 gap-4 mt-10">
        <BookingFilters className="my-10 lg:my-0 static lg:col-span-3" />

        <div className="lg:col-span-9 border rounded-2xl py-4">
          <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
            <MyBookingsTable bookings={result.data || []} />
          </Suspense>

          <div className="py-3" />

          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
