import UpdateTourForm from "@/components/modules/guide/tour/UpdateTourForm";
import { iTour } from "@/interfaces/tour.interfaces";
import { getSingleTour } from "@/services/tour.services";

interface Props {
  searchParams: Promise<{ id?: string }>;
}

export default async function EditTourPage({ searchParams }: Props) {
  const tourId = (await searchParams).id;

  if (!tourId) return null;

  const result = await getSingleTour(tourId);

  if (!result.data) return null;

  return (
    <div className="">
      <UpdateTourForm tour={result.data as iTour} />
    </div>
  );
}
