import UserTable from "@/components/modules/Admin/userManagement/UserTable";
import PaginationComponent from "@/components/PaginationComponent";
import TouristFilters from "@/components/shared/filters/TouristFilters";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iUser } from "@/interfaces/user.interfaces";
import { getAllUsers } from "@/services/user.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface ManageTouristProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageTouristsPage({
  searchParams,
}: ManageTouristProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getAllUsers(query)) as iResponse<iUser[]>;

  const totalPages = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Tourist Management"
        description="Manage tourist information and details"
      />

      <div className="grid lg:grid-cols-12 gap-4 mt-10">
        <TouristFilters className="my-10 lg:my-0 static lg:col-span-3" />

        <div className="flex flex-col lg:col-span-9 border rounded-2xl py-4">
          <div className="pb-3 flex-1">
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
              <UserTable users={result.data || []} />
            </Suspense>
          </div>

          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
