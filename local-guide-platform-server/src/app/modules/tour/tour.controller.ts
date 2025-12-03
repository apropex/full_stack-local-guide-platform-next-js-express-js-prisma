import { multiFileUploaderToCloud } from "../../../lib/fileUploader";
import catchAsync from "../../../shared/catchAsync";
import _response from "../../../shared/sendResponse";
import { checkString } from "../../../utils/checkString";
import { CloudFiles, MulterFiles } from "../../constants";
import * as tourServices from "./tour.service";

export const createTour = catchAsync(async (req, res) => {
  const guideId = checkString(
    req.decoded?.guideId,
    "Guide id id not found, login again",
  );

  if (Array.isArray(req.files) && req.files.length) {
    const uploadResult = await multiFileUploaderToCloud(
      req.files as MulterFiles,
    );
    if (uploadResult.length) req.files = uploadResult;
  }

  const result = await tourServices.createTour(
    guideId,
    req.body,
    req.files as CloudFiles,
  );
  _response(res, {
    message: "Tour created successfully!",
    data: result,
  });
});

export const updateTour = catchAsync(async (req, res) => {
  if (Array.isArray(req.files) && req.files.length) {
    const uploadResult = await multiFileUploaderToCloud(
      req.files as MulterFiles,
    );
    if (uploadResult.length) req.files = uploadResult;
  }

  const result = await tourServices.updateTour(
    req.decoded!,
    req.params.id,
    req.body,
    req.files as CloudFiles,
  );
  _response(res, {
    message: "Tour updated successfully!",
    data: result,
  });
});

export const getTourById = catchAsync(async (req, res) => {
  const result = await tourServices.getTourById(req.params.id);
  _response(res, {
    message: "Tour retrieved successfully!",
    data: result,
  });
});

export const getAllTours = catchAsync(async (req, res) => {
  const { data, meta } = await tourServices.getAllTours(req.query);
  _response(res, {
    message: "Tours retrieved successfully!",
    data,
    meta,
  });
});

export const tourSoftDelete = catchAsync(async (req, res) => {
  await tourServices.tourSoftDelete(req.decoded?.id, req.params.id);
  _response(res, {
    message: "Tour deleted successfully!",
  });
});

export const tourHardDelete = catchAsync(async (req, res) => {
  await tourServices.tourHardDelete(req.params.id);
  _response(res, {
    message: "Tour deleted successfully!",
  });
});
