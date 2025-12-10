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
import { EditIcon, Trash2Icon, XIcon } from "lucide-react";
import CustomButton from "../buttons/CustomButton";
import LoadingButton from "../buttons/LoadingButton";

interface ConfirmationDialogProps {
  isVerified?: boolean;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  isUpdating: boolean;
}

export default function VerifyConfirmationDialog({
  isVerified,
  open,
  onOpenChange,
  onConfirm,
  title = "Are you absolutely sure?",
  description,
  isUpdating,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description || ""}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <CustomButton
              size="sm"
              icon={XIcon}
              disabled={isUpdating}
              variant="outline"
            >
              Cancel
            </CustomButton>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton
              variant={isVerified ? "destructive" : "default"}
              onClick={onConfirm}
              disabled={isUpdating}
              isLoading={isUpdating}
              loadingText={isVerified ? "Removing..." : "Verifying..."}
              icon={isVerified ? Trash2Icon : EditIcon}
            >
              {isVerified ? "Remove" : "Verify"}
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
