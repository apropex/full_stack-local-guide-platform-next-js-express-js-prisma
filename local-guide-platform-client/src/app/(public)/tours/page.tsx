import TourCard from "@/components/modules/tour/TourCard";
import SectionContainer, {
  SectionTitle,
} from "@/components/shared/SectionContainer";
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

  // const totalPage = result.meta?.total_pages || 1;
  // const currentPage = result.meta?.present_page || 1;

  return (
    <SectionContainer containerClass="mt-12">
      <SectionTitle title="Our Tours" className="text-center" />
      <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.data?.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </SectionContainer>
  );
}
