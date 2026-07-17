import { Router } from "express";
import {
  createBarberController,
  getBarbersByShopController,
  getBarberByIdController,
  updateBarberController,
  deleteBarberController,
} from "../controllers/barber.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";
import { barberCreateValidator } from "../validators/barber.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Public routes
router.get("/shop/:shopId", getBarbersByShopController);
router.get("/:id", getBarberByIdController);

// Protected routes (Only SHOP_OWNER and ADMIN can register/edit/remove barbers)
router.use(protect);

router.post(
  "/",
  restrictTo("SHOP_OWNER", "ADMIN"),
  barberCreateValidator,
  validateRequest,
  createBarberController
);

router.put(
  "/:id",
  restrictTo("SHOP_OWNER", "ADMIN"),
  updateBarberController
);

router.delete(
  "/:id",
  restrictTo("SHOP_OWNER", "ADMIN"),
  deleteBarberController
);

export default router;
