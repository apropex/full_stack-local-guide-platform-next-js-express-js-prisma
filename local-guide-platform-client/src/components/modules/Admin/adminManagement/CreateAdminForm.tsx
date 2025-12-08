"use client";

import CustomButton from "@/components/buttons/CustomButton";
import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { AdminPayload, AdminSchema } from "@/zod/admin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Shield } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CreateAdminForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<AdminPayload>({
    resolver: zodResolver(AdminSchema),
    defaultValues: {
      father: "",
      fathersNid: "",
      dob: "",
      nid: "",
    },
  });

  async function onSubmit(values: AdminPayload) {
    _alert.success("success");
    setError("Date of birth is required, select a date.");
    if (!date) {
      setError("Date of birth is required, select a date.");
      return null;
    }
  }

  //
  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => setOpenDialog(true)}>
          <Shield />
          <span>Apply For Admin</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      {/*  */}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <Form {...form}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Admin Form</DialogTitle>
              <DialogDescription>
                Enter valid information to apply for an admin.
              </DialogDescription>
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

              {/*  */}
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  Date of birth
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      type="button"
                      id="date"
                      className="justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        form.setValue("dob", date?.toISOString() ?? "");
                        setOpen(false);
                      }}
                      disabled={{ after: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <FormField
                control={form.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID number</FormLabel>
                    <FormControl>
                      <Input placeholder="4658689321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="father"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father&apos;s name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fathersNid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father&apos;s national ID number</FormLabel>
                    <FormControl>
                      <Input placeholder="9878689377" {...field} />
                    </FormControl>
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
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </CustomButton>

              <LoadingButton
                form="admin_register_form"
                type="submit"
                size={"sm"}
                isLoading={loading}
                loadingText="Applying..."
              >
                Apply
              </LoadingButton>
            </div>
          </DialogContent>
        </Form>
      </Dialog>
    </>
  );
}
