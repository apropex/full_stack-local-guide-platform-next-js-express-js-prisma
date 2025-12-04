"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { makeFormData } from "@/utils/makeFormData";
import { CreateTourPayload, UpdateTourPayload } from "@/zod/tour.schema";

export const createTour = async (payload: CreateTourPayload, files: File[]) => {
  try {
    const formData = makeFormData("data", payload, "files", files);
    return await _fetch.post(routes.tour("create"), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateTour = async (payload: UpdateTourPayload, files?: File[]) => {
  try {
    const formData = makeFormData("data", payload, "files", files);
    return await _fetch.post(routes.tour("update"), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

export const softDeleteTour = async (tourId: string) => {
  try {
    return await _fetch.delete(routes.tour("soft-delete", tourId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const hardDeleteTour = async (tourId: string) => {
  try {
    return await _fetch.delete(routes.tour("hard-delete", tourId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getSingleTour = async (tourId: string) => {
  try {
    return await _fetch.get(routes.tour(tourId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAllTours = async (query?: string) => {
  try {
    const api = join(routes.tour("all"), query ? join("?", query) : "");
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};
