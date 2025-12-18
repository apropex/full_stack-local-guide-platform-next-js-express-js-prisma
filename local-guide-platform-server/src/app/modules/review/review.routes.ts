import { Router } from "express";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import * as reviewControllers from "./review.controller";

const router = Router();

router.post("/create", tokenVerifier, reviewControllers.createReview);

router.get("/all-reviews-public", reviewControllers.getAllReviewsPublic);

export default router;
