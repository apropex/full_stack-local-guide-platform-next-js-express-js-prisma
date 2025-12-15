/* eslint-disable react-hooks/incompatible-library */
"use client";

import CustomButton from "@/components/buttons/CustomButton";
import LoadingButton from "@/components/buttons/LoadingButton";
import { _alert } from "@/components/custom-toast/CustomToast";
import MultiFileUploader from "@/components/MultiFileUploader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createReview } from "@/services/review.services";
import { urid } from "@/utils";
import { ReviewPayload, ReviewSchema } from "@/zod/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import StarRatingInput from "./StarRatingInput";

interface iProps {
  touristId: string;
  tourId: string;
}

export default function CreateReviewForm({ touristId, tourId }: iProps) {
  const [images, setImages] = useState<File[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [createReviewDialog, setCreateReviewDialog] = useState(false);

  const router = useRouter();

  const form = useForm<ReviewPayload>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      touristId: "",
      tourId: "",
    },
  });

  async function onSubmit(values: ReviewPayload) {
    setLoading(true);
    const alertId = _alert.loading("Creating review...", { id: urid() });

    values.touristId = touristId;
    values.tourId = tourId;

    const result = await createReview(values, images as File[]);

    _alert.dismiss(alertId);

    if (result.success) {
      form.reset();
      _alert.success("A review created successfully!");
      router.push("/dashboard/guide/my-tours");
    } else {
      _alert.error("Failed to create review", result.message);
    }

    setLoading(false);
  }

  return (
    <Dialog open={createReviewDialog} onOpenChange={setCreateReviewDialog}>
      <Form {...form}>
        <DialogTrigger asChild>
          <CustomButton onClick={() => setCreateReviewDialog(true)}>
            Create Review
          </CustomButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-180 max-h-[85vh] overflow-y-auto custom_scrollbar">
          <DialogHeader>
            <DialogTitle>Review Form</DialogTitle>
          </DialogHeader>
          <form
            id="create_review_form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tour Rating</FormLabel>
                  <FormControl>
                    <StarRatingInput
                      value={field.value ?? 0}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your comment here..."
                        {...field}
                        className="max-h-60"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span
                className={cn(
                  "absolute right-0 top-0 text-[#4B4458]/70 text-sm",
                  {
                    "text-red-500": (form.watch("comment") ?? "").length > 1000,
                  },
                )}
              >
                {(form.watch("comment") ?? "").length}/1000
              </span>
            </div>
          </form>

          <MultiFileUploader setImages={setImages} />

          <div className="flex items-center justify-end gap-3">
            <CustomButton
              variant="outline"
              type="button"
              size={"sm"}
              onClick={() => setCreateReviewDialog(false)}
            >
              Cancel
            </CustomButton>

            <LoadingButton
              form="create_review_form"
              type="submit"
              size={"sm"}
              isLoading={loading}
              loadingText="Creating..."
            >
              Create Review
            </LoadingButton>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  );
}
