"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { iTour } from "@/interfaces/tour.interfaces";
import { softDeleteTour } from "@/services/tour.services";
import { join } from "@/utils";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { myTourColumns } from "../../guide/tour/MyTourColumns";
import UpdateTourByAdmin from "./UpdateTourByAdmin";

interface TourTableProps {
  tours: iTour[];
}

export default function TourTable({ tours }: TourTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [deletingDialog, setDeletingDialog] = useState(false);
  const [deletingTour, setDeletingTour] = useState<iTour | null>(null);

  const [editingTour, setEditingTour] = useState<iTour | null>(null);

  // const [activatingDialog, setActivatingDialog] = useState(false);
  // const [activatingTour, setActivatingTour] = useState<iTour | null>(null);

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

  /*
    const handleVerify = async () => {
      if (!activatingTour)
        return _alert.error("Guide not found, refresh the page and try again.");
  
      const iv = activatingTour.isActive;
  
      const vm = "The tour activated successfully!";
      const rm = "The tour deactivated successfully!";
  
      setActivatingDialog(true);
      const result = await verifyGuide(activatingTour.id);
      setActivatingDialog(false);
  
      if (result.success) {
        _alert.success(iv ? rm : vm);
        setActivatingTour(null);
        startTransition(() => {
          router.refresh();
        });
      } else
        _alert.error(
          iv ? "Failed to active tour." : "Failed to deactivate tour.",
          result.message,
        );
    };
    */

  return (
    <>
      <ManagementTable
        data={tours}
        columns={myTourColumns}
        onDelete={setDeletingTour}
        onEdit={setEditingTour}
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

      <UpdateTourByAdmin
        tour={editingTour}
        open={!!editingTour}
        setOpen={(open) => !open && setEditingTour(null)}
      />

      {/* <VerifyConfirmationDialog
              isVerified={!!activatingTour?.isActive}
              open={!!activatingTour}
              onOpenChange={(open) => !open && setActivatingTour(null)}
              onConfirm={handleVerify}
              isUpdating={activatingDialog}
              description={
                activatingTour?.isActive
                  ? "Your are going to deactivate the tour."
                  : "Your are going to activate the tour"
              }
            /> */}
    </>
  );
}
