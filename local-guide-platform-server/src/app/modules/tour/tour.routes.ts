import { Role } from "@prisma/client";
import { Router } from "express";
import { multiFileUploader } from "../../../lib/config/cloudinary/multer.controller";
import { adminAccess, guideAccess } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import validateRequest from "../../middlewares/validateRequest";
import * as tourControllers from "./tour.controller";
import {
  CreateTourPayloadSchema,
  UpdateTourByAdminSchema,
  UpdateTourPayloadSchema,
} from "./tour.validation";

const router = Router();

router.get("/all", tourControllers.getAllTours);

router.get("/my-tours", tokenVerifier, tourControllers.myTours);

router.get("/:id", tokenVerifier, tourControllers.getTourById);

router.post(
  "/create",
  roleVerifier(Role.GUIDE),
  multiFileUploader,
  validateRequest(CreateTourPayloadSchema),
  tourControllers.createTour,
);

router.patch(
  "/update/:id",
  roleVerifier(guideAccess),
  multiFileUploader,
  validateRequest(UpdateTourPayloadSchema),
  tourControllers.updateTour,
);

router.patch(
  "/update-tour-by-admin/:id",
  roleVerifier(adminAccess),
  validateRequest(UpdateTourByAdminSchema),
  tourControllers.updateTourByAdmin,
);

router.delete(
  "/soft-delete/:id",
  roleVerifier(guideAccess),
  tourControllers.tourSoftDelete,
);

router.delete(
  "/hard-delete/:id",
  roleVerifier(adminAccess),
  tourControllers.tourHardDelete,
);

export default router;
