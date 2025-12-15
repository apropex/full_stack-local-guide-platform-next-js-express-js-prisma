"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { makeFormData } from "@/utils/makeFormData";
import { ReviewPayload } from "@/zod/review.schema";

export const createReview = async (payload: ReviewPayload, files?: File[]) => {
  try {
    const formData = makeFormData("data", payload, "files", files);

    return await _fetch.post(routes.review("create"), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};
