//

import GuideTable from "@/components/modules/Admin/guideManagement/GuideTable";
import PaginationComponent from "@/components/PaginationComponent";
import GuideFilters from "@/components/shared/filters/GuideFilters";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iGuide } from "@/interfaces/user.interfaces";
import { getAllGuides } from "@/services/guide.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface ManageGuideProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ManageGuidesPage({
  searchParams,
}: ManageGuideProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getAllGuides(query)) as iResponse<iGuide[]>;

  const totalPages = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div className="space-y-5">
      <ManagementPageHeader
        title="Guide Management"
        description="Manage guide information and details"
      />

      <div className="grid lg:grid-cols-12 gap-4 mt-10">
        <GuideFilters className="my-10 lg:my-0 static lg:col-span-3" />

        <div className="flex flex-col lg:col-span-9 border rounded-2xl py-4">
          <div className="pb-3 flex-1">
            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
              <GuideTable guides={result.data || []} />
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
