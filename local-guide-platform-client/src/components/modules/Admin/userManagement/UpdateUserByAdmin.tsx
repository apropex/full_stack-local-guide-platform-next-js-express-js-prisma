/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CustomButton from "@/components/buttons/CustomButton";
import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatus } from "@/constants";
import { iUser } from "@/interfaces/user.interfaces";
import { updateUserByAdmin } from "@/services/user.services";
import { join } from "@/utils";
import {
  UpdateUserByAdminPayload,
  UpdateUserByAdminSchema,
} from "@/zod/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";

interface UpdateUserByAdminProps {
  user?: iUser | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function UpdateUserByAdmin({
  user,
  open,
  setOpen,
}: UpdateUserByAdminProps) {
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateUserByAdminPayload>({
    resolver: zodResolver(UpdateUserByAdminSchema),
    defaultValues: {
      status: user?.status ?? "ACTIVE",
      isDeleted: user?.isDeleted ?? false,
      isVerified: user?.isVerified ?? true,
    },
  });

  useEffect(() => {
    if (!user) return;
    form.setValue("status", user.status);
    form.setValue("isVerified", user.isVerified);
    form.setValue("isDeleted", user.isDeleted);
  }, [user, form]);

  async function onSubmit(values: UpdateUserByAdminPayload) {
    console.log("UpdateUserByAdminPayload", values);
    if (!user) return;

    setError(null);
    setLoading(true);

    const result = await updateUserByAdmin(user.id, values);

    if (result.success) {
      setOpen(false);
      form.reset();
      _alert.success("User updated successfully");
      startTransition(() => {
        router.refresh();
      });
    } else {
      setError(result.message);
      _alert.error("Failed to update user", result.message);
    }

    setLoading(false);
  }

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update User</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form
            id="admin_register_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 "
          >
            {error && (
              <p className="text-red-500 text-sm bg-red-500/6 rounded-xs px-1 pb-0.5">
                {error}
              </p>
            )}

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${form.formState.errors.status && "border-red-500"} w-full`}
                      >
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(UserStatus).map((status) => (
                        <SelectItem
                          key={join("status_key_", status)}
                          value={status}
                        >
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isVerified"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verified</FormLabel>

                  <Select
                    onValueChange={(v) => field.onChange(v === "true")}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${form.formState.errors.isVerified && "border-red-500"} w-full`}
                      >
                        <SelectValue placeholder="Select a verify status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value={"true"}>True</SelectItem>
                      <SelectItem value={"false"}>False</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDeleted"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deleted</FormLabel>

                  <Select
                    onValueChange={(v) => field.onChange(v === "true")}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${form.formState.errors.isDeleted && "border-red-500"} w-full`}
                      >
                        <SelectValue placeholder="Select a delete status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value={"true"}>True</SelectItem>
                      <SelectItem value={"false"}>False</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
          <div className="flex items-center justify-end gap-3">
            <CustomButton
              variant="outline"
              type="button"
              size={"sm"}
              onClick={() => setOpen(false)}
            >
              Cancel
            </CustomButton>

            <LoadingButton
              form="admin_register_form"
              type="submit"
              size={"sm"}
              isLoading={loading}
              loadingText="Updating..."
            >
              Update
            </LoadingButton>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
