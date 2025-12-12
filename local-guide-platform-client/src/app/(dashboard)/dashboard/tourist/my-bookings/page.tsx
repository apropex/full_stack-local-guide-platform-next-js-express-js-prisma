import RefreshButton from "@/components/buttons/RefreshButton";
import MyBookingsTable from "@/components/modules/tourist/bookings/MyBookingsTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
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

  // const totalPage = result.meta?.total_pages || 1;
  // const currentPage = result.meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Bookings Management"
        description="My bookings information and details"
      />

      <div className="flex items-center flex-wrap gap-4">
        <SearchFilter />
        <SelectFilter
          placeholder="Find deleted or active admins"
          paramName="isDeleted"
          options={[
            { label: "All", value: "all" },
            { label: "Deleted", value: "true" },
            { label: "Active", value: "false" },
          ]}
        />
        <RefreshButton variant="outline">Refresh</RefreshButton>
      </div>

      <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
        <MyBookingsTable bookings={result.data || []} />
      </Suspense>
    </div>
  );
}
