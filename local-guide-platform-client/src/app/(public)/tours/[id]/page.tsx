import TourDetails from "@/components/modules/tour/TourDetails";
import { iTour } from "@/interfaces/tour.interfaces";
import { getSingleTour } from "@/services/tour.services";
import { redirect } from "next/navigation";

interface iProps {
  params: Promise<{ id: string }>;
}

export default async function TourDetailsPublic({ params }: iProps) {
  const id = (await params).id;
  if (!id) redirect("/tours");

  const result = await getSingleTour(id);

  if (!result.data)
    return (
      <div>
        <h3>Tour not found</h3>
      </div>
    );

  return (
    <div className="">
      <TourDetails tour={result.data as iTour} />
    </div>
  );
}
