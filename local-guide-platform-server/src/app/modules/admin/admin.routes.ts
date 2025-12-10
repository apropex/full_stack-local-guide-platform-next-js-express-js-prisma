import { Router } from "express";
import { adminAccess } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import { userAccessVerifier } from "../../middlewares/userAccessVerifier";
import validateRequest from "../../middlewares/validateRequest";
import * as adminController from "./admin.controller";
import { AdminSchema } from "./admin.validation";

const router = Router();

router.get("/all", roleVerifier(adminAccess), adminController.getAllAdmins);
router.get("/:id", tokenVerifier, adminController.getAdminById);

router.post(
  "/create-admin",
  tokenVerifier,
  userAccessVerifier,
  validateRequest(AdminSchema),
  adminController.createAdmin,
);

router.patch(
  "/:id",
  tokenVerifier,
  userAccessVerifier,
  validateRequest(AdminSchema),
  adminController.updateAdmin,
);

router.patch(
  "/verify-guide/:id",
  roleVerifier(adminAccess),
  adminController.verifyGuide,
);

router.patch(
  "/verify-admin/:id",
  roleVerifier(adminAccess),
  adminController.verifyAdmin,
);

export default router;
