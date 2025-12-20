"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { iTour } from "@/interfaces/tour.interfaces";
import { join } from "@/utils";
import { useRouter } from "next/navigation";
import { myTourColumns } from "../../guide/tour/MyTourColumns";

interface TourTableProps {
  tours: iTour[];
}

export default function TourTable({ tours }: TourTableProps) {
  const router = useRouter();

  return (
    <>
      <ManagementTable
        data={tours}
        columns={myTourColumns}
        onEdit={({ id }) =>
          router.push(join("/dashboard/guide/edit-tour?id=", id))
        }
        onView={({ id }) =>
          router.push(join("/dashboard/guide/my-tours/tour-details?id=", id))
        }
        rowKey={({ id }) => id}
        emptyMessage="No tours found"
        isRefresh={false}
      />
    </>
  );
}
