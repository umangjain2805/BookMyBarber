import { Router } from "express";
import authRoutes from "./auth.routes.js";
import shopRoutes from "./shop.routes.js";
import barberRoutes from "./barber.routes.js";
import serviceRoutes from "./service.routes.js";
import bookingRoutes from "./booking.routes.js";
import adminRoutes from "./admin.routes.js";
import recommendationRoutes from "./recommendation.routes.js";

const router = Router();

// Test/Health endpoint for V1
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API V1 Working",
  });
});

// Mount resource routes
router.use("/auth", authRoutes);
router.use("/shops", shopRoutes);
router.use("/barbers", barberRoutes);
router.use("/services", serviceRoutes);
router.use("/bookings", bookingRoutes);
router.use("/admin", adminRoutes);
router.use("/recommendations", recommendationRoutes);

export default router;
