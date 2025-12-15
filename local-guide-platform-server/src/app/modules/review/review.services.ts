import { Review } from "@prisma/client";
import prisma from "../../../lib/prisma";
import { CloudFiles } from "../../constants";

export const createReview = async (payload: Review, files?: CloudFiles) => {
  const review = await prisma.$transaction(async (trx) => {
    await trx.tour.update({
      where: { id: payload.tourId },
      data: {
        totalReviews: { increment: 1 },
        rating: { increment: payload.rating },
      },
    });

    return await trx.review.create({ data: payload });
  });

  if (files && Array.isArray(files) && files.length) {
    for (const file of files) {
      await prisma.reviewImage.create({
        data: {
          reviewId: review.id,
          url: file.secure_url,
          publicId: file.public_id,
        },
      });
    }
  }
};
