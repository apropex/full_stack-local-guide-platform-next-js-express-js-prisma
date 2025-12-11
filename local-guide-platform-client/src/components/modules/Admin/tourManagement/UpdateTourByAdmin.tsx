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
import { TourStatus } from "@/constants";
import { iTour } from "@/interfaces/tour.interfaces";
import { updateTourByAdmin } from "@/services/tour.services";
import { join } from "@/utils";
import {
  UpdateTourByAdminPayload,
  UpdateTourByAdminSchema,
} from "@/zod/tour.schema";
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

interface UpdateAdminByAdminProps {
  tour?: iTour | null;
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

export default function UpdateTourByAdmin({
  tour,
  open,
  setOpen,
}: UpdateAdminByAdminProps) {
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateTourByAdminPayload>({
    resolver: zodResolver(UpdateTourByAdminSchema),
    defaultValues: {
      approveStatus: tour?.approveStatus ?? "PENDING",
      isActive: tour?.isActive ?? true,
      isDeleted: tour?.isDeleted ?? false,
    },
  });

  useEffect(() => {
    if (!tour) return;
    form.setValue("approveStatus", tour.approveStatus);
    form.setValue("isActive", tour.isActive);
    form.setValue("isDeleted", tour.isDeleted);
  }, [tour, form]);

  async function onSubmit(values: UpdateTourByAdminPayload) {
    if (!tour) return;

    setError(null);
    setLoading(true);

    const result = await updateTourByAdmin(tour.id, values);

    if (result.success) {
      setOpen(false);
      form.reset();
      _alert.success("Tour updated successfully");
      startTransition(() => {
        router.refresh();
      });
    } else {
      setError(result.message);
      _alert.error("Failed to update tour", result.message);
    }

    setLoading(false);
  }

  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Tour</DialogTitle>
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
              name="approveStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${form.formState.errors.approveStatus && "border-red-500"} w-full`}
                      >
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {Object.values(TourStatus).map((status) => (
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Activate</FormLabel>

                  <Select
                    onValueChange={(v) => field.onChange(v === "true")}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${form.formState.errors.isActive && "border-red-500"} w-full`}
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
