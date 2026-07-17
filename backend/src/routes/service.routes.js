import { Router } from "express";
import {
  createServiceController,
  getServicesByShopController,
  updateServiceController,
  deleteServiceController,
} from "../controllers/service.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";
import { serviceCreateValidator } from "../validators/service.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Public routes
router.get("/shop/:shopId", getServicesByShopController);

// Protected routes (Only SHOP_OWNER and ADMIN can configure services)
router.use(protect);

router.post(
  "/",
  restrictTo("SHOP_OWNER", "ADMIN"),
  serviceCreateValidator,
  validateRequest,
  createServiceController
);

router.put(
  "/:id",
  restrictTo("SHOP_OWNER", "ADMIN"),
  updateServiceController
);

router.delete(
  "/:id",
  restrictTo("SHOP_OWNER", "ADMIN"),
  deleteServiceController
);

export default router;
