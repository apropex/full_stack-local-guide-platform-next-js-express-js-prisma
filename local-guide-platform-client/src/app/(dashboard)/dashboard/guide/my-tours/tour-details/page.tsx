import TourDetails from "@/components/modules/tour/TourDetails";
import { iTour } from "@/interfaces/tour.interfaces";
import { getSingleTour } from "@/services/tour.services";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function TourDetailsGuide({ searchParams }: Props) {
  const tourId = (await searchParams).id;

  if (!tourId) return null;

  const result = await getSingleTour(tourId);

  if (!result.data)
    return (
      <div>
        <h3>Tour not found</h3>
      </div>
    );

  return (
    <div>
      <TourDetails tour={result.data as iTour} />
    </div>
  );
}
