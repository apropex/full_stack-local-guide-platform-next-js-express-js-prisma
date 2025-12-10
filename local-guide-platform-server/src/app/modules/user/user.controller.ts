import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../lib/ApiError";
import { fileUploader } from "../../../lib/fileUploader";
import catchAsync from "../../../shared/catchAsync";
import _response from "../../../shared/sendResponse";
import { adminAccess, CloudFile, MulterFile } from "../../constants";
import * as userService from "./user.service";

//* CREATE USER *\\
export const createUser = catchAsync(async (req, res) => {
  const payload = req.body;

  if (req.file) {
    const uploadResult = await fileUploader(req.file as MulterFile);
    if (uploadResult?.secure_url) req.file = uploadResult;
  }

  await userService.createUser(payload, req.file as CloudFile);

  _response(res, {
    message: "User created successfully!",
  });
});

//* UPDATE USER *\\
export const updateUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = req.decoded ?? ({} as JwtPayload);
  const { id } = req.params;

  if (user.id !== id && !adminAccess.includes(user.role)) {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to update this user",
    );
  }

  if (req.file) {
    const uploadResult = await fileUploader(req.file as MulterFile);
    if (uploadResult?.secure_url) req.file = uploadResult;
  }

  const updatedUser = await userService.updateUser(
    id,
    payload,
    req.file as CloudFile,
  );
  _response(res, {
    message: "User updated successfully!",
    data: updatedUser,
  });
});

//* GET USER BY ID *\\
export const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  _response(res, {
    message: "User retrieved successfully!",
    data: user,
  });
});

//* GET ME *\\
export const getMe = catchAsync(async (req, res) => {
  const userId = req.decoded?.id ?? "";
  const user = await userService.getUserById(userId);
  _response(res, {
    message: "User retrieved successfully!",
    data: user,
  });
});

//* SOFT DELETE USER *\\
export const softDeleteUser = catchAsync(async (req, res) => {
  const user = req.decoded ?? ({} as JwtPayload);
  const { id } = req.params;
  if (user.id !== id && !adminAccess.includes(user.role)) {
    throw new ApiError(
      403,
      "Forbidden: You don't have permission to delete this user",
    );
  }

  await userService.softDeleteUser(id);
  _response(res, {
    message: "User deleted successfully!",
    data: null,
  });
});

//* GET ALL USERS *\\
export const getAllUsers = catchAsync(async (req, res) => {
  const { data, meta } = await userService.getAllUsers(req.query);

  _response(res, {
    message: "Users retrieved successfully!",
    data,
    meta,
  });
});

export const updateUserByAdmin = catchAsync(async (req, res) => {
  const result = await userService.updateUserByAdmin(req.params.id, req.body);

  _response(res, {
    message: "User updated successfully!",
    data: result,
  });
});
