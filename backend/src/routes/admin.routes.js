import { Router } from "express";
import {
  getSystemStatsController,
  getAllUsersController,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { restrictTo } from "../middleware/role.middleware.js";

const router = Router();

// Protect all admin endpoints to Admin role only
router.use(protect, restrictTo("ADMIN"));

router.get("/stats", getSystemStatsController);
router.get("/users", getAllUsersController);

export default router;
