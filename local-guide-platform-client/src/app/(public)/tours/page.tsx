import TourCard from "@/components/modules/tour/TourCard";
import PaginationComponent from "@/components/PaginationComponent";
import TourFilters from "@/components/shared/filters/TourFilters";
import { SectionTitle } from "@/components/shared/SectionContainer";
import { iResponse } from "@/interfaces";
import { iTour } from "@/interfaces/tour.interfaces";
import { getAllToursPublic } from "@/services/tour.services";
import { queryFormatter } from "@/utils/queryFormatter";

interface ToursProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TourPage({ searchParams }: ToursProps) {
  const params = await searchParams;
  const query = queryFormatter(params);

  const result = (await getAllToursPublic(query)) as iResponse<iTour[]>;

  const totalPages = result.meta?.total_pages || 1;
  const currentPage = result.meta?.present_page || 1;

  return (
    <div className="w-full max-w-[1530px] mx-auto py-24 md:py-36 px-4 sm:px-6 lg:px-8">
      <SectionTitle title="Our Tours" className="text-center" />
      <div className="mt-12 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="relative lg:col-span-4">
          <TourFilters />
        </div>
        <div className="lg:col-span-8  mx-auto space-y-4 md:space-y-8">
          {result.data?.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
