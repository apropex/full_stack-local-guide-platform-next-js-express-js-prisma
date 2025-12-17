"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Difficulty, tourCategories, TourDurationType } from "@/constants";
import { cn } from "@/lib/utils";
import { CreateTourPayload } from "@/zod/tour.schema";
import { Plus, X } from "lucide-react";
import { useMemo } from "react";
import { SubmitHandler, useFieldArray, UseFormReturn } from "react-hook-form";

interface TourFormProps {
  form: UseFormReturn<CreateTourPayload>;
  onSubmit: SubmitHandler<CreateTourPayload>;
  id: string;
}

export default function TourForm({ form, onSubmit, id }: TourFormProps) {
  const description = form.watch("description");
  const descriptionLength = useMemo(
    () => description?.length ?? 0,
    [description],
  );

  const {
    fields: highlightsFields,
    append: highlightsAppend,
    remove: highlightsRemove,
  } = useFieldArray({
    control: form.control,
    name: "highlights",
  });

  const {
    fields: includesFields,
    append: includesAppend,
    remove: includesRemove,
  } = useFieldArray({
    control: form.control,
    name: "includes",
  });

  const {
    fields: excludesFields,
    append: excludesAppend,
    remove: excludesRemove,
  } = useFieldArray({
    control: form.control,
    name: "excludes",
  });

  const {
    fields: whatToBringFields,
    append: whatToBringAppend,
    remove: whatToBringRemove,
  } = useFieldArray({
    control: form.control,
    name: "whatToBring",
  });

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tour Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter an eye-catching title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="relative">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (details of the tour)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your description here..."
                    {...field}
                    className="max-h-60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <span
            className={cn("absolute right-0 top-0 text-[#4B4458]/70 text-sm", {
              "text-red-500": descriptionLength > 1000,
            })}
          >
            {descriptionLength}/1000
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="950" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Tour duration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration Type</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${form.formState.errors.durationType && "border-red-500"} w-full`}
                    >
                      <SelectValue placeholder="Select a duration type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value={TourDurationType.HOURS}>
                      Hours
                    </SelectItem>
                    <SelectItem value={TourDurationType.DAYS}>Days</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City/Destination" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Latitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Longitude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxGroupSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Group Size</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Max guest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="meetingPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MeetingPoint</FormLabel>
                <FormControl>
                  <Input placeholder="Exact location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${form.formState.errors.category && "border-red-500"} w-full`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {tourCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
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
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags (write tag with comma &apos;,&apos;)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="winter, mountain, nature, etc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="languages"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Languages (write language with comma &apos;,&apos;)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="English, Spanish, Banglish, etc"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={`${form.formState.errors.difficulty && "border-red-500"} w-full`}
                    >
                      <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value={Difficulty.EASY}>Easy</SelectItem>
                    <SelectItem value={Difficulty.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={Difficulty.HARD}>Hard</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2">
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-8">
              <FormField
                control={form.control}
                name="cancellationPolicy"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Cancellation Policy</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter cancellation policy"
                        {...field}
                        className="max-h-60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2 min-h-15">
                <div className="flex justify-between gap-3 flex-wrap">
                  <FormLabel>Includes</FormLabel>
                  <button
                    className="text-xs flex items-center gap-2 hover:text-green-500"
                    type="button"
                    onClick={() => includesAppend({ value: "" })}
                  >
                    <Plus size={16} /> Add More
                  </button>
                </div>

                {includesFields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`includes.${index}.value`}
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
                              onClick={() => includesRemove(index)}
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
                  <FormLabel>Excludes</FormLabel>
                  <button
                    className="text-xs flex items-center gap-2 hover:text-green-500"
                    type="button"
                    onClick={() => excludesAppend({ value: "" })}
                  >
                    <Plus size={16} /> Add More
                  </button>
                </div>

                {excludesFields.map((item, index) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`excludes.${index}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <span className="inline-flex items-center relative">
                            <Input
                              {...field}
                              placeholder="Enter excludes"
                              className="pr-8"
                            />
                            <button
                              type="button"
                              onClick={() => excludesRemove(index)}
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
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2 min-h-15">
              <div className="flex justify-between gap-3 flex-wrap">
                <FormLabel>Highlights</FormLabel>
                <button
                  className="text-xs flex items-center gap-2 hover:text-green-500"
                  type="button"
                  onClick={() => highlightsAppend({ value: "" })}
                >
                  <Plus size={16} /> Add More
                </button>
              </div>

              {highlightsFields.map((item, index) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`highlights.${index}.value`}
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
                            onClick={() => highlightsRemove(index)}
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
                <FormLabel>What to bring</FormLabel>
                <button
                  className="text-xs flex items-center gap-2 hover:text-green-500"
                  type="button"
                  onClick={() => whatToBringAppend({ value: "" })}
                >
                  <Plus size={16} /> Add More
                </button>
              </div>

              {whatToBringFields.map((item, index) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={`whatToBring.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <span className="inline-flex items-center relative">
                          <Input
                            {...field}
                            placeholder="Enter whatToBring"
                            className="pr-8"
                          />
                          <button
                            type="button"
                            onClick={() => whatToBringRemove(index)}
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
          </div>
        </div>
      </form>
    </Form>
  );
}
