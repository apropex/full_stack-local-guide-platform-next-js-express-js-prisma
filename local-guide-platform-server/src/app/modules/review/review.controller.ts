import { multiFileUploaderToCloud } from "../../../lib/fileUploader";
import catchAsync from "../../../shared/catchAsync";
import _response from "../../../shared/sendResponse";
import { CloudFiles, MulterFiles } from "../../constants";

import * as reviewServices from "./review.services";

export const createReview = catchAsync(async (req, res) => {
  if (Array.isArray(req.files) && req.files.length) {
    const uploadResult = await multiFileUploaderToCloud(
      req.files as MulterFiles,
    );
    if (uploadResult.length) req.files = uploadResult;
  }

  const result = await reviewServices.createReview(
    req.body,
    req.files as CloudFiles,
  );
  _response(res, {
    message: "Review created successfully!",
    data: result,
  });
});

export const getAllReviewsPublic = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewsPublic();

  _response(res, {
    message: "Reviews retrieved successfully!",
    data: result,
  });
});
