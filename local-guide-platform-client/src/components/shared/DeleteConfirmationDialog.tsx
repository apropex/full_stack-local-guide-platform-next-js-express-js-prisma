"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon, XIcon } from "lucide-react";
import CustomButton from "../buttons/CustomButton";
import LoadingButton from "../buttons/LoadingButton";

interface ConfirmationDialogProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
  title?: string;
  description?: string;
  itemName?: string;
  isDeleting: boolean;
}

export default function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you absolutely sure?",
  description,
  itemName,
  isDeleting,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            {description || (
              <p>
                This action cannot be undone. This will permanently delete your{" "}
                <strong>{itemName || "item"}</strong> and remove from our
                server.
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <CustomButton size="sm" icon={XIcon} disabled={isDeleting}>
              Cancel
            </CustomButton>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              onClick={onConfirm}
              disabled={isDeleting}
              isLoading={isDeleting}
              loadingText="Deleting..."
              icon={Trash2Icon}
              variant="destructive"
            >
              Delete
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
