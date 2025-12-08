//

import RefreshButton from "@/components/buttons/RefreshButton";
import GuideTable from "@/components/modules/Admin/guideManagement/GuideTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iGuide } from "@/interfaces/user.interfaces";
import { getAllGuides } from "@/services/guide.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface ManageAdminProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageGuidesPage({
  searchParams,
}: ManageAdminProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getAllGuides(query)) as iResponse<iGuide[]>;

  const totalPage = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Guide Management"
        description="Manage guide information and details"
      />

      <div className="flex items-center flex-wrap gap-4">
        <SearchFilter />
        <SelectFilter
          placeholder="Find deleted or active guides"
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
        <GuideTable guides={result.data || []} />
      </Suspense>
    </div>
  );
}
