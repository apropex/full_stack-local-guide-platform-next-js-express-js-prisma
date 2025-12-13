/* eslint-disable react-hooks/incompatible-library */
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createGuide } from "@/services/guide.services";
import { urid } from "@/utils";
import { GuidePayload, GuideSchema } from "@/zod/guide.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, Plus, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

interface iProps {
  setGuideFormDialog: Dispatch<SetStateAction<boolean>>;
  guideFormDialog: boolean;
}

export default function CreateGuideForm({
  guideFormDialog,
  setGuideFormDialog,
}: iProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aboutLength, setAboutLength] = useState(0);
  const [dobError, setDobError] = useState<string | null>(null);

  const form = useForm<GuidePayload>({
    resolver: zodResolver(GuideSchema),
    defaultValues: {
      expertise: [{ value: "" }],
      languages: [{ value: "" }],
      about: "",
      experienceYears: "",
      city: "",
      country: "",
      dailyRate: "",
      hourlyRate: "",
      dob: "",
      nid: "",
      father: "",
      fathersNid: "",
    },
  });

  const about = form.watch("about");

  useEffect(() => {
    setAboutLength(about?.length ?? 0);
  }, [about]);

  const {
    fields: expertiseFields,
    append: expertiseAppend,
    remove: expertiseRemove,
  } = useFieldArray({
    control: form.control,
    name: "expertise",
  });

  const {
    fields: languagesFields,
    append: languagesAppend,
    remove: languagesRemove,
  } = useFieldArray({
    control: form.control,
    name: "languages",
  });

  async function onSubmit(values: GuidePayload) {
    const id = _alert.loading("Applying for a guide...", {
      id: urid(),
    });

    setError(null);
    setLoading(true);

    const result = await createGuide(values);

    _alert.dismiss(id);

    if (result.success) {
      setGuideFormDialog(false);
      setDate(undefined);
      form.reset();
      _alert.success("You successfully applied for a guide");
    } else {
      setError(result.message);
      _alert.error("Application failed.", result.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    setDobError(form.formState.errors.dob?.message ?? null);
  }, [form.formState.errors.dob?.message]);

  //
  return (
    <Dialog open={guideFormDialog} onOpenChange={setGuideFormDialog}>
      <Form {...form}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto custom_scrollbar">
          <DialogHeader>
            <DialogTitle>Guide Form</DialogTitle>
            <DialogDescription>
              Enter valid information to apply for a guide.
            </DialogDescription>
          </DialogHeader>
          <form
            id="guide_register_form"
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
              <Label
                htmlFor="date"
                className={cn("px-1", {
                  "text-destructive": !!dobError,
                })}
              >
                Date of birth
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    type="button"
                    id="date"
                    className={cn("justify-between font-normal", {
                      "border-destructive dark:border-destructive": !!dobError,
                    })}
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
                      setDobError(null);
                      setOpen(false);
                    }}
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>

              {dobError && (
                <p className="text-sm text-destructive">{dobError}</p>
              )}
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

            <div className="space-y-2 min-h-15">
              <div className="flex justify-between gap-3 flex-wrap">
                <FormLabel>Expertise</FormLabel>
                <button
                  className="text-xs flex items-center gap-2 hover:text-green-500"
                  type="button"
                  onClick={() => expertiseAppend({ value: "" })}
                >
                  <Plus size={16} /> Add More
                </button>
              </div>

              {expertiseFields.map((item, index) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`expertise.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <span className="inline-flex items-center relative">
                          <Input
                            {...field}
                            placeholder="Enter expertise item"
                            className="pr-8"
                          />
                          <button
                            type="button"
                            onClick={() => expertiseRemove(index)}
                            className="absolute right-0 pr-1.5 text-sm text-muted-foreground hover:text-red-500 h-full flex items-center cursor-pointer"
                          >
                            <span className="bg-background p-1 rounded inline-block">
                              <X size={16} />
                            </span>
                          </button>
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="space-y-2 min-h-15">
              <div className="flex justify-between gap-3 flex-wrap">
                <FormLabel>Languages</FormLabel>
                <button
                  className="text-xs flex items-center gap-2 hover:text-green-500"
                  type="button"
                  onClick={() => languagesAppend({ value: "" })}
                >
                  <Plus size={16} /> Add More
                </button>
              </div>

              {languagesFields.map((item, index) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`languages.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <span className="inline-flex items-center relative">
                          <Input
                            {...field}
                            placeholder="Enter language"
                            className="pr-8"
                          />
                          <button
                            type="button"
                            onClick={() => languagesRemove(index)}
                            className="absolute right-0 pr-1.5 text-sm text-muted-foreground hover:text-red-500 h-full flex items-center cursor-pointer"
                          >
                            <span className="bg-background p-1 rounded inline-block">
                              <X size={16} />
                            </span>
                          </button>
                        </span>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div className="relative">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About you</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your bio here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span
                className={cn(
                  "absolute right-0 top-0 text-black/70 dark:text-white/80 text-sm",
                  {
                    "text-red-500": aboutLength > 160,
                    "text-[#4B4458]/30 dark:text-[#4B4458]/70":
                      aboutLength === 0,
                  },
                )}
              >
                {aboutLength}/160
              </span>
            </div>

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Chattogram" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Bangladesh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="850" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dailyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Rate</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="3500" {...field} />
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
              onClick={() => setGuideFormDialog(false)}
            >
              Cancel
            </CustomButton>

            <LoadingButton
              form="guide_register_form"
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
  );
}
