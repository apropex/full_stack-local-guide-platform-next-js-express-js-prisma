"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import ManagementTable from "@/components/shared/ManagementTable";
import VerifyConfirmationDialog from "@/components/shared/VerifyConfirmationDialog";
import { iGuide } from "@/interfaces/user.interfaces";
import { verifyGuide } from "@/services/admin.services";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { guideColumns } from "./GuideColumns";

interface GuideTableProps {
  guides: iGuide[];
}

export default function GuideTable({ guides }: GuideTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();

  const [verifyingDialog, setVerifyingDialog] = useState(false);
  const [verifyingGuide, setVerifyingGuide] = useState<iGuide | null>(null);

  const router = useRouter();

  const handleVerify = async () => {
    if (!verifyingGuide)
      return _alert.error("Guide not found, refresh the page and try again.");

    const iv = verifyingGuide.isVerifiedGuide;

    const vm = "The guide verified successfully!";
    const rm = "The verification removed successfully!";

    setVerifyingDialog(true);
    const result = await verifyGuide(verifyingGuide.id);
    setVerifyingDialog(false);

    if (result.success) {
      _alert.success(iv ? rm : vm);
      setVerifyingGuide(null);
      startTransition(() => {
        router.refresh();
      });
    } else
      _alert.error(
        iv ? "Failed to verify guide." : "Failed to remove verification.",
        result.message,
      );
  };

  return (
    <>
      <ManagementTable
        data={guides}
        columns={guideColumns}
        onVerify={setVerifyingGuide}
        onEdit={({ id }) =>
          router.push(`/admin/dashboard/manage-admin/update-admin?id=${id}`)
        }
        rowKey={({ id }) => id}
        emptyMessage="No admins found"
        isRefresh={false}
      />

      <VerifyConfirmationDialog
        isVerified={!!verifyingGuide?.isVerifiedGuide}
        open={!!verifyingGuide}
        onOpenChange={(open) => !open && setVerifyingGuide(null)}
        onConfirm={handleVerify}
        isUpdating={verifyingDialog}
        description={
          verifyingGuide?.isVerifiedGuide
            ? "Your are going to remove verification of this guide."
            : "Your are going to verify this guide."
        }
      />
    </>
  );
}
