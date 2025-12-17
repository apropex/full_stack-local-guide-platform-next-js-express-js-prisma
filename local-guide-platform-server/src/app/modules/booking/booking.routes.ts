import { Role } from "@prisma/client";
import { Router } from "express";
import { adminAccess } from "../../constants";
import { roleVerifier } from "../../middlewares/roleVerifier";
import { tokenVerifier } from "../../middlewares/tokenVerifier";
import { userAccessVerifier } from "../../middlewares/userAccessVerifier";
import validateRequest from "../../middlewares/validateRequest";
import * as bookingControllers from "./booking.controller";
import { BookingSchema } from "./booking.validation";

const bookingRoutes = Router();

bookingRoutes.post(
  "/create/:tourId",
  tokenVerifier,
  userAccessVerifier,
  validateRequest(BookingSchema),
  bookingControllers.createBooking,
);

bookingRoutes.patch(
  "/:id/status",
  roleVerifier(Role.ADMIN),
  bookingControllers.updateBookingStatus,
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

bookingRoutes.get("/:id", tokenVerifier, bookingControllers.getBookingById);

export default bookingRoutes;
