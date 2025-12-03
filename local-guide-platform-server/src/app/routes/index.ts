import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import bookingRoutes from "../modules/booking/booking.routes";
import paymentRoutes from "../modules/payment/payment.route";
import tourRoutes from "../modules/tour/tour.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

[
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/tour", route: tourRoutes },
  { path: "/booking", route: bookingRoutes },
  { path: "/payment", route: paymentRoutes },
].forEach(({ path, route }) => router.use(path, route));

export default router;
