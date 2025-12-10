"use client";

import { _alert } from "@/components/custom-toast/CustomToast";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import VerifyConfirmationDialog from "@/components/shared/VerifyConfirmationDialog";
import { iUser } from "@/interfaces/user.interfaces";
import { verifyUser } from "@/services/admin.services";
import { softDeleteUser } from "@/services/user.services";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import UpdateUserByAdmin from "./UpdateUserByAdmin";
import { userColumns } from "./UserColumns";

interface UserTableProps {
  users: iUser[];
}

export default function UserTable({ users }: UserTableProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [verifyingDialog, setVerifyingDialog] = useState(false);
  const [verifyingUser, setVerifyingUser] = useState<iUser | null>(null);

  const [deletingDialog, setDeletingDialog] = useState(false);
  const [deletingUser, setDeletingUser] = useState<iUser | null>(null);

  const [updatingUser, setUpdatingUser] = useState<iUser | null>(null);

  const iv = useMemo(
    () => !!verifyingUser?.isVerified,
    [verifyingUser?.isVerified],
  );

  const handleVerify = async () => {
    if (!verifyingUser)
      return _alert.error("User not found, refresh the page and try again.");

    const vm = "The user verified successfully!";
    const rm = "The verification removed successfully!";

    setVerifyingDialog(true);
    const result = await verifyUser(verifyingUser.id);
    setVerifyingDialog(false);

    if (result.success) {
      _alert.success(iv ? rm : vm);
      setVerifyingUser(null);
      startTransition(() => {
        router.refresh();
      });
    } else
      _alert.error(
        iv ? "Failed to verify user." : "Failed to remove verification.",
        result.message,
      );
  };

  const handleDelete = async () => {
    if (!deletingUser)
      return _alert.error("User not found, refresh the page and try again.");

    setDeletingDialog(true);
    const result = await softDeleteUser(deletingUser.id);
    setDeletingDialog(false);

    if (result.success) {
      _alert.success("User deleted successfully");
      startTransition(() => {
        router.refresh();
      });
    } else _alert.error("Failed to delete user.", result.message);

    setDeletingUser(null);
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={userColumns}
        onVerify={setVerifyingUser}
        onDelete={setDeletingUser}
        onEdit={setUpdatingUser}
        rowKey={({ id }) => id}
        emptyMessage="No users found"
        isRefresh={false}
      />

      <UpdateUserByAdmin
        open={!!updatingUser}
        setOpen={(open) => !open && setUpdatingUser(null)}
        user={updatingUser}
      />

      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={handleDelete}
        isDeleting={deletingDialog}
      />

      <VerifyConfirmationDialog
        isVerified={!!iv}
        open={!!verifyingUser}
        onOpenChange={(open) => !open && setVerifyingUser(null)}
        onConfirm={handleVerify}
        isUpdating={verifyingDialog}
        description={
          iv
            ? "Your are going to remove verification of this user."
            : "Your are going to verify this user."
        }
      />
    </>
  );
}
