import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { registerValidator } from "../validators/auth.validator.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth Route Working",
  });
});

router.post(
  "/register",
  registerValidator,
  validateRequest,
  register
);

export default router;