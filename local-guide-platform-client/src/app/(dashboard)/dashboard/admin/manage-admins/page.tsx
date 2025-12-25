//

import AdminTable from "@/components/modules/Admin/adminManagement/AdminTable";
import PaginationComponent from "@/components/PaginationComponent";
import AdminFilters from "@/components/shared/filters/AdminFilters";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iAdmin } from "@/interfaces/user.interfaces";
import { getAllAdmins } from "@/services/admin.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface ManageAdminProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageAdminPage({
  searchParams,
}: ManageAdminProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getAllAdmins(query)) as iResponse<iAdmin[]>;

  const totalPages = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Admin Management"
        description="Manage admin information and details"
      />
      <div className="grid lg:grid-cols-12 gap-4 mt-10">
        <AdminFilters className="my-10 lg:my-0 static lg:col-span-3" />

        <div className="flex flex-col lg:col-span-9 border rounded-2xl py-4">
          <div className="pb-3 flex-1">
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
              <AdminTable admins={result.data || []} />
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
