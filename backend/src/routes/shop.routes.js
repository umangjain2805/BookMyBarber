import { Router } from "express";
import {
  createShopController,
  getAllShopsController,
  getShopByIdController,
  updateShopController,
  deleteShopController,
} from "../controllers/shop.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";
import { shopCreateValidator } from "../validators/shop.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllShopsController);
router.get("/:id", getShopByIdController);

// Protected routes (Only SHOP_OWNER and ADMIN can write/edit/delete)
router.use(protect);

router.post(
  "/",
  restrictTo("SHOP_OWNER", "ADMIN"),
  shopCreateValidator,
  validateRequest,
  createShopController
);

router.put(
  "/:id",
  restrictTo("SHOP_OWNER", "ADMIN"),
  updateShopController
);

router.delete(
  "/:id",
  restrictTo("SHOP_OWNER", "ADMIN"),
  deleteShopController
);

export default router;
