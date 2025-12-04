import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { GuidePayload } from "@/zod/guide.schema";

export const createGuide = async (payload: GuidePayload) => {
  try {
    return await _fetch.post(routes.guide(), { data: payload });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateGuide = async (guideId: string, payload: GuidePayload) => {
  try {
    return await _fetch.patch(routes.guide(guideId), { data: payload });
  } catch (error) {
    return errorResponse(error);
  }
};

export const getGuideById = async (guideId: string) => {
  try {
    return await _fetch.get(routes.guide(guideId));
  } catch (error) {
    return errorResponse(error);
  }
};

export const getAllGuides = async (query?: string) => {
  try {
    const api = join(routes.guide("all"), query ? join("?", query) : "");
    return await _fetch.get(api);
  } catch (error) {
    return errorResponse(error);
  }
};
