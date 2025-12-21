"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import ManagementTable from "@/components/shared/ManagementTable";
import VerifyConfirmationDialog from "@/components/shared/VerifyConfirmationDialog";
import { iAdmin } from "@/interfaces/user.interfaces";
import { verifyAdmin } from "@/services/admin.services";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { adminColumns } from "./AdminColumns";

interface AdminTableProps {
  admins: iAdmin[];
}

export default function AdminTable({ admins }: AdminTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [verifyingDialog, setVerifyingDialog] = useState(false);
  const [verifyingAdmin, setVerifyingAdmin] = useState<iAdmin | null>(null);

  const iv = useMemo(
    () => !!verifyingAdmin?.isVerifiedAdmin,
    [verifyingAdmin?.isVerifiedAdmin],
  );

  const handleVerify = async () => {
    if (!verifyingAdmin)
      return _alert.error("Guide not found, refresh the page and try again.");

    const vm = "The admin verified successfully!";
    const rm = "The verification removed successfully!";

    setVerifyingDialog(true);
    const result = await verifyAdmin(verifyingAdmin.id);
    setVerifyingDialog(false);

    if (result.success) {
      _alert.success(iv ? rm : vm);
      setVerifyingAdmin(null);
      startTransition(() => {
        router.refresh();
      });
    } else
      _alert.error(
        iv ? "Failed to verify admin." : "Failed to remove verification.",
        result.message,
      );
  };

  return (
    <>
      <ManagementTable
        data={admins}
        columns={adminColumns}
        randomFn={setVerifyingAdmin}
        rowKey={({ id }) => id}
        emptyMessage="No admins found"
        isRefresh={false}
      />

      <VerifyConfirmationDialog
        isVerified={iv}
        open={!!verifyingAdmin}
        onOpenChange={(open) => !open && setVerifyingAdmin(null)}
        onConfirm={handleVerify}
        isUpdating={verifyingDialog}
        description={
          iv
            ? "Your are going to remove verification of this admin."
            : "Your are going to verify this admin."
        }
      />
    </>
  );
}
