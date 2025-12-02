import { Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../lib/ApiError";
import catchAsync from "../../../shared/catchAsync";
import _response from "../../../shared/sendResponse";
import { checkString } from "../../../utils/checkString";
import { adminAccess } from "../../constants";
import * as guideService from "./guide.service";

//* CREATE GUIDE *\\
export const createGuide = catchAsync(async (req, res) => {
  const userId = checkString(
    req.decoded?.id,
    "User id not found, login again or contact to support",
  );

  await guideService.createGuide(userId, req.body);

  _response(res, {
    message: "Guide created successfully!",
  });
});

//* UPDATE GUIDE *\\
export const updateGuide = catchAsync(async (req, res) => {
  const user = req.decoded ?? ({} as JwtPayload);
  const { id } = req.params;

  if (user.id !== id && !adminAccess.includes(user.role)) {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to update this user",
    );
  }

  const updatedGuide = await guideService.updateGuide(id, req.body);
  _response(res, {
    message: "Guide updated successfully!",
    data: updatedGuide,
  });
});

//* GET GUIDE BY ID *\\
export const getGuideById = catchAsync(async (req, res) => {
  const role = checkString(
    req.decoded?.role,
    "User role not found, login again",
  );
  const id = checkString(req.params.id, "Guid id not found in the params");

  if (role !== Role.ADMIN && role !== Role.SUPER_ADMIN) {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to get the guide",
    );
  }

  const user = await guideService.getGuideById(id);
  _response(res, {
    message: "Guide retrieved successfully!",
    data: user,
  });
});

//* GET ALL GUIDES *\\
export const getAllGuides = catchAsync(async (req, res) => {
  const { data, meta } = await guideService.getAllGuides(req.query);

  _response(res, {
    message: "Guides retrieved successfully!",
    data,
    meta,
  });
});
