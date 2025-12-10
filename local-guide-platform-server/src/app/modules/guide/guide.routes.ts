import { Router } from "express";
import { adminAccess } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import { userAccessVerifier } from "../../middlewares/userAccessVerifier";
import validateRequest from "../../middlewares/validateRequest";
import * as guideController from "./guide.controller";
import { GuideSchema } from "./guide.validation";

const router = Router();

router.get("/all", roleVerifier(adminAccess), guideController.getAllGuides);

router.get("/:id", tokenVerifier, guideController.getGuideById);

router.post(
  "/create-guide",
  tokenVerifier,
  userAccessVerifier,
  validateRequest(GuideSchema),
  guideController.createGuide,
);

router.patch(
  "/:id",
  tokenVerifier,
  userAccessVerifier,
  validateRequest(GuideSchema),
  guideController.updateGuide,
);

export default router;
