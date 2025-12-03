import { Role } from "@prisma/client";
import { Router } from "express";
import { adminAccess } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import { userAccessVerifier } from "../../middlewares/userAccessVerifier";
import * as bookingControllers from "./booking.controller";

const bookingRoutes = Router();

bookingRoutes.post(
  "/create/:tourId",
  tokenVerifier,
  userAccessVerifier,
  bookingControllers.createBooking,
);

bookingRoutes.get(
  "/all",
  roleVerifier(adminAccess),
  bookingControllers.getAllBookings,
);

bookingRoutes.get(
  "/my-bookings",
  tokenVerifier,
  bookingControllers.getMyBookings,
);

bookingRoutes.patch(
  "/:id/status",
  roleVerifier(Role.ADMIN),
  bookingControllers.updateBookingStatus,
);

bookingRoutes.get("/:id", tokenVerifier, bookingControllers.getBookingById);

export default bookingRoutes;
