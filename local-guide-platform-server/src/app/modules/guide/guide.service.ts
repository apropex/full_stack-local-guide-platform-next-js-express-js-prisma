import { Prisma } from "@prisma/client";
import ApiError from "../../../lib/ApiError";
import prisma from "../../../lib/prisma";
import { iQuery } from "../../../shared/global-query-interfaces";
import { sCode } from "../../../utils";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import {
  guideBooleanFields,
  guideFilterFields,
  guideNumberFields,
  guideSearchFields,
} from "./guide.constants";

//* CREATE A NEW GUIDE *\\
export const createGuide = async (
  userId: string,
  payload: Prisma.GuideCreateInput,
) => {
  const existingGuide = await prisma.guide.findUnique({
    where: { userId },
  });
  if (existingGuide) {
    throw new ApiError(sCode.CONFLICT, "Guide already exist with this email");
  }

  return await prisma.guide.create({
    data: {
      ...payload,
      user: {
        connect: { id: userId },
      },
    },
  });
};

//* UPDATE AN EXISTING GUIDE *\\
export const updateGuide = async (
  id: string,
  payload: Prisma.GuideUpdateInput,
) => {
  const guide = await prisma.guide.findUnique({
    where: { id },
  });
  if (!guide) {
    throw new ApiError(404, "Guide not found");
  }

  return await prisma.guide.update({
    where: { id },
    data: payload,
  });
};

//* GET GUIDE BY ID *\\
export const getGuideById = async (id: string) => {
  const guide = await prisma.guide.findUnique({
    where: { id },
    include: {
      tours: true,
    },
  });
  if (!guide) {
    throw new ApiError(404, "Guide not found");
  }
  return guide;
};

//* GET ALL USERS *\\
type WhereInput = Prisma.GuideWhereInput;

export const getAllGuides = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: guideFilterFields,
    booleanFields: guideBooleanFields,
    numberFields: guideNumberFields,
  });

  const {
    expertise,
    languages,
    experienceYears,
    dailyRate,
    hourlyRate,
    averageRating,
    totalReviews,
    ...restFilters
  } = filters;

  const where = getSearchFilters({
    searchFields: guideSearchFields,
    search,
    filters: restFilters,
  }) as WhereInput;

  if (!Array.isArray(where?.AND)) where.AND = [];

  if (expertise && typeof expertise === "string") {
    const expertiseArray = expertise
      .split(" ")
      .filter((s) => s.trim().length > 0);
    where.AND.push({ expertise: { hasSome: expertiseArray } });
  }
  if (languages && typeof languages === "string") {
    const languagesArray = languages
      .split(" ")
      .filter((s) => s.trim().length > 0);
    where.AND.push({ languages: { hasSome: languagesArray } });
  }
  if (experienceYears && typeof experienceYears === "number") {
    where.AND.push({ experienceYears: { gte: experienceYears } });
  }
  if (dailyRate && typeof dailyRate === "number") {
    where.AND.push({ dailyRate: { gte: dailyRate } });
  }
  if (hourlyRate && typeof hourlyRate === "number") {
    where.AND.push({ hourlyRate: { gte: hourlyRate } });
  }
  if (averageRating && typeof averageRating === "number") {
    where.AND.push({ averageRating: { gte: averageRating } });
  }
  if (totalReviews && typeof totalReviews === "number") {
    where.AND.push({ totalReviews: { gte: totalReviews } });
  }

  const [guides, total_records, filtered_records] = await Promise.all([
    prisma.guide.findMany({ where, orderBy, skip, take }),
    prisma.guide.count(),
    prisma.guide.count({ where }),
  ]);

  return {
    data: guides,
    meta: {
      total_records,
      filtered_records,
      present_records: guides.length ?? 0,
      total_pages: Math.ceil(filtered_records / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};
