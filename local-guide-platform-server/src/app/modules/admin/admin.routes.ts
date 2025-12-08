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
router.get("/:id", roleVerifier(adminAccess), adminController.getAdminById);

router.post(
  "/",
  roleVerifier(adminAccess),
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

export default router;
