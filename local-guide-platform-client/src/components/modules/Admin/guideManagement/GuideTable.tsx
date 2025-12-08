"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { iGuide } from "@/interfaces/user.interfaces";
import { softDeleteUser } from "@/services/user.services";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { guideColumns } from "./GuideColumns";

interface GuideTableProps {
  guides: iGuide[];
}

export default function GuideTable({ guides }: GuideTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();
  const [deletingAdmin, setDeleteAdmin] = useState<iGuide | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  const confirmDelete = async () => {
    if (!deletingAdmin) return;
    setDeleting(true);
    const result = await softDeleteUser(deletingAdmin.id);
    setDeleting(false);

    if (result.success) {
      _alert.success(result.message || "Admin deleted successfully!");
      setDeleteAdmin(null);
      startTransition(() => {
        router.refresh();
      });
    } else _alert.error(result.message || "Failed to delete admin");
  };
  return (
    <>
      <ManagementTable
        data={guides}
        columns={guideColumns}
        onDelete={setDeleteAdmin}
        onEdit={({ id }) =>
          router.push(`/admin/dashboard/manage-admin/update-admin?id=${id}`)
        }
        rowKey={({ id }) => id}
        emptyMessage="No admins found"
        isRefresh={false}
      />
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeleteAdmin(null)}
        onConfirm={confirmDelete}
        isDeleting={deleting}
      />
    </>
  );
}
