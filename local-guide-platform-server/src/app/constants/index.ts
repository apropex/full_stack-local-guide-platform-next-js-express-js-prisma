import { Role } from "@prisma/client";
import { UploadApiResponse } from "cloudinary";

const { SUPER_ADMIN, ADMIN, GUIDE, TOURIST } = Role;

export const adminAccess: Role[] = [SUPER_ADMIN, ADMIN];
export const guideAccess: Role[] = [SUPER_ADMIN, ADMIN, GUIDE];
export const touristAccess: Role[] = [SUPER_ADMIN, ADMIN, GUIDE, TOURIST];

export type MulterFile = Express.Multer.File;
export type MulterFiles = Express.Multer.File[];
export type CloudFile = UploadApiResponse;
export type CloudFiles = UploadApiResponse[];

export const otpOptions = {
  setOtp: "setOtp",
  verifyOtp: "verifyOtp",
} as const;

export type tOtpOptions = (typeof otpOptions)[keyof typeof otpOptions];
