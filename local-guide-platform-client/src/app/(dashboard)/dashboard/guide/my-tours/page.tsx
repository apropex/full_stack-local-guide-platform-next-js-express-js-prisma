import TourTable from "@/components/modules/Admin/guideManagement/TourTable";
import TourFilters from "@/components/modules/tour/TourFilters";
import PaginationComponent from "@/components/PaginationComponent";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TableSkeleton from "@/components/shared/TableSkeleton";
import { iResponse } from "@/interfaces";
import { iTour } from "@/interfaces/tour.interfaces";
import { getMyTours } from "@/services/tour.services";
import { queryFormatter } from "@/utils/queryFormatter";
import { Suspense } from "react";

interface MyToursProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MyToursPage({ searchParams }: MyToursProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getMyTours(query)) as iResponse<iTour[]>;

  const totalPages = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div>
      <ManagementPageHeader
        title="Tour Management"
        description="Manage tours information and details"
      />

      <div className="grid lg:grid-cols-12 gap-4 mt-10">
        <TourFilters className="my-10 lg:my-0 static lg:col-span-3" />

        <div className="lg:col-span-9 border rounded-2xl py-4">
          <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
            <TourTable tours={result.data || []} />
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
