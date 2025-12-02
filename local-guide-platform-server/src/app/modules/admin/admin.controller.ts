import { Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../lib/ApiError";
import catchAsync from "../../../shared/catchAsync";
import _response from "../../../shared/sendResponse";
import { checkString } from "../../../utils/checkString";
import { adminAccess } from "../../constants";
import * as adminService from "./admin.service";

//* CREATE ADMIN *\\
export const createAdmin = catchAsync(async (req, res) => {
  const userId = checkString(
    req.decoded?.id,
    "User id not found, login again or contact to support",
  );

  await adminService.createAdmin(userId, req.body);

  _response(res, {
    message: "Admin created successfully!",
  });
});

//* UPDATE ADMIN *\\
export const updateAdmin = catchAsync(async (req, res) => {
  const user = req.decoded ?? ({} as JwtPayload);
  const { id } = req.params;

  if (user.id !== id && !adminAccess.includes(user.role)) {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to update this user",
    );
  }

  const updatedAdmin = await adminService.updateAdmin(id, req.body);
  _response(res, {
    message: "Admin updated successfully!",
    data: updatedAdmin,
  });
});

//* GET ADMIN BY ID *\\
export const getAdminById = catchAsync(async (req, res) => {
  const role = checkString(
    req.decoded?.role,
    "User role not found, login again",
  );
  const adminId = checkString(req.params.id, "Guid id not found in the params");

  if (!adminAccess.includes(role as Role)) {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to get the admin",
    );
  }

  const user = await adminService.getAdminById(adminId);
  _response(res, {
    message: "Admin retrieved successfully!",
    data: user,
  });
});

//* GET ALL ADMINS *\\
export const getAllAdmins = catchAsync(async (req, res) => {
  const { data, meta } = await adminService.getAllAdmins(req.query);

  _response(res, {
    message: "Admins retrieved successfully!",
    data,
    meta,
  });
});
