"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { iImage } from "@/interfaces";
import { _fetch } from "@/lib/custom-fetch";
import { join, modifiedArray, stringToArray } from "@/utils";
import { makeFormData } from "@/utils/makeFormData";
import {
  CreateTourPayload,
  UpdateTourByAdminPayload,
  UpdateTourPayload,
} from "@/zod/tour.schema";

export const createTour = async (payload: CreateTourPayload, files: File[]) => {
  const highlights = modifiedArray(payload.highlights);
  const includes = modifiedArray(payload.includes);
  const excludes = modifiedArray(payload.excludes);
  const whatToBring = modifiedArray(payload.whatToBring);

  const tags = stringToArray(",", payload.tags);
  const languages = stringToArray(",", payload.languages);

  const safePayload = {
    ...payload,
    highlights,
    includes,
    excludes,
    whatToBring,
    tags,
    languages,
  };

  try {
    const formData = makeFormData("data", safePayload, "files", files);
    return await _fetch.post(routes.tour("create"), { body: formData });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateTour = async (
  id: string,
  payload: UpdateTourPayload,
  files?: File[],
  deletedImages: iImage[] = [],
) => {
  const highlights = modifiedArray(payload.highlights);
  const includes = modifiedArray(payload.includes);
  const excludes = modifiedArray(payload.excludes);
  const whatToBring = modifiedArray(payload.whatToBring);

  const tags = stringToArray(",", payload.tags);
  const languages = stringToArray(",", payload.languages);

  const safePayload = {
    ...payload,
    highlights,
    includes,
    excludes,
    whatToBring,
    tags,
    languages,
    deletedImages: deletedImages.map((img) => img.publicId),
  };

  try {
    const formData = makeFormData("data", safePayload, "files", files);
    return await _fetch.patch(routes.tour("update", id), { body: formData });
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

export const getMyTours = async (query?: string) => {
  try {
    const api = join(routes.tour("my-tours"), query ? join("?", query) : "");
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAllToursPublic = async (query?: string) => {
  try {
    const api = join(routes.tour("all-public"), query ? join("?", query) : "");
    return await _fetch.get(api);
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

export const updateTourByAdmin = async (
  id: string,
  payload: UpdateTourByAdminPayload,
) => {
  try {
    return await _fetch.patch(routes.tour("update-tour-by-admin", id), {
      data: payload,
    });
  } catch (error) {
    return errorResponse(error);
  }
};
