import { Router } from "express";
import { singleFileUploader } from "../../../lib/config/cloudinary/multer.controller";
import { adminAccess } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import { userAccessVerifier } from "../../middlewares/userAccessVerifier";
import validateRequest from "../../middlewares/validateRequest";
import * as userController from "./user.controller";
import {
  CreateUserSchema,
  UpdateUserByAdminSchema,
  UpdateUserSchema,
} from "./user.validation";

const router = Router();

router.get("/me", tokenVerifier, userAccessVerifier, userController.getMe);

router.get("/all", roleVerifier(adminAccess), userController.getAllUsers);

router.get("/:id", tokenVerifier, userController.getUserById);

router.post(
  "/",
  singleFileUploader,
  validateRequest(CreateUserSchema),
  userController.createUser,
);

router.post(
  "/update-user-by-admin/:id",
  roleVerifier(adminAccess),
  validateRequest(UpdateUserByAdminSchema),
  userController.updateUserByAdmin,
);

router.patch(
  "/:id",
  tokenVerifier,
  singleFileUploader,
  validateRequest(UpdateUserSchema),
  userController.updateUser,
);

router.delete("/:id", tokenVerifier, userController.softDeleteUser);

export default router;
