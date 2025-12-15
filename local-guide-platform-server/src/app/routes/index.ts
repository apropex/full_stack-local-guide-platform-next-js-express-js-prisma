import { Router } from "express";
import adminRoutes from "../modules/admin/admin.routes";
import authRoutes from "../modules/auth/auth.routes";
import bookingRoutes from "../modules/booking/booking.routes";
import guideRoutes from "../modules/guide/guide.routes";
import paymentRoutes from "../modules/payment/payment.route";
import reviewRoutes from "../modules/review/review.routes";
import tourRoutes from "../modules/tour/tour.routes";
import userRoutes from "../modules/user/user.routes";

const router = Router();

[
  { path: "/user", route: userRoutes },
  { path: "/guide", route: guideRoutes },
  { path: "/admin", route: adminRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/tour", route: tourRoutes },
  { path: "/booking", route: bookingRoutes },
  { path: "/payment", route: paymentRoutes },
  { path: "/review", route: reviewRoutes },
].forEach(({ path, route }) => router.use(path, route));

export default router;
