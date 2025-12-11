"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { iTour } from "@/interfaces/tour.interfaces";
import { join } from "@/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { myTourColumns } from "../../guide/tour/MyTourColumns";
import UpdateTourByAdmin from "./UpdateTourByAdmin";

interface TourTableProps {
  tours: iTour[];
}

export default function TourTable({ tours }: TourTableProps) {
  const router = useRouter();

  const [editingTour, setEditingTour] = useState<iTour | null>(null);

  return (
    <>
      <ManagementTable
        data={tours}
        columns={myTourColumns}
        onEdit={setEditingTour}
        onView={({ id }) =>
          router.push(
            join("/dashboard/admin/manage-tours/tour-details?id=", id),
          )
        }
        rowKey={({ id }) => id}
        emptyMessage="No tours found"
        isRefresh={false}
      />

      <UpdateTourByAdmin
        tour={editingTour}
        open={!!editingTour}
        setOpen={(open) => !open && setEditingTour(null)}
      />
    </>
  );
}
