"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { iTour } from "@/interfaces/tour.interfaces";
import { softDeleteTour } from "@/services/tour.services";
import { join } from "@/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { myTourColumns } from "./MyTourColumns";

interface MyTourTableProps {
  tours: iTour[];
}

export default function MyTourTable({ tours }: MyTourTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [deletingDialog, setDeletingDialog] = useState(false);
  const [deletingTour, setDeletingTour] = useState<iTour | null>(null);

  const handleDelete = async () => {
    if (!deletingTour)
      return _alert.error("Tour not found, refresh the page and try again.");

    setDeletingDialog(true);
    const result = await softDeleteTour(deletingTour.id);
    setDeletingDialog(false);

    if (result.success) {
      _alert.success("Tour deleted successfully");
      startTransition(() => {
        router.refresh();
      });
    } else _alert.error("Failed to delete tour.", result.message);

    setDeletingTour(null);
  };

  return (
    <>
      <ManagementTable
        data={tours}
        columns={myTourColumns}
        onDelete={setDeletingTour}
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

      <DeleteConfirmationDialog
        open={!!deletingTour}
        onOpenChange={(open) => !open && setDeletingTour(null)}
        onConfirm={handleDelete}
        isDeleting={deletingDialog}
      />
    </>
  );
}
