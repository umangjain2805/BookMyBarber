import { Router } from "express";
import {
  createBookingController,
  getBookingsController,
  getBookingByIdController,
  updateBookingStatusController,
} from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  bookingCreateValidator,
  bookingStatusValidator,
} from "../validators/booking.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Protect all booking routes
router.use(protect);

router.post(
  "/",
  bookingCreateValidator,
  validateRequest,
  createBookingController
);

router.get("/", getBookingsController);

router.get("/:id", getBookingByIdController);

router.put(
  "/:id/status",
  bookingStatusValidator,
  validateRequest,
  updateBookingStatusController
);

export default router;
