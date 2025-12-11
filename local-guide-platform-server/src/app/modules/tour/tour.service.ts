import { Prisma, Tour } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../lib/ApiError";
import prisma from "../../../lib/prisma";
import { iQuery } from "../../../shared/global-query-interfaces";
import { sCode } from "../../../utils";
import configureQuery, {
  getSearchFilters,
} from "../../../utils/configureQuery";
import { deleteImageFromCloud } from "../../../utils/deleteImageFromCloud";
import { strx } from "../../../utils/strx";
import { adminAccess, CloudFiles } from "../../constants";
import {
  tourBooleanFields,
  tourFilterFields,
  tourNumberFields,
  tourSearchFields,
} from "./tour.constants";

//* CREATE TOUR (No Transaction) *\\
export const createTour = async (
  guideId: string,
  payload: Tour,
  files?: CloudFiles,
) => {
  // Step 1: Create the tour
  const tour = await prisma.tour.create({
    data: { ...payload, guideId },
  });

  // Step 2: Insert images sequentially (if any)
  if (files && files.length > 0) {
    for (const file of files) {
      await prisma.tourImage.create({
        data: {
          tourId: tour.id,
          url: file.secure_url,
          publicId: file.public_id,
        },
      });
    }
  }

  // Step 3: Return the created tour
  return tour;
};

//* UPDATE TOUR *\\
export const updateTour = async (
  decoded: JwtPayload,
  tourId: string,
  { deletedImages, ...payload }: Tour & { deletedImages?: string[] },
  files?: CloudFiles,
) => {
  const tour = await prisma.tour.findUnique({
    where: { id: tourId },
    include: {
      images: true,
    },
  });

  if (!tour) throw new ApiError(sCode.NOT_FOUND, "Tour not found");

  if (tour.guideId !== decoded.id || !adminAccess.includes(decoded.role)) {
    throw new ApiError(
      sCode.BAD_REQUEST,
      "You are not permitted to update this tour",
    );
  }

  return await prisma.$transaction(async (trx) => {
    if (Array.isArray(deletedImages) && deletedImages.length) {
      await Promise.all(
        deletedImages.map((pId) =>
          trx.tourImage.delete({ where: { publicId: pId } }),
        ),
      );

      await Promise.allSettled(
        deletedImages.map((pId) => deleteImageFromCloud(pId)),
      );
    }

    if (files) {
      await Promise.allSettled(
        files.map((file) =>
          trx.tourImage.create({
            data: {
              tourId: tour.id,
              url: file.secure_url,
              publicId: file.public_id,
            },
          }),
        ),
      );
    }

    return await trx.tour.update({ where: { id: tourId }, data: payload });
  });
};

//* GET TOUR BY ID *\\
export const getTourById = async (id: string) => {
  return await prisma.tour.findUniqueOrThrow({ where: { id } });
};

//* GET ALL TOUR *\\
type WhereInput = Prisma.TourWhereInput;

export const getAllTours = async (query: iQuery) => {
  const { page, take, skip, orderBy, search, filters } = configureQuery(query, {
    filterFields: tourFilterFields,
    booleanFields: tourBooleanFields,
    numberFields: tourNumberFields,
  });

  const {
    highlights,
    tags,
    languages,
    includes,
    excludes,
    whatToBring,
    price,
    duration,
    rating,
    totalReviews,
    ...restFilters
  } = filters;

  const where = getSearchFilters({
    searchFields: tourSearchFields,
    search,
    filters: { ...restFilters },
  }) as WhereInput;

  if (!Array.isArray(where?.AND)) where.AND = [];

  const highlightsArray = strx.toTokens(highlights as string);
  const tagsArray = strx.toTokens(tags as string);
  const languagesArray = strx.toTokens(languages as string);
  const includesArray = strx.toTokens(includes as string);
  const excludesArray = strx.toTokens(excludes as string);
  const whatToBringArray = strx.toTokens(whatToBring as string);

  if (highlightsArray.length > 0) {
    where.AND.push({ highlights: { hasSome: highlightsArray } });
  }
  if (tagsArray.length > 0) {
    where.AND.push({ tags: { hasSome: tagsArray } });
  }
  if (languagesArray.length > 0) {
    where.AND.push({ languages: { hasSome: languagesArray } });
  }
  if (includesArray.length > 0) {
    where.AND.push({ includes: { hasSome: includesArray } });
  }
  if (excludesArray.length > 0) {
    where.AND.push({ excludes: { hasSome: excludesArray } });
  }
  if (whatToBringArray.length > 0) {
    where.AND.push({ whatToBring: { hasSome: whatToBringArray } });
  }

  if (price) {
    where.AND.push({ price: { lte: price as number } });
  }
  if (duration) {
    where.AND.push({ duration: { lte: duration as number } });
  }
  if (rating) {
    where.AND.push({ rating: { gte: rating as number } });
  }
  if (totalReviews) {
    where.AND.push({ totalReviews: { gte: totalReviews as number } });
  }

  const include = {
    images: true,
    bookings: {
      include: {
        payment: true,
      },
    },
  };

  const [events, total_records, filtered_records] = await Promise.all([
    prisma.tour.findMany({ where, orderBy, skip, take, include }),
    prisma.tour.count(),
    prisma.tour.count({ where }),
  ]);

  return {
    data: events,
    meta: {
      total_records,
      filtered_records,
      present_records: events.length ?? 0,
      total_pages: Math.ceil(filtered_records / take),
      present_page: page,
      skip,
      limit: take,
    },
  };
};

//* SOFT DELETE TOUR *\\
export const tourSoftDelete = async (userId: string, tourId: string) => {
  return await prisma.tour.update({
    where: { id: tourId },
    data: {
      isDeleted: true,
      deletedBy: userId,
    },
  });
};

//* HARD DELETE TOUR *\\
export const tourHardDelete = async (id: string) => {
  await prisma.tour.delete({ where: { id } });
};
