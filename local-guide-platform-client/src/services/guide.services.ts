"use server";

import { routes } from "@/constants/routes";
import { errorResponse } from "@/helper/errorResponse";
import { _fetch } from "@/lib/custom-fetch";
import { join } from "@/utils";
import { GuidePayload } from "@/zod/guide.schema";

const modifiedArray = (ary?: { value: string }[]): string[] => {
  return ary ? ary.map(({ value }) => value.trim()).filter(Boolean) : [];
};

const number = (n?: string | number): number => {
  return n ? Number(n) : 0;
};

export const createGuide = async (payload: GuidePayload) => {
  const { father, fathersNid, ...rest } = payload;

  const expertise = modifiedArray(payload.expertise);
  const languages = modifiedArray(payload.languages);

  const verificationDocs = {
    father: father ?? "",
    fathersNid: fathersNid ?? "",
  };

  const dailyRate = number(payload.dailyRate);
  const hourlyRate = number(payload.hourlyRate);
  const experienceYears = number(payload.experienceYears);

  try {
    return await _fetch.post(routes.guide("create-guide"), {
      data: {
        ...rest,
        expertise,
        languages,
        dailyRate,
        hourlyRate,
        experienceYears,
        verificationDocs,
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
};

export const updateGuide = async (guideId: string, payload: GuidePayload) => {
  const { father, fathersNid, ...rest } = payload;

  const expertise = modifiedArray(payload.expertise);
  const languages = modifiedArray(payload.languages);

  const verificationDocs = {
    father: father ?? "",
    fathersNid: fathersNid ?? "",
  };

  const dailyRate = number(payload.dailyRate);
  const hourlyRate = number(payload.hourlyRate);
  const experienceYears = number(payload.experienceYears);

  try {
    return await _fetch.patch(routes.guide(guideId), {
      data: {
        ...rest,
        expertise,
        languages,
        dailyRate,
        hourlyRate,
        experienceYears,
        verificationDocs,
      },
    });
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
